import { Provider } from "react-redux"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import panzoom from "panzoom"
import { createAppStore } from "../../../redux/store"
import {
  paintCountries,
  updateCurrentMap,
} from "../../../redux/mapSlice"
import EuropeSVG from "../SVGMap/maps/EuropeSVG"
import { MapEditorProvider } from "../SVGMap/MapEditorContext"
import StudioToolbar from "../StudioShell/StudioToolbar"
import StudioControls from "./StudioControls"

jest.mock("panzoom", () => jest.fn(() => ({
  dispose: jest.fn(),
  moveTo: jest.fn(),
  zoomAbs: jest.fn(),
  zoomTo: jest.fn(),
})))
jest.mock("save-svg-as-png", () => ({ saveSvgAsPng: jest.fn() }))

let mobile = false
const mediaListeners = new Set()
const mediaQuery = {
  get matches() {
    return mobile
  },
  media: "(max-width: 900px)",
  onchange: null,
  addEventListener: (_event, listener) => mediaListeners.add(listener),
  removeEventListener: (_event, listener) => mediaListeners.delete(listener),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  dispatchEvent: jest.fn(),
}

function setMobile(value) {
  act(() => {
    mobile = value
    mediaListeners.forEach((listener) => listener({ matches: value, media: mediaQuery.media }))
  })
}

function mountStudio() {
  const store = createAppStore()
  store.dispatch(updateCurrentMap("europe"))
  const result = render(
    <Provider store={store}>
      <MapEditorProvider>
        <StudioToolbar />
        <EuropeSVG currentMap="europe" />
        <StudioControls currentMap="europe" />
      </MapEditorProvider>
    </Provider>,
  )
  return { store, ...result }
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn(() => mediaQuery),
  })
})

beforeEach(() => {
  mobile = false
  mediaListeners.clear()
  panzoom.mockClear()
})

test("desktop mounts one inspector and exposes the default color as a selected quick swatch", () => {
  mountStudio()

  expect(screen.getAllByLabelText("Map inspector")).toHaveLength(1)
  expect(screen.queryByRole("navigation", { name: "Map controls" })).not.toBeInTheDocument()
  expect(screen.getByRole("button", { name: "Use color #039606" })).toHaveAttribute("aria-pressed", "true")
  expect(document.querySelectorAll("#studio-map-title")).toHaveLength(1)
  expect(document.querySelectorAll("#studio-combine-groups")).toHaveLength(1)
})

test("title, quick colors, custom colors, and derived legend labels update real Redux state", () => {
  const { store } = mountStudio()

  fireEvent.change(screen.getByLabelText("Map title"), { target: { value: "Europe data" } })
  expect(store.getState().mapState.mapTitle).toBe("Europe data")

  fireEvent.click(screen.getByRole("button", { name: "Use color #F43F5E" }))
  expect(store.getState().mapState.currentColor).toBe("#F43F5E")
  expect(screen.getByRole("button", { name: "Use color #F43F5E" })).toHaveAttribute("aria-pressed", "true")

  fireEvent.click(screen.getByRole("button", { name: "Choose a custom color" }))
  fireEvent.change(screen.getByLabelText("Custom color"), { target: { value: "#123456" } })
  expect(store.getState().mapState.currentColor).toBe("#123456")
  expect(screen.getByRole("button", { name: "Choose a custom color" })).toHaveAttribute("data-custom-selected", "true")

  expect(screen.getByText("Color a country to create a legend item.")).toBeInTheDocument()
  act(() => store.dispatch(paintCountries({ countries: ["FR"] })))
  const legendInput = screen.getByLabelText("Legend label for #123456")
  fireEvent.change(legendInput, { target: { value: "Custom region" } })
  expect(store.getState().mapState.legendLabels["#123456"]).toBe("Custom region")
})

test("real groups preserve replacement and Combine Groups behavior", () => {
  const { store } = mountStudio()

  act(() => store.dispatch(paintCountries({ countries: ["US"] })))
  fireEvent.click(screen.getByRole("button", { name: "European Union" }))
  expect(store.getState().mapState.countryColors.US).toBeUndefined()
  expect(store.getState().mapState.countryColors.FR).toBe("#039606")

  fireEvent.click(screen.getByLabelText("Combine groups"))
  act(() => store.dispatch(paintCountries({ countries: ["US"] })))
  fireEvent.click(screen.getByRole("button", { name: "European Union" }))
  expect(store.getState().mapState.countryColors.US).toBe("#039606")

  fireEvent.click(screen.getByRole("button", { name: "Geographic Regions" }))
  fireEvent.click(screen.getByRole("button", { name: "Western Europe" }))
  expect(store.getState().mapState.countryColors.DE).toBe("#039606")
})

test("map actions preserve the selected editor tool", () => {
  const { store } = mountStudio()
  const panTool = screen.getByRole("button", { name: "Pan tool" })

  fireEvent.click(panTool)
  fireEvent.click(screen.getByRole("button", { name: "Select All" }))
  expect(Object.keys(store.getState().mapState.countryColors).length).toBeGreaterThan(30)
  expect(panTool).toHaveAttribute("aria-pressed", "true")

  fireEvent.click(screen.getByRole("button", { name: "Clear All" }))
  expect(store.getState().mapState.countryColors).toEqual({})
  expect(panTool).toHaveAttribute("aria-pressed", "true")
})

test("mobile mounts only the requested shared surface and restores focus when it closes", async () => {
  mobile = true
  mountStudio()

  expect(screen.queryByLabelText("Map inspector")).not.toBeInTheDocument()
  const appearanceTrigger = screen.getByRole("button", { name: "Appearance" })
  fireEvent.click(appearanceTrigger)
  expect(screen.getAllByRole("dialog")).toHaveLength(1)
  expect(screen.getByRole("heading", { name: "Appearance" })).toBeInTheDocument()
  expect(document.querySelectorAll("#studio-map-title")).toHaveLength(0)

  fireEvent.click(screen.getByRole("button", { name: "Close map controls" }))
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  await waitFor(() => expect(appearanceTrigger).toHaveFocus())

  fireEvent.click(screen.getByRole("button", { name: "Map" }))
  expect(document.querySelectorAll("#studio-map-title")).toHaveLength(1)
  expect(screen.getByText("Color a country to create a legend item.")).toBeInTheDocument()
})

test("Combine Groups has one owner and survives responsive surface changes", () => {
  mobile = true
  mountStudio()

  fireEvent.click(screen.getByRole("button", { name: "Groups" }))
  fireEvent.click(screen.getByLabelText("Combine groups"))
  expect(screen.getByLabelText("Combine groups")).toBeChecked()

  setMobile(false)
  expect(screen.queryByRole("navigation", { name: "Map controls" })).not.toBeInTheDocument()
  expect(screen.getByLabelText("Map inspector")).toBeInTheDocument()
  expect(screen.getByLabelText("Combine groups")).toBeChecked()
  expect(document.querySelectorAll("#studio-combine-groups")).toHaveLength(1)
})

import { StrictMode } from "react"
import { Provider } from "react-redux"
import { act, fireEvent, render, screen } from "@testing-library/react"
import panzoom from "panzoom"
import { createAppStore } from "../../../redux/store"
import { updateCurrentMap, updateTitle, updateUsedColorsLegend, updateColor } from "../../../redux/mapSlice"
import EuropeSVG from "./maps/EuropeSVG"
import WorldSVG from "./maps/WorldSVG"
import AfricaSVG from "./maps/AfricaSVG"
import AsiaSVG from "./maps/AsiaSVG"
import NorthAmericaSVG from "./maps/NorthAmericaSVG"
import SouthAmericaSVG from "./maps/SouthAmericaSVG"
import { useEditorActions } from "./useEditorActions"
import { saveSvgAsPng } from "save-svg-as-png"
import MapCanvas, { DEFAULT_COUNTRY_FILL } from "./MapCanvas"
import { MapEditorProvider } from "./MapEditorContext"
import { indexGeometry } from "./countryGeometry"
import AppearanceControl from "../StudioInspector/AppearanceControl"
import { geographicGroupings } from "../../../data/mapGroupings"
import StudioHeader from "../StudioShell/StudioHeader"
import StudioToolbar from "../StudioShell/StudioToolbar"
import ViewportControls from "../StudioShell/ViewportControls"
import { useRouter } from "next/router"

jest.mock("panzoom", () => jest.fn(() => ({
  dispose: jest.fn(),
  moveTo: jest.fn(),
  zoomAbs: jest.fn(),
  zoomTo: jest.fn(),
})))
jest.mock("save-svg-as-png", () => ({ saveSvgAsPng: jest.fn() }))
jest.mock("next/router", () => ({ useRouter: jest.fn() }))

function mount(children, strict = false, route = "europe") {
  const store = createAppStore()
  store.dispatch(updateCurrentMap(route))
  const contents = <Provider store={store}><MapEditorProvider>{children}</MapEditorProvider></Provider>
  return { store, ...render(strict ? <StrictMode>{contents}</StrictMode> : contents) }
}

test("Europe paints consecutive countries, repaints, erases, and renders title and legend", () => {
  const { store, container } = mount(<EuropeSVG currentMap="europe" />)
  const france = container.querySelector("#FR")
  const germany = container.querySelector("#DE")
  fireEvent.click(france)
  fireEvent.click(germany)
  expect(france).toHaveAttribute("fill", "#039606")
  act(() => store.dispatch(updateColor("#ff0000")))
  fireEvent.click(france)
  expect(france).toHaveAttribute("fill", "#FF0000")
  act(() => {
    store.dispatch(updateTitle("My map"))
    store.dispatch(updateUsedColorsLegend({ "#FF0000": "Visited" }))
  })
  expect(screen.getByText("My map")).toBeInTheDocument()
  expect(screen.getByText("Visited")).toBeInTheDocument()
  fireEvent.click(screen.getByText("My map"))
  fireEvent.click(screen.getByText("Visited"))
  expect(Object.keys(store.getState().mapState.countryColors)).toEqual(["FR", "DE"])
  fireEvent.contextMenu(france)
  expect(france).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL)
  expect(screen.queryByText("Visited")).not.toBeInTheDocument()
})

test("Paint is the default tool; Paint, Erase, and Pan preserve state and enforce their modes", () => {
  panzoom.mockClear()
  const { container, store } = mount(<><StudioToolbar /><EuropeSVG currentMap="europe" /></>)
  const france = container.querySelector("#FR")
  const germany = container.querySelector("#DE")
  const paintTool = screen.getByRole("button", { name: "Paint tool" })
  const panTool = screen.getByRole("button", { name: "Pan tool" })
  const eraseTool = screen.getByRole("button", { name: "Erase tool" })

  expect(paintTool).toHaveAttribute("aria-pressed", "true")
  fireEvent.click(france)
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })

  fireEvent.click(panTool)
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
  fireEvent.click(france)
  fireEvent.click(germany)
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })

  const panzoomOptions = panzoom.mock.calls[0][1]
  expect(panzoomOptions.beforeMouseDown({ altKey: false })).toBe(false)
  expect(panzoomOptions.beforeWheel({ altKey: false })).toBe(false)

  fireEvent.contextMenu(france)
  expect(store.getState().mapState.countryColors).toEqual({})

  fireEvent.click(paintTool)
  fireEvent.click(germany)
  fireEvent.click(eraseTool)
  fireEvent.click(germany)
  expect(store.getState().mapState.countryColors).toEqual({})
})

test("multipart identity is stable; decoration and definitions are excluded", () => {
  const geometry = <><path className="AO" d="M0 0h10v10z" fill="#FFFFFF" /><path className="AO" d="M20 0h10v10z" fill="#FFFFFF" />
    <path id="decoration" d="M30 0h10v10z" /><defs><path id="PT" d="M0 0" /></defs></>
  expect(indexGeometry(geometry).countries).toEqual(["AO"])
  const { container, store } = mount(<MapCanvas currentMap="europe">{geometry}</MapCanvas>)
  const parts = container.querySelectorAll(".AO")
  fireEvent.click(parts[1])
  parts.forEach((part) => expect(part).toHaveAttribute("fill", "#039606"))
  fireEvent.mouseOver(parts[0])
  parts.forEach((part) => expect(part).toHaveClass("hovered-country"))
  fireEvent.click(container.querySelector("#decoration"))
  expect(store.getState().mapState.countryColors).toEqual({ AO: "#039606" })
  fireEvent.contextMenu(parts[0])
  parts.forEach((part) => expect(part).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL))
})

test("BQ is one multipart country and every territory path paints and erases the whole country", () => {
  const { container, store } = mount(<NorthAmericaSVG currentMap="north-america" />, false, "north-america")
  const territories = ["BQBO", "BQSE", "BQSA"].map((id) => container.querySelector(`#${id}`))

  expect(territories).not.toContain(null)
  expect(new Set(territories.map((territory) => territory.dataset.country))).toEqual(new Set(["BQ"]))
  expect(store.getState().mapState.countryColors).toEqual({})

  territories.forEach((territory) => {
    fireEvent.click(territory)
    territories.forEach((part) => expect(part).toHaveAttribute("fill", "#039606"))
    expect(store.getState().mapState.countryColors).toEqual({ BQ: "#039606" })

    fireEvent.contextMenu(territory)
    territories.forEach((part) => expect(part).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL))
    expect(store.getState().mapState.countryColors).toEqual({})
  })
})

test("Caribbean grouping uses the shared BQ country identity", () => {
  const caribbean = geographicGroupings("north-america").find(({ name }) => name === "Caribbean")
  expect(caribbean.countries).toContain("BQ")
  expect(caribbean.countries).not.toContain("BQBO")
})

test("long press erases, suppresses synthetic click, and cancellation never paints", () => {
  jest.useFakeTimers()
  const { container, store, unmount } = mount(<EuropeSVG currentMap="europe" />)
  const france = container.querySelector("#FR")
  fireEvent.click(france)
  fireEvent.touchStart(france, { touches: [{ clientX: 10, clientY: 10 }] })
  act(() => jest.advanceTimersByTime(501))
  fireEvent.touchEnd(france, { touches: [] })
  fireEvent.click(france)
  expect(store.getState().mapState.countryColors).toEqual({})
  fireEvent.touchStart(france, { touches: [{ clientX: 10, clientY: 10 }] })
  fireEvent.touchCancel(france)
  act(() => jest.advanceTimersByTime(1000))
  fireEvent.touchEnd(france)
  expect(store.getState().mapState.countryColors).toEqual({})
  fireEvent.touchStart(france, { touches: [{ clientX: 10, clientY: 10 }] })
  unmount()
  expect(jest.getTimerCount()).toBe(0)
  jest.useRealTimers()
})

test("panzoom instances are disposed under StrictMode; title edits do not restart them", () => {
  panzoom.mockClear()
  const { store, unmount } = mount(<EuropeSVG currentMap="europe" />, true)
  const instances = panzoom.mock.results.map(({ value }) => value)
  const initialCalls = panzoom.mock.calls.length
  act(() => store.dispatch(updateTitle("Changed")))
  expect(panzoom).toHaveBeenCalledTimes(initialCalls)
  unmount()
  instances.forEach((instance) => expect(instance.dispose).toHaveBeenCalledTimes(1))
})

test("viewport controls call panzoom and never change country colors", () => {
  panzoom.mockClear()
  const { container, store } = mount(<><ViewportControls /><EuropeSVG currentMap="europe" /></>)
  const instance = panzoom.mock.results[0].value
  const france = container.querySelector("#FR")

  fireEvent.click(france)
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })

  fireEvent.click(screen.getByRole("button", { name: "Zoom in" }))
  expect(instance.zoomTo).toHaveBeenLastCalledWith(0, 0, 1.25)
  fireEvent.click(screen.getByRole("button", { name: "Zoom out" }))
  expect(instance.zoomTo).toHaveBeenLastCalledWith(0, 0, 0.8)
  fireEvent.click(screen.getByRole("button", { name: "Fit map to viewport" }))
  expect(instance.zoomAbs).toHaveBeenCalledWith(0, 0, 1)
  expect(instance.moveTo).toHaveBeenCalledWith(0, 0)

  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
  expect(france).toHaveAttribute("fill", "#039606")
})

test("Undo and Redo toolbar actions preserve tool and viewport state", () => {
  panzoom.mockClear()
  const { container, store } = mount(<>
    <StudioToolbar />
    <ViewportControls />
    <EuropeSVG currentMap="europe" />
  </>)
  const france = container.querySelector("#FR")
  const panTool = screen.getByRole("button", { name: "Pan tool" })
  const undo = screen.getByRole("button", { name: "Undo" })
  const redo = screen.getByRole("button", { name: "Redo" })
  const instance = panzoom.mock.results[0].value

  expect(undo).toBeDisabled()
  expect(redo).toBeDisabled()
  fireEvent.click(france)
  fireEvent.click(panTool)
  fireEvent.click(screen.getByRole("button", { name: "Zoom in" }))
  expect(undo).toBeEnabled()

  fireEvent.keyDown(document.body, { key: "z", ctrlKey: true })
  expect(store.getState().mapState.countryColors).toEqual({})
  expect(panTool).toHaveAttribute("aria-pressed", "true")
  expect(instance.zoomAbs).not.toHaveBeenCalled()
  expect(panzoom).toHaveBeenCalledTimes(1)
  expect(redo).toBeEnabled()

  fireEvent.keyDown(document.body, { key: "z", metaKey: true, shiftKey: true })
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
  expect(france).toHaveAttribute("fill", "#039606")

  fireEvent.click(undo)
  fireEvent.keyDown(document.body, { key: "y", ctrlKey: true })
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
})

test("global history shortcuts leave native text editing shortcuts untouched", () => {
  const { container, store } = mount(<>
    <StudioToolbar />
    <input aria-label="Test text field" />
    <div contentEditable aria-label="Test editable content" />
    <EuropeSVG currentMap="europe" />
  </>)
  fireEvent.click(container.querySelector("#FR"))

  const input = screen.getByLabelText("Test text field")
  const editable = screen.getByLabelText("Test editable content")
  expect(fireEvent.keyDown(input, { key: "z", ctrlKey: true })).toBe(true)
  expect(fireEvent.keyDown(editable, { key: "z", metaKey: true })).toBe(true)
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
})

test("appearance control renders without dispatching a color change", () => {
  const { store } = mount(<AppearanceControl />)
  expect(store.getState().mapState.currentColor).toBe("#039606")
  fireEvent.click(screen.getByRole("button", { name: "Use color #F43F5E" }))
  expect(store.getState().mapState.currentColor).toBe("#F43F5E")
})

function Commands() {
  const actions = useEditorActions()
  return <>
    <button onClick={actions.selectAll}>Select</button>
    <button onClick={actions.clear}>Clear</button>
    <button onClick={actions.exportMap}>Export</button>
  </>
}

test.each([
  ["europe", EuropeSVG], ["world", WorldSVG], ["africa", AfricaSVG],
  ["asia", AsiaSVG], ["north-america", NorthAmericaSVG], ["south-america", SouthAmericaSVG],
])("%s supports consecutive assignments, controls, export ref, and route isolation", (route, Map) => {
  const { container, store } = mount(<><StudioToolbar /><Map currentMap={route} /><Commands /></>, false, route)
  const countries = [...container.querySelectorAll("[data-country]")]
  const ids = [...new Set(countries.map((el) => el.dataset.country))]
  ids.slice(0, 5).forEach((id) => fireEvent.click(container.querySelector(`[data-country="${id}"]`)))
  expect(Object.keys(store.getState().mapState.countryColors)).toHaveLength(5)
  fireEvent.click(screen.getByRole("button", { name: "Undo" }))
  expect(Object.keys(store.getState().mapState.countryColors)).toHaveLength(4)
  fireEvent.click(screen.getByRole("button", { name: "Redo" }))
  expect(Object.keys(store.getState().mapState.countryColors)).toHaveLength(5)
  act(() => store.dispatch(updateColor("#FF0000")))
  fireEvent.click(countries[0])
  expect(countries[0]).toHaveAttribute("fill", "#FF0000")
  fireEvent.contextMenu(countries[0])
  expect(countries[0]).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL)
  fireEvent.click(screen.getByText("Select"))
  expect(Object.keys(store.getState().mapState.countryColors)).toHaveLength(ids.length)
  countries.forEach((part) => expect(part).toHaveAttribute("fill", "#FF0000"))
  fireEvent.click(screen.getByText("Export"))
  expect(saveSvgAsPng).toHaveBeenLastCalledWith(container.querySelector("svg.interactive-map"), "interactive_maps.png", expect.objectContaining({ scale: 3 }))
  fireEvent.click(screen.getByText("Clear"))
  expect(store.getState().mapState.countryColors).toEqual({})
  act(() => store.dispatch(updateCurrentMap("another-map")))
  fireEvent.click(countries[0])
  expect(countries[0]).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL)
})

test("moving or using multiple fingers cancels a pending paint", () => {
  const { container, store } = mount(<EuropeSVG currentMap="europe" />)
  const france = container.querySelector("#FR")
  const finger = { clientX: 10, clientY: 10 }
  fireEvent.touchStart(france, { touches: [finger] })
  fireEvent.touchMove(france, { touches: [{ clientX: 30, clientY: 10 }] })
  fireEvent.touchEnd(france)
  expect(store.getState().mapState.countryColors).toEqual({})
  fireEvent.touchStart(france, { touches: [finger] })
  fireEvent.touchStart(france, { touches: [finger, finger] })
  fireEvent.touchEnd(france)
  fireEvent.click(france)
  expect(store.getState().mapState.countryColors).toEqual({})
})

test("Studio map selector uses every typed route and Export uses the active SVG", () => {
  const push = jest.fn()
  useRouter.mockReturnValue({ push })
  const { container } = mount(<>
    <StudioHeader currentMap="europe" />
    <EuropeSVG currentMap="europe" />
  </>)
  const selector = screen.getByRole("combobox", { name: "Current map" })
  const routes = ["world", "europe", "north-america", "south-america", "africa", "asia"]

  expect([...selector.options].map((option) => option.value)).toEqual(routes)
  routes.filter((route) => route !== "europe").forEach((route) => {
    fireEvent.change(selector, { target: { value: route } })
    expect(push).toHaveBeenLastCalledWith(`/${route}`)
  })

  fireEvent.click(screen.getByRole("button", { name: "Export" }))
  expect(saveSvgAsPng).toHaveBeenLastCalledWith(
    container.querySelector("svg.interactive-map"),
    "interactive_maps.png",
    expect.objectContaining({ scale: 3, backgroundColor: "#090E18" }),
  )
})

test("export reflects the document restored by Undo", () => {
  const { container, store } = mount(<>
    <StudioToolbar />
    <EuropeSVG currentMap="europe" />
    <Commands />
  </>)
  const france = container.querySelector("#FR")
  const germany = container.querySelector("#DE")
  fireEvent.click(france)
  act(() => store.dispatch(updateColor("#FF0000")))
  fireEvent.click(germany)
  fireEvent.click(screen.getByRole("button", { name: "Undo" }))

  expect(france).toHaveAttribute("fill", "#039606")
  expect(germany).toHaveAttribute("fill", DEFAULT_COUNTRY_FILL)
  fireEvent.click(screen.getByText("Export"))
  expect(saveSvgAsPng).toHaveBeenLastCalledWith(
    container.querySelector("svg.interactive-map"),
    "interactive_maps.png",
    expect.objectContaining({ backgroundColor: "#090E18", scale: 3 }),
  )
})

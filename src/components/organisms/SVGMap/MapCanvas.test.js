import { StrictMode } from "react"
import { Provider } from "react-redux"
import { act, fireEvent, render, screen } from "@testing-library/react"
import panzoom from "panzoom"
import { createAppStore } from "../../../redux/store"
import { updateCurrentMap, updateTitle, updateUsedColorsLegend, updateColor } from "../../../redux/mapSlice"
import EuropeSVG from "./maps/EuropeSVG"
import MapCanvas from "./MapCanvas"
import { MapEditorProvider } from "./MapEditorContext"
import { indexGeometry } from "./countryGeometry"
import ColorPicker from "../../molecules/ColorPicker/colorPicker"

jest.mock("panzoom", () => jest.fn(() => ({ dispose: jest.fn() })))
jest.mock("save-svg-as-png", () => ({ saveSvgAsPng: jest.fn() }))

function mount(children, strict = false) {
  const store = createAppStore()
  store.dispatch(updateCurrentMap("europe"))
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
  expect(france).toHaveAttribute("fill", "#FFFFFF")
  expect(screen.queryByText("Visited")).not.toBeInTheDocument()
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
  parts.forEach((part) => expect(part).toHaveAttribute("fill", "#FFFFFF"))
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

test("color picker renders without dispatching a color change", () => {
  const { store } = mount(<ColorPicker />)
  expect(store.getState().mapState.currentColor).toBe("#039606")
  fireEvent.click(screen.getByTitle("#F44336"))
  expect(store.getState().mapState.currentColor).toBe("#F44336")
})

import React from "react"
import fs from "fs"
import path from "path"
import { Provider } from "react-redux"
import { act, fireEvent, render } from "@testing-library/react"
import { createAppStore } from "../../../redux/store"
import { updateCurrentMap, updateTitle, updateUsedColorsLegend } from "../../../redux/mapSlice"
import MapCanvas from "./MapCanvas"
import { MapEditorProvider } from "./MapEditorContext"
import * as geometryModule from "./countryGeometry"

jest.mock("panzoom", () => jest.fn(() => ({ dispose: jest.fn() })))
jest.mock("save-svg-as-png", () => ({ saveSvgAsPng: jest.fn() }))
jest.mock("./countryGeometry", () => {
  const actual = jest.requireActual("./countryGeometry")
  return { ...actual, indexGeometry: jest.fn(actual.indexGeometry) }
})

// Use the real unchanged World path data without converting the World component.
function worldFixture() {
  const source = fs.readFileSync(path.join(process.cwd(), "src/components/organisms/SVGMap/maps/WorldSVG.js"), "utf8")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
  return [...source.matchAll(/<path\b[\s\S]*?\/>/g)].map(([markup], index) => {
    const props = Object.fromEntries([...markup.matchAll(/(\w+)="([^"]*)"/g)].map(([, name, value]) => [name, value]))
    return React.createElement("path", { ...props, key: index })
  })
}

test("World-sized geometry indexes once, preserves multipart identity and skips unrelated state updates", () => {
  const children = worldFixture()
  expect(children.length).toBeGreaterThan(400)
  const store = createAppStore()
  store.dispatch(updateCurrentMap("world"))
  const indexing = geometryModule.indexGeometry
  const cloning = jest.spyOn(React, "cloneElement")
  const { container } = render(<Provider store={store}><MapEditorProvider>
    <MapCanvas currentMap="world">{children}</MapCanvas>
  </MapEditorProvider></Provider>)
  const parts = container.querySelectorAll('[data-country="AO"]')
  expect(parts.length).toBe(2)
  cloning.mockClear()
  fireEvent.click(parts[1])
  parts.forEach((part) => expect(part.getAttribute("fill")).toBe("#039606"))
  expect(cloning.mock.calls.filter(([element]) => element.type === "path")).toHaveLength(2)
  cloning.mockClear()
  act(() => {
    store.dispatch(updateTitle("World"))
    store.dispatch(updateUsedColorsLegend({ "#039606": "Selected" }))
  })
  expect(cloning.mock.calls.filter(([element]) => element.type === "path")).toHaveLength(0)
  expect(indexing).toHaveBeenCalledTimes(1)
  indexing.mockClear()
  cloning.mockRestore()
})

import reducer, {
  initialState, paintCountries, eraseCountries, applyGroup, selectCountries,
  clearMap, updateTitle, updateColor, updateCurrentMap, updateUsedColorsLegend, selectUsedColors,
  updateAnnotationPosition,
} from "./mapSlice"
import { MAP_ANNOTATION_CONFIGS } from "../data/mapAnnotations"

const paint = (state, countries, color) => reducer(state, paintCountries({ countries, color }))

test("paint, replace and erase keep one assignment per country", () => {
  let state = paint(undefined, ["PT", "FI", "PT", "map_title"], "#ff0000")
  expect(state.countryColors).toEqual({ PT: "#FF0000", FI: "#FF0000" })
  state = paint(state, ["PT"], "#0000ff")
  expect(state.countryColors).toEqual({ PT: "#0000FF", FI: "#FF0000" })
  state = reducer(state, eraseCountries(["PT", "XX"]))
  expect(state.colorOrder).toEqual(["#FF0000"])
  expect(state.countryColors).toEqual({ FI: "#FF0000" })
})

test("repeating an assignment preserves labels and order", () => {
  let state = paint(undefined, ["PT"], "#ff0000")
  state = reducer(state, updateUsedColorsLegend({ "#FF0000": "Visited" }))
  expect(paint(state, ["PT"], "#ff0000")).toBe(state)
  state = paint(state, ["PT", "FI"], "#ff0000")
  expect(selectUsedColors({ mapState: state })).toEqual({ "#FF0000": { legend: "Visited", appliesTo: ["PT", "FI"] } })
  state = reducer(state, eraseCountries(["PT", "FI"]))
  expect(state.legendLabels).toEqual({})
})

test("groups filter unavailable countries and support combine and replace", () => {
  let state = paint(undefined, ["PT"], "#ff0000")
  state = reducer(state, updateTitle("Title"))
  state = reducer(state, applyGroup({ countries: ["FI", "XX", "FI"], availableCountries: ["PT", "FI"], combine: true }))
  expect(state.countryColors).toEqual({ PT: "#FF0000", FI: initialState.currentColor })
  expect(state.mapTitle).toBe("Title")
  state = reducer(state, applyGroup({ countries: ["FI"], availableCountries: ["PT", "FI"], combine: false }))
  expect(state.countryColors).toEqual({ FI: initialState.currentColor })
  expect(state.mapTitle).toBe("")
})

test("select all replaces assignments; clear resets title and legends but not chosen color", () => {
  let state = paint(undefined, ["PT"], "#ff0000")
  state = reducer(state, updateColor("#0000ff"))
  state = reducer(state, selectCountries(["PT", "FI", "FI"]))
  expect(state.countryColors).toEqual({ PT: "#0000FF", FI: "#0000FF" })
  state = reducer(state, updateTitle("Title"))
  state = reducer(state, clearMap())
  expect(state).toEqual({ ...initialState, currentColor: "#0000FF" })
  expect(reducer(state, updateCurrentMap("europe"))).toEqual({
    ...initialState,
    currentMap: "europe",
    annotationPositions: {
      title: { x: 48, y: 76 },
      legend: { x: 48, y: 114 },
    },
  })
})

test.each(Object.entries(MAP_ANNOTATION_CONFIGS))(
  "%s initializes independent route-specific annotation positions",
  (route, config) => {
    const state = reducer(undefined, updateCurrentMap(route))
    expect(state.annotationPositions).toEqual(config.defaultPositions)
    expect(state.annotationPositions.title).not.toBe(state.annotationPositions.legend)
  },
)

test("annotation positions are route guarded and survive Clear All and document restoration", () => {
  let state = reducer(undefined, updateCurrentMap("europe"))
  state = reducer(state, updateAnnotationPosition({
    currentMap: "europe",
    kind: "title",
    position: { x: 240, y: 180 },
  }))
  state = reducer(state, updateAnnotationPosition({
    currentMap: "world",
    kind: "legend",
    position: { x: 700, y: 500 },
  }))
  expect(state.annotationPositions).toEqual({
    title: { x: 240, y: 180 },
    legend: { x: 48, y: 114 },
  })

  const positions = state.annotationPositions
  state = reducer(state, clearMap())
  expect(state.annotationPositions).toEqual(positions)
  expect(reducer(state, updateCurrentMap("world")).annotationPositions)
    .toEqual(MAP_ANNOTATION_CONFIGS.world.defaultPositions)
})

import { createAppStore } from "./store"
import {
  applyGroup,
  clearMap,
  eraseCountries,
  paintCountries,
  selectCountries,
  updateColor,
  updateCurrentMap,
  updateTitle,
  updateUsedColorsLegend,
} from "./mapSlice"
import {
  beginDocumentTextEdit,
  commitDocumentTextEdit,
  redoDocument,
  undoDocument,
} from "./editorHistory"
import { HISTORY_LIMIT } from "./historySlice"

function createEuropeStore() {
  const store = createAppStore()
  store.dispatch(updateCurrentMap("europe"))
  return store
}

test("paint, erase, groups, Select All, Undo, and Redo use document snapshots", () => {
  const store = createEuropeStore()

  store.dispatch(paintCountries({ countries: ["FR"] }))
  store.dispatch(paintCountries({ countries: ["DE"] }))
  expect(store.getState().editorHistory.past).toHaveLength(2)
  store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606" })
  store.dispatch(redoDocument())
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606", DE: "#039606" })

  store.dispatch(eraseCountries(["FR"]))
  store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors.FR).toBe("#039606")

  store.dispatch(updateColor("#FF0000"))
  store.dispatch(applyGroup({
    countries: ["PT", "ES"],
    availableCountries: ["PT", "ES", "FR", "DE"],
    combine: false,
  }))
  expect(store.getState().mapState.countryColors).toEqual({ PT: "#FF0000", ES: "#FF0000" })
  store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606", DE: "#039606" })

  store.dispatch(applyGroup({
    countries: ["PT", "ES"],
    availableCountries: ["PT", "ES", "FR", "DE"],
    combine: true,
  }))
  store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606", DE: "#039606" })

  store.dispatch(selectCountries(["PT", "ES", "FR"] ))
  store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors).toEqual({ FR: "#039606", DE: "#039606" })
})

test("Clear All Undo restores title, colors, legend labels, and legend order", () => {
  const store = createEuropeStore()
  store.dispatch(updateColor("#FF0000"))
  store.dispatch(paintCountries({ countries: ["FR"] }))
  store.dispatch(updateTitle("European GDP"))
  store.dispatch(updateUsedColorsLegend({ "#FF0000": "High" }))

  store.dispatch(clearMap())
  expect(store.getState().mapState.mapTitle).toBe("")
  store.dispatch(undoDocument())

  expect(store.getState().mapState).toEqual(expect.objectContaining({
    mapTitle: "European GDP",
    countryColors: { FR: "#FF0000" },
    legendLabels: { "#FF0000": "High" },
    colorOrder: ["#FF0000"],
    currentColor: "#FF0000",
    currentMap: "europe",
  }))
})

test("a new edit after Undo clears Redo and no-op mutations create no entries", () => {
  const store = createEuropeStore()
  store.dispatch(paintCountries({ countries: ["FR"] }))
  store.dispatch(paintCountries({ countries: ["FR"] }))
  expect(store.getState().editorHistory.past).toHaveLength(1)

  store.dispatch(undoDocument())
  expect(store.getState().editorHistory.future).toHaveLength(1)
  store.dispatch(paintCountries({ countries: ["DE"] }))
  expect(store.getState().editorHistory.future).toHaveLength(0)
})

test("history is capped at 50 document states", () => {
  const store = createEuropeStore()
  for (let index = 0; index < HISTORY_LIMIT + 5; index += 1) {
    const color = `#${(index + 1).toString(16).padStart(6, "0")}`
    store.dispatch(paintCountries({ countries: ["FR"], color }))
  }

  expect(store.getState().editorHistory.past).toHaveLength(HISTORY_LIMIT)
  for (let index = 0; index < HISTORY_LIMIT; index += 1) store.dispatch(undoDocument())
  expect(store.getState().mapState.countryColors.FR).toBe("#000005")
})

test("route changes clear history and reject a delayed old-route text commit", () => {
  const store = createEuropeStore()
  const editRoute = store.dispatch(beginDocumentTextEdit("map-title"))
  store.dispatch(updateTitle("Old Europe title"))
  store.dispatch(updateCurrentMap("world"))

  expect(store.getState().editorHistory).toEqual({
    past: [],
    future: [],
    activeTextEdit: null,
  })
  store.dispatch(commitDocumentTextEdit("map-title", editRoute))
  expect(store.getState().editorHistory.past).toEqual([])
  expect(store.getState().mapState.currentMap).toBe("world")
})

test("text transactions own title and legend history and clear Redo on commit", () => {
  const store = createEuropeStore()
  const titleRoute = store.dispatch(beginDocumentTextEdit("map-title"))
  store.dispatch(updateTitle("E"))
  store.dispatch(updateTitle("Europe"))
  store.dispatch(updateTitle("European data"))
  expect(store.getState().editorHistory.past).toHaveLength(0)
  store.dispatch(commitDocumentTextEdit("map-title", titleRoute))
  expect(store.getState().editorHistory.past).toHaveLength(1)

  store.dispatch(undoDocument())
  expect(store.getState().mapState.mapTitle).toBe("")
  expect(store.getState().editorHistory.future).toHaveLength(1)

  const nextTitleRoute = store.dispatch(beginDocumentTextEdit("map-title"))
  store.dispatch(updateTitle("New branch"))
  store.dispatch(commitDocumentTextEdit("map-title", nextTitleRoute))
  expect(store.getState().editorHistory.future).toHaveLength(0)

  store.dispatch(paintCountries({ countries: ["FR"] }))
  const legendRoute = store.dispatch(beginDocumentTextEdit("legend:#039606"))
  store.dispatch(updateUsedColorsLegend({ "#039606": "A" }))
  store.dispatch(updateUsedColorsLegend({ "#039606": "Visited" }))
  store.dispatch(commitDocumentTextEdit("legend:#039606", legendRoute))
  expect(store.getState().editorHistory.past).toHaveLength(3)
  store.dispatch(undoDocument())
  expect(store.getState().mapState.legendLabels["#039606"]).toBe("")
})

test("an atomic mutation finalizes an active text edit as a separate step", () => {
  const store = createEuropeStore()
  store.dispatch(beginDocumentTextEdit("map-title"))
  store.dispatch(updateTitle("Europe"))
  store.dispatch(paintCountries({ countries: ["FR"] }))

  expect(store.getState().editorHistory.past).toHaveLength(2)
  expect(store.getState().editorHistory.activeTextEdit).toBeNull()
  store.dispatch(undoDocument())
  expect(store.getState().mapState).toEqual(expect.objectContaining({
    mapTitle: "Europe",
    countryColors: {},
  }))
  store.dispatch(undoDocument())
  expect(store.getState().mapState.mapTitle).toBe("")
})

test("Undo restores documents without rewinding currentColor", () => {
  const store = createEuropeStore()
  store.dispatch(paintCountries({ countries: ["FR"], color: "#FF0000" }))
  store.dispatch(updateColor("#0000FF"))
  store.dispatch(undoDocument())

  expect(store.getState().mapState.countryColors).toEqual({})
  expect(store.getState().mapState.currentColor).toBe("#0000FF")
})

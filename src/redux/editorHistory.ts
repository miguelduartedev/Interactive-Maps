import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "./store"
import {
  applyGroup,
  clearMap,
  eraseCountries,
  paintCountries,
  restoreDocumentState,
  selectCountries,
} from "./mapSlice"
import {
  beginTextEdit,
  commitTextEdit,
  discardTextEdit,
  recordDocumentTransition,
  redoCompleted,
  snapshotDocument,
  undoCompleted,
} from "./historySlice"
import { isMapRoute, type MapRoute } from "../types/editor"

export const historyListenerMiddleware = createListenerMiddleware<RootState>()

historyListenerMiddleware.startListening({
  matcher: isAnyOf(
    paintCountries,
    eraseCountries,
    applyGroup,
    selectCountries,
    clearMap,
  ),
  effect: (_action, listenerApi) => {
    const beforeState = listenerApi.getOriginalState()
    const afterState = listenerApi.getState()
    const currentMap = afterState.mapState.currentMap
    if (!isMapRoute(currentMap)) return

    listenerApi.dispatch(recordDocumentTransition({
      before: snapshotDocument(beforeState.mapState),
      after: snapshotDocument(afterState.mapState),
      currentMap,
    }))
  },
})

function finishActiveTextEdit(dispatch: AppDispatch, getState: () => RootState) {
  const state = getState()
  const active = state.editorHistory.activeTextEdit
  if (!active) return

  if (state.mapState.currentMap !== active.currentMap) {
    dispatch(discardTextEdit())
    return
  }

  dispatch(commitTextEdit({
    fieldId: active.fieldId,
    currentMap: active.currentMap,
    document: snapshotDocument(state.mapState),
  }))
}

export const beginDocumentTextEdit = (fieldId: string) => (
  dispatch: AppDispatch,
  getState: () => RootState,
): MapRoute | null => {
  finishActiveTextEdit(dispatch, getState)
  const state = getState()
  const currentMap = state.mapState.currentMap
  if (!isMapRoute(currentMap)) return null

  dispatch(beginTextEdit({
    fieldId,
    currentMap,
    baseline: snapshotDocument(state.mapState),
  }))
  return currentMap
}

export const commitDocumentTextEdit = (fieldId: string, currentMap: MapRoute) => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const state = getState()
  if (state.mapState.currentMap !== currentMap) {
    dispatch(discardTextEdit())
    return
  }

  dispatch(commitTextEdit({
    fieldId,
    currentMap,
    document: snapshotDocument(state.mapState),
  }))
}

export const undoDocument = () => (dispatch: AppDispatch, getState: () => RootState) => {
  finishActiveTextEdit(dispatch, getState)
  const state = getState()
  const target = state.editorHistory.past[state.editorHistory.past.length - 1]
  if (!target) return

  const current = snapshotDocument(state.mapState)
  dispatch(restoreDocumentState(target))
  dispatch(undoCompleted(current))
}

export const redoDocument = () => (dispatch: AppDispatch, getState: () => RootState) => {
  finishActiveTextEdit(dispatch, getState)
  const state = getState()
  const target = state.editorHistory.future[state.editorHistory.future.length - 1]
  if (!target) return

  const current = snapshotDocument(state.mapState)
  dispatch(restoreDocumentState(target))
  dispatch(redoCompleted(current))
}

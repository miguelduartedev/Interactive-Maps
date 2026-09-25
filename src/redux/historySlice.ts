import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type {
  ActiveTextEdit,
  EditorHistoryState,
  MapDocumentState,
  MapRoute,
  MapState,
} from "../types/editor"
import { updateCurrentMap } from "./mapSlice"

export const HISTORY_LIMIT = 50

export const initialHistoryState: EditorHistoryState = {
  past: [],
  future: [],
  activeTextEdit: null,
}

function cloneDocument(state: MapDocumentState): MapDocumentState {
  return {
    mapTitle: state.mapTitle,
    countryColors: { ...state.countryColors },
    legendLabels: { ...state.legendLabels },
    colorOrder: [...state.colorOrder],
  }
}

export function snapshotDocument(state: MapState): MapDocumentState {
  return cloneDocument(state)
}

function recordsEqual(left: Record<string, string>, right: Record<string, string>) {
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  return leftKeys.length === rightKeys.length && leftKeys.every((key) => left[key] === right[key])
}

export function documentsEqual(left: MapDocumentState, right: MapDocumentState) {
  return left.mapTitle === right.mapTitle &&
    left.colorOrder.length === right.colorOrder.length &&
    left.colorOrder.every((color, index) => color === right.colorOrder[index]) &&
    recordsEqual(left.countryColors, right.countryColors) &&
    recordsEqual(left.legendLabels, right.legendLabels)
}

function appendPast(state: EditorHistoryState, snapshot: MapDocumentState) {
  state.past.push(cloneDocument(snapshot))
  if (state.past.length > HISTORY_LIMIT) state.past.shift()
}

interface DocumentTransitionPayload {
  before: MapDocumentState
  after: MapDocumentState
  currentMap: MapRoute
}

type BeginTextEditPayload = ActiveTextEdit

interface CommitTextEditPayload {
  fieldId: string
  currentMap: MapRoute
  document: MapDocumentState
}

const slice = createSlice({
  name: "editorHistory",
  initialState: initialHistoryState,
  reducers: {
    recordDocumentTransition: (state, { payload }: PayloadAction<DocumentTransitionPayload>) => {
      const active = state.activeTextEdit
      if (active) {
        if (
          active.currentMap === payload.currentMap &&
          !documentsEqual(active.baseline, payload.before)
        ) {
          appendPast(state, active.baseline)
          state.future = []
        }
        state.activeTextEdit = null
      }

      if (!documentsEqual(payload.before, payload.after)) {
        appendPast(state, payload.before)
        state.future = []
      }
    },
    beginTextEdit: (state, { payload }: PayloadAction<BeginTextEditPayload>) => {
      state.activeTextEdit = {
        ...payload,
        baseline: cloneDocument(payload.baseline),
      }
    },
    commitTextEdit: (state, { payload }: PayloadAction<CommitTextEditPayload>) => {
      const active = state.activeTextEdit
      if (
        !active ||
        active.fieldId !== payload.fieldId ||
        active.currentMap !== payload.currentMap
      ) return

      if (!documentsEqual(active.baseline, payload.document)) {
        appendPast(state, active.baseline)
        state.future = []
      }
      state.activeTextEdit = null
    },
    discardTextEdit: (state) => {
      state.activeTextEdit = null
    },
    undoCompleted: (state, { payload }: PayloadAction<MapDocumentState>) => {
      if (state.past.length === 0) return
      state.past.pop()
      state.future.push(cloneDocument(payload))
      state.activeTextEdit = null
    },
    redoCompleted: (state, { payload }: PayloadAction<MapDocumentState>) => {
      if (state.future.length === 0) return
      state.future.pop()
      appendPast(state, payload)
      state.activeTextEdit = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCurrentMap, () => ({
      past: [],
      future: [],
      activeTextEdit: null,
    }))
  },
})

export const {
  beginTextEdit,
  commitTextEdit,
  discardTextEdit,
  recordDocumentTransition,
  redoCompleted,
  undoCompleted,
} = slice.actions

export default slice.reducer

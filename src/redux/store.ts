import { combineReducers, configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "redux"
import deviceReducer from "./deviceSlice"
import historyReducer from "./historySlice"
import { historyListenerMiddleware } from "./editorHistory"
import mapReducer from "./mapSlice"

const rootReducer = combineReducers({
  mapState: mapReducer,
  deviceState: deviceReducer,
  editorHistory: historyReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const createAppStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(historyListenerMiddleware.middleware),
  preloadedState,
  reducer: rootReducer,
})

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore["dispatch"]

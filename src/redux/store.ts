import { combineReducers, configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "redux"
import deviceReducer from "./deviceSlice"
import mapReducer from "./mapSlice"
import modalReducer from "./modalSlice"

const rootReducer = combineReducers({
  mapState: mapReducer,
  modalState: modalReducer,
  deviceState: deviceReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const createAppStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  preloadedState,
  reducer: rootReducer,
})

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore["dispatch"]

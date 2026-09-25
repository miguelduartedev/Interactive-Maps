import { combineReducers, configureStore } from "@reduxjs/toolkit"
import type { PreloadedState } from "redux"
import deviceReducer from "./deviceSlice"
import mapReducer from "./mapSlice"

const rootReducer = combineReducers({
  mapState: mapReducer,
  deviceState: deviceReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const createAppStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  preloadedState,
  reducer: rootReducer,
})

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore["dispatch"]

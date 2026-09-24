import { configureStore } from "@reduxjs/toolkit"
import mapReducer from "./mapSlice"
import modalReducer from "./modalSlice"
import deviceReducer from "./deviceSlice"

export const createAppStore = (preloadedState) => configureStore({
  preloadedState,
  reducer: {
    mapState: mapReducer,
    modalState: modalReducer,
    deviceState: deviceReducer,
  },
})

// Removed after legacy map adapters no longer import the singleton.
export const store = createAppStore()

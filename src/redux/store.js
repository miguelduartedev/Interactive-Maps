import { configureStore } from "@reduxjs/toolkit"
import mapReducer from "./mapSlice"
import modalReducer from "./modalSlice"
import deviceReducer from "./deviceSlice"

export const store = configureStore({
  reducer: {
    mapState: mapReducer,
    modalState: modalReducer,
    deviceState: deviceReducer,
  },
})

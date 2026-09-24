import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

export interface DeviceState {
  isMobile: boolean
}

export const initialState: DeviceState = {
  isMobile: false,
}

const deviceState = createSlice({
  name: "deviceState",
  initialState,
  reducers: {
    updateDevice: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload
    },
  },
})

export const { updateDevice } = deviceState.actions
export const deviceStore = (state: RootState) => state.deviceState

export default deviceState.reducer

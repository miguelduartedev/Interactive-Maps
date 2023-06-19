import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  isMobile: false,
}

export const deviceState = createSlice({
  name: "deviceState",
  initialState,
  reducers: {
    updateDevice: (state, action) => {
      state.isMobile = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateDevice } = deviceState.actions
export const deviceStore = (state) => state.deviceState

export default deviceState.reducer

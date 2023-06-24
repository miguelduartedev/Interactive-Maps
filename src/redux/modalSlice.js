import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  active: false,
  type: undefined,
}

export const modalState = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    updateModal: (state, action) => {
      return { type: action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateModal } = modalState.actions
export const modalStore = (state) => state.modalState

export default modalState.reducer

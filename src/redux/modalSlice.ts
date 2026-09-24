import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"

export type ModalType = "color-picker" | "map-legend" | "actions" | "tutorial" | ""

export interface ModalState {
  active?: boolean
  type?: ModalType
}

export const initialState: ModalState = {
  active: false,
  type: undefined,
}

const modalState = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    updateModal: (_state, action: PayloadAction<ModalType>): ModalState => ({
      type: action.payload,
    }),
  },
})

export const { updateModal } = modalState.actions
export const modalStore = (state: RootState) => state.modalState

export default modalState.reducer

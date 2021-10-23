import { createSlice } from "@reduxjs/toolkit";

/* export interface MapState {
  value: number
} */

const initialState = {
  currentColor: "#039606",
};

export const mapState = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    updateColor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateColor, decrement, incrementByAmount } = mapState.actions;
export const mapStore = (state) => state.mapState;

export default mapState.reducer;

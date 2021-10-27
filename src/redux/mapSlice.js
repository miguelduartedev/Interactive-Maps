import { createSlice } from "@reduxjs/toolkit";

/* export interface MapState {
  value: number
} */

export const initialState = {
  currentColor: { hex: "#388E3C" },
  currentCountry: {
    name: {
      common: "Select a country",
      official: "",
    },
    borders: "",
    capital: "",
    currencies: {},
    flags: {},
    languages: "",
    timezones: "",
  },
  usedColors: [],
  colorLegend: {},
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
    updateCurrentCountry: (state, action) => {
      state.currentCountry = action.payload;
    },
    updateUsedColors: (state, action) => {
      state.usedColors = action.payload;
    },
    updateColorLegend: (state, action) => {
      state.colorLegend = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateColor,
  updateCurrentCountry,
  updateUsedColors,
  updateColorLegend,
} = mapState.actions;
export const mapStore = (state) => state.mapState;

export default mapState.reducer;

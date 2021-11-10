import { createSlice } from "@reduxjs/toolkit";
import { exists } from "../components/_common";

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
  counter: {},
  usedColors: [],
  colorLegend: {},
  usedColorsV2: {},
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
    updateUsedColorsV2: (state, action) => {
      const color = Object.keys(action.payload)[0];
      if (exists(state.usedColorsV2[color])) {
        state.usedColorsV2 = {
          ...state.usedColorsV2,
          [color]: {
            legend: action.payload[color].legend,
            appliesTo: [
              ...state.usedColorsV2[color].appliesTo,
              action.payload[color].appliesTo,
            ],
          },
        };
      } else {
        state.usedColorsV2 = {
          ...state.usedColorsV2,
          [color]: {
            legend: action.payload[color].legend,
            appliesTo: [action.payload[color].appliesTo],
          },
        };
      }
    },
    updateUsedColorsLegendV2: (state, action) => {
      const color = Object.keys(action.payload)[0];
      state.usedColorsV2 = {
        ...state.usedColorsV2,
        [color]: {
          legend: action.payload[color],
          appliesTo: [...state.usedColorsV2[color].appliesTo],
        },
      };
    },
    increment: (state, action) => {
      if (action.payload !== undefined) {
        const key = Object.keys(action.payload)[0];
        const value = action.payload[key];
        const omg = {
          ...state.counter,
          [key]: value,
        };
        state.counter = omg;
      }
    },
    resetUsedColors: (state) => {
      state.usedColors = [];
    },
    resetColorLegend: (state) => {
      state.colorLegend = {};
    },
    resetCounter: (state) => {
      state.counter = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateColor,
  updateCurrentCountry,
  updateUsedColors,
  updateColorLegend,
  increment,
  resetUsedColors,
  resetColorLegend,
  resetCounter,
  updateUsedColorsV2,
  updateUsedColorsLegendV2,
} = mapState.actions;
export const mapStore = (state) => state.mapState;

export default mapState.reducer;

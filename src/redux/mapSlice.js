import { createSlice } from "@reduxjs/toolkit"
import { exists } from "../components/_common"

export const initialState = {
  currentMap: "",
  mapTitle: "",
  currentColor: "#388E3C",
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
    population: "",
    timezones: "",
  },
  usedColors: {},
}

export const mapState = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    updateCurrentMap: (state, action) => {
      return { ...state, ...initialState, currentMap: action.payload }
    },
    updateTitle: (state, action) => {
      state.mapTitle = action.payload
    },
    updateColor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.currentColor = action.payload
    },
    updateCurrentCountry: (state, action) => {
      state.currentCountry = action.payload
    },
    updateUsedColors: (state, action) => {
      const color = Object.keys(action.payload)[0]
      if (exists(state.usedColors[color])) {
        state.usedColors = {
          ...state.usedColors,
          [color]: {
            legend: action.payload[color].legend,
            appliesTo: [
              ...state.usedColors[color].appliesTo,
              action.payload[color].appliesTo,
            ],
          },
        }
      } else {
        state.usedColors = {
          ...state.usedColors,
          [color]: {
            legend: action.payload[color].legend,
            appliesTo: Array.isArray(action.payload[color].appliesTo)
              ? action.payload[color].appliesTo
              : [action.payload[color].appliesTo],
          },
        }
      }
    },
    updateUsedColorsLegend: (state, action) => {
      const color = Object.keys(action.payload)[0]
      state.usedColors = {
        ...state.usedColors,
        [color]: {
          legend: action.payload[color],
          appliesTo: [...state.usedColors[color].appliesTo],
        },
      }
    },
    removeUsedColor: (state, action) => {
      const colorToRemove = action.payload
      delete state.usedColors[colorToRemove]
    },
    // If the Color is no longer applied to any country,
    // removes it from the UsedColors state
    removeCountryFromUsedColors: (state, action) => {
      const countryToRemove = action.payload.country
      const color = action.payload.color
      const colorNotInUse =
        [
          ...state.usedColors[color].appliesTo.filter(
            (country) => country !== countryToRemove,
          ),
        ].length === 0

      if (colorNotInUse) {
        delete state.usedColors[color]
      } else {
        state.usedColors = {
          ...state.usedColors,
          [color]: {
            legend: state.usedColors[color].legend,
            appliesTo: [
              ...state.usedColors[color].appliesTo.filter(
                (country) => country !== countryToRemove,
              ),
            ],
          },
        }
      }
    },
    resetUsedColors: (state) => {
      state.usedColors = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  updateCurrentMap,
  updateColor,
  updateTitle,
  updateCurrentCountry,
  resetUsedColors,
  updateUsedColors,
  updateUsedColorsLegend,
  removeCountryFromUsedColors,
  removeUsedColor,
} = mapState.actions
export const mapStore = (state) => state.mapState

export default mapState.reducer

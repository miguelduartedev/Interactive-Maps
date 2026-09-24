import { createSelector, createSlice } from "@reduxjs/toolkit"

export const initialState = {
  currentMap: "",
  mapTitle: "",
  currentColor: "#039606",
  countryColors: {},
  legendLabels: {},
  colorOrder: [],
}

const normalizeColor = (color) => color.toUpperCase()
const validCountry = (country) => typeof country === "string" && /^[A-Z]{2}$/.test(country)

function pruneLegends(state) {
  const active = new Set(Object.values(state.countryColors))
  if (state.colorOrder.some((color) => !active.has(color))) {
    state.colorOrder = state.colorOrder.filter((color) => active.has(color))
  }
  Object.keys(state.legendLabels).forEach((color) => {
    if (!active.has(color)) delete state.legendLabels[color]
  })
}

function assign(state, countries, color = state.currentColor) {
  const normalized = normalizeColor(color)
  countries.filter(validCountry).forEach((country) => {
    state.countryColors[country] = normalized
  })
  if (Object.values(state.countryColors).includes(normalized) && !state.colorOrder.includes(normalized)) {
    state.colorOrder.push(normalized)
    state.legendLabels[normalized] = ""
  }
  pruneLegends(state)
}

function resetColors(state) {
  state.countryColors = {}
  state.legendLabels = {}
  state.colorOrder = []
}

const slice = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    updateCurrentMap: (state, { payload }) => ({ ...initialState, currentMap: payload }),
    updateTitle: (state, { payload }) => { state.mapTitle = payload },
    updateColor: (state, { payload }) => { state.currentColor = normalizeColor(payload) },
    paintCountries: (state, { payload }) => { assign(state, payload.countries, payload.color) },
    eraseCountries: (state, { payload }) => {
      payload.forEach((country) => { delete state.countryColors[country] })
      pruneLegends(state)
    },
    applyGroup: (state, { payload }) => {
      if (!payload.combine) {
        resetColors(state)
        state.mapTitle = ""
      }
      const available = new Set(payload.availableCountries)
      assign(state, payload.countries.filter((country) => available.has(country)))
    },
    selectCountries: (state, { payload }) => {
      state.countryColors = {}
      assign(state, payload)
    },
    clearMap: (state) => { resetColors(state); state.mapTitle = "" },
    updateUsedColorsLegend: (state, { payload }) => {
      const color = normalizeColor(Object.keys(payload)[0])
      if (state.colorOrder.includes(color)) state.legendLabels[color] = Object.values(payload)[0]
    },
  },
})

export const {
  updateCurrentMap, updateTitle, updateColor, paintCountries, eraseCountries,
  applyGroup, selectCountries, clearMap, updateUsedColorsLegend,
} = slice.actions

export const selectUsedColors = createSelector(
  [(state) => state.mapState.countryColors, (state) => state.mapState.legendLabels, (state) => state.mapState.colorOrder],
  (assignments, labels, order) => Object.fromEntries(order.map((color) => [color, {
    legend: labels[color], appliesTo: Object.keys(assignments).filter((country) => assignments[country] === color),
  }])),
)
export const mapStore = createSelector(
  [(state) => state.mapState, selectUsedColors],
  (state, usedColors) => ({ ...state, usedColors }),
)
export default slice.reducer

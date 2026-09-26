import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./store"
import type {
  AnnotationKind,
  AnnotationPosition,
  ColorValue,
  CountryId,
  EraseCountriesPayload,
  GroupCountriesPayload,
  MapDocumentState,
  MapRoute,
  MapState,
  PaintCountriesPayload,
  SelectCountriesPayload,
  UpdateLegendPayload,
  UsedColors,
} from "../types/editor"
import { getDefaultAnnotationPositions } from "../data/mapAnnotations"

interface UpdateAnnotationPositionPayload {
  currentMap: MapRoute
  kind: AnnotationKind
  position: AnnotationPosition
}

export const initialState: MapState = {
  currentMap: "",
  mapTitle: "",
  currentColor: "#039606",
  countryColors: {},
  legendLabels: {},
  colorOrder: [],
  annotationPositions: null,
}

const normalizeColor = (color: ColorValue) => color.toUpperCase()
const validCountry = (country: CountryId) => /^[A-Z]{2}$/.test(country)

function pruneLegends(state: MapState) {
  const active = new Set(Object.values(state.countryColors))
  if (state.colorOrder.some((color) => !active.has(color))) {
    state.colorOrder = state.colorOrder.filter((color) => active.has(color))
  }
  Object.keys(state.legendLabels).forEach((color) => {
    if (!active.has(color)) delete state.legendLabels[color]
  })
}

function assign(
  state: MapState,
  countries: CountryId[],
  color: ColorValue = state.currentColor,
) {
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

function resetColors(state: MapState) {
  state.countryColors = {}
  state.legendLabels = {}
  state.colorOrder = []
}

const slice = createSlice({
  name: "mapState",
  initialState,
  reducers: {
    updateCurrentMap: (_state, { payload }: PayloadAction<MapRoute>): MapState => ({
      ...initialState,
      currentMap: payload,
      countryColors: {},
      legendLabels: {},
      colorOrder: [],
      annotationPositions: getDefaultAnnotationPositions(payload),
    }),
    updateTitle: (state, { payload }: PayloadAction<string>) => {
      state.mapTitle = payload
    },
    updateColor: (state, { payload }: PayloadAction<ColorValue>) => {
      state.currentColor = normalizeColor(payload)
    },
    paintCountries: (state, { payload }: PayloadAction<PaintCountriesPayload>) => {
      assign(state, payload.countries, payload.color)
    },
    eraseCountries: (state, { payload }: PayloadAction<EraseCountriesPayload>) => {
      payload.forEach((country) => {
        delete state.countryColors[country]
      })
      pruneLegends(state)
    },
    applyGroup: (state, { payload }: PayloadAction<GroupCountriesPayload>) => {
      if (!payload.combine) {
        resetColors(state)
        state.mapTitle = ""
      }
      const available = new Set(payload.availableCountries)
      assign(state, payload.countries.filter((country) => available.has(country)))
    },
    selectCountries: (state, { payload }: PayloadAction<SelectCountriesPayload>) => {
      state.countryColors = {}
      assign(state, payload)
    },
    clearMap: (state) => {
      resetColors(state)
      state.mapTitle = ""
    },
    restoreDocumentState: (state, { payload }: PayloadAction<MapDocumentState>) => {
      state.mapTitle = payload.mapTitle
      state.countryColors = { ...payload.countryColors }
      state.legendLabels = { ...payload.legendLabels }
      state.colorOrder = [...payload.colorOrder]
    },
    updateUsedColorsLegend: (state, { payload }: PayloadAction<UpdateLegendPayload>) => {
      const entry = Object.entries(payload)[0]
      if (!entry) return
      const [rawColor, legend] = entry
      const color = normalizeColor(rawColor)
      if (state.colorOrder.includes(color)) state.legendLabels[color] = legend
    },
    updateAnnotationPosition: (
      state,
      { payload }: PayloadAction<UpdateAnnotationPositionPayload>,
    ) => {
      if (state.currentMap !== payload.currentMap || !state.annotationPositions) return
      state.annotationPositions[payload.kind] = { ...payload.position }
    },
  },
})

export const {
  updateCurrentMap,
  updateTitle,
  updateColor,
  paintCountries,
  eraseCountries,
  applyGroup,
  selectCountries,
  clearMap,
  restoreDocumentState,
  updateUsedColorsLegend,
  updateAnnotationPosition,
} = slice.actions

export const selectUsedColors = createSelector(
  [
    (state: RootState) => state.mapState.countryColors,
    (state: RootState) => state.mapState.legendLabels,
    (state: RootState) => state.mapState.colorOrder,
  ],
  (assignments, labels, order) => order.reduce<UsedColors>((usedColors, color) => {
    usedColors[color] = {
      legend: labels[color],
      appliesTo: Object.keys(assignments).filter((country) => assignments[country] === color),
    }
    return usedColors
  }, {}),
)

export const mapStore = createSelector(
  [(state: RootState) => state.mapState, selectUsedColors],
  (state, usedColors) => ({ ...state, usedColors }),
)

export default slice.reducer

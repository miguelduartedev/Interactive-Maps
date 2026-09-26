import type { MutableRefObject } from "react"

export const MAP_ROUTES = [
  "world",
  "europe",
  "north-america",
  "south-america",
  "africa",
  "asia",
] as const

export type MapRoute = (typeof MAP_ROUTES)[number]
export type EditorTool = "paint" | "pan" | "erase"
export type AnnotationKind = "title" | "legend"

export function isMapRoute(value: unknown): value is MapRoute {
  return typeof value === "string" && MAP_ROUTES.some((route) => route === value)
}

export type CountryId = string
export type ColorValue = string
export type CountryColors = Record<CountryId, ColorValue>
export type LegendLabels = Record<ColorValue, string>

export interface AnnotationPosition {
  x: number
  y: number
}

export type AnnotationPositions = Record<AnnotationKind, AnnotationPosition>

export interface LegendEntry {
  legend: string
  appliesTo: CountryId[]
}

export type UsedColors = Record<ColorValue, LegendEntry>

export interface MapState {
  currentMap: MapRoute | ""
  mapTitle: string
  currentColor: ColorValue
  countryColors: CountryColors
  legendLabels: LegendLabels
  colorOrder: ColorValue[]
  annotationPositions: AnnotationPositions | null
}

export interface MapDocumentState {
  mapTitle: string
  countryColors: CountryColors
  legendLabels: LegendLabels
  colorOrder: ColorValue[]
}

export interface ActiveTextEdit {
  fieldId: string
  currentMap: MapRoute
  baseline: MapDocumentState
}

export interface EditorHistoryState {
  past: MapDocumentState[]
  future: MapDocumentState[]
  activeTextEdit: ActiveTextEdit | null
}

export interface PaintCountriesPayload {
  countries: CountryId[]
  color?: ColorValue
}

export interface GroupCountriesPayload {
  countries: CountryId[]
  availableCountries: CountryId[]
  combine: boolean
}

export type EraseCountriesPayload = CountryId[]
export type SelectCountriesPayload = CountryId[]

export interface UpdateLegendPayload {
  [color: ColorValue]: string
}

export interface EditorCanvasRegistration {
  svg: SVGSVGElement
  countries: CountryId[]
  currentMap: MapRoute
}

export interface EditorViewportController {
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
  suspendInteractions: () => void
  resumeInteractions: () => void
}

export interface EditorActions {
  clear: () => void
  selectAll: () => void
  group: (countries: CountryId[], combine: boolean) => void
  exportMap: () => Promise<void> | undefined
}

export interface MapEditorContextValue {
  canvas: MutableRefObject<EditorCanvasRegistration | null>
  viewport: MutableRefObject<EditorViewportController | null>
  tool: EditorTool
  setTool: (tool: EditorTool) => void
  exportMap: () => Promise<void> | undefined
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
}

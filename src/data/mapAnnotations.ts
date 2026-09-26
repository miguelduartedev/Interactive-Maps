import type {
  AnnotationPositions,
  MapRoute,
} from "../types/editor"

export interface MapAnnotationConfig {
  defaultPositions: AnnotationPositions
  viewBoxWidth: number
  viewBoxHeight: number
}

const STANDARD_VIEWBOX = { viewBoxWidth: 1000, viewBoxHeight: 684 }

export const MAP_ANNOTATION_CONFIGS: Readonly<Record<MapRoute, MapAnnotationConfig>> = {
  europe: {
    ...STANDARD_VIEWBOX,
    defaultPositions: {
      title: { x: 48, y: 76 },
      legend: { x: 48, y: 114 },
    },
  },
  africa: {
    ...STANDARD_VIEWBOX,
    defaultPositions: {
      title: { x: 48, y: 345 },
      legend: { x: 48, y: 383 },
    },
  },
  world: {
    viewBoxWidth: 1300,
    viewBoxHeight: 684,
    defaultPositions: {
      title: { x: 48, y: 44 },
      legend: { x: 48, y: 82 },
    },
  },
  "north-america": {
    ...STANDARD_VIEWBOX,
    defaultPositions: {
      title: { x: 48, y: 390 },
      legend: { x: 48, y: 428 },
    },
  },
  "south-america": {
    ...STANDARD_VIEWBOX,
    defaultPositions: {
      title: { x: 48, y: 390 },
      legend: { x: 48, y: 428 },
    },
  },
  asia: {
    ...STANDARD_VIEWBOX,
    defaultPositions: {
      title: { x: 48, y: 480 },
      legend: { x: 48, y: 518 },
    },
  },
}

export function getDefaultAnnotationPositions(currentMap: MapRoute): AnnotationPositions {
  const { title, legend } = MAP_ANNOTATION_CONFIGS[currentMap].defaultPositions
  return {
    title: { ...title },
    legend: { ...legend },
  }
}

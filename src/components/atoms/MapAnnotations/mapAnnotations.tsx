import { useAppSelector } from "../../../redux/hooks"
import { mapStore } from "../../../redux/mapSlice"
import type { MapRoute } from "../../../types/editor"

interface AnnotationConfig {
  annotationX: number
  annotationY: number
  viewBoxWidth: number
  viewBoxHeight: number
}

const STANDARD_VIEWBOX = { viewBoxWidth: 1000, viewBoxHeight: 684 }

export const MAP_ANNOTATION_CONFIGS: Readonly<Record<MapRoute, AnnotationConfig>> = {
  europe: {
    ...STANDARD_VIEWBOX,
    annotationX: 48,
    annotationY: 76,
  },
  africa: {
    ...STANDARD_VIEWBOX,
    annotationX: 48,
    annotationY: 345,
  },
  world: {
    viewBoxWidth: 1300,
    viewBoxHeight: 684,
    annotationX: 48,
    annotationY: 44,
  },
  "north-america": {
    ...STANDARD_VIEWBOX,
    annotationX: 48,
    annotationY: 390,
  },
  "south-america": {
    ...STANDARD_VIEWBOX,
    annotationX: 48,
    annotationY: 390,
  },
  asia: {
    ...STANDARD_VIEWBOX,
    annotationX: 48,
    annotationY: 480,
  },
}

const TITLE_TO_LEGEND_GAP = 38
const LEGEND_ROW_GAP = 24
const LEGEND_SWATCH_RADIUS = 7
const LEGEND_LABEL_OFFSET = 15
const ATTRIBUTION_RIGHT_OFFSET = 22
const ATTRIBUTION_BOTTOM_OFFSET = 18
const FONT_FAMILY = "Inter, Arial, sans-serif"
const HALO_COLOR = "#090E18"

export const MAP_ATTRIBUTION = "Created with Interactive Maps"

export default function MapAnnotations({ currentMap }: { currentMap: MapRoute }) {
  const {
    usedColors,
    mapTitle,
    currentMap: currentMapFromStore,
  } = useAppSelector(mapStore)
  const routeMatches = currentMap === currentMapFromStore
  const config = MAP_ANNOTATION_CONFIGS[currentMap]
  const legendEntries = routeMatches
    ? Object.entries(usedColors).filter(([, entry]) => entry.legend.trim().length > 0)
    : []
  const legendY = config.annotationY + TITLE_TO_LEGEND_GAP

  return (
    <g className="map-annotations" pointerEvents="none">
      <text
        id="map_title"
        className="map-annotations__title"
        x={config.annotationX}
        y={config.annotationY}
        fill="#F8FAFC"
        fontFamily={FONT_FAMILY}
        fontSize={24}
        fontWeight={700}
        paintOrder="stroke"
        stroke={HALO_COLOR}
        strokeWidth={2.5}
        strokeLinejoin="round"
        textRendering="geometricPrecision"
      >
        {routeMatches ? mapTitle : ""}
      </text>

      {legendEntries.map(([color, entry], index) => {
        const rowY = legendY + index * LEGEND_ROW_GAP

        return (
          <g className="map-annotations__legend-entry" key={color}>
            <circle
              id={`map-legend-swatch-${index}`}
              cx={config.annotationX + LEGEND_SWATCH_RADIUS}
              cy={rowY}
              r={LEGEND_SWATCH_RADIUS}
              fill={color}
              stroke="#CBD5E1"
              strokeOpacity={0.9}
              strokeWidth={1.25}
            />
            <text
              id={`map-legend-label-${index}`}
              className="map-annotations__legend-label"
              x={config.annotationX + LEGEND_SWATCH_RADIUS * 2 + LEGEND_LABEL_OFFSET}
              y={rowY}
              dominantBaseline="middle"
              fill="#E2E8F0"
              fontFamily={FONT_FAMILY}
              fontSize={14}
              fontWeight={500}
              paintOrder="stroke"
              stroke={HALO_COLOR}
              strokeWidth={1.75}
              strokeLinejoin="round"
              textRendering="geometricPrecision"
            >
              {entry.legend}
            </text>
          </g>
        )
      })}

      <text
        className="map-annotations__attribution"
        x={config.viewBoxWidth - ATTRIBUTION_RIGHT_OFFSET}
        y={config.viewBoxHeight - ATTRIBUTION_BOTTOM_OFFSET}
        fill="#94A3B8"
        fontFamily={FONT_FAMILY}
        fontSize={10.5}
        fontWeight={500}
        paintOrder="stroke"
        stroke={HALO_COLOR}
        strokeWidth={1.5}
        strokeLinejoin="round"
        textAnchor="end"
        textRendering="geometricPrecision"
      >
        {MAP_ATTRIBUTION}
      </text>
    </g>
  )
}

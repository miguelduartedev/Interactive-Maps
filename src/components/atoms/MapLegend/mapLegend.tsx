import { useAppSelector } from "../../../redux/hooks"
import { mapStore } from "../../../redux/mapSlice"
import type { MapRoute } from "../../../types/editor"
import { exists } from "../../_common"

interface LegendConfig {
  titleYAxis: number
  titleXAxis: number
  legendYAxis: number
  legendXAxis: number
  legendFontSize: number
  legendCircleSize: number
  legendGap: number
}

const mapLegendConfigs: Record<MapRoute, LegendConfig> = {
  europe: {
    titleYAxis: 85, titleXAxis: 51, legendYAxis: 280, legendXAxis: 60,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
  africa: {
    titleYAxis: 345, titleXAxis: 51, legendYAxis: 375, legendXAxis: 60,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
  world: {
    titleYAxis: 380, titleXAxis: 50, legendYAxis: 420, legendXAxis: 60,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
  "north-america": {
    titleYAxis: 280, titleXAxis: 41, legendYAxis: 320, legendXAxis: 50,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
  "south-america": {
    titleYAxis: 280, titleXAxis: 40, legendYAxis: 320, legendXAxis: 50,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
  asia: {
    titleYAxis: 425, titleXAxis: 40, legendYAxis: 455, legendXAxis: 50,
    legendFontSize: 16, legendCircleSize: 9, legendGap: 30,
  },
}

const legacyTextShadow = {
  textshadow: "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1);",
}

export default function MapLegend({ currentMap }: { currentMap: MapRoute }) {
  const {
    usedColors,
    mapTitle,
    currentMap: currentMapFromStore,
  } = useAppSelector(mapStore)
  const routeMatches = currentMap === currentMapFromStore
  const config = mapLegendConfigs[currentMap]

  return (
    <>
      <text
        {...legacyTextShadow}
        id="map_title"
        className="mapLegend__title"
        x={config.titleXAxis}
        y={config.titleYAxis}
        fill="white"
        style={{ fontSize: config.legendFontSize }}
        fontVariant="all-petite-caps"
        textRendering="geometricPrecision"
        fontFamily="Helvetica, sans-serif"
      >
        {routeMatches ? mapTitle : ""}
      </text>
      {routeMatches && exists(usedColors) && Object.keys(usedColors).map((color, index) =>
        exists(usedColors[color].legend) && (
          <g key={color}>
            <circle
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: color }}
              id={`map-legend-swatch-${index}`}
              cx={config.legendXAxis}
              cy={config.legendYAxis + index * config.legendGap}
              r={config.legendCircleSize}
              {...{
                x: config.legendXAxis,
                y: config.legendYAxis + index * config.legendGap,
              }}
            />
            <text
              {...legacyTextShadow}
              id={`map_legend + ${index}`}
              className="mapLegend__text"
              style={{ fontSize: config.legendFontSize }}
              fontFamily="Helvetica, sans-serif"
              fontVariant="all-petite-caps"
              textRendering="geometricPrecision"
              x={config.legendXAxis + 20}
              y={config.legendYAxis + 4.7 + config.legendGap * index}
            >
              {usedColors[color].legend}
            </text>
          </g>
        ),
      )}
    </>
  )
}

import { useRef, type ReactNode, type RefObject } from "react"
import { MAP_ANNOTATION_CONFIGS } from "../../../data/mapAnnotations"
import { useAppSelector } from "../../../redux/hooks"
import { mapStore } from "../../../redux/mapSlice"
import type { AnnotationPosition, MapRoute } from "../../../types/editor"
import { useDraggableAnnotation } from "./useDraggableAnnotation"

const LEGEND_ROW_GAP = 24
const LEGEND_SWATCH_RADIUS = 7
const LEGEND_LABEL_OFFSET = 15
const ATTRIBUTION_RIGHT_OFFSET = 22
const ATTRIBUTION_BOTTOM_OFFSET = 18
const FONT_FAMILY = "Inter, Arial, sans-serif"
const HALO_COLOR = "#090E18"

export const MAP_ATTRIBUTION = "Created with Interactive Maps"
export { MAP_ANNOTATION_CONFIGS }

function MoveHandle({ y = 0 }: { y?: number }) {
  return (
    <g
      aria-hidden="true"
      className="map-annotations__drag-handle"
      data-editor-only="true"
      pointerEvents="none"
      transform={`translate(-16 ${y})`}
    >
      <circle cx={0} cy={0} r={9} />
      <path d="M0 -5v10M-5 0h10M0 -5l-2 2M0 -5l2 2M0 5l-2 -2M0 5l2 -2M-5 0l2 -2M-5 0l2 2M5 0l-2 -2M5 0l-2 2" />
    </g>
  )
}

interface DraggableGroupProps {
  accessibleName: string
  boundsRef: RefObject<SVGGElement | SVGTextElement>
  children: ReactNode
  currentMap: MapRoute
  fallbackBounds: { x: number; y: number; width: number; height: number }
  handleY?: number
  hitBounds: { x: number; y: number; width: number; height: number }
  kind: "title" | "legend"
  position: AnnotationPosition
  viewBox: { width: number; height: number }
}

function DraggableGroup({
  accessibleName,
  boundsRef,
  children,
  currentMap,
  fallbackBounds,
  handleY,
  hitBounds,
  kind,
  position,
  viewBox,
}: DraggableGroupProps) {
  const { dragging, handlers, renderedPosition } = useDraggableAnnotation({
    boundsRef,
    currentMap,
    fallbackBounds,
    kind,
    position,
    viewBox,
  })

  return (
    <g
      {...handlers}
      aria-label={accessibleName}
      className={`map-annotations__draggable map-annotations__${kind}-group`}
      data-annotation-kind={kind}
      data-dragging={dragging ? "true" : "false"}
      role="group"
      transform={`translate(${renderedPosition.x} ${renderedPosition.y})`}
    >
      <rect
        className="map-annotations__drag-target"
        data-editor-only="true"
        x={hitBounds.x}
        y={hitBounds.y}
        width={hitBounds.width}
        height={hitBounds.height}
      />
      {children}
      <MoveHandle y={handleY} />
    </g>
  )
}

export default function MapAnnotations({ currentMap }: { currentMap: MapRoute }) {
  const titleRef = useRef<SVGTextElement>(null)
  const legendRef = useRef<SVGGElement>(null)
  const {
    annotationPositions,
    usedColors,
    mapTitle,
    currentMap: currentMapFromStore,
  } = useAppSelector(mapStore)
  const routeMatches = currentMap === currentMapFromStore
  const config = MAP_ANNOTATION_CONFIGS[currentMap]
  const positions = routeMatches && annotationPositions
    ? annotationPositions
    : config.defaultPositions
  const legendEntries = routeMatches
    ? Object.entries(usedColors).filter(([, entry]) => entry.legend.trim().length > 0)
    : []
  const viewBox = { width: config.viewBoxWidth, height: config.viewBoxHeight }
  const title = routeMatches ? mapTitle : ""

  return (
    <g className="map-annotations">
      {title.length > 0 && (
        <DraggableGroup
          accessibleName="Drag map title"
          boundsRef={titleRef}
          currentMap={currentMap}
          fallbackBounds={{ x: 0, y: -24, width: 320, height: 30 }}
          handleY={-8}
          hitBounds={{ x: -4, y: -30, width: 180, height: 40 }}
          kind="title"
          position={positions.title}
          viewBox={viewBox}
        >
          <text
            ref={titleRef}
            id="map_title"
            className="map-annotations__title"
            x={0}
            y={0}
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
            {title}
          </text>
        </DraggableGroup>
      )}

      {legendEntries.length > 0 && (
        <DraggableGroup
          accessibleName="Drag map legend"
          boundsRef={legendRef}
          currentMap={currentMap}
          fallbackBounds={{
            x: 0,
            y: -LEGEND_SWATCH_RADIUS,
            width: 320,
            height: (legendEntries.length - 1) * LEGEND_ROW_GAP + LEGEND_SWATCH_RADIUS * 2,
          }}
          hitBounds={{
            x: -4,
            y: -12,
            width: 180,
            height: (legendEntries.length - 1) * LEGEND_ROW_GAP + 24,
          }}
          kind="legend"
          position={positions.legend}
          viewBox={viewBox}
        >
          <g ref={legendRef} className="map-annotations__legend-content">
            {legendEntries.map(([color, entry], index) => {
              const rowY = index * LEGEND_ROW_GAP

              return (
                <g className="map-annotations__legend-entry" key={color}>
                  <circle
                    id={`map-legend-swatch-${index}`}
                    cx={LEGEND_SWATCH_RADIUS}
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
                    x={LEGEND_SWATCH_RADIUS * 2 + LEGEND_LABEL_OFFSET}
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
          </g>
        </DraggableGroup>
      )}

      <text
        className="map-annotations__attribution"
        pointerEvents="none"
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

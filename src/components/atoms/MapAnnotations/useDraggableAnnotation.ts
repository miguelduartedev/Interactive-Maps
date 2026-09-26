import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SVGProps,
} from "react"
import { useAppDispatch } from "../../../redux/hooks"
import { updateAnnotationPosition } from "../../../redux/mapSlice"
import type {
  AnnotationKind,
  AnnotationPosition,
  MapRoute,
} from "../../../types/editor"
import { useMapEditor } from "../../organisms/SVGMap/MapEditorContext"

interface AnnotationBounds {
  x: number
  y: number
  width: number
  height: number
}

interface ViewBoxSize {
  width: number
  height: number
}

interface UseDraggableAnnotationOptions {
  boundsRef: RefObject<SVGGElement | SVGTextElement>
  currentMap: MapRoute
  fallbackBounds: AnnotationBounds
  kind: AnnotationKind
  position: AnnotationPosition
  viewBox: ViewBoxSize
}

type DragHandlers = Pick<SVGProps<SVGGElement>,
  "onPointerDown" | "onPointerMove" | "onPointerUp" |
  "onPointerCancel" | "onLostPointerCapture" | "onClick" | "onContextMenu"
>

interface ActiveDrag {
  bounds: AnnotationBounds
  initialPosition: AnnotationPosition
  latestPosition: AnnotationPosition
  offset: AnnotationPosition
  pointerId: number
  resumeInteractions?: () => void
  route: MapRoute
  svg: SVGSVGElement
  target: SVGGElement
}

const DRAG_MARGIN = 16

export function clientPointToSvg(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): AnnotationPosition | null {
  const matrix = svg.getScreenCTM()
  if (!matrix) return null

  const point = svg.createSVGPoint()
  point.x = clientX
  point.y = clientY
  const transformed = point.matrixTransform(matrix.inverse())
  return { x: transformed.x, y: transformed.y }
}

export function clampAnnotationPosition(
  position: AnnotationPosition,
  bounds: AnnotationBounds,
  viewBox: ViewBoxSize,
): AnnotationPosition {
  const minX = DRAG_MARGIN - bounds.x
  const maxX = viewBox.width - DRAG_MARGIN - bounds.x - bounds.width
  const minY = DRAG_MARGIN - bounds.y
  const maxY = viewBox.height - DRAG_MARGIN - bounds.y - bounds.height

  return {
    x: Math.min(Math.max(position.x, minX), Math.max(minX, maxX)),
    y: Math.min(Math.max(position.y, minY), Math.max(minY, maxY)),
  }
}

function readBounds(
  element: SVGGElement | SVGTextElement | null,
  fallback: AnnotationBounds,
): AnnotationBounds {
  if (!element) return fallback
  try {
    const bounds = element.getBBox()
    if (bounds.width > 0 && bounds.height > 0) return bounds
  } catch {
    // getBBox may be unavailable while an SVG is detached or in non-browser tests.
  }
  return fallback
}

function releasePointer(target: SVGGElement, pointerId: number) {
  if (typeof target.hasPointerCapture !== "function" || !target.hasPointerCapture(pointerId)) return
  target.releasePointerCapture(pointerId)
}

export function useDraggableAnnotation({
  boundsRef,
  currentMap,
  fallbackBounds,
  kind,
  position,
  viewBox,
}: UseDraggableAnnotationOptions): {
  dragging: boolean
  handlers: DragHandlers
  renderedPosition: AnnotationPosition
} {
  const dispatch = useAppDispatch()
  const { viewport } = useMapEditor()
  const active = useRef<ActiveDrag | null>(null)
  const [preview, setPreview] = useState<AnnotationPosition | null>(null)

  const cancelActiveDrag = () => {
    const drag = active.current
    if (!drag) return
    active.current = null
    releasePointer(drag.target, drag.pointerId)
    drag.resumeInteractions?.()
    setPreview(null)
  }

  useEffect(() => () => cancelActiveDrag(), [currentMap])

  const finish = (event: ReactPointerEvent<SVGGElement>, commit: boolean) => {
    const drag = active.current
    if (!drag || drag.pointerId !== event.pointerId) return
    event.preventDefault()
    event.stopPropagation()

    active.current = null
    releasePointer(drag.target, drag.pointerId)
    drag.resumeInteractions?.()
    setPreview(null)

    if (
      commit &&
      drag.route === currentMap &&
      (drag.latestPosition.x !== drag.initialPosition.x ||
        drag.latestPosition.y !== drag.initialPosition.y)
    ) {
      dispatch(updateAnnotationPosition({
        currentMap: drag.route,
        kind,
        position: drag.latestPosition,
      }))
    }
  }

  const handlers: DragHandlers = {
    onPointerDown: (event) => {
      if (event.isPrimary === false || event.button > 0) return
      const svg = event.currentTarget.ownerSVGElement
      if (!svg) return
      const point = clientPointToSvg(svg, event.clientX, event.clientY)
      if (!point) return

      event.preventDefault()
      event.stopPropagation()
      const controller = viewport.current
      controller?.suspendInteractions()
      if (typeof event.currentTarget.setPointerCapture === "function") {
        event.currentTarget.setPointerCapture(event.pointerId)
      }

      active.current = {
        bounds: readBounds(boundsRef.current, fallbackBounds),
        initialPosition: position,
        latestPosition: position,
        offset: {
          x: point.x - position.x,
          y: point.y - position.y,
        },
        pointerId: event.pointerId,
        resumeInteractions: controller?.resumeInteractions,
        route: currentMap,
        svg,
        target: event.currentTarget,
      }
      setPreview(position)
    },
    onPointerMove: (event) => {
      const drag = active.current
      if (!drag || drag.pointerId !== event.pointerId) return
      event.preventDefault()
      event.stopPropagation()
      const point = clientPointToSvg(drag.svg, event.clientX, event.clientY)
      if (!point) return

      const nextPosition = clampAnnotationPosition({
        x: point.x - drag.offset.x,
        y: point.y - drag.offset.y,
      }, drag.bounds, viewBox)
      drag.latestPosition = nextPosition
      setPreview(nextPosition)
    },
    onPointerUp: (event) => finish(event, true),
    onPointerCancel: (event) => finish(event, false),
    onLostPointerCapture: (event) => finish(event, false),
    onClick: (event) => {
      event.preventDefault()
      event.stopPropagation()
    },
    onContextMenu: (event) => {
      event.preventDefault()
      event.stopPropagation()
    },
  }

  return {
    dragging: active.current !== null,
    handlers,
    renderedPosition: preview ?? position,
  }
}

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
  type RefObject,
  type SVGProps,
  type TouchEvent as ReactTouchEvent,
} from "react"
import panzoom from "panzoom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { eraseCountries, paintCountries } from "../../../redux/mapSlice"
import type {
  CountryId,
  EditorTool,
  EditorViewportController,
} from "../../../types/editor"
import { countryFromTarget } from "./countryGeometry"

interface ActiveTouch {
  country: CountryId
  clientX: number
  clientY: number
  long: boolean
  tool: EditorTool
}

type MapInteractionHandlers = Pick<SVGProps<SVGSVGElement>,
  "onClick" | "onContextMenu" | "onMouseOver" | "onMouseLeave" |
  "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel"
>

export function useMapInteractions(
  svgRef: RefObject<SVGSVGElement>,
  available: ReadonlySet<CountryId>,
  tool: EditorTool,
  viewport: MutableRefObject<EditorViewportController | null>,
): { hovered: CountryId | null; handlers: MapInteractionHandlers } {
  const dispatch = useAppDispatch()
  const isMobile = useAppSelector((state) => state.deviceState.isMobile)
  const [hovered, setHovered] = useState<CountryId | null>(null)
  const touch = useRef<ActiveTouch | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressClickUntil = useRef(0)
  const toolRef = useRef(tool)

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  const clearTimer = () => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const instance = panzoom(svg, {
      onTouch: () => false,
      beforeWheel: (event) => toolRef.current !== "pan" && !event.altKey,
      beforeMouseDown: (event) => toolRef.current !== "pan" && !event.altKey,
      minZoom: 0.5,
      maxZoom: 8,
      zoomDoubleClickSpeed: !isMobile ? 1 : 0,
    })

    const zoomFromCenter = (multiplier: number) => {
      const bounds = svg.getBoundingClientRect()
      instance.zoomTo(
        bounds.left + bounds.width / 2,
        bounds.top + bounds.height / 2,
        multiplier,
      )
    }
    const controller: EditorViewportController = {
      zoomIn: () => zoomFromCenter(1.25),
      zoomOut: () => zoomFromCenter(0.8),
      resetView: () => {
        instance.zoomAbs(0, 0, 1)
        instance.moveTo(0, 0)
      },
    }
    viewport.current = controller

    return () => {
      clearTimer()
      touch.current = null
      if (viewport.current === controller) viewport.current = null
      instance.dispose()
    }
  }, [isMobile, svgRef, viewport])

  const identify = (event: ReactMouseEvent<SVGSVGElement> | ReactTouchEvent<SVGSVGElement>) =>
    countryFromTarget(event.target, svgRef.current, available)
  const paint = (country: CountryId | null) => {
    if (country) dispatch(paintCountries({ countries: [country] }))
  }
  const erase = (country: CountryId | null) => {
    if (country) dispatch(eraseCountries([country]))
  }

  return {
    hovered,
    handlers: {
      onClick: (event) => {
        if (Date.now() < suppressClickUntil.current) return
        const country = identify(event)
        if (tool === "paint") paint(country)
        if (tool === "erase") erase(country)
      },
      onContextMenu: (event) => {
        event.preventDefault()
        erase(identify(event))
      },
      onMouseOver: (event) => setHovered(identify(event)),
      onMouseLeave: () => setHovered(null),
      onTouchStart: (event) => {
        clearTimer()
        suppressClickUntil.current = Date.now() + 1000
        if (tool === "pan") {
          touch.current = null
          return
        }
        const country = identify(event)
        if (event.touches.length !== 1 || !country) {
          touch.current = null
          return
        }
        const { clientX, clientY } = event.touches[0]
        touch.current = { country, clientX, clientY, long: false, tool }
        if (tool === "paint") {
          timer.current = setTimeout(() => {
            if (touch.current) touch.current.long = true
          }, 500)
        }
      },
      onTouchMove: (event) => {
        const active = touch.current
        if (!active) return
        const finger = event.touches[0]
        if (
          event.touches.length !== 1 ||
          !finger ||
          Math.hypot(finger.clientX - active.clientX, finger.clientY - active.clientY) > 8
        ) {
          clearTimer()
          touch.current = null
        }
      },
      onTouchEnd: () => {
        clearTimer()
        suppressClickUntil.current = Date.now() + 800
        const active = touch.current
        touch.current = null
        if (!active) return
        if (active.tool === "erase" || active.long) erase(active.country)
        else paint(active.country)
      },
      onTouchCancel: () => {
        clearTimer()
        touch.current = null
        suppressClickUntil.current = Date.now() + 800
      },
    },
  }
}

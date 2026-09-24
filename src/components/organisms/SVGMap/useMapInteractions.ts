import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
  type SVGProps,
  type TouchEvent as ReactTouchEvent,
} from "react"
import panzoom from "panzoom"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { eraseCountries, paintCountries } from "../../../redux/mapSlice"
import type { CountryId } from "../../../types/editor"
import { countryFromTarget } from "./countryGeometry"

interface ActiveTouch {
  country: CountryId
  clientX: number
  clientY: number
  long: boolean
}

type MapInteractionHandlers = Pick<SVGProps<SVGSVGElement>,
  "onClick" | "onContextMenu" | "onMouseOver" | "onMouseLeave" |
  "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel"
>

export function useMapInteractions(
  svgRef: RefObject<SVGSVGElement>,
  available: ReadonlySet<CountryId>,
): { hovered: CountryId | null; handlers: MapInteractionHandlers } {
  const dispatch = useAppDispatch()
  const isMobile = useAppSelector((state) => state.deviceState.isMobile)
  const [hovered, setHovered] = useState<CountryId | null>(null)
  const touch = useRef<ActiveTouch | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const suppressClickUntil = useRef(0)

  const clearTimer = () => {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
  }

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const instance = panzoom(svg, {
      onTouch: () => false,
      beforeWheel: (event) => !isMobile && !event.altKey,
      zoomDoubleClickSpeed: !isMobile ? 1 : 0,
    })

    return () => {
      clearTimer()
      touch.current = null
      instance.dispose()
    }
  }, [isMobile, svgRef])

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
        if (Date.now() >= suppressClickUntil.current) paint(identify(event))
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
        const country = identify(event)
        if (event.touches.length !== 1 || !country) {
          touch.current = null
          return
        }
        const { clientX, clientY } = event.touches[0]
        touch.current = { country, clientX, clientY, long: false }
        timer.current = setTimeout(() => {
          if (touch.current) touch.current.long = true
        }, 500)
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
        if (active) (active.long ? erase : paint)(active.country)
      },
      onTouchCancel: () => {
        clearTimer()
        touch.current = null
        suppressClickUntil.current = Date.now() + 800
      },
    },
  }
}

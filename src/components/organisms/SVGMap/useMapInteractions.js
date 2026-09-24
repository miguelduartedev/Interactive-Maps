import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import panzoom from "panzoom"
import { eraseCountries, paintCountries } from "../../../redux/mapSlice"
import { countryFromTarget } from "./countryGeometry"

export function useMapInteractions(svgRef, available) {
  const dispatch = useDispatch()
  const isMobile = useSelector((state) => state.deviceState.isMobile)
  const [hovered, setHovered] = useState(null)
  const touch = useRef(null)
  const timer = useRef(null)
  const suppressClickUntil = useRef(0)
  const clearTimer = () => clearTimeout(timer.current)

  useEffect(() => {
    const instance = panzoom(svgRef.current, {
      onTouch: () => false,
      beforeWheel: (event) => !isMobile && !event.altKey,
      zoomDoubleClickSpeed: !isMobile && 1,
    })
    return () => {
      clearTimeout(timer.current)
      touch.current = null
      instance.dispose()
    }
  }, [isMobile, svgRef])

  const identify = (event) => countryFromTarget(event.target, svgRef.current, available)
  const paint = (country) => country && dispatch(paintCountries({ countries: [country] }))
  const erase = (country) => country && dispatch(eraseCountries([country]))

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
        if (event.touches.length !== 1 || !country) { touch.current = null; return }
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
        if (event.touches.length !== 1 || Math.hypot(finger.clientX - active.clientX, finger.clientY - active.clientY) > 8) {
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

import { createContext, useContext, useMemo, useRef } from "react"
import { saveSvgAsPng } from "save-svg-as-png"

const MapEditorContext = createContext(null)

export function MapEditorProvider({ children }) {
  const canvas = useRef(null)
  const value = useMemo(() => ({
    canvas,
    exportMap: () => {
      const svg = canvas.current?.svg
      if (!svg) return
      return saveSvgAsPng(svg, "interactive_maps.png", {
        encoderOptions: 1, scale: 3, backgroundColor: "#102946",
        modifyCss: () => ".interactive-map {transform: unset !important}",
      })
    },
  }), [])
  return <MapEditorContext.Provider value={value}>{children}</MapEditorContext.Provider>
}

export const useMapEditor = () => useContext(MapEditorContext)

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react"
import { saveSvgAsPng } from "save-svg-as-png"
import type { EditorCanvasRegistration, MapEditorContextValue } from "../../../types/editor"

const MapEditorContext = createContext<MapEditorContextValue | null>(null)

export function MapEditorProvider({ children }: { children: ReactNode }) {
  const canvas = useRef<EditorCanvasRegistration | null>(null)
  const value = useMemo<MapEditorContextValue>(() => ({
    canvas,
    exportMap: () => {
      const svg = canvas.current?.svg
      if (!svg) return
      return saveSvgAsPng(svg, "interactive_maps.png", {
        encoderOptions: 1,
        scale: 3,
        backgroundColor: "#102946",
        modifyCss: () => ".interactive-map {transform: unset !important}",
      })
    },
  }), [])

  return <MapEditorContext.Provider value={value}>{children}</MapEditorContext.Provider>
}

export function useMapEditor(): MapEditorContextValue {
  const editor = useContext(MapEditorContext)
  if (!editor) throw new Error("useMapEditor must be used within MapEditorProvider")
  return editor
}

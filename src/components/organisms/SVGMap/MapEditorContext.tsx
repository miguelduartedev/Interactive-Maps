import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { saveSvgAsPng } from "save-svg-as-png"
import type {
  EditorCanvasRegistration,
  EditorTool,
  EditorViewportController,
  MapEditorContextValue,
} from "../../../types/editor"

const MapEditorContext = createContext<MapEditorContextValue | null>(null)

export function MapEditorProvider({ children }: { children: ReactNode }) {
  const canvas = useRef<EditorCanvasRegistration | null>(null)
  const viewport = useRef<EditorViewportController | null>(null)
  const [tool, setTool] = useState<EditorTool>("paint")
  const exportMap = useCallback(() => {
    const svg = canvas.current?.svg
    if (!svg) return
    return saveSvgAsPng(svg, "interactive_maps.png", {
      encoderOptions: 1,
      scale: 3,
      backgroundColor: "#102946",
      modifyCss: () => ".interactive-map {transform: unset !important}",
    })
  }, [])
  const zoomIn = useCallback(() => viewport.current?.zoomIn(), [])
  const zoomOut = useCallback(() => viewport.current?.zoomOut(), [])
  const resetView = useCallback(() => viewport.current?.resetView(), [])

  const value = useMemo<MapEditorContextValue>(() => ({
    canvas,
    viewport,
    tool,
    setTool,
    exportMap,
    zoomIn,
    zoomOut,
    resetView,
  }), [exportMap, resetView, tool, zoomIn, zoomOut])

  return <MapEditorContext.Provider value={value}>{children}</MapEditorContext.Provider>
}

export function useMapEditor(): MapEditorContextValue {
  const editor = useContext(MapEditorContext)
  if (!editor) throw new Error("useMapEditor must be used within MapEditorProvider")
  return editor
}

import { useMapEditor } from "../SVGMap/MapEditorContext"

export default function ViewportControls() {
  const { zoomIn, zoomOut, resetView } = useMapEditor()

  return (
    <div className="viewport-controls" role="group" aria-label="Viewport controls">
      <button type="button" onClick={zoomOut} aria-label="Zoom out">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M20 12H4" />
        </svg>
      </button>
      <button type="button" onClick={zoomIn} aria-label="Zoom in">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 4v16M20 12H4" />
        </svg>
      </button>
      <span className="viewport-controls__divider" aria-hidden="true" />
      <button type="button" onClick={resetView} aria-label="Fit map to viewport">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
          <path d="m4 4 6 6M20 4l-6 6M20 20l-6-6M4 20l6-6" />
        </svg>
      </button>
    </div>
  )
}

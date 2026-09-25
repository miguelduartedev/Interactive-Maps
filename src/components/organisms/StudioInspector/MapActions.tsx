import { useEditorActions } from "../SVGMap/useEditorActions"

export default function MapActions() {
  const actions = useEditorActions()

  return (
    <div className="map-actions">
      <button type="button" className="map-actions__select" onClick={actions.selectAll}>
        Select All
      </button>
      <button type="button" className="map-actions__clear" onClick={actions.clear}>
        Clear All
      </button>
    </div>
  )
}

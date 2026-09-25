import type { EditorTool } from "../../../types/editor"
import { useMapEditor } from "../SVGMap/MapEditorContext"
import {
  useEditorHistory,
  useEditorHistoryShortcuts,
} from "../SVGMap/useEditorHistory"

const TOOLS: { id: EditorTool; label: string; icon: JSX.Element }[] = [
  {
    id: "paint",
    label: "Paint",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m15.25 5.25 3.5 3.5M16.75 3.75a2.47 2.47 0 0 1 3.5 3.5L6.5 21H3v-3.5L16.75 3.75Z" />
      </svg>
    ),
  },
  {
    id: "pan",
    label: "Pan",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 0 1 3 0V11m0-5.5v-1a1.5 1.5 0 0 1 3 0V11m0-5.5a1.5 1.5 0 0 1 3 0V11m0-2.5a1.5 1.5 0 0 1 3 0V14a7.5 7.5 0 0 1-15 0v-2.5a1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    id: "erase",
    label: "Erase",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m15 4 5 5L9 20H4v-5L15 4Zm-6.5 7.5 5 5M8 20h12" />
      </svg>
    ),
  },
]

export default function StudioToolbar() {
  const { tool, setTool } = useMapEditor()
  const history = useEditorHistory()
  useEditorHistoryShortcuts(history)

  return (
    <aside className="studio-toolbar" aria-label="Map tools">
      {TOOLS.map(({ id, label, icon }) => (
        <button
          key={id}
          className="studio-toolbar__button"
          type="button"
          aria-label={`${label} tool`}
          aria-pressed={tool === id}
          title={`${label} tool`}
          onClick={() => setTool(id)}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
      <span className="studio-toolbar__separator" aria-hidden="true" />
      <button
        className="studio-toolbar__button studio-toolbar__button--action"
        type="button"
        aria-label="Undo"
        title="Undo (Ctrl/Cmd+Z)"
        disabled={!history.canUndo}
        onClick={history.undo}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M9 7 4 12l5 5M5 12h8a6 6 0 0 1 6 6" />
        </svg>
        <span>Undo</span>
      </button>
      <button
        className="studio-toolbar__button studio-toolbar__button--action"
        type="button"
        aria-label="Redo"
        title="Redo (Ctrl/Cmd+Shift+Z)"
        disabled={!history.canRedo}
        onClick={history.redo}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m15 7 5 5-5 5m4-5h-8a6 6 0 0 0-6 6" />
        </svg>
        <span>Redo</span>
      </button>
    </aside>
  )
}

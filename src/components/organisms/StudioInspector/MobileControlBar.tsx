import type { MobileInspectorPanel } from "./StudioInspector"

interface MobileControlBarProps {
  activePanel: MobileInspectorPanel | null
  onSelect: (panel: MobileInspectorPanel, trigger: HTMLButtonElement) => void
}

const CONTROLS: Array<{
  icon: "palette" | "map" | "groups" | "actions"
  label: string
  panel: MobileInspectorPanel
}> = [
  { icon: "palette", label: "Appearance", panel: "appearance" },
  { icon: "map", label: "Map", panel: "map" },
  { icon: "groups", label: "Groups", panel: "groups" },
  { icon: "actions", label: "Actions", panel: "actions" },
]

function ControlIcon({ icon }: { icon: (typeof CONTROLS)[number]["icon"] }) {
  if (icon === "palette") {
    return <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h3a6 6 0 0 0 0-12h-3Zm-4 7h.01M10 6h.01M15 7h.01" />
  }
  if (icon === "map") {
    return <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" />
  }
  if (icon === "groups") {
    return <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 1 0 0-6m-8 9c-3.314 0-6 2.239-6 5v2h12v-2c0-2.761-2.686-5-6-5Zm8-1c3.314 0 6 2.239 6 5v2h-6" />
  }
  return <path d="M4 7h10M18 7h2M4 17h2m4 0h10M14 4v6M6 14v6" />
}

export default function MobileControlBar({ activePanel, onSelect }: MobileControlBarProps) {
  return (
    <nav className="mobile-control-bar" aria-label="Map controls">
      {CONTROLS.map(({ icon, label, panel }) => (
        <button
          key={panel}
          type="button"
          aria-controls="studio-mobile-sheet"
          aria-expanded={activePanel === panel}
          aria-pressed={activePanel === panel}
          onClick={(event) => onSelect(panel, event.currentTarget)}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <ControlIcon icon={icon} />
          </svg>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

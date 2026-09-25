import type { RefObject } from "react"
import type { MapRoute } from "../../../types/editor"
import AppearanceControl from "./AppearanceControl"
import GroupsControl from "./GroupsControl"
import InspectorSection from "./InspectorSection"
import LegendControl from "./LegendControl"
import MapActions from "./MapActions"
import MapTitleControl from "./MapTitleControl"

export type MobileInspectorPanel = "appearance" | "map" | "groups" | "actions"

interface StudioInspectorProps {
  activeMobilePanel?: MobileInspectorPanel
  combineGroups: boolean
  currentMap: MapRoute
  onClose?: () => void
  onCombineGroupsChange: (combine: boolean) => void
  sheetRef?: RefObject<HTMLElement>
  variant: "desktop" | "sheet"
}

const PANEL_TITLES: Record<MobileInspectorPanel, string> = {
  appearance: "Appearance",
  map: "Map details",
  groups: "Groups",
  actions: "Map actions",
}

export default function StudioInspector({
  activeMobilePanel,
  combineGroups,
  currentMap,
  onClose,
  onCombineGroupsChange,
  sheetRef,
  variant,
}: StudioInspectorProps) {
  const desktop = variant === "desktop"
  const show = (panel: MobileInspectorPanel) => desktop || activeMobilePanel === panel

  return (
    <aside
      id={desktop ? "studio-inspector" : "studio-mobile-sheet"}
      ref={sheetRef}
      className={`studio-inspector studio-inspector--${variant}`}
      aria-label={desktop ? "Map inspector" : undefined}
      aria-labelledby={desktop ? undefined : "studio-mobile-sheet-title"}
      aria-modal={desktop ? undefined : true}
      role={desktop ? undefined : "dialog"}
    >
      {!desktop && activeMobilePanel ? (
        <header className="studio-inspector__mobile-header">
          <h2 id="studio-mobile-sheet-title">{PANEL_TITLES[activeMobilePanel]}</h2>
          <button type="button" data-sheet-close onClick={onClose} aria-label="Close map controls">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>
      ) : null}

      <div className="studio-inspector__scroll">
        {show("map") ? (
          <InspectorSection title="Map">
            <MapTitleControl />
          </InspectorSection>
        ) : null}
        {show("appearance") ? (
          <InspectorSection title="Appearance">
            <AppearanceControl />
          </InspectorSection>
        ) : null}
        {show("map") ? (
          <InspectorSection title="Legend">
            <LegendControl />
          </InspectorSection>
        ) : null}
        {show("groups") ? (
          <InspectorSection title="Groups">
            <GroupsControl
              combineGroups={combineGroups}
              currentMap={currentMap}
              onCombineGroupsChange={onCombineGroupsChange}
            />
          </InspectorSection>
        ) : null}
        {show("actions") ? (
          <InspectorSection title="Map Actions">
            <MapActions />
          </InspectorSection>
        ) : null}
      </div>
    </aside>
  )
}

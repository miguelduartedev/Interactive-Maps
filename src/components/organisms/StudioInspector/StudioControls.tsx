import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import type { MapRoute } from "../../../types/editor"
import MobileControlBar from "./MobileControlBar"
import StudioInspector, { type MobileInspectorPanel } from "./StudioInspector"

const MOBILE_QUERY = "(max-width: 900px)"
const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

function subscribeToMobileQuery(callback: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY)
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getServerMobileSnapshot() {
  return false
}

export default function StudioControls({ currentMap }: { currentMap: MapRoute }) {
  const mobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getServerMobileSnapshot,
  )
  const [activePanel, setActivePanel] = useState<MobileInspectorPanel | null>(null)
  const [combineGroups, setCombineGroups] = useState(false)
  const sheetRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const sheetWasOpenRef = useRef(false)

  const closeSheet = useCallback(() => {
    setActivePanel(null)
  }, [])

  useEffect(() => {
    if (activePanel) {
      sheetWasOpenRef.current = true
    } else if (sheetWasOpenRef.current) {
      triggerRef.current?.focus()
      sheetWasOpenRef.current = false
    }
  }, [activePanel])

  useEffect(() => {
    if (!mobile && activePanel) setActivePanel(null)
  }, [activePanel, mobile])

  useEffect(() => {
    if (!mobile || !activePanel) return
    const sheet = sheetRef.current
    if (!sheet) return

    sheet.querySelector<HTMLElement>("[data-sheet-close]")?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeSheet()
        return
      }
      if (event.key !== "Tab") return

      const focusable = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [activePanel, closeSheet, mobile])

  const selectPanel = (panel: MobileInspectorPanel, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActivePanel((current) => current === panel ? null : panel)
  }

  if (!mobile) {
    return (
      <StudioInspector
        variant="desktop"
        combineGroups={combineGroups}
        currentMap={currentMap}
        onCombineGroupsChange={setCombineGroups}
      />
    )
  }

  return (
    <>
      {activePanel ? (
        <>
          <div className="studio-sheet-backdrop" onPointerDown={closeSheet} aria-hidden="true" />
          <StudioInspector
            variant="sheet"
            activeMobilePanel={activePanel}
            combineGroups={combineGroups}
            currentMap={currentMap}
            onClose={closeSheet}
            onCombineGroupsChange={setCombineGroups}
            sheetRef={sheetRef}
          />
        </>
      ) : null}
      <MobileControlBar activePanel={activePanel} onSelect={selectPanel} />
    </>
  )
}

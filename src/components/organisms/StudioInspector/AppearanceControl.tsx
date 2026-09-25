import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { updateColor } from "../../../redux/mapSlice"

export const QUICK_COLORS = [
  "#38BDF8",
  "#3B82F6",
  "#039606",
  "#F59E0B",
  "#F43F5E",
  "#EC4899",
  "#8B5CF6",
  "#64748B",
] as const

export default function AppearanceControl() {
  const dispatch = useAppDispatch()
  const currentColor = useAppSelector((state) => state.mapState.currentColor)
  const [customOpen, setCustomOpen] = useState(false)
  const [customDraft, setCustomDraft] = useState(currentColor)
  const popoverRef = useRef<HTMLDivElement>(null)
  const customSelected = !QUICK_COLORS.includes(currentColor as (typeof QUICK_COLORS)[number])

  useEffect(() => setCustomDraft(currentColor), [currentColor])

  useEffect(() => {
    if (!customOpen) return

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!popoverRef.current?.contains(event.target as Node)) setCustomOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCustomOpen(false)
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [customOpen])

  const setColor = (color: string) => dispatch(updateColor(color))
  const commitCustomDraft = () => {
    if (/^#[0-9A-F]{6}$/i.test(customDraft)) {
      setColor(customDraft)
    } else {
      setCustomDraft(currentColor)
    }
  }

  return (
    <div className="appearance-control">
      <div className="appearance-control__current" aria-live="polite">
        <span
          className="appearance-control__current-swatch"
          style={{ backgroundColor: currentColor }}
          aria-hidden="true"
        />
        <span>Current color</span>
        <code>{currentColor}</code>
      </div>

      <div className="appearance-control__swatches" aria-label="Quick colors">
        {QUICK_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            className="appearance-control__swatch"
            style={{ backgroundColor: color }}
            aria-label={`Use color ${color}`}
            aria-pressed={currentColor === color}
            onClick={() => setColor(color)}
          />
        ))}
        <div className="appearance-control__custom" ref={popoverRef}>
          <button
            type="button"
            className="appearance-control__custom-trigger"
            aria-label="Choose a custom color"
            aria-expanded={customOpen}
            aria-haspopup="dialog"
            data-custom-selected={customSelected || undefined}
            onClick={() => setCustomOpen((open) => !open)}
          >
            {customSelected ? (
              <span style={{ backgroundColor: currentColor }} aria-hidden="true" />
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 4v16M4 12h16" />
              </svg>
            )}
          </button>
          {customOpen ? (
            <div className="appearance-control__popover" role="dialog" aria-label="Custom color picker">
              <span className="appearance-control__popover-label">Custom color</span>
              <div className="appearance-control__custom-fields">
                <span className="appearance-control__color-picker">
                  <input
                    id="studio-custom-color"
                    type="color"
                    aria-label="Choose color"
                    title="Choose color"
                    value={currentColor}
                    onChange={(event) => setColor(event.target.value)}
                  />
                  <svg aria-hidden="true" viewBox="0 0 12 12">
                    <path d="m3 4.5 3 3 3-3" />
                  </svg>
                </span>
                <input
                  type="text"
                  aria-label="Custom hex color"
                  maxLength={7}
                  value={customDraft}
                  onChange={(event) => setCustomDraft(event.target.value.toUpperCase())}
                  onBlur={commitCustomDraft}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") commitCustomDraft()
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

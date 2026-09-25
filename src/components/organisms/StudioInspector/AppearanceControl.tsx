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
                  <svg aria-hidden="true" viewBox="0 0 512 512">
                    <path d="M341.6 29.2 240.1 130.8l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.5-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0ZM55.4 323.3C40.4 338.3 32 358.7 32 379.9v42.4L5.4 462.2c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4L89.7 480h42.4c21.2 0 41.6-8.4 56.6-23.4l120.7-120.7-45.3-45.3-120.7 120.7c-3 3-7.1 4.7-11.3 4.7H96v-36.1c0-4.2 1.7-8.3 4.7-11.3l120.7-120.7-45.3-45.3L55.4 323.3Z" />
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

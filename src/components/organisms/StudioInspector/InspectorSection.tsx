import { useId, useState, type ReactNode } from "react"

interface InspectorSectionProps {
  children: ReactNode
  defaultOpen?: boolean
  title: string
}

export default function InspectorSection({
  children,
  defaultOpen = true,
  title,
}: InspectorSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <section className="inspector-section">
      <button
        type="button"
        className="inspector-section__trigger"
        aria-controls={contentId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{title}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d={open ? "M5 15l7-7 7 7" : "M5 9l7 7 7-7"} />
        </svg>
      </button>
      {open ? (
        <div id={contentId} className="inspector-section__content">
          {children}
        </div>
      ) : null}
    </section>
  )
}

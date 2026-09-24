const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Choose your map",
    description:
      "Select World, Europe, North America, South America, Africa, or Asia.",
  },
  {
    number: "02",
    title: "Color countries",
    description:
      "Pick a color and apply it to individual countries or available groups.",
  },
  {
    number: "03",
    title: "Add title and legend",
    description: "Give the map context with a title and color legend.",
  },
  {
    number: "04",
    title: "Export",
    description: "Download the finished map as a PNG.",
  },
] as const

function WorkflowPlaceholder() {
  return (
    <div
      className="workflow-visual"
      role="img"
      aria-label="Placeholder for a future map creation visual"
    >
      <div className="workflow-visual__grid" aria-hidden="true" />
      <svg
        className="workflow-visual__globe"
        aria-hidden="true"
        viewBox="0 0 220 220"
      >
        <circle cx="110" cy="110" r="74" />
        <path d="M36 110h148M110 36c25 21 38 46 38 74s-13 53-38 74M110 36c-25 21-38 46-38 74s13 53 38 74M49 75h122M49 145h122" />
      </svg>
      <span
        className="workflow-visual__marker workflow-visual__marker--one"
        aria-hidden="true"
      />
      <span
        className="workflow-visual__marker workflow-visual__marker--two"
        aria-hidden="true"
      />
    </div>
  )
}

export default function Panel() {
  return (
    <section
      id="how-it-works"
      className="panel home-section"
      aria-labelledby="how-it-works-title"
    >
      <div className="home-section__shell">
        <header className="home-section__heading panel__heading">
          <p className="home-section__eyebrow">Workflow guide</p>
          <h2 id="how-it-works-title">Steps for map creation</h2>
          <p>
            Choose a canvas, style the countries that matter, add context, and
            export your finished map.
          </p>
        </header>

        <div className="panel__layout">
          <WorkflowPlaceholder />

          <div className="panel__instructions">
            <ol className="workflow-steps">
              {WORKFLOW_STEPS.map((step) => (
                <li className="workflow-step" key={step.number}>
                  <span className="workflow-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="workflow-tip" aria-label="Map editing tips">
              <div className="workflow-tip__icon" aria-hidden="true">
                i
              </div>
              <div>
                <h3>Map editing tips</h3>
                <p>
                  Hold Alt or Option while scrolling or dragging to navigate on
                  desktop. Right-click a country—or long-press on mobile—to
                  remove its color.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Choose Your Canvas",
    description:
      "Choose one of our available maps: World, Europe, North America, South America, Africa, or Asia.",
  },
  {
    number: "02",
    title: "Color Selection",
    description:
      "Select a color through our Color Picker, from curated choropleth gradients to custom hex values.",
  },
  {
    number: "03",
    title: "Click or Block Select",
    description:
      "Click on the countries that you want to apply the color to, or alternatively select a Political Block or a Geographic Region.",
  },
  {
    number: "04",
    title: "Title, Legend & Export",
    description:
      "Fill the Map Title and Color Legend fields in a way that describes the data you're showcasing. Once you're done, go ahead and generate your map as a free to use PNG image!",
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
                ⌨
              </div>
              <div>
                <h3>Map Navigation &amp; Color Removal Tips:</h3>
                <ul>
                  <li>
                    In order to <b>Zoom</b> and/or <b>Drag</b> the map, press and
                    hold the <i>Alt</i> (Windows) or <i>Option</i> (Mac) key and
                    simultaneously use your mouse/trackpad to scroll and drag.
                    Alternatively, you can click on the map and use the + and -
                    keys to zoom and the arrow keys to change the map position.
                  </li>
                  <li>
                    You can remove the color that has been assigned to a country
                    by right clicking on the country or by doing a long press on
                    mobile.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

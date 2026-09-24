import Link from "next/link"
import { MAP_ROUTES, type MapRoute } from "../../../types/editor"

interface MapCardMetadata {
  label: string
}

const MAP_CARD_METADATA = {
  world: { label: "World" },
  europe: { label: "Europe" },
  "north-america": { label: "North America" },
  "south-america": { label: "South America" },
  africa: { label: "Africa" },
  asia: { label: "Asia" },
} satisfies Record<MapRoute, MapCardMetadata>

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11m-4-4 4 4-4 4" />
    </svg>
  )
}

export default function OptionsGrid() {
  return (
    <section
      id="available-maps"
      className="options-grid home-section"
      aria-labelledby="available-maps-title"
    >
      <div className="home-section__shell">
        <header className="home-section__heading options-grid__heading">
          <p className="home-section__eyebrow">Available maps</p>
          <h2 id="available-maps-title">Choose your map</h2>
          <p>
            Select a geographic canvas to open the editor and start creating.
          </p>
        </header>

        <div className="options-grid__cards">
          {MAP_ROUTES.map((route) => {
            const { label } = MAP_CARD_METADATA[route]

            return (
              <Link
                className="map-card"
                href={`/${route}`}
                key={route}
                aria-label={`Open the ${label} map editor`}
              >
                <div className="map-card__preview" aria-hidden="true">
                  <div className="map-card__orbit" />
                  <div className="map-card__globe" data-map={route} />
                </div>
                <div className="map-card__content">
                  <h3>{label}</h3>
                  <span>
                    Open map
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

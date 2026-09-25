import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { isMapRoute, MAP_ROUTES, type MapRoute } from "../../../types/editor"
import { useMapEditor } from "../SVGMap/MapEditorContext"

const MAP_LABELS = {
  world: "World",
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  africa: "Africa",
  asia: "Asia",
} satisfies Record<MapRoute, string>

export default function StudioHeader({ currentMap }: { currentMap: MapRoute }) {
  const router = useRouter()
  const { exportMap } = useMapEditor()

  const handleMapChange = (value: string) => {
    if (isMapRoute(value) && value !== currentMap) void router.push(`/${value}`)
  }

  return (
    <header className="studio-header">
      <div className="studio-header__left">
        <Link className="studio-brand" href="/" aria-label="Interactive Maps home">
          <Image
            className="studio-brand__logo"
            src="/used_assets/logo_white.svg"
            width={144}
            height={36}
            priority
            alt="Interactive Maps"
          />
          <span className="studio-brand__version" aria-label="Version 2">V2</span>
        </Link>

        <span className="studio-header__divider" aria-hidden="true" />

        <label className="studio-map-select">
          <span className="visually-hidden">Current map</span>
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
          <select
            aria-label="Current map"
            value={currentMap}
            onChange={(event) => handleMapChange(event.target.value)}
          >
            {MAP_ROUTES.map((route) => (
              <option key={route} value={route}>{MAP_LABELS[route]}</option>
            ))}
          </select>
          <svg className="studio-map-select__chevron" aria-hidden="true" viewBox="0 0 20 20">
            <path d="m6 8 4 4 4-4" />
          </svg>
        </label>
      </div>

      <button className="studio-export" type="button" onClick={exportMap}>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
        </svg>
        <span>Export</span>
      </button>
    </header>
  )
}

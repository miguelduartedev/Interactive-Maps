import type { MapRoute } from "../../../types/editor"
import SVGMap from "../SVGMap/svgMap"
import ViewportControls from "./ViewportControls"

export default function StudioCanvas({ currentMap }: { currentMap: MapRoute }) {
  return (
    <section className="studio-canvas" aria-label="Interactive map canvas">
      <SVGMap initialMap={currentMap} />
      <ViewportControls />
    </section>
  )
}

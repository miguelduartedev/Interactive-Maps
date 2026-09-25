import clsx from "clsx"
import { useRouter } from "next/router"
import { useAppSelector } from "../../../redux/hooks"
import { isMapRoute, type MapRoute } from "../../../types/editor"
import AfricaSVG from "./maps/AfricaSVG"
import AsiaSVG from "./maps/AsiaSVG"
import EuropeSVG from "./maps/EuropeSVG"
import NorthAmericaSVG from "./maps/NorthAmericaSVG"
import SouthAmericaSVG from "./maps/SouthAmericaSVG"
import WorldSVG from "./maps/WorldSVG"

export default function SVGMap({ initialMap }: { initialMap: MapRoute }) {
  const router = useRouter()
  const isMobile = useAppSelector((state) => state.deviceState.isMobile)
  const currentMap = isMapRoute(router.query.mapPath) ? router.query.mapPath : initialMap
  const svgProps = { currentMap }

  return (
    <div className={clsx("svg-container", isMobile && "-mobile-version")}>
      {currentMap === "africa" && <AfricaSVG {...svgProps} />}
      {currentMap === "asia" && <AsiaSVG {...svgProps} />}
      {currentMap === "europe" && <EuropeSVG {...svgProps} />}
      {currentMap === "north-america" && <NorthAmericaSVG {...svgProps} />}
      {currentMap === "south-america" && <SouthAmericaSVG {...svgProps} />}
      {currentMap === "world" && <WorldSVG {...svgProps} />}
    </div>
  )
}

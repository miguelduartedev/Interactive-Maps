import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import MapInstructions from "../../molecules/MapInstructions/mapInstructions"
import AfricaSVG from "./maps/AfricaSVG"
import AsiaSVG from "./maps/AsiaSVG"
import EuropeSVG from "./maps/EuropeSVG"
import NorthAmericaSVG from "./maps/NorthAmericaSVG"
import SouthAmericaSVG from "./maps/SouthAmericaSVG"
import WorldSVG from "./maps/WorldSVG"
import clsx from "clsx"
import { deviceStore } from "../../../redux/deviceSlice"

function SVGMap({ initialMap }) {
  const router = useRouter()
  const { isMobile } = useSelector(deviceStore)
  const currentMap =
    router.query?.mapPath || initialMap

  const SVGProps = {
    currentMap,
  }

  return (
    <div className={clsx(!isMobile ? "col-12 p-0 col-lg-8" : "col p-0")}>
      <div
        className={clsx(
          "svg-container overflow-hidden",
          isMobile && "-mobile-version",
        )}
      >
        {currentMap === "africa" && <AfricaSVG {...SVGProps} />}
        {currentMap === "asia" && <AsiaSVG {...SVGProps} />}
        {currentMap === "europe" && <EuropeSVG {...SVGProps} />}
        {currentMap === "north-america" && <NorthAmericaSVG {...SVGProps} />}
        {currentMap === "south-america" && <SouthAmericaSVG {...SVGProps} />}
        {currentMap === "world" && <WorldSVG {...SVGProps} />}
      </div>
      <MapInstructions />
    </div>
  )
}

export default SVGMap

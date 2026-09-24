import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import {
  mapStore,
  removeCountryFromUsedColors,
  updateUsedColors,
} from "../../../redux/mapSlice"
import { store } from "../../../redux/store"
import AfricaSVG from "./maps/AfricaSVG"
import AsiaSVG from "./maps/AsiaSVG"
import EuropeSVG from "./maps/EuropeSVG"
import NorthAmericaSVG from "./maps/NorthAmericaSVG"
import SouthAmericaSVG from "./maps/SouthAmericaSVG"
import WorldSVG from "./maps/WorldSVG"
import clsx from "clsx"
import { deviceStore } from "../../../redux/deviceSlice"

function SVGMap({ initialMap }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const mapState = useSelector(mapStore)
  const { isMobile } = useSelector(deviceStore)
  const currentMap =
    mapState.currentMap || router.query?.mapPath || initialMap

  const SVGProps = {
    currentMap,
    store,
    dispatch,
    updateUsedColors,
    removeCountryFromUsedColors,
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
    </div>
  )
}

export default SVGMap

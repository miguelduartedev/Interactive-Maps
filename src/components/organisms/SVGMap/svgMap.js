import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import {
  initialState,
  mapStore,
  removeCountryFromUsedColors,
  updateCurrentCountry,
  updateUsedColors,
} from "../../../redux/mapSlice"
import { store } from "../../../redux/store"
import CountryProfile from "../../molecules/CountryProfile/countryProfile"
import { exists } from "../../_common"
import AfricaSVG from "./maps/AfricaSVG"
import AsiaSVG from "./maps/AsiaSVG"
import EuropeSVG from "./maps/EuropeSVG"
import NorthAmericaSVG from "./maps/NorthAmericaSVG"
import SouthAmericaSVG from "./maps/SouthAmericaSVG"
import WorldSVG from "./maps/WorldSVG"
import { fetchData } from "./utils"

function SVGMap() {
  const dispatch = useDispatch()
  const router = useRouter()
  const mapState = useSelector(mapStore)
  const [countryID, setCountryID] = useState("")
  const currentMap = exists(mapState.currentMap)
    ? mapState.currentMap
    : router.query?.mapPath

  const { currentCountry } = mapState
  const SVGProps = {
    currentMap,
    store,
    dispatch,
    updateUsedColors,
    removeCountryFromUsedColors,
    setCountryID,
  }

  const { data, status, refetch } = useQuery(
    ["country", { countryID, dispatch }],
    ({ queryKey }) => fetchData(queryKey[1].countryID),
    {
      enabled: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  )

  useEffect(() => {
    if (countryID !== "" && countryID !== mapState.currentMap) {
      return refetch()
    }
  }, [countryID])

  if (status === "loading") console.log("loading")
  if (status === "success") {
    if (mapState.currentCountry !== initialState.currentMap) {
      dispatch(updateCurrentCountry(data[0]))
      setCountryID("")
    }
  }

  return (
    <div className="col-12 col-lg-8">
      <div className="svg-container overflow-hidden">
        {currentMap === "africa" && <AfricaSVG {...SVGProps} />}
        {currentMap === "asia" && <AsiaSVG {...SVGProps} />}
        {currentMap === "europe" && <EuropeSVG {...SVGProps} />}
        {currentMap === "north-america" && <NorthAmericaSVG {...SVGProps} />}
        {currentMap === "south-america" && <SouthAmericaSVG {...SVGProps} />}
        {currentMap === "world" && <WorldSVG {...SVGProps} />}
      </div>
      <CountryProfile {...currentCountry} />
    </div>
  )
}

export default SVGMap

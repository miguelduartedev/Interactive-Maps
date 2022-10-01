import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  mapStore,
  removeCountryFromUsedColors,
  updateCurrentMap,
  updateUsedColors,
} from "../../../redux/mapSlice";
import { store } from "../../../redux/store";
import CountryProfile from "../../molecules/CountryProfile/countryProfile";
import { exists } from "../../_common";
import AfricaSVG from "./AfricaSVG";
import AsiaSVG from "./AsiaSVG";
import EuropeSVG from "./EuropeSVG";
import NorthAmericaSVG from "./NorthAmericaSVG";
import SouthAmericaSVG from "./SouthAmericaSVG";
import WorldSVG from "./WorldSVG";

const SVGMap = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const mapState = useSelector(mapStore);
  !exists(mapState.currentMap) &&
    dispatch(updateCurrentMap(router.query?.mapPath));
  const currentMap = exists(mapState.currentMap)
    ? mapState.currentMap
    : router.query?.mapPath;

  const currentCountry = mapState.currentCountry;
  const SVGProps = {
    currentMap,
    store,
    dispatch,
    updateUsedColors,
    removeCountryFromUsedColors,
  };

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
  );
};

export default SVGMap;

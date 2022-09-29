import { useRouter } from "next/router";
import panzoom from "panzoom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mapStore,
  removeCountryFromUsedColors,
  updateCurrentMap,
  updateUsedColors,
} from "../../../redux/mapSlice";
import { store } from "../../../redux/store";
import CountryProfile from "../../molecules/CountryProfile/countryProfile";
import { eventContainsID, exists } from "../../_common";
import AfricaSVG from "./AfricaSVG";
import AsiaSVG from "./AsiaSVG";
import EuropeSVG from "./EuropeSVG";
import NorthAmericaSVG from "./NorthAmericaSVG";
import SouthAmericaSVG from "./SouthAmericaSVG";
import {
  ClassClickHandler,
  ClassContextHandler,
  ClassHoverHandler,
  IDClickHandler,
  IDContextHandler,
  IDHoverHandler,
} from "./utils";
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

  useEffect(() => {
    // Handles the right click (paint action)
    document.getElementById(currentMap)?.addEventListener("click", (event) => {
      eventContainsID(event)
        ? IDClickHandler(
            event.path[0].id,
            currentMap,
            store,
            dispatch,
            updateUsedColors
          )
        : ClassClickHandler(
            event.path[0].classList[0],
            currentMap,
            store,
            dispatch,
            updateUsedColors
          );
    });
    // Handles the left click (clean action)
    document
      .getElementById(currentMap)
      ?.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        eventContainsID(event)
          ? IDContextHandler(
              event.path[0].id,
              store,
              dispatch,
              removeCountryFromUsedColors
            )
          : ClassContextHandler(
              event.path[0].classList[0],
              store,
              dispatch,
              removeCountryFromUsedColors
            );
      });
    // Handles the hover (country borders highlight)
    document
      .getElementById(currentMap)
      ?.addEventListener("mouseover", (event) => {
        eventContainsID(event)
          ? IDHoverHandler(event.path[0].id, currentMap)
          : ClassHoverHandler(event.path[0].classList, currentMap);
      });
    // Handles the drag and scroll (map position and axis)
    var element = document.querySelector(".interactive-map");
    panzoom(element, { step: 0.05 });
  }, [currentMap]);

  return (
    <div className="col-12 col-lg-8">
      <div className="svg-container overflow-hidden">
        {currentMap === "africa" && <AfricaSVG />}
        {currentMap === "asia" && <AsiaSVG />}
        {currentMap === "europe" && <EuropeSVG />}
        {currentMap === "north-america" && <NorthAmericaSVG />}
        {currentMap === "south-america" && <SouthAmericaSVG />}
        {currentMap === "world" && <WorldSVG />}
      </div>
      {CountryProfile(currentCountry)}
    </div>
  );
};

export default SVGMap;

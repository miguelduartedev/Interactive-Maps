import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  mapStore,
  removeCountryFromUsedColors,
  updateUsedColors,
} from "../../../redux/mapSlice";
import CountryProfile from "../../molecules/CountryProfile/countryProfile";
import "./styles/europeMap.scss";
import {
  ClassClickHandler,
  ClassHoverHandler,
  IDClickHandler,
  IDHoverHandler,
} from "./utils";
import { store } from "../../../redux/store";
import { exists } from "../../_common";
import EuropeSVG from "./EuropeSVG";
import AfricaSVG from "./AfricaSVG";
import AsiaSVG from "./AsiaSVG";
import WorldSVG from "./WorldSVG";
import NorthAmericaSVG from "./NorthAmericaSVG";
import SouthAmericaSVG from "./SouthAmericaSVG";

const SVGMap = () => {
  const dispatch = useDispatch();
  const mapState = useSelector(mapStore);
  const currentMap = mapState.currentMap;
  const currentCountry = mapState.currentCountry;

  useEffect(() => {
    document.getElementById(currentMap).addEventListener("click", (event) => {
      const isID = exists(event.path[0].id);
      isID
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
  }, [currentMap]);

  useEffect(() => {
    document
      .getElementById(currentMap)
      .addEventListener("contextmenu", (event) => {
        event.preventDefault();
        const countryID = event.path[0].id;
        const usedColors = store.getState().mapState.usedColors;
        exists(usedColors) &&
          Object.keys(usedColors).map((color) => {
            usedColors[color].appliesTo.includes(countryID) &&
              dispatch(
                removeCountryFromUsedColors({
                  color: color,
                  country: countryID,
                })
              );
            document.getElementById(event.path[0].id).style.fill = "#FFFFFF";
          });
      });
  }, []);

  useEffect(() => {
    document
      .getElementById(currentMap)
      .addEventListener("mouseover", (event) => {
        const isID = exists(event.path[0].id);
        isID
          ? IDHoverHandler(event.path[0].id, currentMap)
          : ClassHoverHandler(event.path[0].classList, currentMap);
      });
  }, []);

  return (
    <div className="col-12 col-lg-8">
      <div className="svg-container">
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

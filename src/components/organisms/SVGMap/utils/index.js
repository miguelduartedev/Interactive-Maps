import { updateCurrentCountry } from "../../../../redux/mapSlice";
import { exists } from "../../../_common";

export const fetchData = (countryCODE, dispatch) => {
  return fetch("https://restcountries.com/v3.1/alpha/" + countryCODE)
    .then((response) => response.json())
    .then((data) => dispatch(updateCurrentCountry(data[0])));
};

export const IDHoverHandler = (selected_country_code, currentMap) => {
  if (!selected_country_code.startsWith("map_")) {
    const isHoveringOutside = selected_country_code === currentMap;
    const previouslyHoveredCountry = [
      ...document.querySelectorAll(".hovered-country"),
    ];
    const currentlyHoveredCountry = document.getElementById(
      selected_country_code
    );
    if (!isHoveringOutside) {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        );
        currentlyHoveredCountry.classList.add("hovered-country");
      } else {
        currentlyHoveredCountry.classList.add("hovered-country");
      }
    } else {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        );
      }
    }
  }
};

export const ClassHoverHandler = (hoveredCountry, currentMap) => {
  const selected_country_code = hoveredCountry[0];

  if (!selected_country_code.startsWith("map_")) {
    const isHoveringOutside = selected_country_code === currentMap;
    const previouslyHoveredCountry = [
      ...document.querySelectorAll(".hovered-country"),
    ];
    const currentlyHoveredCountry = [
      ...document.querySelectorAll("." + selected_country_code),
    ];
    if (!isHoveringOutside) {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        );
        currentlyHoveredCountry.map((territories) =>
          territories.classList.add("hovered-country")
        );
      } else {
        currentlyHoveredCountry.map((territories) =>
          territories.classList.add("hovered-country")
        );
      }
    } else {
      if (previouslyHoveredCountry) {
        [...document.querySelectorAll("." + selected_country_code)].map(
          (territories) => territories.classList.remove("hovered-country")
        );
      }
    }
  }
};

export const IDClickHandler = (
  selected_country_code,
  currentMap,
  store,
  dispatch,
  updateUsedColors
) => {
  const color = store.getState().mapState.currentColor;
  const colorLegend = exists(store.getState().mapState.usedColors[color])
    ? store.getState().mapState.usedColors[color].legend
    : "";
  if (selected_country_code !== currentMap) {
    fetchData(selected_country_code, dispatch);
    const currentCountry = document.getElementById(selected_country_code);
    currentCountry.style.fill = color;
    currentCountry.classList = color;
    dispatch(
      updateUsedColors({
        [color]: {
          legend: colorLegend,
          appliesTo: selected_country_code,
        },
      })
    );
  }
};

export const ClassClickHandler = (
  selected_country_code,
  currentMap,
  store,
  dispatch,
  updateUsedColors
) => {
  const color = store.getState().mapState.currentColor;
  const colorLegend = exists(store.getState().mapState.usedColors[color])
    ? store.getState().mapState.usedColors[color].legend
    : "";

  if (selected_country_code !== currentMap) {
    fetchData(selected_country_code, dispatch);
    const currentCountry = [
      ...document.querySelectorAll(`.${selected_country_code}`),
    ];
    currentCountry.map((territories) => (territories.style.fill = color));
    currentCountry.map((territories) => territories.classList.add(color));
    dispatch(
      updateUsedColors({
        [color]: {
          legend: colorLegend,
          appliesTo: selected_country_code,
        },
      })
    );
  }
};

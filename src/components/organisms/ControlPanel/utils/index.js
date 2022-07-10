import {
  initialState,
  resetUsedColors,
  updateCurrentCountry,
  updateUsedColors,
} from "../../../../redux/mapSlice";

export const clearAll = (currentMap, dispatch) => {
  const allCountries = [
    ...document?.getElementById(currentMap)?.querySelectorAll("*[id]"),
    ...document?.getElementById(currentMap)?.querySelectorAll("*[class]"),
  ];
  allCountries.map((countryID) => (countryID.style.fill = "#FFFFFF"));
  document.getElementById("control-panel--map-title").value = "";
  dispatch(updateCurrentCountry(initialState.currentCountry));
  dispatch(resetUsedColors());
};

export const selectAll = (currentMap, currentColor, dispatch) => {
  const allCountryCodes = [];
  const allCountries = [
    ...document?.getElementById(currentMap)?.querySelectorAll("*[id]"),
    ...document?.getElementById(currentMap)?.querySelectorAll("*[class]"),
  ];
  allCountries?.map((countryID) => {
    if (countryID.id !== "map_title") {
      countryID.style.fill = currentColor;
      allCountryCodes.push(countryID.id);
    }
  });
  dispatch(
    updateUsedColors({
      [currentColor]: {
        legend: "",
        appliesTo: [...allCountryCodes],
      },
    })
  );
};

export const titleSetter = (text) => {
  document.getElementById("map_title").innerHTML = text;
};

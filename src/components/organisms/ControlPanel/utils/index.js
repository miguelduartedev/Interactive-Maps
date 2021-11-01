import {
  updateCurrentCountry,
  initialState,
  resetColorLegend,
  resetUsedColors,
  resetCounter,
} from "../../../../redux/mapSlice";

export const groupPicker = (group, currentColor, dispatch, group_data) => {
  clearAll(dispatch);
  group?.map(
    (countryID) =>
      (document.getElementById(countryID).style.fill = currentColor)
  );
  if (group_data) {
    dispatch(updateCurrentCountry(group_data));
  }
};

export const clearAll = (dispatch) => {
  const allCountries = document
    ?.getElementById("europe_map")
    ?.querySelectorAll("*[id]");
  [...allCountries].map((countryID) => (countryID.style.fill = "#FFFFFF"));
  dispatch(updateCurrentCountry(initialState.currentCountry));
  dispatch(resetColorLegend());
  dispatch(resetUsedColors());
  dispatch(resetCounter());
};

export const selectAll = (currentColor) => {
  const allCountries = document
    ?.getElementById("europe_map")
    ?.querySelectorAll("*[id]");
  [...allCountries]?.map((countryID) => (countryID.style.fill = currentColor));
};

export const titleSetter = (text) => {
  document.getElementById("map_title").innerHTML = text;
};

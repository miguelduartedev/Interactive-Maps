import {
  updateCurrentCountry,
  initialState,
  resetUsedColors,
  updateUsedColors,
} from "../../../../redux/mapSlice";

export const groupPicker = (group, currentColor, dispatch, group_data) => {
  clearAll(dispatch);
  group?.map(
    (countryID) =>
      (document.getElementById(countryID).style.fill = currentColor)
  );
  dispatch(
    updateUsedColors({
      [currentColor]: {
        legend: "",
        appliesTo: [...group],
      },
    })
  );
  group_data && dispatch(updateCurrentCountry(group_data));
};

export const clearAll = (dispatch) => {
  const allCountries = document
    ?.getElementById("europe")
    ?.querySelectorAll("*[id]");
  [...allCountries].map((countryID) => (countryID.style.fill = "#FFFFFF"));
  document.getElementById("control-panel--map-title").value = "";
  dispatch(updateCurrentCountry(initialState.currentCountry));
  dispatch(resetUsedColors());
};

export const selectAll = (currentColor, dispatch) => {
  const allCountryCodes = [];
  const allCountries = document
    ?.getElementById("europe")
    ?.querySelectorAll("*[id]");
  [...allCountries]?.map((countryID) => {
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

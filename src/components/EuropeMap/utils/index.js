export const groupPicker = (group, currentColor) => {
  group?.map(
    (countryID) =>
      (document.getElementById(countryID).style.fill = currentColor)
  );
};

export const clearAll = () => {
  const allCountries = document
    ?.getElementById("europe_map")
    ?.querySelectorAll("*[id]");
  [...allCountries].map((countryID) => (countryID.style.fill = "#FFFFFF"));
};

export const selectAll = (currentColor) => {
  const allCountries = document
    ?.getElementById("europe_map")
    ?.querySelectorAll("*[id]");
  [...allCountries]?.map((countryID) => (countryID.style.fill = currentColor));
};

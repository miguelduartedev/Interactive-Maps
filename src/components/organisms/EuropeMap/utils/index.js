import { updateCurrentCountry } from "../../../../redux/mapSlice";

export const fetchData = (countryCODE, dispatch) => {
  return fetch("https://restcountries.com/v3.1/alpha/" + countryCODE)
    .then((response) => response.json())
    .then((data) => dispatch(updateCurrentCountry(data[0])));
};

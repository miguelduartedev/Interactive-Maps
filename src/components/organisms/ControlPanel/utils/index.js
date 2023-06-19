import {
  initialState,
  resetUsedColors,
  updateCurrentCountry,
  updateTitle,
  updateUsedColors,
} from "../../../../redux/mapSlice"

export const clearAll = (currentMap, dispatch) => {
  const allCountries = [
    ...document?.getElementById(currentMap)?.querySelectorAll("*[id]"),
    ...document?.getElementById(currentMap)?.querySelectorAll("*[class]"),
  ]
  allCountries.map((countryID) => (countryID.style.fill = "#FFFFFF"))
  dispatch(updateTitle(""))
  dispatch(updateCurrentCountry(initialState.currentCountry))
  dispatch(resetUsedColors())
}

export const selectAll = (currentMap, currentColor, dispatch) => {
  const allCountryCodes = []
  const allCountries = [
    ...document?.getElementById(currentMap)?.querySelectorAll("*[id]"),
    ...document?.getElementById(currentMap)?.querySelectorAll("*[class]"),
  ]
  allCountries?.map((countryID) => {
    if (countryID.id !== "map_title") {
      countryID.style.fill = currentColor
      allCountryCodes.push(countryID.id)
    }
  })
  dispatch(
    updateUsedColors({
      [currentColor]: {
        legend: "",
        appliesTo: [...allCountryCodes],
      },
    }),
  )
}

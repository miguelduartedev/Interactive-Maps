import { removeUsedColor } from "../../../../redux/mapSlice"
import { exists } from "../../../_common"

export const fetchData = (countryCODE) => {
  return fetch("https://restcountries.com/v3.1/alpha/" + countryCODE).then(
    (response) => response.json()
  )
}

export const IDHoverHandler = (selected_country_code, currentMap) => {
  if (!selected_country_code.startsWith("map_")) {
    const isHoveringOutside = selected_country_code === currentMap
    const previouslyHoveredCountry = [
      ...document.querySelectorAll(".hovered-country"),
    ]
    const currentlyHoveredCountry = document.getElementById(
      selected_country_code
    )
    if (!isHoveringOutside) {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        )
        currentlyHoveredCountry.classList.add("hovered-country")
      } else {
        currentlyHoveredCountry.classList.add("hovered-country")
      }
    } else {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        )
      }
    }
  }
}

export const ClassHoverHandler = (hoveredCountry, currentMap) => {
  const selected_country_code = hoveredCountry[0]

  if (!selected_country_code.startsWith("map_")) {
    const isHoveringOutside = selected_country_code === currentMap
    const previouslyHoveredCountry = [
      ...document.querySelectorAll(".hovered-country"),
    ]
    const currentlyHoveredCountry = [
      ...document.querySelectorAll("." + selected_country_code),
    ]
    if (!isHoveringOutside) {
      if (previouslyHoveredCountry) {
        previouslyHoveredCountry.map((territories) =>
          territories.classList.remove("hovered-country")
        )
        currentlyHoveredCountry.map((territories) =>
          territories.classList.add("hovered-country")
        )
      } else {
        currentlyHoveredCountry.map((territories) =>
          territories.classList.add("hovered-country")
        )
      }
    } else {
      if (previouslyHoveredCountry) {
        ;[...document.querySelectorAll("." + selected_country_code)].map(
          (territories) => territories.classList.remove("hovered-country")
        )
      }
    }
  }
}

export const IDClickHandler = (
  selected_country_code,
  currentMap,
  store,
  dispatch,
  updateUsedColors
) => {
  const color = store.getState().mapState.currentColor
  const colorLegend = exists(store.getState().mapState.usedColors[color])
    ? store.getState().mapState.usedColors[color].legend
    : ""
  if (selected_country_code !== currentMap) {
    const currentCountry = document.getElementById(selected_country_code)
    currentCountry.style.fill = color
    currentCountry.classList = color
    dispatch(
      updateUsedColors({
        [color]: {
          legend: colorLegend,
          appliesTo: selected_country_code,
        },
      })
    )
  }
}

export const ClassClickHandler = (
  selected_country_code,
  currentMap,
  store,
  dispatch,
  updateUsedColors
) => {
  const color = store.getState().mapState.currentColor
  const colorLegend = exists(store.getState().mapState.usedColors[color])
    ? store.getState().mapState.usedColors[color].legend
    : ""

  if (selected_country_code !== currentMap) {
    const currentCountry = [
      ...document.querySelectorAll(`.${selected_country_code}`),
    ]
    currentCountry.map((territories) => (territories.style.fill = color))
    currentCountry.map((territories) => territories.classList.add(color))
    dispatch(
      updateUsedColors({
        [color]: {
          legend: colorLegend,
          appliesTo: selected_country_code,
        },
      })
    )
  }
}

export const IDContextHandler = (
  selected_country_code,
  store,
  dispatch,
  removeCountryFromUsedColors
) => {
  const usedColors = store.getState().mapState.usedColors
  exists(usedColors) &&
    Object.keys(usedColors).map((color) => {
      usedColors[color].appliesTo.includes(selected_country_code) &&
        dispatch(
          removeCountryFromUsedColors({
            color: color,
            country: selected_country_code,
          })
        )

      isColorStillInUse(usedColors, color, selected_country_code, dispatch)
      document.getElementById(selected_country_code).style.fill = "#FFFFFF"
    })
}

export const ClassContextHandler = (
  selected_country_code,
  store,
  dispatch,
  removeCountryFromUsedColors
) => {
  const currentCountry = [
    ...document.querySelectorAll(`.${selected_country_code}`),
  ]
  const usedColors = store.getState().mapState.usedColors
  exists(usedColors) &&
    Object.keys(usedColors).map((color) => {
      usedColors[color].appliesTo.includes(selected_country_code) &&
        dispatch(
          removeCountryFromUsedColors({
            color: color,
            country: selected_country_code,
          })
        )

      isColorStillInUse(usedColors, color, selected_country_code, dispatch)
      currentCountry.map((territories) => (territories.style.fill = "#FFFFFF"))
    })
}

const isColorStillInUse = (
  usedColors,
  color,
  selected_country_code,
  dispatch
) => {
  if (
    JSON.stringify(usedColors[color].appliesTo) ==
    JSON.stringify([selected_country_code])
  ) {
    dispatch(removeUsedColor(color))
  }
}

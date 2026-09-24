import { mapStore } from "../../../../redux/mapSlice"
import { removeCountryFromUsedColors } from "../../../../redux/mapSlice"
import { eventContainsID } from "../../../_common"
import { ClassClickHandler, IDClickHandler } from "../utils"

/**
 * Handles the user click event on the map.
 * If clicked path has an ID, sets the color to the selected country
 * Otherwise sets the color to all elements with the selected country's class
 *  */
const handleClick = (
  event,
  currentMap,
  store,
  dispatch,
  updateUsedColors,
) => {
  const identifier = eventContainsID(event)
    ? event.target.id
    : event.target.classList[0]
  const usedColors = Object.keys(mapStore(store.getState()).usedColors)
  usedColors.map((color) => {
    const usedColorAppliesTo =
      mapStore(store.getState()).usedColors[color].appliesTo
    // Checks if currently selected country already had a color applied to it
    // If so, removes the country from it's previous color
    if (usedColorAppliesTo.includes(identifier)) {
      dispatch(
        removeCountryFromUsedColors({ color: color, country: identifier }),
      )
    }
  })

  eventContainsID(event)
    ? IDClickHandler(identifier, currentMap, store, dispatch, updateUsedColors)
    : ClassClickHandler(
        identifier,
        currentMap,
        store,
        dispatch,
        updateUsedColors,
      )
}

export default handleClick

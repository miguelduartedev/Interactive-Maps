import { removeCountryFromUsedColors } from "../../../../redux/mapSlice"
import { eventContainsID } from "../../../_common"
import { ClassClickHandler, IDClickHandler } from "../utils"

/**
 * useClick is a custom react hook that handles the user click event on the map
 * If clicked path has an ID, sets the color to the selected country
 * Otherwise sets the color to all elements with the selected country's class
 *  */
const useClick = (
  event,
  currentMap,
  store,
  dispatch,
  updateUsedColors,
  setCountryID,
) => {
  const identifier = eventContainsID(event)
    ? event.target.id
    : event.target.classList[0]
  try {
    setCountryID(identifier)
  } catch (e) {
    console.log("Error: ", e)
  }

  const usedColors = Object.keys(store.getState().mapState.usedColors)
  usedColors.map((color) => {
    const usedColorAppliesTo =
      store.getState().mapState.usedColors[color].appliesTo
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

export default useClick

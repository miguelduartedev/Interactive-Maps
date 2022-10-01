import { eventContainsID } from "../../../_common";
import { ClassClickHandler, IDClickHandler } from "../utils";

/**
 * useClick is a custom react hook that handles the user click event on the map
 * If clicked path has an ID, sets the color to the selected country
 * Otherwise sets the color to all elements with the selected country's class
 *  */
const useClick = (event, currentMap, store, dispatch, updateUsedColors) => {
  eventContainsID(event)
    ? IDClickHandler(
        event.target.id,
        currentMap,
        store,
        dispatch,
        updateUsedColors
      )
    : ClassClickHandler(
        event.target.classList[0],
        currentMap,
        store,
        dispatch,
        updateUsedColors
      );
};

export default useClick;

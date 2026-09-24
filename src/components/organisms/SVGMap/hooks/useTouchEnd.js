import handleClick from "./useClick";
import handleContextMenu from "./useContextMenu";

/**
 * Handles the user touch event on the map.
 * * A long press clears the country through the context-menu handler.
 * * Otherwise the click handler selects the country.
 *  */
const handleTouchEnd = (
  action,
  event,
  currentMap,
  store,
  dispatch,
  updateUsedColors,
  removeCountryFromUsedColors
) => {
  action === "longpress"
    ? handleContextMenu(event, store, dispatch, removeCountryFromUsedColors)
    : handleClick(
        event,
        currentMap,
        store,
        dispatch,
        updateUsedColors
      );
};

export default handleTouchEnd;

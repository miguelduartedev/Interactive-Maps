import useClick from "./useClick";
import useContextMenu from "./useContextMenu";

/**
 * useTouchEnd is a custom react hook that handles the user touch event on the map
 * * If the user did a long press then the useContextMenu will be triggered and country will be cleared out
 * * Otherwise the useClick hook will be triggered and the country will be selected
 *  */
const useTouchEnd = (
  action,
  event,
  currentMap,
  store,
  dispatch,
  updateUsedColors,
  removeCountryFromUsedColors
) => {
  action === "longpress"
    ? useContextMenu(event, store, dispatch, removeCountryFromUsedColors)
    : useClick(event, currentMap, store, dispatch, updateUsedColors);
};

export default useTouchEnd;

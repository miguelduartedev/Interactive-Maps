import { eventContainsID } from "../../../_common";
import { ClassContextHandler, IDContextHandler } from "../utils";

/**
 * Handles the user context menu event on the map.
 * If clicked path has an ID, removes the color of the selected country
 * Otherwise removes the color to all elements with the selected country's class
 *  */
const handleContextMenu = (
  event,
  store,
  dispatch,
  removeCountryFromUsedColors
) => {
  event.preventDefault();
  eventContainsID(event)
    ? IDContextHandler(
        event.target.id,
        store,
        dispatch,
        removeCountryFromUsedColors
      )
    : ClassContextHandler(
        event.target.classList[0],
        store,
        dispatch,
        removeCountryFromUsedColors
      );
};

export default handleContextMenu;

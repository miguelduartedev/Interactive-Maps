import { eventContainsID } from "../../../_common";
import { ClassHoverHandler, IDHoverHandler } from "../utils";

/**
 * useMouseOver is a custom react hook that handles the user hover event on the map
 * Handles the highlighting of the country's borders on hover
 *  */
const useMouseOver = (event, currentMap) => {
  eventContainsID(event)
    ? IDHoverHandler(event.target.id, currentMap)
    : ClassHoverHandler(event.target.classList, currentMap);
};

export default useMouseOver;

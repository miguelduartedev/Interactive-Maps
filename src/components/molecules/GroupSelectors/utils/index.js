import {
  updateCurrentCountry,
  updateUsedColors,
} from "../../../../redux/mapSlice";
import { store } from "../../../../redux/store";
import {
  ClassClickHandler,
  IDClickHandler,
} from "../../../organisms/SVGMap/utils";
import { mapContainsID } from "../../../_common";

export const groupPicker = (currentMap, group, dispatch, group_data) => {
  group?.map((countryID) => {
    if (mapContainsID(countryID)) {
      IDClickHandler(
        countryID,
        currentMap,
        store,
        dispatch,
        updateUsedColors,
        false
      );
    } else {
      ClassClickHandler(
        countryID,
        currentMap,
        store,
        dispatch,
        updateUsedColors,
        false
      );
    }
  });

  group_data && dispatch(updateCurrentCountry(group_data));
};

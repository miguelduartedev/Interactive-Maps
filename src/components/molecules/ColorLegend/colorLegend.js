import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  mapStore,
  updateColorLegend,
  updateUsedColorsLegendV2,
} from "../../../redux/mapSlice";
import { exists } from "../../_common";
import "./styles/colorLegend.scss";

const ColorLegend = (dispatch) => {
  const mapState = useSelector(mapStore);
  const [colorLegend, setColorLegend] = useState({});
  let currentUsedColors = mapState.usedColors;

  useEffect(() => {
    if (exists(currentUsedColors)) {
      dispatch(updateColorLegend(colorLegend));
      console.log(colorLegend);
    }
  }, [colorLegend]);

  const ColorSetter = (color, e) => {
    setColorLegend({
      ...colorLegend,
      [color]: e.target.value,
    });
    dispatch(updateUsedColorsLegendV2({ [color]: e.target.value }));
  };

  return (
    exists(currentUsedColors) && (
      <div className="colorLegend">
        <h3 className="control-panel__header--second">Map Legend</h3>
        <div className="colorLegend__colors">
          {currentUsedColors.map((color) => {
            return (
              <div className="row colorLegend__colors__row">
                <div className="col-2 position-relative p-0 m-0">
                  <div
                    className="colorLegend__colors__circle"
                    style={{ boxShadow: `${color} 0px 0px 0px 15px inset` }}
                  ></div>
                </div>

                <div className="col-10 p-0 m-0">
                  <input
                    id={color}
                    type="text"
                    className="form-control -legend"
                    placeholder="Insert color legend"
                    maxLength="45"
                    defaultValue={colorLegend[color]}
                    onInput={(e) => ColorSetter(color, e)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ColorLegend;

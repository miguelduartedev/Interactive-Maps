import { useSelector } from "react-redux";
import { mapStore, updateUsedColorsLegend } from "../../../redux/mapSlice";
import { exists } from "../../_common";

const ColorLegend = ({ dispatch }) => {
  const mapState = useSelector(mapStore);
  let currentUsedColors = Object.keys(mapState.usedColors);

  const ColorSetter = (color, e) => {
    dispatch(updateUsedColorsLegend({ [color]: e.target.value }));
  };

  return (
    <div className="colorLegend">
      <h3 className="control-panel__header--second">Color Legend</h3>
      <div className="colorLegend__colors">
        {exists(currentUsedColors) ? (
          currentUsedColors.map((color, index) => {
            return (
              <div key={index} className="row colorLegend__colors__row">
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
                    defaultValue={mapState.usedColors[color].legend}
                    onInput={(e) => ColorSetter(color, e)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="row colorLegend__colors__row">
            <div className="col-2 position-relative p-0 m-0">
              <div className="colorLegend__colors__circle -disabled"></div>
            </div>

            <div className="col-10 p-0 m-0">
              <input
                id="#000000"
                type="text"
                className="form-control -legend -disabled"
                placeholder="Select a country"
                maxLength="45"
                disabled={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorLegend;

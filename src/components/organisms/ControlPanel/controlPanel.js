import ColorPicker from "../../molecules/ColorPicker/colorPicker";
import { clearAll, groupPicker, selectAll, titleSetter } from "./utils";
import { mapStore } from "../../../redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  nordics,
  benelux,
  western_europe,
  eastern_europe,
  southern_europe,
  northern_europe,
  european_union,
  eurozone,
  visegrad,
  baltics,
  EU_data,
  Eurozone_data,
  Nordics_data,
  Benelux_data,
  Visegrad_data,
  Baltic_data,
} from "./utils/globalVars";
import { saveSvgAsPng } from "save-svg-as-png";
import "./styles/controlPanel.scss";
import "../../atoms/Button/styles/button.scss";
import ColorLegend from "../../molecules/ColorLegend/colorLegend";

const ControlPanel = () => {
  const mapState = useSelector(mapStore);
  const dispatch = useDispatch();
  let currentColor = mapState.currentColor;

  return (
    <div className="col-12 mt-4 col-lg-4 mt-lg-0">
      <div className="control-panel">
        <h2 className="control-panel__header--main">Control Panel</h2>
        <h3 className="control-panel__header--second text-center">
          Color Picker
        </h3>
        {ColorPicker()}
        {ColorLegend(dispatch)}
        <h3 className="control-panel__header--second">Map Title</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Insert map title"
          maxLength="45"
          onInput={(e) => titleSetter(e.target.value)}
        />
        <h3 className="control-panel__header--second">Group Selectors</h3>
        <div className="control-panel__political-unions">
          <p>- Political Unions:</p>
          <button
            className="button"
            onClick={() =>
              groupPicker(european_union, currentColor, dispatch, EU_data)
            }
          >
            European Union
          </button>
          <button
            className="button"
            onClick={() =>
              groupPicker(eurozone, currentColor, dispatch, Eurozone_data)
            }
          >
            Eurozone
          </button>
          <button
            className="button"
            onClick={() =>
              groupPicker(nordics, currentColor, dispatch, Nordics_data)
            }
          >
            Nordics
          </button>
          <button
            className="button"
            onClick={() =>
              groupPicker(benelux, currentColor, dispatch, Benelux_data)
            }
          >
            Benelux
          </button>
          <button
            className="button"
            onClick={() =>
              groupPicker(visegrad, currentColor, dispatch, Visegrad_data)
            }
          >
            Visegrad
          </button>
          <button
            className="button"
            onClick={() =>
              groupPicker(baltics, currentColor, dispatch, Baltic_data)
            }
          >
            Baltic Assembly
          </button>
        </div>
        <div className="control-panel__geographic-positions">
          <p>
            - Geographic Positions (
            <a href="https://unstats.un.org/unsd/methodology/m49/">
              UN Definition
            </a>
            ):
          </p>
          <button
            className="button"
            onClick={() => groupPicker(western_europe, currentColor, dispatch)}
          >
            Western Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(eastern_europe, currentColor, dispatch)}
          >
            Eastern Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(northern_europe, currentColor, dispatch)}
          >
            Northern Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(southern_europe, currentColor, dispatch)}
          >
            Southern Europe
          </button>
        </div>
        <div className="control-panel__general-tools">
          <p className="control-panel__header--second">General Tools:</p>
          <button
            className="button -negative"
            onClick={() => clearAll(dispatch)}
          >
            Clear All
          </button>
          <button
            className="button -positive"
            onClick={() => selectAll(currentColor)}
          >
            Select All
          </button>
          <button
            className="button -neutral"
            onClick={() =>
              saveSvgAsPng(
                document.getElementById("europe_map"),
                "interactive_maps.png",
                { encoderOptions: 1, scale: 3 }
              )
            }
          >
            Export Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;

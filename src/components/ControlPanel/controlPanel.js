import ColorPicker from "../ColorPicker/colorPicker";
import "./controlPanel.scss";
import { clearAll, groupPicker, selectAll } from "../EuropeMap/utils/index.js";
import { mapStore } from "../../redux/mapSlice";
import { useSelector } from "react-redux";
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
} from "./utils";
import { saveSvgAsPng } from "save-svg-as-png";

const ControlPanel = () => {
  const mapState = useSelector(mapStore);
  let currentColor = mapState.currentColor;

  return (
    <div className="col-12 mt-4 col-lg-4 mt-lg-0">
      <div className="control-panel">
        <h2 className="control-panel__header--main">Control Panel</h2>
        {ColorPicker()}
        <h3 className="control-panel__header--second">Group Selectors</h3>
        <div className="control-panel__political-unions">
          <p>- Political Unions:</p>
          <button
            className="button"
            onClick={() => groupPicker(european_union, currentColor)}
          >
            European Union
          </button>
          <button
            className="button"
            onClick={() => groupPicker(eurozone, currentColor)}
          >
            Eurozone
          </button>
          <button
            className="button"
            onClick={() => groupPicker(nordics, currentColor)}
          >
            Nordics
          </button>
          <button
            className="button"
            onClick={() => groupPicker(benelux, currentColor)}
          >
            Benelux
          </button>
          <button
            className="button"
            onClick={() => groupPicker(visegrad, currentColor)}
          >
            Visegrad
          </button>
          <button
            className="button"
            onClick={() => groupPicker(baltics, currentColor)}
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
            onClick={() => groupPicker(western_europe, currentColor)}
          >
            Western Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(eastern_europe, currentColor)}
          >
            Eastern Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(northern_europe, currentColor)}
          >
            Northern Europe
          </button>
          <button
            className="button"
            onClick={() => groupPicker(southern_europe, currentColor)}
          >
            Southern Europe
          </button>
        </div>
        <div className="control-panel__general-tools">
          <p>- General Tools:</p>
          <button className="button -negative" onClick={() => clearAll()}>
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
                "interactive_maps.png"
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

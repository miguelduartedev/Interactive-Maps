import ColorPicker from "../../molecules/ColorPicker/colorPicker";
import { clearAll, groupPicker, selectAll, titleSetter } from "./utils";
import { mapStore } from "../../../redux/mapSlice";
import { useDispatch, useSelector } from "react-redux";
import * as globalVars from "./utils/globalVars";
import { saveSvgAsPng } from "save-svg-as-png";
import "./styles/controlPanel.scss";
import "../../atoms/Button/styles/button.scss";
import ColorLegend from "../../molecules/ColorLegend/colorLegend";
import { useEffect } from "react";

const ControlPanel = () => {
  const mapState = useSelector(mapStore);
  const dispatch = useDispatch();
  const { currentColor, currentMap } = mapState;

  useEffect(() => {
    if (currentMap === "europe") {
      document
        .getElementById("groups-accordion")
        .addEventListener("click", (e) => {
          const toOpen = e.target.dataset.bsTarget;
          if (e.target.className.includes("accordion-button")) {
            if (e.target.className.includes("collapsed")) {
              e.target.classList.remove("collapsed");
              document.querySelector(toOpen).classList.add("show");
            } else {
              e.target.classList.add("collapsed");
              document.querySelector(toOpen).classList.remove("show");
            }
          }
        });
    }
  }, []);

  return (
    <div className="col-12 mt-4 col-lg-4 mt-lg-0">
      <div className="control-panel">
        <h3 className="control-panel__header--second text-center">
          Color Picker
        </h3>
        {ColorPicker()}
        <div className="control-panel__map-title">
          <h3 className="control-panel__header--second">Map Title</h3>
          <input
            id="control-panel--map-title"
            type="text"
            className="form-control"
            placeholder="Insert map title"
            maxLength="27"
            onInput={(e) => titleSetter(e.target.value)}
          />
        </div>
        {ColorLegend(dispatch)}
        {currentMap === "europe" && (
          <div className="control-panel__political-unions">
            <h3 className="control-panel__header--second">Group Selectors</h3>

            <div className="accordion" id="groups-accordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Political Unions
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body text-center">
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.european_union,
                          currentColor,
                          dispatch,
                          globalVars.EU_data
                        )
                      }
                    >
                      European Union
                    </button>
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.eurozone,
                          currentColor,
                          dispatch,
                          globalVars.Eurozone_data
                        )
                      }
                    >
                      Eurozone
                    </button>
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.nordics,
                          currentColor,
                          dispatch,
                          globalVars.Nordics_data
                        )
                      }
                    >
                      Nordics
                    </button>
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.benelux,
                          currentColor,
                          dispatch,
                          globalVars.Benelux_data
                        )
                      }
                    >
                      Benelux
                    </button>
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.visegrad,
                          currentColor,
                          dispatch,
                          globalVars.Visegrad_data
                        )
                      }
                    >
                      Visegrad
                    </button>
                    <button
                      className="button"
                      onClick={() =>
                        groupPicker(
                          globalVars.baltics,
                          currentColor,
                          dispatch,
                          globalVars.Baltic_data
                        )
                      }
                    >
                      Baltic Assembly
                    </button>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Geographic Positions
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="text-center">
                      <button
                        className="button"
                        onClick={() =>
                          groupPicker(
                            globalVars.western_europe,
                            currentColor,
                            dispatch,
                            globalVars.no_data("Western Europe")
                          )
                        }
                      >
                        Western Europe
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          groupPicker(
                            globalVars.eastern_europe,
                            currentColor,
                            dispatch,
                            globalVars.no_data("Eastern Europe")
                          )
                        }
                      >
                        Eastern Europe
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          groupPicker(
                            globalVars.northern_europe,
                            currentColor,
                            dispatch,
                            globalVars.no_data("Northern Europe")
                          )
                        }
                      >
                        Northern Europe
                      </button>
                      <button
                        className="button"
                        onClick={() =>
                          groupPicker(
                            globalVars.southern_europe,
                            currentColor,
                            dispatch,
                            globalVars.no_data("Southern Europe")
                          )
                        }
                      >
                        Southern Europe
                      </button>
                    </div>
                    <p className="disclaimer text-center">
                      <a href="https://unstats.un.org/unsd/methodology/m49/">
                        UN Definition
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
            onClick={() => selectAll(currentColor, dispatch)}
          >
            Select All
          </button>
          <button
            className="button -neutral"
            onClick={() =>
              saveSvgAsPng(
                document.querySelector(".interactive-map"),
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

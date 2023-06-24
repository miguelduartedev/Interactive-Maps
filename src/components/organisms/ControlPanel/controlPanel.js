import { useDispatch, useSelector } from "react-redux"
import { saveSvgAsPng } from "save-svg-as-png"
import { mapStore, updateTitle } from "../../../redux/mapSlice"
import ColorLegend from "../../molecules/ColorLegend/colorLegend"
import ColorPicker from "../../molecules/ColorPicker/colorPicker"
import GroupSelectors from "../../molecules/GroupSelectors/groupSelectors"
import { clearAll, selectAll, titleSetter } from "./utils"
import { BrowserView } from "react-device-detect"
import debounce from "lodash.debounce"

const ControlPanel = () => {
  const mapState = useSelector(mapStore)
  const dispatch = useDispatch()
  const { currentColor, currentMap, mapTitle } = mapState

  const handleTitleChange = debounce((text) => {
    dispatch(updateTitle(text))
    document.getElementById("map_title").innerHTML = text
    // Perform desired action here after debounce delay
  }, 20) // Adjust the debounce delay as needed (e.g., 300 milliseconds)

  return (
    <div className="col-12 mt-4 col-lg-4 mt-lg-0 d-lg-block">
      <div className="control-panel">
        <h3 className="control-panel__header--second text-center">
          Color Picker
        </h3>
        <ColorPicker />
        <div className="control-panel__map-title">
          <h3 className="control-panel__header--second">Map Title</h3>
          <input
            id="control-panel--map-title"
            type="text"
            className="form-control"
            placeholder="Insert map title"
            maxLength={27}
            onInput={(e) => handleTitleChange(e?.target?.value)}
            value={mapTitle}
          />
        </div>
        <ColorLegend dispatch={dispatch} />

        <div className="control-panel__political-unions">
          <h3 className="control-panel__header--second">Group Selectors</h3>
          <GroupSelectors {...{ currentMap, dispatch }} />
        </div>

        <div className="control-panel__general-tools">
          <p className="control-panel__header--second">General Tools:</p>
          <button
            className="button -negative"
            onClick={() => clearAll(currentMap, dispatch)}
          >
            Clear All
          </button>
          <button
            className="button -positive"
            onClick={() => selectAll(currentMap, currentColor, dispatch)}
          >
            Select All
          </button>
          <button
            className="button -neutral"
            onClick={() =>
              saveSvgAsPng(
                document.querySelector(".interactive-map"),
                "interactive_maps.png",
                {
                  encoderOptions: 1,
                  scale: 3,
                  backgroundColor: "#102946",
                  /* 
                  This ensures that the exported PNG doesn't have the 
                  inline styles that the panzoom package injected on the SVG 
                  */
                  modifyCss: () =>
                    ".interactive-map {transform: unset !important}",
                },
              )
            }
          >
            Export Map
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel

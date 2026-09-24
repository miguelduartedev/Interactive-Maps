import { useEditorActions } from "../SVGMap/useEditorActions"
import { useDispatch, useSelector } from "react-redux"
import {
  Box,
  Modal as ModalUI,
} from "@mui/material"
import { exists } from "../../_common"
import { mapStore, updateTitle } from "../../../redux/mapSlice"
import ColorPicker from "../../molecules/ColorPicker/colorPicker"
import GroupSelectors from "../../molecules/GroupSelectors/groupSelectors"
import { modalStore, updateModal } from "../../../redux/modalSlice"
import ColorLegend from "../../molecules/ColorLegend/colorLegend"
import CloseIcon from "@mui/icons-material/Close"

const Modal = () => {
  const mapState = useSelector(mapStore)
  const modalState = useSelector(modalStore)
  const dispatch = useDispatch()
  const { currentMap, mapTitle } = mapState
  const { type } = modalState

  const actions = useEditorActions()
  const handleTitleChange = (text) => dispatch(updateTitle(text))

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "#FFFFFF",
    border: "1px solid #f5f5f5",
    borderRadius: "25px",
    padding: "20px",
    boxShadow: 24,
    p: 4,
    color: "black",
    maxHeight: "65dvh",
    overflowY: "scroll",
    overflowX: "hidden",
  }

  return (
    <div>
      <ModalUI
        open={exists(type)}
        onClose={() => dispatch(updateModal(""))}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
          <CloseIcon
            onClick={() => dispatch(updateModal(""))}
            sx={{ float: "right", marginBottom: "12px" }}
          />
          {type === "color-picker" && (
            <>
              <h3 className="control-panel__header--second text-center">
                Color Picker
              </h3>
              <ColorPicker />
            </>
          )}
          {type === "map-legend" && (
            <>
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
            </>
          )}
          {type === "actions" && (
            <>
              <div className="control-panel__political-unions">
                <h3 className="control-panel__header--second">
                  Group Selectors
                </h3>
                <GroupSelectors {...{ currentMap, dispatch }} />
              </div>
              <div className="control-panel__general-tools">
                <p className="control-panel__header--second">General Tools:</p>
                <button
                  className="button -negative"
                  onClick={() => actions.clear()}
                >
                  Clear All
                </button>
                <button
                  className="button -positive"
                  onClick={() => actions.selectAll()}
                >
                  Select All
                </button>
                <button
                  className="button -neutral"
                  onClick={actions.exportMap}
                >
                  Export Map
                </button>
              </div>
            </>
          )}
          {type === "tutorial" && (
            <>
              <h2 className="country__profile--header">
                Create your own custom map!
              </h2>
              <p className="country__profile--body">
                Now that you have your map selected, here are your customization
                options:
              </p>
              <ul className="country__profile--body">
                <li>
                  Select your desired color(s) through our <b>Color Picker</b>;
                </li>
                <li>
                  Click on the countries that you want to apply the color to;
                </li>
                <li>
                  Or alternatively select a <b>Political Block</b> or a{" "}
                  <b>Geographic Region</b>;
                </li>
                <li>
                  To <b>remove an assigned color</b>, do a long press on the
                  country;
                </li>
                <li>
                  Fill the <b>Map Title</b> and <b>Color Legend</b> fields in a
                  way that describes your data;
                </li>
                <li>
                  Once you&apos;re finished, you can proceed and{" "}
                  <b>Export the Map</b>.
                </li>
              </ul>
            </>
          )}
        </Box>
      </ModalUI>
    </div>
  )
}

export default Modal

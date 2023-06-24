import { useState } from "react"
import { CirclePicker, SketchPicker } from "react-color"
import { useDispatch, useSelector } from "react-redux"
import { mapStore, updateColor } from "../../../redux/mapSlice"
import { exists } from "../../_common"
import { modalStore, updateModal } from "../../../redux/modalSlice"

// TODO: DECOUPLE FROM MODAL
const ColorPicker = ({ inModal, setModalType }) => {
  const dispatch = useDispatch()
  const [color, setColor] = useState("#039606")
  const [displayPicker, setDisplayPicker] = useState(false)
  const mapState = useSelector(mapStore)
  const modalState = useSelector(modalStore)
  const currentColor = mapState.currentColor
  const type = modalState.type

  const colorSetter = (color) => {
    if (exists(color.hex)) {
      if (currentColor !== color.hex) {
        dispatch(updateColor(color.hex.toUpperCase()))
      }
    } else {
      if (currentColor !== color.toUpperCase()) {
        dispatch(updateColor(color.toUpperCase()))
      }
    }
  }

  const sketchPickerToggle = () => {
    if (!displayPicker) {
      setDisplayPicker(true)
    } else {
      setDisplayPicker(false)
    }
  }

  return (
    <>
      <CirclePicker
        color={color.hex}
        onChange={setColor}
        colors={[
          "#C8E6C9",
          "#81C784",
          "#4C9F50",
          "#388E3C",
          "#007A31",
          "#006F2C",
          "#005924",

          "#BBD3FB",
          "#64B5F6",
          "#2196F3",
          "#1976D2",
          "#0D4FA1",
          "#0A3D7D",
          "#072B58",

          "#FFCDD2",
          "#E57373",
          "#F44336",
          "#D32F2F",
          "#B71C1C",
          "#951717",
          "#731212",

          "#E1BEE7",
          "#BA68C8",
          "#9C27B0",
          "#7B1FA2",
          "#621981",
          "#491260",
          "#300C3F",

          "#FFF9C4",
          "#FFF176",
          "#FFEB3B",
          "#FBC02D",
          "#FF9800",
          "#F57F17",
          "#DB6C09",
        ]}
        onClick={colorSetter(color)}
      />
      <div className="text-center">
        <button
          className="button"
          onClick={() => {
            sketchPickerToggle()
          }}
        >
          {displayPicker === false ? "More Colors" : "Close Picker"}
        </button>
      </div>

      {displayPicker === true && (
        <SketchPicker
          color={color.hex}
          onChange={setColor}
          onClick={colorSetter(color)}
        />
      )}
    </>
  )
}

export default ColorPicker

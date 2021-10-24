import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch } from "react-redux";
import { updateColor } from "../../../redux/mapSlice";
import "./styles/colorPicker.scss";

const ColorPicker = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState("#039606");

  const colorSetter = (color) => {
    dispatch(updateColor(color));
  };

  return (
    <HexColorPicker
      color={color}
      onChange={setColor}
      onClick={() => colorSetter(color)}
    />
  );
};

export default ColorPicker;

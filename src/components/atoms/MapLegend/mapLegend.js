import { useSelector } from "react-redux";
import { mapStore } from "../../../redux/mapSlice";
import { exists } from "../../_common";

const MapLegend = () => {
  const mapState = useSelector(mapStore);
  const usedColors = mapState.usedColors;
  return (
    exists(usedColors) && (
      <>
        {Object.keys(usedColors).map(
          (color, index) =>
            exists(usedColors[color].legend) && (
              <g>
                <circle
                  xmlns="http://www.w3.org/2000/svg"
                  /* style="" */
                  style={{ fill: `${color}` }}
                  id="path1132"
                  cx="60"
                  cy={280 + index * 30}
                  r="9"
                  x="60"
                  y={280 + index * 30}
                />
                <text
                  id="path1133"
                  className="mapLegend__text"
                  style={{ fontSize: "16px" }}
                  font-family="Helvetica, sans-serif"
                  fontVariant="all-petite-caps"
                  textRendering="geometricPrecision"
                  textShadow="0px 4px 3px rgba(0,0,0,0.4),
              0px 8px 13px rgba(0,0,0,0.1),
              0px 18px 23px rgba(0,0,0,0.1);"
                  x={60 + 20}
                  y={284.7 + index * 30}
                >
                  {usedColors[color].legend}
                </text>
              </g>
            )
        )}
      </>
    )
  );
};

export default MapLegend;

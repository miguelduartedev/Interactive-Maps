import { useSelector } from "react-redux";
import { mapStore } from "../../../redux/mapSlice";
import { exists } from "../../_common";

const MapLegend = () => {
  const mapState = useSelector(mapStore);
  const usedColors = mapState.usedColors;
  const europeMapConfig = {
    titleYAxis: 85,
    titleXAxis: 51,
    legendYAxis: 280,
    legendXAxis: 60,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  const africaMapConfig = {
    titleYAxis: 345,
    titleXAxis: 51,
    legendYAxis: 375,
    legendXAxis: 60,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  const worldMapConfig = {
    titleYAxis: 380,
    titleXAxis: 50,
    legendYAxis: 420,
    legendXAxis: 60,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  const northAmericaMapConfig = {
    titleYAxis: 280,
    titleXAxis: 41,
    legendYAxis: 320,
    legendXAxis: 50,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  const southAmericaMapConfig = {
    titleYAxis: 280,
    titleXAxis: 40,
    legendYAxis: 320,
    legendXAxis: 50,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  const asiaMapConfig = {
    titleYAxis: 425,
    titleXAxis: 40,
    legendYAxis: 455,
    legendXAxis: 50,
    legendFontSize: 16,
    legendCircleSize: 9,
    legendGap: 30,
  };
  let mapLegendConfig;
  const currentMap = mapState.currentMap;
  switch (currentMap) {
    case "europe":
      mapLegendConfig = europeMapConfig;
      break;
    case "africa":
      mapLegendConfig = africaMapConfig;
      break;
    case "world":
      mapLegendConfig = worldMapConfig;
      break;
    case "north-america": {
      mapLegendConfig = northAmericaMapConfig;
      break;
    }
    case "south-america": {
      mapLegendConfig = southAmericaMapConfig;
      break;
    }
    case "asia": {
      mapLegendConfig = asiaMapConfig;
      break;
    }
    default:
      break;
  }
  return (
    <>
      <text
        id="map_title"
        className="mapLegend__title"
        x={mapLegendConfig.titleXAxis}
        y={mapLegendConfig.titleYAxis}
        fill="white"
        style={{ fontSize: mapLegendConfig.legendFontSize }}
        fontVariant="all-petite-caps"
        textRendering="geometricPrecision"
        textshadow="0px 4px 3px rgba(0,0,0,0.4),
      0px 8px 13px rgba(0,0,0,0.1),
      0px 18px 23px rgba(0,0,0,0.1);"
        fontFamily="Helvetica, sans-serif"
      ></text>
      {exists(usedColors) &&
        Object.keys(usedColors).map(
          (color, index) =>
            exists(usedColors[color].legend) && (
              <g>
                <circle
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fill: `${color}` }}
                  id="path1132"
                  cx={mapLegendConfig.legendXAxis}
                  cy={
                    mapLegendConfig.legendYAxis +
                    index * mapLegendConfig.legendGap
                  }
                  r={mapLegendConfig.legendCircleSize}
                  x={mapLegendConfig.legendXAxis}
                  y={
                    mapLegendConfig.legendYAxis +
                    index * mapLegendConfig.legendGap
                  }
                />
                <text
                  id={`map_legend + ${index}`}
                  className="mapLegend__text"
                  style={{ fontSize: mapLegendConfig.legendFontSize }}
                  fontFamily="Helvetica, sans-serif"
                  fontVariant="all-petite-caps"
                  textRendering="geometricPrecision"
                  textshadow="0px 4px 3px rgba(0,0,0,0.4),
              0px 8px 13px rgba(0,0,0,0.1),
              0px 18px 23px rgba(0,0,0,0.1);"
                  x={mapLegendConfig.legendXAxis + 20}
                  y={
                    mapLegendConfig.legendYAxis +
                    4.7 +
                    mapLegendConfig.legendGap * index
                  }
                >
                  {usedColors[color].legend}
                </text>
              </g>
            )
        )}
    </>
  );
};

export default MapLegend;

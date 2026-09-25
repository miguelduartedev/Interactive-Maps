import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { mapStore, updateUsedColorsLegend } from "../../../redux/mapSlice"

export default function LegendControl() {
  const dispatch = useAppDispatch()
  const usedColors = useAppSelector(mapStore).usedColors
  const colors = Object.keys(usedColors)

  if (colors.length === 0) {
    return <p className="legend-control__empty">Color a country to create a legend item.</p>
  }

  return (
    <div className="legend-control">
      {colors.map((color, index) => (
        <div className="legend-control__row" key={color}>
          <span className="legend-control__swatch" style={{ backgroundColor: color }} aria-hidden="true" />
          <label className="sr-only" htmlFor={`studio-legend-${index}`}>
            Legend label for {color}
          </label>
          <input
            id={`studio-legend-${index}`}
            type="text"
            maxLength={45}
            placeholder="Describe this color"
            value={usedColors[color].legend}
            onChange={(event) => dispatch(updateUsedColorsLegend({ [color]: event.target.value }))}
          />
        </div>
      ))}
    </div>
  )
}

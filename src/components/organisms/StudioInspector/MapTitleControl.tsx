import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { updateTitle } from "../../../redux/mapSlice"

export default function MapTitleControl() {
  const dispatch = useAppDispatch()
  const mapTitle = useAppSelector((state) => state.mapState.mapTitle)

  return (
    <div className="inspector-field">
      <label htmlFor="studio-map-title">Map title</label>
      <input
        id="studio-map-title"
        type="text"
        maxLength={27}
        placeholder="Insert map title"
        value={mapTitle}
        onChange={(event) => dispatch(updateTitle(event.target.value))}
      />
      <span className="inspector-field__count" aria-hidden="true">
        {mapTitle.length}/27
      </span>
    </div>
  )
}

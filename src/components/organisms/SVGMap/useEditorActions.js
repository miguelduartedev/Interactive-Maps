import { useDispatch, useSelector } from "react-redux"
import { applyGroup, clearMap, selectCountries } from "../../../redux/mapSlice"
import { useMapEditor } from "./MapEditorContext"
import { clearAll, selectAll } from "../ControlPanel/utils"
import { groupPicker } from "../../molecules/GroupSelectors/utils"

// The legacy branches keep the five unconverted maps usable during the Europe gate.
export function useEditorActions() {
  const editor = useMapEditor()
  const dispatch = useDispatch()
  const { currentMap, currentColor } = useSelector((state) => state.mapState)
  return {
    clear: () => editor.canvas.current
      ? dispatch(clearMap()) : clearAll(currentMap, dispatch),
    selectAll: () => editor.canvas.current
      ? dispatch(selectCountries(editor.canvas.current.countries))
      : selectAll(currentMap, currentColor, dispatch),
    group: (countries, combine) => editor.canvas.current
      ? dispatch(applyGroup({ countries, combine, availableCountries: editor.canvas.current.countries }))
      : groupPicker(currentMap, countries, dispatch, combine),
    exportMap: editor.exportMap,
  }
}

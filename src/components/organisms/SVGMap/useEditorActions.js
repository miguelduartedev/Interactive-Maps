import { useDispatch } from "react-redux"
import { applyGroup, clearMap, selectCountries } from "../../../redux/mapSlice"
import { useMapEditor } from "./MapEditorContext"
export function useEditorActions() {
  const editor = useMapEditor()
  const dispatch = useDispatch()
  return {
    clear: () => dispatch(clearMap()),
    selectAll: () => editor.canvas.current &&
      dispatch(selectCountries(editor.canvas.current.countries)),
    group: (countries, combine) => editor.canvas.current &&
      dispatch(applyGroup({ countries, combine, availableCountries: editor.canvas.current.countries })),
    exportMap: editor.exportMap,
  }
}

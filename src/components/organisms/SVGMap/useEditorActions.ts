import { useAppDispatch } from "../../../redux/hooks"
import { applyGroup, clearMap, selectCountries } from "../../../redux/mapSlice"
import type { CountryId, EditorActions } from "../../../types/editor"
import { useMapEditor } from "./MapEditorContext"

export function useEditorActions(): EditorActions {
  const editor = useMapEditor()
  const dispatch = useAppDispatch()

  return {
    clear: () => {
      dispatch(clearMap())
    },
    selectAll: () => {
      const canvas = editor.canvas.current
      if (canvas) dispatch(selectCountries(canvas.countries))
    },
    group: (countries: CountryId[], combine: boolean) => {
      const canvas = editor.canvas.current
      if (canvas) {
        dispatch(applyGroup({
          countries,
          combine,
          availableCountries: canvas.countries,
        }))
      }
    },
    exportMap: editor.exportMap,
  }
}

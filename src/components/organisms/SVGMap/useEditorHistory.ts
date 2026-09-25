import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
  beginDocumentTextEdit,
  commitDocumentTextEdit,
  redoDocument,
  undoDocument,
} from "../../../redux/editorHistory"
import { documentsEqual, snapshotDocument } from "../../../redux/historySlice"
import type { MapRoute } from "../../../types/editor"

interface EditorHistoryControls {
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
}

export function useEditorHistory(): EditorHistoryControls {
  const dispatch = useAppDispatch()
  const pendingTextEdit = useAppSelector((state) => {
    const active = state.editorHistory.activeTextEdit
    return Boolean(
      active &&
      active.currentMap === state.mapState.currentMap &&
      !documentsEqual(active.baseline, snapshotDocument(state.mapState)),
    )
  })
  const hasPast = useAppSelector((state) => state.editorHistory.past.length > 0)
  const hasFuture = useAppSelector((state) => state.editorHistory.future.length > 0)
  const undo = useCallback(() => dispatch(undoDocument()), [dispatch])
  const redo = useCallback(() => dispatch(redoDocument()), [dispatch])

  return {
    canUndo: hasPast || pendingTextEdit,
    canRedo: hasFuture && !pendingTextEdit,
    undo,
    redo,
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(target.closest(
    "input, textarea, [contenteditable]:not([contenteditable='false'])",
  ))
}

export function useEditorHistoryShortcuts({
  canUndo,
  canRedo,
  undo,
  redo,
}: EditorHistoryControls) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target) || event.altKey) return
      const key = event.key.toLowerCase()
      const commandModifier = event.metaKey || event.ctrlKey
      if (!commandModifier) return

      const redoWithZ = key === "z" && event.shiftKey
      const redoWithY = key === "y" && event.ctrlKey && !event.metaKey
      if ((redoWithZ || redoWithY) && canRedo) {
        event.preventDefault()
        redo()
      } else if (key === "z" && !event.shiftKey && canUndo) {
        event.preventDefault()
        undo()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [canRedo, canUndo, redo, undo])
}

export function useDocumentTextHistory(fieldId: string) {
  const dispatch = useAppDispatch()
  const sessionMap = useRef<MapRoute | null>(null)

  const begin = useCallback(() => {
    sessionMap.current = dispatch(beginDocumentTextEdit(fieldId))
  }, [dispatch, fieldId])

  const commit = useCallback(() => {
    const currentMap = sessionMap.current
    sessionMap.current = null
    if (currentMap) dispatch(commitDocumentTextEdit(fieldId, currentMap))
  }, [dispatch, fieldId])

  useEffect(() => () => commit(), [commit])

  return { onFocus: begin, onBlur: commit }
}

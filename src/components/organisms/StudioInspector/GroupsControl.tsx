import { useState } from "react"
import type { CountryId, MapRoute } from "../../../types/editor"
import { geographicGroupings, politicalGroupings } from "../../../data/mapGroupings"
import { useEditorActions } from "../SVGMap/useEditorActions"

interface GroupDefinition {
  name: string
  countries: CountryId[]
}

interface GroupsControlProps {
  combineGroups: boolean
  currentMap: MapRoute
  onCombineGroupsChange: (combine: boolean) => void
}

interface GroupListProps {
  groups: GroupDefinition[]
  label: string
  open: boolean
  onToggle: () => void
  onApply: (countries: CountryId[]) => void
}

function GroupList({ groups, label, open, onApply, onToggle }: GroupListProps) {
  const contentId = `studio-${label.toLowerCase().replaceAll(" ", "-")}`

  return (
    <div className="groups-control__list">
      <button
        type="button"
        className="groups-control__disclosure"
        aria-controls={contentId}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{label}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d={open ? "M5 15l7-7 7 7" : "M5 9l7 7 7-7"} />
        </svg>
      </button>
      {open ? (
        <div id={contentId} className="groups-control__items">
          {groups.map(({ name, countries }) => (
            <button key={name} type="button" onClick={() => onApply(countries)}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 1 0 0-6m-8 9c-3.314 0-6 2.239-6 5v2h12v-2c0-2.761-2.686-5-6-5Zm8-1c3.314 0 6 2.239 6 5v2h-6" />
              </svg>
              <span>{name}</span>
              <svg className="groups-control__arrow" aria-hidden="true" viewBox="0 0 24 24">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function GroupsControl({
  combineGroups,
  currentMap,
  onCombineGroupsChange,
}: GroupsControlProps) {
  const actions = useEditorActions()
  const [politicalOpen, setPoliticalOpen] = useState(true)
  const [geographicOpen, setGeographicOpen] = useState(false)
  // The grouping dataset remains legacy JavaScript; this is its only typed boundary.
  const political = (politicalGroupings(currentMap) ?? []) as GroupDefinition[]
  const geographic = (geographicGroupings(currentMap) ?? []) as GroupDefinition[]

  const applyGroup = (countries: CountryId[]) => actions.group(countries, combineGroups)

  return (
    <div className="groups-control">
      <label className="groups-control__combine" htmlFor="studio-combine-groups">
        <span>
          <strong>Combine groups</strong>
          <small>Keep existing colors when another group is applied.</small>
        </span>
        <span className="groups-control__switch">
          <input
            id="studio-combine-groups"
            type="checkbox"
            aria-label="Combine groups"
            checked={combineGroups}
            onChange={(event) => onCombineGroupsChange(event.target.checked)}
          />
          <span aria-hidden="true" />
        </span>
      </label>

      <GroupList
        groups={political}
        label="Political Blocs"
        open={politicalOpen}
        onApply={applyGroup}
        onToggle={() => setPoliticalOpen((open) => !open)}
      />
      <GroupList
        groups={geographic}
        label="Geographic Regions"
        open={geographicOpen}
        onApply={applyGroup}
        onToggle={() => setGeographicOpen((open) => !open)}
      />
      {geographicOpen ? (
        <a
          className="groups-control__source"
          href="https://unstats.un.org/unsd/methodology/m49/"
          target="_blank"
          rel="noreferrer"
        >
          UN geographic definitions
        </a>
      ) : null}
    </div>
  )
}

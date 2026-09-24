import clsx from "clsx"
import { useState } from "react"
import {
  geographicGroupings,
  politicalGroupings,
} from "../../organisms/ControlPanel/utils/globalVars"
import { useEditorActions } from "../../organisms/SVGMap/useEditorActions"
import Switch from "@mui/material/Switch"
import { FormGroup } from "react-bootstrap"
import { FormControlLabel } from "@mui/material"

const GroupSelectors = ({ currentMap }) => {
  const actions = useEditorActions()
  const [accordionOneOpen, setAccordionOneOpen] = useState(false)
  const [accordionTwoOpen, setAccordionTwoOpen] = useState(false)
  const [aggregateGroups, setAggregateGroups] = useState(false)
  return (
    <>
      <div className="accordion mb-2" id="groups-accordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={clsx(
                "accordion-button",
                accordionOneOpen ? "show" : "collapsed",
              )}
              onClick={() => setAccordionOneOpen(!accordionOneOpen)}
              type="button"
            >
              Political Blocs
            </button>
          </h2>
          <div
            className={clsx(
              "accordion-collapse collapse",
              accordionOneOpen && "show",
            )}
          >
            <div className="accordion-body text-center">
              {politicalGroupings(currentMap)?.map(
                ({ name, countries }, index) => (
                  <button
                    className="button"
                    key={index}
                    onClick={() =>
                      actions.group(countries, aggregateGroups)
                    }
                  >
                    {name}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={clsx(
                "accordion-button",
                accordionTwoOpen ? "show" : "collapsed",
              )}
              onClick={() => setAccordionTwoOpen(!accordionTwoOpen)}
              type="button"
            >
              Geographic Regions
            </button>
          </h2>
          <div
            id="collapseTwo"
            className={clsx(
              "accordion-collapse collapse",
              accordionTwoOpen && "show",
            )}
          >
            <div className="accordion-body text-center">
              {geographicGroupings(currentMap)?.map(
                ({ name, countries }, index) => (
                  <button
                    className="button"
                    key={index}
                    onClick={() =>
                      actions.group(countries, aggregateGroups)
                    }
                  >
                    {name}
                  </button>
                ),
              )}

              <p className="disclaimer text-center">
                <a
                  href="https://unstats.un.org/unsd/methodology/m49/"
                  target="_blank"
                  rel="noreferrer"
                >
                  UN Definition
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch onChange={() => setAggregateGroups(!aggregateGroups)} />
          }
          label="Combine Groups"
        />
      </FormGroup>
    </>
  )
}

export default GroupSelectors

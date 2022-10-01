import clsx from "clsx";
import { useState } from "react";
import {
  geographicGroupings,
  politicalGroupings,
} from "../../organisms/ControlPanel/utils/globalVars";
import { groupPicker } from "./utils";

const GroupSelectors = ({ currentMap, dispatch }) => {
  const [accordionOneOpen, setAccordionOneOpen] = useState(false);
  const [accordionTwoOpen, setAccordionTwoOpen] = useState(false);

  return (
    <div className="accordion" id="groups-accordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={clsx(
              "accordion-button",
              accordionOneOpen ? "show" : "collapsed"
            )}
            onClick={() => setAccordionOneOpen(!accordionOneOpen)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Political Blocs
          </button>
        </h2>
        <div
          id="collapseOne"
          className={clsx(
            "accordion-collapse collapse",
            accordionOneOpen && "show"
          )}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body text-center">
            {politicalGroupings(currentMap)?.map(
              ({ name, countries, data }, index) => (
                <button
                  className="button"
                  key={index}
                  onClick={() =>
                    groupPicker(currentMap, countries, dispatch, data)
                  }
                >
                  {name}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className={clsx(
              "accordion-button",
              accordionTwoOpen ? "show" : "collapsed"
            )}
            onClick={() => setAccordionTwoOpen(!accordionTwoOpen)}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Geographic Regions
          </button>
        </h2>
        <div
          id="collapseTwo"
          className={clsx(
            "accordion-collapse collapse",
            accordionTwoOpen && "show"
          )}
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body text-center">
            {geographicGroupings(currentMap)?.map(
              ({ name, countries, data }, index) => (
                <button
                  className="button"
                  key={index}
                  onClick={() =>
                    groupPicker(currentMap, countries, dispatch, data)
                  }
                >
                  {name}
                </button>
              )
            )}

            <p className="disclaimer text-center">
              <a href="https://unstats.un.org/unsd/methodology/m49/">
                UN Definition
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupSelectors;

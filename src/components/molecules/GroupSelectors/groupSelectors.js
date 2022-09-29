import {
  geographicGroupings,
  politicalGroupings,
} from "../../organisms/ControlPanel/utils/globalVars";
import { groupPicker } from "./utils";

const GroupSelectors = ({ currentMap, dispatch }) => {
  return (
    <div className="accordion" id="groups-accordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
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
          className="accordion-collapse collapse"
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
            className="accordion-button collapsed"
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
          className="accordion-collapse collapse"
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

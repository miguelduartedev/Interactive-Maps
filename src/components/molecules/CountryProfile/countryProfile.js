import { numberWithCommas } from "./utils"

import { exists } from "../../_common"
import { BrowserView, MobileView } from "react-device-detect"

const CountryProfile = (currentCountry) => {
  return (
    <div className="country__profile mt-4 d-none d-lg-block">
      {currentCountry?.name?.official !== "" ? (
        <div className="row">
          <div className="col-8">
            <p>
              <span className="country__profile--category">Selected:</span>{" "}
              {currentCountry?.name?.common}
            </p>
            <p>
              <span className="country__profile--category">Official Name:</span>{" "}
              {currentCountry?.name?.official}
            </p>
            <p>
              <span className="country__profile--category">Capital:</span>{" "}
              {currentCountry?.capital}
            </p>
            <p>
              <span className="country__profile--category">Population:</span>{" "}
              {currentCountry?.population > 0 &&
                numberWithCommas(currentCountry?.population)}
            </p>
            <p>
              <span className="country__profile--category">Currency:</span>{" "}
              {exists(currentCountry?.currencies) &&
                currentCountry.currencies[
                  Object.keys(currentCountry?.currencies)[0]
                ].name}
            </p>
            <p>
              <span className="country__profile--category">Language:</span>{" "}
              {exists(currentCountry?.languages) &&
                Object.keys(currentCountry?.languages).map((lang, index) => {
                  if (Object.keys(currentCountry?.languages).length > 1) {
                    if (
                      Object.keys(currentCountry?.languages).length !==
                      index + 1
                    ) {
                      if (
                        Object.keys(currentCountry?.languages).length - 2 ===
                        index
                      ) {
                        return currentCountry?.languages[lang]
                      } else {
                        return `${currentCountry?.languages[lang]}, `
                      }
                    } else {
                      return ` and ${currentCountry?.languages[lang]}`
                    }
                  } else {
                    return currentCountry?.languages[lang]
                  }
                })}
            </p>
          </div>
          <div className="col-4">
            <div className="text-center">
              <img
                className="country__profile--flag"
                src={currentCountry?.flags?.svg}
                alt={`${currentCountry?.name?.common}'s flag'`}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="country__profile--header">
            Create your own custom map!
          </h2>
          <p className="country__profile--body">
            Now that you have your map selected, here are your customization
            options:
          </p>
          <ul className="country__profile--body">
            <li>
              Select your desired color(s) through our <b>Color Picker</b>;
            </li>
            <li>Click on the countries that you want to apply the color to;</li>
            <li>
              Or alternatively select a <b>Political Block</b> or a{" "}
              <b>Geographic Region</b>;
            </li>
            <li>
              <BrowserView>
                To <b>remove an assigned color</b>, right click on the country;
              </BrowserView>
              <MobileView>
                To <b>remove an assigned color</b>, do a long press on the
                country;
              </MobileView>
            </li>
            <BrowserView>
              <li>
                In order to <b>Zoom</b> and/or <b>Drag</b> the map, press and
                hold the <i>Alt</i> (Windows) or <i>Option</i> (Mac) key and
                simultaneously use your mouse/trackpad to scroll and drag.
                Alternatively, you can click on the map and use the + and - keys
                to zoom and the arrow keys to change the map position;
              </li>
            </BrowserView>
            <li>
              Fill the <b>Map Title</b> and <b>Color Legend</b> fields in a way
              that describes your data;
            </li>
            <li>
              Once you're finished, you can proceed and <b>Export the Map</b>.
            </li>
          </ul>
        </>
      )}
    </div>
  )
}

export default CountryProfile

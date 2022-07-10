import { numberWithCommas } from "./utils";

import { exists } from "../../_common";

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
                        return currentCountry?.languages[lang];
                      } else {
                        return `${currentCountry?.languages[lang]}, `;
                      }
                    } else {
                      return ` and ${currentCountry?.languages[lang]}`;
                    }
                  } else {
                    return currentCountry?.languages[lang];
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
          <p>
            Now that you have your map selected, here are your customization
            options:
          </p>
          <ul>
            <li>
              Select your desired color(s) through our <b>Color Picker</b>
            </li>
            <li>Click on the countries that you want to apply the color to</li>
            <li>
              Or alternatively select a <b>Political Block</b> or a{" "}
              <b>Geographic Region</b>
            </li>
            <li>
              You can remove the color that has been assigned to a country by
              right clicking on the country
            </li>
            <li>
              You can zoom with the mouse wheel and drag the map to change it's
              position
            </li>
            <li>
              Once you're done color coding, you can fill in the{" "}
              <b>Map Title</b> and <b>Color Legend</b>
            </li>
            <li>
              Once you're finished, you can proceed and <b>Export the Map</b>{" "}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default CountryProfile;

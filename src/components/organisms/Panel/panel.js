import { BrowserView, MobileView } from "react-device-detect"

const Panel = () => {
  return (
    <div className="panel container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12 col-lg panel__image">
          <img
            src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/used_assets/ai_art_blur.webp"
            alt="Artwork generated through Midjourney A.I."
          />
          <p className="caption">Artwork generated through Midjourney A.I.</p>
        </div>
        <div className="col-12 col-lg offset-lg-1 mt-2 mt-lg-0 panel__text">
          <h2 className="">Steps for map creation:</h2>
          <ul>
            <li>Choose one of our available maps;</li>
            <li>
              Select a color through our <b>Color Picker</b>;
            </li>
            <li>Click on the countries that you want to apply the color to;</li>
            <li>
              Alternatively select a <b>Political Block</b> or a{" "}
              <b>Geographic Region</b>;
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
              You can remove the color that has been assigned to a country by
              right clicking on the country or by doing a long press on mobile;
            </li>
            <MobileView>
              <li>
                And you can <b>Zoom</b> and <b>Drag</b> the map through
                touchscreen gestures like pinching and tapping;
              </li>
            </MobileView>
            <li>
              Fill the <b>Map Title</b> and <b>Color Legend</b> fields in a way
              that describes the data you're showcasing;
            </li>
            <li>
              Once you're done, go ahead and generate your map as a free to use
              PNG image!
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Panel

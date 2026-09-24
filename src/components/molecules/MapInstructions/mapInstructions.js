const MapInstructions = () => {
  return (
    <div className="map__instructions mt-4 d-none d-lg-block">
      <h2 className="map__instructions--header">
        Create your own custom map!
      </h2>
      <p className="map__instructions--body">
        Now that you have your map selected, here are your customization
        options:
      </p>
      <ul className="map__instructions--body">
        <li>
          Select your desired color(s) through our <b>Color Picker</b>;
        </li>
        <li>Click on the countries that you want to apply the color to;</li>
        <li>
          Or alternatively select a <b>Political Block</b> or a{" "}
          <b>Geographic Region</b>;
        </li>
        <li>
          To <b>remove an assigned color</b>, right click on the country;
        </li>
        <li>
          In order to <b>Zoom</b> and/or <b>Drag</b> the map, press and hold the{" "}
          <i>Alt</i> (Windows) or <i>Option</i> (Mac) key and simultaneously use
          your mouse/trackpad to scroll and drag. Alternatively, you can click
          on the map and use the + and - keys to zoom and the arrow keys to
          change the map position;
        </li>
        <li>
          Fill the <b>Map Title</b> and <b>Color Legend</b> fields in a way that
          describes your data;
        </li>
        <li>
          Once you&apos;re finished, you can proceed and <b>Export the Map</b>.
        </li>
      </ul>
    </div>
  )
}

export default MapInstructions

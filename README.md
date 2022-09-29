[Interactive Maps](https://github.com/luisconceicaodev/Interactive-Maps) is a tool for creating custom maps

Decide what data you want your map to show, select the countries that fit the criteria, color code the countries and give your map a descriptive label. Once you're finished you can download the SVG Map as a PNG

TO DO:

- Acessing maps directly through URL should get the current map through the path instead of the store
- All NextJS links need to have the pointer cursor

- How to run:
  - npm install
  - npm run dev

- How to deploy on Git Pages:
  - npm run build
  - npm run deploy
  
Version 1.6

- You can now access a demo of this tool through:

  - https://luisconceicaodev.github.io/Interactive-Maps/

- Features include:

  - Customizable maps for The World, Europe, North America, South America, Africa and Asia
  - Color Picker (react-color)
  - SVG Map zoom and drag
  - Filters for Political Unions and Geographic Positions (UN Definition)
  - Customizable title/description/legend of your custom map
  - General tools: Color Removal, Clear All, Select All, Export Map (save-svg-as-png)
  - Fetch public API for displaying country data

- Upcoming features:

  - Font options
  - File export options (scale, file format, etc.)
  - Customizable background color for the map
  - Button that resets the zoom and the position of the map

Using public API "REST Countries":

- https://restcountries.com/

Using SVG maps from "simplemaps" (maps slightly altered through Inkscape and by changing the SVG code by hand)

- https://simplemaps.com/

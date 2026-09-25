# Interactive Maps

Interactive Maps is a responsive browser-based map editor for creating custom geographic maps. Choose a regional or world canvas, color countries or predefined groups, add a title and legend, and export the active map as a PNG.

- [Live demo](https://interactive-maps.vercel.app/)
- [Repository](https://github.com/miguelduartedev/Interactive-Maps)

## Features

- Six map canvases: World, Europe, North America, South America, Africa, and Asia
- Paint individual countries with quick-palette or custom colors
- Paint predefined political blocs and geographic regions, with an option to combine selections
- Paint, Pan, and Erase editor modes, plus viewport zoom controls
- Editable map title and legend labels for colors currently used on the map
- Select all countries or clear the map
- Export the active SVG map as a high-resolution PNG
- Responsive V2 Studio UI with a desktop inspector and mobile bottom controls/sheets
- Installable PWA with statically generated map routes

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 15, React 18, TypeScript |
| State | Redux Toolkit, React Redux |
| Styling | Sass / SCSS |
| Map interaction and export | panzoom, save-svg-as-png |
| Testing | Jest, React Testing Library |
| Delivery and observability | Serwist, Vercel Analytics, Vercel Speed Insights |

## Architecture

Redux is the source of truth for editor state: country-color assignments, the current color, map title, and legend labels. The map canvas derives country fills declaratively from that state through React rather than mutating SVG fill styles directly.

Typed editor context and hooks share map interactions, active-canvas registration, export, and viewport controls. Persistent map data stays separate from pan/zoom state, and the desktop inspector and mobile sheets share one control implementation instead of maintaining separate editors.

The large geographic SVG files intentionally remain JavaScript while surrounding editor logic is migrated to TypeScript. Multipart territories are handled as one logical country where needed; for example, Bonaire, Sint Eustatius, and Saba share the `BQ` identity. The six supported routes are statically generated.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Useful checks:

```bash
npm run typecheck
npm test
npm run lint
npm run build
```

No environment variables are required for local development.

## Project Status

Interactive Maps is actively evolving toward a fuller V2 Map Studio. Possible next steps include undo/redo, local saved maps, country search and selected-country workflows, richer export controls, data-driven/CSV map creation, and shareable maps or accounts.

## Credits

The SVG maps were adapted for this project from [SimpleMaps](https://simplemaps.com/).

Created by [Miguel Duarte](https://miguelduartedev.github.io/portfolio/).

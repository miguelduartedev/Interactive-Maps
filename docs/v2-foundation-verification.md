# V2 foundation implementation and verification

## Scope and continuation

Baseline: `165dcfa`. Branch: `codex/v2-editor-foundation`.
The existing migration and asset/instructions fixes were preserved. The continuation
built on the in-progress state model, Jest setup, Europe canvas, and shared controls;
it did not reset the checkout or rewrite SVG geometry. Europe was validated before
the other five map implementations were converted.

No V2 visual design, new editor tools, REST Countries integration, App Router,
React Server Components, TypeScript conversion, or runtime-library modernization
is included. Next 15.5.26, React/React DOM 18.3.1, Redux Toolkit 1.9.7, React Redux
7.2.9, MUI 5, Pages Router, ISR, sitemap rewrite, and Serwist remain in place.

## Architecture

Before: Redux color membership arrays and imperative SVG fills were separately
writable. Six maps duplicated interaction and panzoom setup, controls searched
the document, and event utilities imported a global store.

After: `countryColors` is the sole assignment store. Commands paint, replace,
erase, apply groups, select all, and clear atomically. Labels and explicit color
order are separate; the old `usedColors` presentation is a memoized read-only
selector, not a second store. Removing the final assignment prunes its legend.

The flow is **control/interaction → Redux command → country selector → SVG fill**.
Title and legend are React-rendered. Geometry is module-level literal JSX, indexed
once per canvas mount. Memoized country components subscribe to their own fill;
multipart paths share one country identity. Definitions and decorative elements
are excluded. Hover is transient React state, not a DOM class mutation.

`useMapInteractions` owns panzoom disposal, hover, pointer/touch handlers, movement
and multitouch cancellation, long-press timers, and synthetic-click suppression.
The keyed editor provider registers an explicit active SVG ref for export and
country availability. Route identity selects the map; route resets clear editor
state. Route guards prevent previous-map fills/legend flashing during reset.
`_app` creates a stable store per app instance instead of sharing a module singleton.

Remaining imperative operations: panzoom transforms/listeners, SVG reads by
`save-svg-as-png`, and the existing homepage section scrolling. No application
code imperatively writes country fills, hover classes, title text, or legend text.

Mobile verification also exposed a pre-existing hydration regression: page/editor
markup was selected from `react-device-detect` during the first client render, so
mobile markup differed from statically generated HTML. The map page and homepage
tutorial now begin with the same desktop-safe markup as SSR and switch after mount.
Fresh production loads on `/` and `/europe` are hydration-clean on an iPhone 15
emulation while retaining the existing responsive UI.

## Meaningful files

| Files | Purpose |
| --- | --- |
| `src/redux/mapSlice.js`, `mapSlice.test.js` | Authoritative assignments, atomic commands, legend lifecycle, selectors and reducer tests |
| `src/redux/store.js`, `src/pages/_app.js` | Store factory and stable app-owned store |
| `src/pages/[mapPath].js` | Route-scoped editor provider/reset lifecycle and hydration-safe device lifecycle; retained static paths/ISR |
| `SVGMap/MapCanvas.js`, `countryGeometry.js` | Declarative country rendering, memoized geometry, recognized path identity |
| `SVGMap/useMapInteractions.js` | Shared input and resource lifecycle |
| `SVGMap/MapEditorContext.js`, `useEditorActions.js` | Explicit canvas/export ref and state-only control commands |
| `SVGMap/maps/{Europe,World,NorthAmerica,SouthAmerica,Africa,Asia}SVG.js` | Shared canvas wrappers; unchanged path markup and viewBoxes |
| `SVGMap/svgMap.js` | Route-authoritative map selection, removed legacy store/action props |
| ColorPicker, ColorLegend, MapLegend, GroupSelectors, ControlPanel, Modal components | Callback-only picker updates, controlled title/legend, state commands, stable list identity |
| `src/components/organisms/Panel/panel.js` | Hydration-safe desktop/mobile tutorial text selection after mount |
| Deleted SVGMap hooks/utilities and ControlPanel/GroupSelectors mutation utilities; `_common/index.js` | Removed obsolete DOM fill/class/global-store adapters |
| `Modal/tutorial.styles.scss` | Restored missing mobile tutorial typography, using prior wording/layout |
| `jest.config.js`, `jest.setup.js`, `package.json`, lockfile | Jest 29, jsdom, RTL 14; removed unused `lodash.debounce` |
| `SVGMap/MapCanvas.test.js`, `geometryScale.test.js`, `geometryInvariants.test.js`, `geometry-baseline.json` | Actual-map integration, interaction/lifecycle, scaling, and unchanged-geometry protection |

Component paths in this table are relative to `src/components` unless otherwise stated.

## Europe acceptance gate

Real browser input verified consecutive paint, repaint, right-click erase,
mainland/Corsica interaction, groups and Combine Groups, Select All/Clear All,
title/legend edits, keyboard pan, Alt-wheel zoom, drag, mobile tap/long press,
PNG download, and navigation away/back with state reset. Export was visually
inspected, including country fills, title, and legend. Synthetic multipart fixtures
and real World geometry separately verified shared class-based identity.

Same-browser/hardware click-to-next-frame samples (10 clicks each): baseline
3.7–16.0 ms, Europe canvas 2.7–13.0 ms. Neither sample recorded a long task.
These are a small smoke measurement, not a statistical performance benchmark.
The World-sized 447-path test verifies indexing happens once, painting Angola
clones only its two paths, and title/legend updates clone zero country paths.
Panzoom remains outside React state; transform updates do not schedule geometry
reconciliation. Strict Mode tests verify each created instance is disposed once.

## Automated validation

- `npm ci`: passed.
- `npm ls --depth=0`: exits successfully, no invalid/unmet peers. It lists optional
  `@img/sharp-wasm32` and `@emnapi/runtime` as extraneous in this local install;
  no package-version changes were made to conceal that diagnostic.
- `npm test`: 23 tests, four suites, passed.
- `npm run lint`: zero errors; five existing image/font warnings.
- `npm run build`: passed; homepage and all six map pages statically generated,
  ISR retained, sitemap API and service worker built.
- Full and production-only npm audits: zero critical, one high, one moderate.

Tests cover paint/repaint/erase, deduplication/no-op, legend cleanup/order/labels,
group replacement/combination/filtering, Select All/Clear All and route resets;
all six actual maps, multipart identity, decoration exclusion, active-ref export,
picker callback/no-render-dispatch, long-press cancellation/synthetic clicks,
movement/multitouch cancellation, panzoom cleanup and geometry invariants.
All 803 original path elements retain their exact serialized attributes/coordinates.

Known warnings: unchanged React Color `Circle`/`CircleSwatch` defaultProps warnings
appear in development/test React; Sass reports Bootstrap/legacy Sass import and
global-function deprecations on a cold build. These are not new runtime crashes.
PNG export also logs the existing cross-origin Google Fonts stylesheet warning;
the generated PNG remains complete and was visually inspected.

## Audit findings retained, not fixed with a broad upgrade

Path: application → `next@15.5.26` → `postcss@8.4.31`. This remains in the production
dependency tree, although PostCSS principally processes build-time CSS here.
Do not interpret that distinction as an exploitability guarantee.

- HIGH: `GHSA-6g55-p6wh-862q`, attacker-controlled sourceMappingURL file reads.
- HIGH: `GHSA-r28c-9q8g-f849`, previous-source-map path traversal/file disclosure.
- MODERATE: `GHSA-qx2v-qp2m-jg93`, CSS stringify unescaped style terminator.
- MODERATE: `GHSA-fxqj-rqcc-2cmp`, incomplete sourceMappingURL fix.

npm aggregates these as one high PostCSS package and one moderate affected Next
package. Its suggested Next 16 major upgrade is outside scope. No audit force-fix
was run. Track a separate, narrowly tested security remediation.

## Deferred work and preview checklist

Eager imports remain: the shared map page is approximately 230 kB (361 kB first
load JS). Per-route dynamic imports are a follow-up with their own static-render,
navigation, and offline-cache checks. No loading strategy changed in this PR.

Before production deployment, use a Vercel preview to check Safari/iOS and Android
touch/pinch behavior, browser-specific PNG downloads, physical-device installation,
and an existing installed PWA upgrading from the production service worker.
Automated Chromium emulation cannot replace those platform checks.

The next logical V2 engineering task is the new editor UI consuming these existing
state commands and canvas interfaces. Keep new tool modes/history and visual work
separate from this behavior-preserving foundation.

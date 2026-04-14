## 1. Theme Extension

- [x] 1.1 Add `visualMap` section to `buildTheme()` in `charts/Chart/theme.ts` — set `textStyle.color` to `--reltio-color-text-secondary` to match legend styling

## 2. Types & Directory Setup

- [x] 2.1 Create `charts/GeoChart/` directory with all required files: `GeoChart.tsx`, `GeoChart.types.ts`, `GeoChart.module.css`, `GeoChart.stories.tsx`, `index.ts`
- [x] 2.2 Define types in `GeoChart.types.ts`: `GeoJSON`, `GeoChartItem`, `GeoChartRange`, `GeoChartProps` (using `HtmlProps<"div", ...>`)

## 3. CSS Styles

- [x] 3.1 Create `GeoChart.module.css` with `.root` (position relative + 5 `--geo-shade-*` custom properties using `color-mix(in oklch)`), `.overlay`, and `.errorOverlay` styles

## 4. Core Component

- [x] 4.1 Implement WeakMap-based `ensureMapRegistered()` function for auto-registration of GeoJSON objects
- [x] 4.2 Implement `computeAutoRanges()` utility that generates 5 equal ranges from data min/max with nice rounding
- [x] 4.3 Implement `buildGeoOption()` pure function — transforms `data`, `ranges`, `shades`, `roam`, `label`, `units` into an ECharts option with map series + piecewise visualMap
- [x] 4.4 Implement `GeoChart` component with `useLayoutEffect` for shade reading, state management (error > loading > empty > chart), and base `Chart` rendering
- [x] 4.5 Register `MapChart` and `VisualMapPiecewiseComponent` at module level via `echarts.use()`

## 5. Exports

- [x] 5.1 Create `charts/GeoChart/index.ts` exporting component and types
- [x] 5.2 Add GeoChart exports to `charts/index.ts`

## 6. Storybook Stories

- [x] 6.1 Create `GeoChart.stories.tsx` with required stories: Default, Loading, BackgroundRefresh, Empty, Error, CustomHeight
- [x] 6.2 Add chart-specific stories: WithLabels, WithRoam, CustomRanges, WithUnits
- [x] 6.3 Prepare a demo GeoJSON dataset (USA states or world countries) for stories

## 7. Quality

- [x] 7.1 Run `npm run format` and `npm run lint` — fix any issues

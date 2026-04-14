### Requirement: Declarative GeoJSON-as-prop API
The `GeoChart` component SHALL accept a `map` prop of type `GeoJSON` (object with `type` and `features` fields). The component SHALL internally register the GeoJSON with ECharts using a WeakMap-based auto-registration mechanism. Consumers SHALL NOT need to call `echarts.registerMap()` or any setup step before rendering.

#### Scenario: Render with GeoJSON prop
- **WHEN** `GeoChart` receives a valid GeoJSON object via the `map` prop and a `data` array
- **THEN** the component registers the GeoJSON internally, renders the map, and colors regions according to data values

#### Scenario: Same GeoJSON reference across re-renders
- **WHEN** `GeoChart` re-renders with the same GeoJSON object reference
- **THEN** the component reuses the existing registration without calling `echarts.registerMap()` again

#### Scenario: Different GeoJSON objects
- **WHEN** two `GeoChart` instances receive different GeoJSON objects
- **THEN** each GeoJSON is registered under a unique internal name with no conflicts

### Requirement: Region data format
The `GeoChart` component SHALL accept a `data` prop as an array of `GeoChartItem` objects, each with a `name` (string) and `value` (number). The `name` SHALL match a feature name in the provided GeoJSON. Regions not present in the data array SHALL render with default (uncolored) appearance.

#### Scenario: Regions colored by value
- **WHEN** `GeoChart` receives `data` with entries matching GeoJSON feature names
- **THEN** each matching region is colored according to its value and the active range palette

#### Scenario: Unmatched regions
- **WHEN** the GeoJSON contains features not present in the `data` array
- **THEN** those regions render with the default area color (theme-appropriate neutral)

### Requirement: Discrete value-range legend via piecewise visualMap
The `GeoChart` SHALL render a discrete legend showing value ranges. Each range SHALL have a distinct color from the sequential palette. The legend SHALL support `selectedMode: "multiple"` (click to toggle range visibility) and `hoverLink: true` (hover to highlight regions in that range).

#### Scenario: Legend displays value ranges
- **WHEN** `GeoChart` renders with data and ranges
- **THEN** a legend appears showing one item per range with its color swatch and label

#### Scenario: Hover highlights regions
- **WHEN** the user hovers over a legend item (e.g., "20 - 29%")
- **THEN** all regions whose values fall within that range are visually highlighted on the map

#### Scenario: Click toggles range visibility
- **WHEN** the user clicks a legend item
- **THEN** regions in that range are hidden/shown, and the legend item toggles its selected state

### Requirement: Explicit ranges prop
The `GeoChart` SHALL accept an optional `ranges` prop as an array of `GeoChartRange` objects, each with `min` (number), `max` (number), and optional `label` (string). Each range defines one legend bucket. When `label` is omitted, the component SHALL auto-generate it as `"{min} - {max}"` (with `units` suffix if provided).

#### Scenario: Custom ranges with labels
- **WHEN** `GeoChart` receives `ranges={[{ min: 0, max: 9, label: "0 - 9%" }, { min: 10, max: 19, label: "10 - 19%" }]}`
- **THEN** the legend shows exactly these two ranges with the provided labels

#### Scenario: Custom ranges without labels
- **WHEN** `GeoChart` receives `ranges={[{ min: 0, max: 100 }, { min: 101, max: 200 }]}` and `units="customers"`
- **THEN** the legend shows "0 - 100 customers" and "101 - 200 customers"

### Requirement: Auto-generated ranges
When the `ranges` prop is not provided, the `GeoChart` SHALL auto-generate 5 equal-width ranges from the data. The component SHALL find min and max values, round outward to nice boundaries, and split into 5 buckets.

#### Scenario: Auto ranges from data
- **WHEN** `GeoChart` renders with data values ranging from 3 to 47 and no `ranges` prop
- **THEN** 5 equal ranges are generated (e.g., 0-9, 10-19, 20-29, 30-39, 40-49) and displayed in the legend

#### Scenario: Auto ranges with units
- **WHEN** `GeoChart` renders with auto-generated ranges and `units="%"`
- **THEN** range labels include the unit suffix (e.g., "0 - 9%", "10 - 19%")

### Requirement: Sequential color shades from CSS color-mix
The `GeoChart` SHALL define 5 CSS custom properties on its root element using `color-mix(in oklch, var(--reltio-color-primary) N%, white)` at concentrations 15%, 35%, 55%, 75%, and 100%. At mount time, the component SHALL read these resolved values via `getComputedStyle()` and pass them to the ECharts visualMap as the `inRange.color` array.

#### Scenario: Light mode shades
- **WHEN** `GeoChart` mounts in a light mode context
- **THEN** the 5 shades range from a very light tint of the primary color to the full primary color

#### Scenario: Dark mode shades
- **WHEN** `GeoChart` mounts inside a DOM tree with `data-theme="dark"` on an ancestor
- **THEN** the 5 shades are derived from the dark mode primary token, automatically producing a theme-appropriate palette

### Requirement: Roam interaction
The `GeoChart` SHALL accept an optional `roam` prop (boolean, `"scale"`, or `"move"`). Default is `false` (no interaction). When enabled, the map supports zoom and/or pan.

#### Scenario: Roam disabled by default
- **WHEN** `GeoChart` renders without a `roam` prop
- **THEN** the map does not respond to scroll/pinch zoom or drag-to-pan

#### Scenario: Roam enabled
- **WHEN** `GeoChart` renders with `roam={true}`
- **THEN** the map supports both scroll/pinch zoom and drag-to-pan

#### Scenario: Scale-only roam
- **WHEN** `GeoChart` renders with `roam="scale"`
- **THEN** the map supports zoom but not pan

### Requirement: Tooltip
The `GeoChart` SHALL display a tooltip on region hover showing the region name and value. The tooltip SHALL NOT include the series name. When the `units` prop is provided, the value SHALL include the unit suffix.

#### Scenario: Tooltip without units
- **WHEN** the user hovers over a region with `{ name: "California", value: 25 }` and no `units` prop
- **THEN** a tooltip shows "California: 25"

#### Scenario: Tooltip with units
- **WHEN** the user hovers over the same region with `units="%"`
- **THEN** a tooltip shows "California: 25%"

### Requirement: Container sizing
The `GeoChart` SHALL fill its parent container (`width: 100%; height: 100%`). The component does NOT accept a `height` prop — sizing is the consumer's responsibility. ECharts auto-resizes via ResizeObserver when the container dimensions change.

#### Scenario: Fills parent container
- **WHEN** `GeoChart` is placed inside a container with `width: 600px; height: 400px`
- **THEN** the chart renders at 600x400 pixels

#### Scenario: Responsive resize
- **WHEN** the parent container changes size
- **THEN** the chart redraws to fill the new dimensions

### Requirement: State management
The `GeoChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart. An empty ECharts option (`{}`) SHALL be used for non-data states (no empty grid — the map has no cartesian axes).

#### Scenario: Error state
- **WHEN** `GeoChart` receives `error="Failed to load map data"`
- **THEN** the error message is displayed as an overlay

#### Scenario: Loading state
- **WHEN** `GeoChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `GeoChart` receives empty `data` array and `loading={false}`
- **THEN** a "No data" text overlay is displayed

### Requirement: ECharts series registration
The `GeoChart` SHALL register the ECharts `MapChart` series type at module level using `echarts.use()`. The `VisualMapPiecewiseComponent` SHALL also be registered. The base `Chart` component SHALL NOT be modified for series registration.

#### Scenario: Module-level registration
- **WHEN** the `GeoChart` module is imported
- **THEN** `MapChart` from `echarts/charts` and `VisualMapPiecewiseComponent` from `echarts/components` are registered via `echarts.use()`

### Requirement: Directory structure
The GeoChart files SHALL be located in `charts/GeoChart/` following the standard chart structure: `GeoChart.tsx`, `GeoChart.types.ts`, `GeoChart.module.css`, `GeoChart.stories.tsx`, `index.ts`.

#### Scenario: Files exist at expected paths
- **WHEN** the GeoChart implementation is complete
- **THEN** all five files exist in `charts/GeoChart/`

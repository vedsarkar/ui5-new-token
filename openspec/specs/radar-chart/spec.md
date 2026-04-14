### Requirement: Declarative indicators and series API
The `RadarChart` component SHALL accept an `indicators` prop (array of `{ name: string; max: number }`) defining the radar axes and a `series` prop (array of `{ name: string; values: number[] }`) defining the data polygons. The component SHALL render a radar/spider chart via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `RadarChart`.

#### Scenario: Render radar with single series
- **WHEN** `RadarChart` receives `indicators=[{ name: "Speed", max: 100 }, { name: "Power", max: 100 }, { name: "Defense", max: 100 }]` and `series=[{ name: "Player A", values: [80, 60, 90] }]`
- **THEN** the chart renders a radar with 3 axes and one filled polygon area

#### Scenario: Render radar with multiple series
- **WHEN** `RadarChart` receives two series entries
- **THEN** two overlapping filled polygon areas are rendered, each with a distinct color from the theme palette

### Requirement: Legend display
The `RadarChart` SHALL display a legend when there are multiple series. When there is a single series, no legend SHALL be shown.

#### Scenario: Single series without legend
- **WHEN** `series` contains a single entry
- **THEN** no legend is shown

#### Scenario: Multiple series with legend
- **WHEN** `series` contains two or more entries
- **THEN** a legend is displayed showing the series names

### Requirement: Tooltip
The `RadarChart` SHALL display a tooltip on hover showing the series name and all indicator values.

#### Scenario: Tooltip on hover
- **WHEN** user hovers over a radar polygon area
- **THEN** the tooltip shows the series name and all indicator name-value pairs

### Requirement: Chart height
The `RadarChart` SHALL accept an optional `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be 300px.

#### Scenario: Default height
- **WHEN** `RadarChart` renders without a `height` prop
- **THEN** the chart container height is 300px

### Requirement: State management
The `RadarChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart.

#### Scenario: Error state
- **WHEN** `RadarChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as an overlay

#### Scenario: Loading state
- **WHEN** `RadarChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `RadarChart` receives empty `series` array and `loading={false}`
- **THEN** a "No data" text overlay is displayed

### Requirement: ECharts component registration
The `RadarChart` SHALL register the ECharts `RadarChart` series type and `RadarComponent` at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Module-level registration
- **WHEN** `RadarChart` module is imported
- **THEN** `RadarChart` series type from `echarts/charts` and `RadarComponent` from `echarts/components` are registered via `echarts.use()`

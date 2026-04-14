## ADDED Requirements

### Requirement: Declarative data-first API
The `BarChart` component SHALL accept a `data` prop (array of `Record<string, unknown>`), an `xKey` prop, and a `series` prop (array of `BarChartSeries`). The component SHALL transform these props into an ECharts option and render vertical bars via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `BarChart`.

#### Scenario: Render with string xKey
- **WHEN** `BarChart` receives `data`, `xKey="month"`, and `series=[{ key: "sales" }]`
- **THEN** the chart renders vertical bars with X-axis labels from `data[i].month` and bar heights from `data[i].sales`

#### Scenario: Render with function xKey
- **WHEN** `BarChart` receives `data` with timestamp values and `xKey` as a function `(item) => formatDate(item.ts)`
- **THEN** the chart renders with X-axis labels showing the formatted date strings returned by the function

### Requirement: Multiple series support
The `BarChart` SHALL render one bar group per entry in the `series` array. Each series SHALL be colored automatically from the theme palette. When there are multiple series, a legend SHALL be displayed automatically.

#### Scenario: Single series without legend
- **WHEN** `series` contains a single entry `[{ key: "sales" }]`
- **THEN** one set of bars is rendered and no legend is shown

#### Scenario: Multiple series with legend
- **WHEN** `series` contains multiple entries `[{ key: "sales", name: "Sales" }, { key: "returns", name: "Returns" }]`
- **THEN** each series renders as grouped bars with automatic theme colors, and a legend is displayed showing the series names

### Requirement: Unit formatting
The `BarChart` SHALL accept an optional `units` prop (string). When provided, the unit suffix SHALL be appended to Y-axis labels and tooltip values.

#### Scenario: With units
- **WHEN** `BarChart` receives `units="ms"`
- **THEN** Y-axis labels show values with "ms" suffix and tooltip values include "ms"

#### Scenario: Without units
- **WHEN** `BarChart` renders without a `units` prop
- **THEN** Y-axis labels and tooltips show plain numeric values

### Requirement: Chart height
The `BarChart` SHALL accept an optional `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be 300px.

#### Scenario: Default height
- **WHEN** `BarChart` renders without a `height` prop
- **THEN** the chart container height is 300px

### Requirement: State management
The `BarChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart. An empty cartesian grid SHALL be shown behind state overlays.

#### Scenario: Error state
- **WHEN** `BarChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as an overlay over an empty grid

#### Scenario: Loading state
- **WHEN** `BarChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `BarChart` receives empty `data` array and `loading={false}`
- **THEN** a "No data" text overlay is displayed over an empty grid

### Requirement: ECharts series registration
The `BarChart` SHALL register the ECharts `BarChart` series type at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Module-level registration
- **WHEN** `BarChart` module is imported
- **THEN** `BarChart` series type from `echarts/charts` is registered via `echarts.use()`

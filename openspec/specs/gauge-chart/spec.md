### Requirement: Declarative value API
The `GaugeChart` component SHALL accept a `value` prop (number) representing the current metric value and an optional `label` prop (string) displayed below the value. The component SHALL render a ring-style gauge via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `GaugeChart`.

#### Scenario: Render gauge with value
- **WHEN** `GaugeChart` receives `value={72}`
- **THEN** the chart renders a ring gauge filled to 72% with the number "72" displayed in the center

#### Scenario: Render gauge with label
- **WHEN** `GaugeChart` receives `value={72}` and `label="Quality Score"`
- **THEN** the chart renders the gauge with "72" in the center and "Quality Score" text below it

#### Scenario: Render gauge without label
- **WHEN** `GaugeChart` receives `value={72}` without a `label` prop
- **THEN** the chart renders the gauge with "72" in the center and no label text below

### Requirement: Configurable max value
The `GaugeChart` SHALL accept an optional `max` prop (number, default 100) defining the upper bound of the gauge scale. The fill percentage SHALL be calculated as `value / max`.

#### Scenario: Default max of 100
- **WHEN** `GaugeChart` receives `value={75}` without a `max` prop
- **THEN** the gauge ring is filled to 75%

#### Scenario: Custom max value
- **WHEN** `GaugeChart` receives `value={750}` and `max={1000}`
- **THEN** the gauge ring is filled to 75%

### Requirement: Chart height
The `GaugeChart` SHALL accept an optional `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be 300px.

#### Scenario: Default height
- **WHEN** `GaugeChart` renders without a `height` prop
- **THEN** the chart container height is 300px

#### Scenario: Custom height
- **WHEN** `GaugeChart` receives `height={200}`
- **THEN** the chart container height is 200px

### Requirement: State management
The `GaugeChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart. The `loading` prop SHALL show the ECharts loading overlay. The `error` prop SHALL show an error message overlay. When `value` is undefined/null and not loading, a "No data" overlay SHALL be shown.

#### Scenario: Error state
- **WHEN** `GaugeChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as an overlay over an empty chart canvas

#### Scenario: Loading state
- **WHEN** `GaugeChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `GaugeChart` receives no `value` prop and `loading={false}`
- **THEN** a "No data" text overlay is displayed

### Requirement: ECharts series registration
The `GaugeChart` SHALL register the ECharts `GaugeChart` series type at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Module-level registration
- **WHEN** `GaugeChart` module is imported
- **THEN** `GaugeChart` series type from `echarts/charts` is registered via `echarts.use()`

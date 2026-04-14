## ADDED Requirements

### Requirement: Declarative data API
The `DonutChart` component SHALL accept a `data` prop (array of `{ name: string; value: number }`). Each entry renders one donut segment. The component SHALL render a donut (hollow pie) chart via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `DonutChart`.

#### Scenario: Render donut with segments
- **WHEN** `DonutChart` receives `data=[{ name: "Matched", value: 680 }, { name: "Unmatched", value: 210 }, { name: "Pending", value: 110 }]`
- **THEN** the chart renders a donut ring with three colored segments proportional to their values

#### Scenario: Single segment
- **WHEN** `DonutChart` receives `data=[{ name: "Total", value: 100 }]`
- **THEN** the chart renders a full donut ring in a single color

### Requirement: Legend display
The `DonutChart` SHALL always display a legend showing segment names and colors.

#### Scenario: Legend is always visible
- **WHEN** `DonutChart` renders with any number of data items
- **THEN** a legend is displayed showing the name and color for each segment

### Requirement: Tooltip with name, value, and percentage
The `DonutChart` SHALL display a tooltip on hover showing the segment name, value, and percentage of the total.

#### Scenario: Tooltip on segment hover
- **WHEN** user hovers over a segment with `name="Matched"` and `value=680` (total is 1000)
- **THEN** the tooltip shows "Matched: 680 (68%)"

### Requirement: Chart height
The `DonutChart` SHALL accept an optional `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be 300px.

#### Scenario: Default height
- **WHEN** `DonutChart` renders without a `height` prop
- **THEN** the chart container height is 300px

### Requirement: State management
The `DonutChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart.

#### Scenario: Error state
- **WHEN** `DonutChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as an overlay

#### Scenario: Loading state
- **WHEN** `DonutChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `DonutChart` receives empty `data` array and `loading={false}`
- **THEN** a "No data" text overlay is displayed

### Requirement: ECharts series registration
The `DonutChart` SHALL register the ECharts `PieChart` series type at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Module-level registration
- **WHEN** `DonutChart` module is imported
- **THEN** `PieChart` series type from `echarts/charts` is registered via `echarts.use()`

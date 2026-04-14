### Requirement: Declarative nodes and links API
The `SankeyChart` component SHALL accept a `nodes` prop (array of `{ name: string }`) and a `links` prop (array of `{ source: string; target: string; value: number }`). The component SHALL render a flow diagram with colored ribbons via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `SankeyChart`.

#### Scenario: Render simple flow
- **WHEN** `SankeyChart` receives `nodes=[{ name: "A" }, { name: "B" }, { name: "C" }]` and `links=[{ source: "A", target: "B", value: 10 }, { source: "A", target: "C", value: 5 }]`
- **THEN** the chart renders node "A" on the left connected by ribbons to nodes "B" and "C" on the right, with ribbon widths proportional to values

#### Scenario: Multi-level flow
- **WHEN** `SankeyChart` receives nodes spanning 3 levels (A -> B -> C)
- **THEN** nodes are arranged in 3 columns with ribbons flowing left to right

### Requirement: Tooltip with flow details
The `SankeyChart` SHALL display a tooltip on hover. Hovering a node shows the node name. Hovering a link shows source, target, and value.

#### Scenario: Tooltip on node hover
- **WHEN** user hovers over node "A"
- **THEN** the tooltip shows "A"

#### Scenario: Tooltip on link hover
- **WHEN** user hovers over a link from "A" to "B" with value 10
- **THEN** the tooltip shows "A → B: 10"

#### Scenario: Tooltip with units
- **WHEN** `SankeyChart` has `units="records"` and user hovers over a link with value 10
- **THEN** the tooltip shows "A → B: 10 records"

### Requirement: Chart height
The `SankeyChart` SHALL accept an optional `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be 300px.

#### Scenario: Default height
- **WHEN** `SankeyChart` renders without a `height` prop
- **THEN** the chart container height is 300px

### Requirement: State management
The `SankeyChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart.

#### Scenario: Error state
- **WHEN** `SankeyChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as an overlay

#### Scenario: Loading state
- **WHEN** `SankeyChart` receives `loading={true}`
- **THEN** the ECharts loading spinner is displayed

#### Scenario: Empty state
- **WHEN** `SankeyChart` receives empty `nodes` array and `loading={false}`
- **THEN** a "No data" text overlay is displayed

### Requirement: ECharts series registration
The `SankeyChart` SHALL register the ECharts `SankeyChart` series type at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Module-level registration
- **WHEN** `SankeyChart` module is imported
- **THEN** `SankeyChart` series type from `echarts/charts` is registered via `echarts.use()`

## ADDED Requirements

### Requirement: Declarative nodes and links API
The `GraphChart` component SHALL accept a `nodes` prop (array of `GraphChartNode`) and a `links` prop (array of `GraphChartLink`). `GraphChartNode` SHALL have required fields `id: string` and `name: string`, and optional field `value: number`. `GraphChartLink` SHALL have required fields `source: string` and `target: string` (referencing `node.id`), and optional fields `label: string` and `value: number`. The component SHALL render a force-directed graph via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `GraphChart`.

#### Scenario: Render simple graph
- **WHEN** `GraphChart` receives `nodes=[{ id: "a", name: "A" }, { id: "b", name: "B" }]` and `links=[{ source: "a", target: "b" }]`
- **THEN** the chart renders two nodes connected by a line

#### Scenario: Nodes identified by id
- **WHEN** `GraphChart` receives two nodes with different `id` values but the same `name` (e.g., `{ id: "p1", name: "John" }` and `{ id: "p2", name: "John" }`) and a link `{ source: "p1", target: "p2" }`
- **THEN** the chart renders two separate nodes both labeled "John" connected by a line, with no collision or ambiguity

#### Scenario: Links reference node ids
- **WHEN** a link has `source: "p1"` and `target: "a1"`
- **THEN** the link connects the node with `id: "p1"` to the node with `id: "a1"`, regardless of node `name` values

### Requirement: Auto-sized nodes from value
The `GraphChart` SHALL auto-calculate node symbol size from the `value` field. When nodes have `value`, sizes SHALL be linearly normalized to a `[20, 60]` pixel range. When all values are equal, all nodes SHALL render at 30px. When no node has `value`, all nodes SHALL render at 30px.

#### Scenario: Nodes without value
- **WHEN** `GraphChart` receives nodes without `value` fields
- **THEN** all nodes render at the same default size (30px)

#### Scenario: Nodes with varying values
- **WHEN** `GraphChart` receives nodes with `value` 10, 50, and 100
- **THEN** the node with value 10 renders at 20px, the node with value 100 renders at 60px, and the node with value 50 renders at approximately 38px

#### Scenario: Nodes with equal values
- **WHEN** all nodes have the same `value` (e.g., all 42)
- **THEN** all nodes render at the same default size (30px)

### Requirement: Hover-only labels
Node labels SHALL be hidden by default and shown on hover via ECharts emphasis. Link labels SHALL be displayed in tooltips only.

#### Scenario: Labels hidden at rest
- **WHEN** the graph renders and no interaction occurs
- **THEN** no node name labels are visible on the chart

#### Scenario: Label shown on node hover
- **WHEN** user hovers over a node with `name: "John Smith"`
- **THEN** the label "John Smith" becomes visible on that node

### Requirement: Tooltip with node and link details
The `GraphChart` SHALL display a tooltip on hover. Hovering a node shows the node `name` and `value` (if present, with `units` suffix). Hovering a link shows `source.name → target.name` with the link `label` and `value` (if present, with `units` suffix).

#### Scenario: Tooltip on node hover without value
- **WHEN** user hovers over a node with `name: "John Smith"` and no `value`
- **THEN** the tooltip shows "John Smith"

#### Scenario: Tooltip on node hover with value and units
- **WHEN** `GraphChart` has `units="connections"` and user hovers over a node with `name: "John Smith"` and `value: 5`
- **THEN** the tooltip shows "John Smith: 5 connections"

#### Scenario: Tooltip on link hover with label
- **WHEN** user hovers over a link from node "John Smith" to node "123 Main St" with `label: "lives at"`
- **THEN** the tooltip shows "John Smith → 123 Main St (lives at)"

#### Scenario: Tooltip on link hover with value and units
- **WHEN** `GraphChart` has `units="score"` and user hovers over a link with `value: 0.95`
- **THEN** the tooltip shows "John Smith → Record B: 0.95 score"

### Requirement: Undirected edges
All links SHALL render as plain lines without arrowheads. Edge symbols SHALL be set to `["none", "none"]`.

#### Scenario: No arrows on links
- **WHEN** the graph renders with links
- **THEN** all links appear as plain lines without directional indicators

### Requirement: Force layout
The `GraphChart` SHALL use ECharts force layout with fixed parameters: `repulsion: 200`, `gravity: 0.1`, `edgeLength: [80, 200]`, `layoutAnimation: true`. The layout SHALL not be configurable in v1.

#### Scenario: Nodes arrange via force simulation
- **WHEN** the graph renders with nodes and links
- **THEN** nodes are positioned automatically by the force simulation — connected nodes attract, unconnected nodes repel

### Requirement: Fill parent container
The `GraphChart` SHALL NOT accept a `height` prop. The component root element SHALL use `width: 100%; height: 100%` CSS, filling its parent container. The internal `Chart` component SHALL receive `height="100%"`.

#### Scenario: Chart fills parent
- **WHEN** `GraphChart` is placed inside a 600x400px container
- **THEN** the chart fills the entire 600x400px space

### Requirement: No interactive features beyond hover
The `GraphChart` SHALL set `roam: false` (no zoom/pan) and `draggable: false` (no node dragging). The only interaction SHALL be hover (tooltips and label emphasis).

#### Scenario: Zoom disabled
- **WHEN** user scrolls or pinches on the chart
- **THEN** the chart does not zoom

#### Scenario: Drag disabled
- **WHEN** user attempts to drag a node
- **THEN** the node does not move

### Requirement: Single color for all nodes
All nodes SHALL use the primary theme color from the ECharts palette. No category-based coloring SHALL be applied in v1.

#### Scenario: All nodes same color
- **WHEN** the graph renders with multiple nodes
- **THEN** all nodes display in the primary theme color (`--reltio-color-primary`)

### Requirement: State management
The `GraphChart` SHALL handle error, loading, and empty states in priority order: error > loading > empty > chart.

#### Scenario: Error state
- **WHEN** `GraphChart` receives `error="Failed to load"`
- **THEN** the error message is displayed as a centered overlay and the chart area is empty

#### Scenario: Loading state without data
- **WHEN** `GraphChart` receives `loading={true}` and no nodes
- **THEN** the ECharts loading spinner is displayed on an empty area

#### Scenario: Loading state with existing data (background refresh)
- **WHEN** `GraphChart` receives `loading={true}` with existing nodes and links
- **THEN** the graph remains visible with the ECharts loading overlay on top

#### Scenario: Empty state
- **WHEN** `GraphChart` receives empty `nodes` array (or undefined) and `loading={false}` and no `error`
- **THEN** a "No data" text overlay is displayed

#### Scenario: Error takes priority over loading
- **WHEN** `GraphChart` receives both `error="Fail"` and `loading={true}`
- **THEN** only the error overlay is shown, not the loading spinner

### Requirement: ECharts series registration
The `GraphChart` SHALL register the ECharts `GraphChart` series type at module level using `echarts.use()`. The base `Chart` component SHALL NOT be modified.

#### Scenario: Series type registered once
- **WHEN** `GraphChart` module is imported
- **THEN** the ECharts graph series type is registered via `echarts.use([GraphChart])` at module scope

### Requirement: Units prop for tooltip formatting
The `GraphChart` SHALL accept an optional `units` prop (string). When provided, values in tooltips SHALL be suffixed with the units string.

#### Scenario: Without units
- **WHEN** `GraphChart` renders without `units` prop and user hovers a node with `value: 5`
- **THEN** the tooltip shows "Node Name: 5"

#### Scenario: With units
- **WHEN** `GraphChart` has `units="connections"` and user hovers a node with `value: 5`
- **THEN** the tooltip shows "Node Name: 5 connections"

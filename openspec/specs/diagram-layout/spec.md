## ADDED Requirements

### Requirement: Automatic layout via dagre
The Diagram component SHALL automatically compute node positions using the dagre layout algorithm. Consumers SHALL NOT need to provide x/y coordinates for nodes. The layout SHALL be computed internally based on the node-edge graph structure and measured node dimensions.

#### Scenario: Nodes positioned automatically
- **WHEN** Diagram receives nodes without position data
- **THEN** dagre computes optimal positions based on graph topology and node sizes

#### Scenario: Layout respects edge directions
- **WHEN** edges define source→target relationships
- **THEN** dagre positions source nodes before target nodes in the layout direction

### Requirement: Layout direction via `direction` prop
The Diagram component SHALL accept a `direction` prop controlling the primary axis of the dagre layout. Supported values: `"TB"` (top-to-bottom, default), `"LR"` (left-to-right).

#### Scenario: Top-to-bottom layout (default)
- **WHEN** `direction` is `"TB"` or not specified
- **THEN** parent nodes appear above child nodes

#### Scenario: Left-to-right layout
- **WHEN** `direction` is `"LR"`
- **THEN** parent nodes appear to the left of child nodes, edges flow left-to-right

### Requirement: Two-pass measurement for accurate layout
The Diagram component SHALL use a two-pass rendering approach: first render nodes invisibly to measure their DOM dimensions, then run dagre with actual sizes, then reposition nodes and make them visible.

#### Scenario: Nodes invisible during measurement
- **WHEN** nodes are first rendered (before layout computes)
- **THEN** nodes are rendered with `opacity: 0` so they are measured but not visible

#### Scenario: Nodes visible after layout
- **WHEN** dagre layout computation completes
- **THEN** nodes transition to `opacity: 1` at their computed positions

### Requirement: Layout recomputes on data changes
The Diagram component SHALL recompute layout when `nodes` or `edges` props change. Previous positions SHALL be discarded and a fresh layout SHALL be computed.

#### Scenario: Nodes added
- **WHEN** new nodes are added to the `nodes` array
- **THEN** layout recomputes with the new nodes included

#### Scenario: Edges changed
- **WHEN** `edges` array changes (new edges or removed edges)
- **THEN** layout recomputes to reflect the new graph structure

### Requirement: Node spacing configuration
The Diagram component SHALL accept optional `nodeSpacing` and `rankSpacing` props to control the gap between nodes. `nodeSpacing` controls the gap between nodes in the same rank. `rankSpacing` controls the gap between ranks (layers). Reasonable defaults SHALL be provided.

#### Scenario: Default spacing
- **WHEN** no spacing props are provided
- **THEN** nodes are spaced with visually comfortable defaults

#### Scenario: Custom spacing
- **WHEN** `nodeSpacing={80}` and `rankSpacing={120}` are provided
- **THEN** dagre uses these values for inter-node and inter-rank gaps

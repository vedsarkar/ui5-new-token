## ADDED Requirements

### Requirement: Diagram renders nodes and edges from data props
The Diagram component SHALL accept `nodes` and `edges` arrays and render them as a node-edge graph using React Flow. Each node SHALL be rendered as a DOM element (React component). Each edge SHALL be rendered as an SVG path connecting source and target nodes.

#### Scenario: Basic diagram with nodes and edges
- **WHEN** Diagram receives `nodes` with 3 items and `edges` with 2 items
- **THEN** 3 node elements and 2 edge paths are rendered in the viewport

#### Scenario: Nodes without edges
- **WHEN** Diagram receives `nodes` with 2 items and empty `edges`
- **THEN** 2 node elements are rendered with no edge paths

#### Scenario: Empty nodes array
- **WHEN** Diagram receives empty `nodes` array
- **THEN** "No data" overlay is displayed instead of the graph

### Requirement: Diagram operates in read-only mode
The Diagram component SHALL disable all editing interactions. Users SHALL NOT be able to drag nodes, create edges, delete elements, or select elements. Pan and zoom SHALL remain enabled for viewport navigation.

#### Scenario: Node dragging is disabled
- **WHEN** user attempts to drag a node
- **THEN** the node does not move

#### Scenario: Edge creation is disabled
- **WHEN** user attempts to drag from a handle
- **THEN** no new edge is created

#### Scenario: Pan and zoom are enabled
- **WHEN** user scrolls or pinch-zooms on the diagram
- **THEN** the viewport zooms in/out accordingly

#### Scenario: Pan via drag
- **WHEN** user drags on the diagram background
- **THEN** the viewport pans

### Requirement: Diagram handles loading, error, and empty states
The Diagram component SHALL handle states in priority order: error > loading > empty > diagram. State overlays SHALL follow the same pattern as existing chart components.

#### Scenario: Error state
- **WHEN** `error` prop is set to a non-empty string
- **THEN** error text overlay is displayed and no diagram is rendered

#### Scenario: Loading state
- **WHEN** `loading` prop is `true`
- **THEN** loading overlay is displayed

#### Scenario: Empty state
- **WHEN** `nodes` is empty or undefined and `loading` is false and `error` is not set
- **THEN** "No data" text overlay is displayed

### Requirement: Diagram fits viewport to content
The Diagram component SHALL automatically fit all nodes within the visible viewport after layout completes. The fit SHALL include padding so nodes are not flush against edges.

#### Scenario: Fit view after layout
- **WHEN** layout computation completes and node positions are set
- **THEN** viewport adjusts to show all nodes with padding

#### Scenario: Fit view on data change
- **WHEN** `nodes` or `edges` props change
- **THEN** layout recomputes and viewport re-fits to new content

### Requirement: Diagram supports custom node types
The Diagram component SHALL accept an optional `nodeTypes` prop — a record mapping type names to React components. When a node's `type` matches a key in `nodeTypes`, that component SHALL be used to render the node. Custom types SHALL be merged with the built-in `markdown` type.

#### Scenario: Custom node type rendering
- **WHEN** `nodeTypes` includes `{ custom: CustomNode }` and a node has `type: "custom"`
- **THEN** the node is rendered using the `CustomNode` component

#### Scenario: Built-in type not overridden
- **WHEN** `nodeTypes` includes custom types but a node has `type: "markdown"` (or no type)
- **THEN** the node is rendered using the built-in MarkdownNode component

### Requirement: Diagram uses reltio color tokens
The Diagram component SHALL use `--reltio-color-*` CSS tokens for all visual properties. Node backgrounds, borders, edge colors, and text colors SHALL reference global tokens. The component SHALL support dark mode via `data-theme="dark"` on an ancestor element.

#### Scenario: Light mode rendering
- **WHEN** no `data-theme` attribute is set
- **THEN** node backgrounds use `--reltio-color-surface-1`, borders use `--reltio-color-border-2`

#### Scenario: Dark mode rendering
- **WHEN** ancestor element has `data-theme="dark"`
- **THEN** all colors resolve to their dark mode token values

### Requirement: Diagram accepts standard HTML div props
The Diagram component SHALL use `HtmlProps<"div", DiagramCustomProps>` for its props type. All rest props SHALL be spread onto the wrapper div element. `className` and `style` SHALL be composable with internal styles.

#### Scenario: Custom className
- **WHEN** `className` prop is provided
- **THEN** it is merged with internal classes via `classNames()` on the root element

#### Scenario: Custom style
- **WHEN** `style` prop is provided
- **THEN** it is applied to the root wrapper element

## ADDED Requirements

### Requirement: MarkdownNode renders label header
The built-in markdown node type SHALL render a header section displaying the node's `label`. The label SHALL be rendered as plain text (not markdown). An optional `icon` string (emoji or text) SHALL be displayed before the label text.

#### Scenario: Node with label only
- **WHEN** a node has `label: "Customer"` and no `content`
- **THEN** the node renders a card with "Customer" as the header, no body section, no divider

#### Scenario: Node with icon and label
- **WHEN** a node has `label: "Customer"` and `icon: "📋"`
- **THEN** the node renders "📋 Customer" in the header

### Requirement: MarkdownNode renders markdown body
When a node has a `content` property, the MarkdownNode SHALL render it via the `Markdown` component below the label header, separated by a visual divider. The markdown content SHALL support the same features as chat messages (GFM, HTML, component overrides).

#### Scenario: Node with label and content
- **WHEN** a node has `label: "Customer"` and `content: "- name\n- email\n- phone"`
- **THEN** the node renders a header "Customer", a divider, and a bulleted list below

#### Scenario: Node with rich markdown content
- **WHEN** a node has `content` containing a markdown table
- **THEN** the table is rendered inside the node body via the Markdown component

#### Scenario: Node with component override in content
- **WHEN** a node has `content` containing `<Button>Click</Button>`
- **THEN** the design system Button component is rendered inside the node body

### Requirement: MarkdownNode has compact styles
The MarkdownNode SHALL override default Markdown component styles for compact display inside nodes. Font sizes, margins, and line heights SHALL be reduced compared to full-width chat rendering. Overrides SHALL use stable `.reltio_Markdown_root` class scoping.

#### Scenario: Compact typography
- **WHEN** markdown content is rendered inside a node
- **THEN** font size is smaller than the default 14px chat size

#### Scenario: Compact spacing
- **WHEN** markdown content with paragraphs is rendered inside a node
- **THEN** paragraph margins are tighter than default chat margins

### Requirement: MarkdownNode has source and target handles
The MarkdownNode SHALL render React Flow Handle components for edge connections. Both source and target handles SHALL be present on each node to support edges in any direction.

#### Scenario: Handles present for edge connections
- **WHEN** a MarkdownNode is rendered
- **THEN** it has both a target handle (for incoming edges) and a source handle (for outgoing edges)

#### Scenario: Handles positioned based on layout direction
- **WHEN** layout direction is `"TB"` (top-to-bottom)
- **THEN** target handle is on top, source handle is on bottom

#### Scenario: Handles for left-to-right layout
- **WHEN** layout direction is `"LR"`
- **THEN** target handle is on the left, source handle is on the right

### Requirement: MarkdownNode card styling
The MarkdownNode SHALL render as a card with background, border, and border-radius using `--reltio-color-*` tokens. The card SHALL have a subtle shadow or border to distinguish it from the background.

#### Scenario: Card visual appearance
- **WHEN** a MarkdownNode is rendered
- **THEN** it has a background color (`--reltio-color-surface-1`), border (`--reltio-color-border-2`), and rounded corners

### Requirement: Default node type is markdown
When a node does not specify a `type` property, it SHALL default to the built-in `markdown` type. Explicitly setting `type: "markdown"` SHALL produce the same result.

#### Scenario: Node without type
- **WHEN** a node has `{ id: "1", label: "Test" }` with no `type`
- **THEN** it is rendered using the MarkdownNode component

#### Scenario: Explicit markdown type
- **WHEN** a node has `type: "markdown"`
- **THEN** it is rendered using the MarkdownNode component

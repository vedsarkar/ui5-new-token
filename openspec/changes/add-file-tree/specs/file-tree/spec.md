## ADDED Requirements

### Requirement: Component export

The `FileTree` component SHALL be exported from `@reltio/design/components` as a named export, together with its `FileTreeProps` and `FileTreeNode` types.

#### Scenario: Public import

- **WHEN** a consumer writes `import { FileTree, type FileTreeProps, type FileTreeNode } from "@reltio/design/components"`
- **THEN** module resolution succeeds and all three symbols are available with TypeScript types

### Requirement: Hierarchy supplied as data

The component SHALL accept `items: FileTreeNode[]` describing the root nodes in display order. A `FileTreeNode` SHALL carry a unique `id`, a `name`, an optional `icon` of type `ReactNode`, and optional `children`.

A node with a `children` array SHALL be treated as expandable, including when that array is empty. A node without `children` SHALL be treated as a leaf.

#### Scenario: Empty folder is still expandable

- **WHEN** a node is supplied as `{ id: "empty", name: "empty", children: [] }`
- **THEN** the row renders a disclosure affordance and reports `aria-expanded`

#### Scenario: Leaf has no disclosure

- **WHEN** a node is supplied without a `children` key
- **THEN** the row reports no `aria-expanded` attribute

### Requirement: Connector derivation

For a row at depth `d` (roots being depth 0), the component SHALL render exactly `d` connector cells of 24px each, before the row's icon and label.

The final cell SHALL be a **fork** (`├`) when the row has a later sibling and a **turn** (`└`) when it is the last child. Each earlier cell `i` SHALL be a **straight** (`│`) when the ancestor at depth `i` has a later sibling, and **empty** otherwise.

Root rows SHALL render no connector cells.

#### Scenario: Last child terminates its run

- **WHEN** a row is the last child of its parent
- **THEN** its final connector cell draws a turn, whose vertical stops at the row's vertical centre

#### Scenario: Middle child continues its run

- **WHEN** a row has a later sibling
- **THEN** its final connector cell draws a fork, whose vertical spans the full row height

#### Scenario: Ancestor runs pass through

- **WHEN** a row at depth 3 has an ancestor at depth 1 with a later sibling and an ancestor at depth 2 without one
- **THEN** connector cell 1 draws a straight and connector cell 2 draws nothing

### Requirement: Selected ancestry highlighting

The component SHALL colour connectors to trace the selected row's ancestry using `sapList_SelectionBorderColor`, against `sapContent_ForegroundBorderColor` elsewhere.

A connector's **elbow** SHALL take the selection colour when the row it connects to is the selected row. A connector's **vertical** SHALL take the selection colour when the selected row lies below the current row inside that vertical's branch.

#### Scenario: Selected leaf highlights its own elbow

- **WHEN** a leaf row is selected
- **THEN** the elbow of its final connector cell takes the selection colour

#### Scenario: Ancestor run highlights toward the selection

- **WHEN** a row precedes the selected row and shares an ancestor whose child run the row's connector cell represents
- **THEN** that cell's vertical takes the selection colour

#### Scenario: Rows after the selection stay neutral

- **WHEN** a row appears below the selected row in visible order
- **THEN** its connectors take the neutral colour

### Requirement: Selection state

The component SHALL support controlled selection via `selectedId` and uncontrolled selection via `defaultSelectedId`. When `selectedId` is supplied the component SHALL NOT hold a shadow copy, and the rendered selection SHALL derive solely from that prop.

Activating a row SHALL call `onSelect` with the corresponding node.

#### Scenario: Controlled selection ignores internal state

- **WHEN** the component is rendered with `selectedId="a"` and a different row is activated
- **THEN** `onSelect` fires with the activated node AND the row marked selected remains the one whose id is `"a"`

#### Scenario: Uncontrolled selection follows activation

- **WHEN** the component is rendered with `defaultSelectedId="a"` and a different row is activated
- **THEN** the activated row becomes the selected row

### Requirement: Expansion state

The component SHALL support controlled expansion via `expandedIds` and uncontrolled expansion via `defaultExpandedIds`. Toggling a folder SHALL call `onExpandedChange` with the next set of expanded ids.

Activating an expandable row SHALL toggle its expansion in addition to selecting it.

#### Scenario: Collapsing hides descendants

- **WHEN** an expanded folder with children is collapsed
- **THEN** its descendant rows are removed from the accessibility tree and from the rendered output

### Requirement: Keyboard interaction

The component SHALL expose a single tab stop, moving a roving `tabindex` between rows. It SHALL implement: `ArrowDown`/`ArrowUp` to move focus between visible rows, `ArrowRight` to expand a collapsed folder or move into its first child, `ArrowLeft` to collapse an expanded folder or move to its parent, `Home`/`End` to jump to the first or last visible row, and `Enter`/`Space` to activate.

#### Scenario: ArrowRight expands then descends

- **WHEN** focus is on a collapsed folder and `ArrowRight` is pressed
- **THEN** the folder expands without moving focus
- **WHEN** `ArrowRight` is pressed again
- **THEN** focus moves to the folder's first child

#### Scenario: ArrowLeft collapses then ascends

- **WHEN** focus is on an expanded folder and `ArrowLeft` is pressed
- **THEN** the folder collapses without moving focus
- **WHEN** `ArrowLeft` is pressed again
- **THEN** focus moves to the folder's parent row

#### Scenario: Only one tab stop

- **WHEN** the tree contains several visible rows
- **THEN** exactly one row carries `tabindex="0"` and the rest carry `tabindex="-1"`

### Requirement: Accessible structure

The container SHALL carry `role="tree"`. Each row SHALL carry `role="treeitem"` with `aria-level` reflecting its 1-based depth, `aria-selected` reflecting selection, and `aria-expanded` when expandable. Child rows SHALL be wrapped in an element with `role="group"`.

Connector cells SHALL be hidden from assistive technology, since depth is already conveyed by `aria-level`.

#### Scenario: Depth is announced without connectors

- **WHEN** a row at depth 2 is focused
- **THEN** it reports `aria-level="3"` AND its connector cells are not present in the accessibility tree

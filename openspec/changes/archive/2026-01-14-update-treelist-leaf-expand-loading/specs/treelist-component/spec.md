## MODIFIED Requirements

### Requirement: Hierarchical Data Rendering

The TreeList component SHALL render hierarchical data structures with nested children, supporting unlimited depth levels.

#### Scenario: Single root tree renders correctly
- **WHEN** data prop contains a single root node with nested children
- **THEN** component renders the complete tree structure
- **AND** each node displays at its correct depth level

#### Scenario: Multiple root trees render correctly
- **WHEN** data prop contains multiple root nodes
- **THEN** component renders all root nodes and their children
- **AND** each root tree is visually independent

#### Scenario: Leaf nodes render without expand control
- **WHEN** a node has no children prop (undefined or null)
- **THEN** node renders as a leaf (no toggle button)
- **AND** empty space is shown where toggle button would be

#### Scenario: Parent nodes render with expand control
- **WHEN** a node has a children prop defined (including an empty array while loading or awaiting data)
- **THEN** node renders with a toggle button (chevron icon)
- **AND** toggle button indicates current expand/collapse state

### Requirement: Expand/Collapse Functionality

The TreeList component SHALL provide expand/collapse functionality for parent nodes, with both controlled and uncontrolled modes.

#### Scenario: Toggle button expands collapsed node
- **WHEN** user clicks toggle button on a collapsed parent node
- **THEN** node expands to show its children
- **AND** toggle icon rotates to indicate expanded state

#### Scenario: Toggle button collapses expanded node
- **WHEN** user clicks toggle button on an expanded parent node
- **THEN** node collapses to hide its children
- **AND** toggle icon rotates to indicate collapsed state

#### Scenario: Uncontrolled mode expands top-level nodes by default
- **WHEN** expandedKeys prop is not provided
- **THEN** component manages expanded state internally
- **AND** top-level nodes are expanded by default
- **AND** nested nodes are collapsed by default

#### Scenario: Controlled mode respects expandedKeys prop
- **WHEN** expandedKeys prop is provided
- **THEN** only nodes with keys in expandedKeys are expanded
- **AND** component does not manage expanded state internally

#### Scenario: onExpand callback fires on state change
- **WHEN** user toggles a node's expanded state
- **THEN** onExpand callback is called with updated keys array and the toggled TreeItem
- **AND** arguments include all currently expanded node keys and the node that triggered the change

### Requirement: TypeScript Type Safety

The TreeList component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate TreeList.types.ts file using the `type` keyword (not `interface`).

#### Scenario: TreeItem type defines node structure
- **WHEN** developer uses TreeList component
- **THEN** TreeItem type specifies id, label, optional children, and optional isLoading flag
- **AND** TypeScript validates data structure

#### Scenario: TreeKey type supports string and number
- **WHEN** developer provides node ids
- **THEN** ids can be strings or numbers
- **AND** expanded keys can be strings or numbers

#### Scenario: TreeListProps type defines component props
- **WHEN** developer uses TreeList component
- **THEN** all props are properly typed
- **AND** TypeScript provides autocomplete

#### Scenario: Types exported alongside component
- **WHEN** developer imports TreeList
- **THEN** TreeItem, TreeKey, TreeListProps types can be imported
- **AND** all types are properly documented


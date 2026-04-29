# treelist-component Specification

## Purpose

TreeList — a hierarchical tree view component wrapping `rc-tree`, displaying expandable/collapsible nodes with custom label rendering and controlled expansion state.

No direct SAP equivalent used currently (future alignment with `ui5-tree` planned as a separate change).

## Requirements

### Requirement: Hierarchical Data

The TreeList SHALL accept a `data` prop containing an array of `TreeItem` objects with recursive `children`.

#### Scenario: Tree data structure
- **WHEN** `data` is provided
- **THEN** each `TreeItem` has `id: TreeKey`, `label: string`, optional `children: TreeItem[]`, optional `isLoading: boolean`
- **AND** `TreeKey = string | number`

### Requirement: Controlled Expansion

#### Scenario: Controlled expandedKeys
- **WHEN** `expandedKeys` is provided
- **THEN** only nodes whose IDs are in the array are expanded

#### Scenario: Expand callback
- **WHEN** the user expands or collapses a node
- **THEN** `onExpand(newKeys, clickedNode)` is called

### Requirement: Custom Label Rendering

#### Scenario: LabelComponent
- **WHEN** `LabelComponent` is provided
- **THEN** each node's label renders using the custom component receiving `{ data: TreeItem }`

#### Scenario: Default label
- **WHEN** `LabelComponent` is not provided
- **THEN** the node's `label` string renders as plain text

### Requirement: Loading State

#### Scenario: Node loading
- **WHEN** a `TreeItem` has `isLoading: true`
- **THEN** a loading indicator appears for that node (for lazy-loaded children)

### Requirement: TypeScript Types

Props SHALL be defined as `TreeListProps = HtmlProps<"div", { data, LabelComponent, expandedKeys, onExpand }>`. Exported types: `TreeItem`, `TreeKey`.

### Requirement: CSS Styling

Minimal custom styling. Uses `--sapTextColor` for text color. Background is transparent, font-size 14px.

**SAP tokens used:** `--sapTextColor`.

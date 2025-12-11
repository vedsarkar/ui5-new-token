# Data Model: TreeList Component

## Entities

### TreeNode
- id: string (unique within the parent scope)
- label: string
- children?: TreeNode[] (optional recursive collection)
- disabled?: boolean (optional)
- metadata?: object (key-value for custom use; should be serializable)

Validation:
- Each node must have a non-empty `id` that is unique among its siblings.
- No circular references allowed (detect via visited set during traversal).
- `children` must be an array when present.

### TreeData
- nodes: TreeNode[] (one or more root nodes)

Validation:
- Root-level nodes follow the same `TreeNode` constraints.
- The structure must remain a forest (no shared child instances).

### ExpandState
- expandedById: Record<string, boolean>

Rules:
- Keyed by `TreeNode.id`.
- Missing key implies collapsed.
- Orphaned keys (ids no longer present) are ignored.

## Relationships
- TreeData contains one or more root `TreeNode` elements.
- Each `TreeNode` may contain zero or more child `TreeNode` elements.
- `ExpandState` is external UI state that references nodes by `id`.

## State Transitions
- Collapse: `expandedById[id] = false`
- Expand: `expandedById[id] = true`
- Toggle: invert current value
- Data update: recompute visible nodes from `TreeData` preserving `ExpandState`

## Constraints and Performance Targets
- Depth: support ≥ 10 levels (tested)
- Width: support ≥ 100 children per node (tested)
- Scale: acceptable UX up to ~10,000 nodes; primary target 1,000 nodes < 2s initial render





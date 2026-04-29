# TreeList Component Design

## Context

The TreeList displays hierarchical data with expandable/collapsible nodes. Wraps the `rc-tree` library for core tree rendering logic, with custom styling using SAP Horizon tokens.

**Key Constraints:**
- rc-tree as underlying library (Ant Design ecosystem)
- Controlled expansion via `expandedKeys` prop
- Custom label rendering via `LabelComponent` prop
- Minimal SAP token usage (primarily `--sapTextColor`)

## Decisions

### Decision: Use rc-tree as Underlying Library

**Choice:** rc-tree for core tree rendering and expand/collapse logic.

**Rationale:** Battle-tested, minimal API surface used (Tree with titleRender), tree-shakeable, well-maintained. Avoids reinventing complex tree traversal and state management.

### Decision: LabelComponent for Custom Rendering

**Choice:** Accept a React component via `LabelComponent` prop.

**Rationale:** Maximum flexibility — can render icons, badges, buttons, etc. Component receives full node data. Default rendering shows plain text label.

### Decision: Controlled Expansion Only

**Choice:** Controlled mode via `expandedKeys` + `onExpand`.

**Rationale:** Consistent with the project's controlled-only component philosophy. External state management is straightforward for consumers.

### Decision: Internal Subcomponents Not Exported

**Choice:** TreeNode and internal components are not exported.

**Rationale:** Implementation details may change (especially during future SAP Tree alignment). Keeps public API minimal.

## Future Considerations

A separate change will align the TreeList with SAP Tree (`ui5-tree`) patterns — potentially replacing the rc-tree dependency and adding SAP-standard tree features (selection, keyboard navigation patterns).

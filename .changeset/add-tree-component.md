---
"@reltio/design": minor
---

Add endorsed `Tree` surface for hierarchical data: `Tree` and a single `TreeItem` node entity. `TreeItem` is a thin Reltio wrapper that collapses UI5's `TreeItem` / `TreeItemCustom` split into one component — the row label is the `content` prop (a string renders a standard node and keeps `additionalText`; any other `ReactNode` renders as custom row content). It also adds a `loading` prop: when `true`, the node renders three non-interactive skeleton placeholder rows while its children are fetched, the standard lazy-loading affordance. UI5's `TreeItemCustom` is not exposed directly — `TreeItem` selects the right underlying node automatically.

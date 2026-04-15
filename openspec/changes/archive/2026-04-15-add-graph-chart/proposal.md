## Why

The chart library currently has no way to visualize node-link relationships (entity relations, match/merge networks, record hierarchies). Graph charts are a fundamental visualization for Reltio's core domain — entity resolution — where users need to see how entities, addresses, organizations, and other records relate to each other. Adding a `GraphChart` wrapper over the base `Chart` component fills this gap with a minimal, data-driven API consistent with existing charts like `SankeyChart`.

## What Changes

- Add a new `GraphChart` component that renders an ECharts force-directed graph
- `GraphChart` accepts `nodes` (with `id`, `name`, optional `value`) and `links` (with `source`, `target`, optional `label` and `value`)
- Nodes use `id` as the stable identifier (not `name`) to avoid collisions
- Node size is auto-calculated from `value` (normalized to a symbol size range)
- Labels are shown on hover only (not always visible)
- All nodes use the primary theme color (no categories in v1)
- No directional edges — all links are undirected lines
- No interactive features beyond hover (no drag, no zoom/pan)
- Chart fills parent container (no `height` prop), same pattern as `GeoChart`
- Optional `units` prop for tooltip value suffix
- Standard state management: error > loading > empty > chart

## Capabilities

### New Capabilities
- `graph-chart`: Force-directed graph visualization with declarative nodes/links API, auto-sized nodes, hover labels, and standard chart states

### Modified Capabilities

None. The base `chart-core` is unchanged — `GraphChart` registers its own ECharts series type at module level, following the established pattern.

## Impact

- **New files**: `charts/GraphChart/` directory (component, types, styles, stories, index)
- **Modified files**: `charts/index.ts` (add re-export)
- **Dependencies**: Uses `echarts/charts` `GraphChart` series type (already available in echarts package)
- **No breaking changes** to existing components or APIs

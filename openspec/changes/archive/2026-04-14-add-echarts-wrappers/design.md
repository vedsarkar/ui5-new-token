## Context

The project has an established two-layer chart architecture: an internal `Chart` base component (ECharts lifecycle, theming, resize) and public high-level wrappers (`LineChart`) with simplified declarative APIs. The `charts/AGENTS.md` defines the exact patterns: file structure, `buildXxxOption()` pure function, state management priority, CSS styling rules, and Storybook story requirements. All three new charts follow this existing architecture without modifications to the base.

## Goals / Non-Goals

**Goals:**
- Add 3 visually impressive ECharts wrappers: GaugeChart, SankeyChart, RadarChart
- Follow the exact same pattern as LineChart for consistency and AI-agent readability
- Provide simplified, data-first APIs that hide all ECharts complexity from consumers
- Include complete Storybook stories with realistic demo data

**Non-Goals:**
- Modifying the base `Chart` component or theme system
- Exposing raw ECharts options or escape hatches
- Supporting advanced ECharts features (custom renderers, animations API, dataset transforms)
- Creating composite/dashboard layouts combining multiple charts
- Adding interactivity callbacks (onClick, onHover) — future work

## Decisions

### 1. Data shape per chart type

Each chart type requires a different data model. Decision: use the simplest possible shape for each.

| Chart | Data Shape | Rationale |
|-------|-----------|-----------|
| **GaugeChart** | `value: number` + `label?: string` | Single KPI value — no array needed. Simplest possible API. |
| **RadarChart** | `indicators: { name, max }[]` + `series: { name, values[] }[]` | Indicators define axes, series define polygons. Standard radar pattern. |
| **SankeyChart** | `nodes: { name }[]` + `links: { source, target, value }[]` | Graph data model. Matches ECharts native format — no transformation needed. |

**Alternative considered:** Using `Record<string, unknown>[]` with key-mapping props (like LineChart) for all charts. Rejected because non-cartesian charts (gauge, sankey) don't have the x-key/series pattern — forcing this abstraction would add complexity without benefit.

### 2. No `EMPTY_GRID_OPTION` for non-cartesian charts

LineChart shows an empty cartesian grid behind loading/error/empty overlays. For GaugeChart, SankeyChart, and RadarChart there is no meaningful "empty grid" to show — these charts have no cartesian axes.

Decision: Use an empty `EChartsOption` (`{}`) for non-data states. The overlays (loading spinner, error text, "No data") still render as React elements over the empty canvas. This keeps the implementation simpler and avoids rendering misleading empty axis structures.

### 3. ECharts component registration

Some charts need additional ECharts components beyond what the base `Chart` registers:
- **RadarChart** needs `RadarComponent` from `echarts/components`
- Other two charts need only their series type from `echarts/charts`

Decision: Each chart component registers its own dependencies at module level via `echarts.use()`, following the established pattern from LineChart. This maintains tree-shaking and avoids modifying the base.

### 4. Sankey passes data through without transformation

Unlike LineChart which transforms `Record<string, unknown>[]` + key mappings into ECharts series, Sankey already uses a data shape that matches ECharts native format. The `buildSankeyOption()` function composes the option object around the data without transforming it.

Decision: Accept this inconsistency. A forced transformation layer would add complexity for no benefit. The data-first principle is preserved — consumers still pass domain data, not ECharts options.

## Risks / Trade-offs

- **Sankey node ordering** — ECharts auto-layouts Sankey nodes, which may not match expected left-to-right flow for all datasets. Mitigation: document that node order in the `nodes` array affects layout; accept ECharts default for v1.
- **Gauge max value** — Without an explicit `max` prop, the gauge defaults to 100. Mitigation: expose `max` prop with default of 100, document clearly.
- **Bundle size** — Adding 3 chart types increases the ECharts bundle. Mitigation: tree-shaking ensures only imported charts are bundled; each chart type adds ~5-15KB gzipped.

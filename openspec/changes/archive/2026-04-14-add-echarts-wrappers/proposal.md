## Why

The Reltio Design Platform currently has only one ECharts wrapper (`LineChart`). For the first version of the design system we need a richer set of visually impressive chart components that create a "wow" effect for stakeholders while remaining simple for AI agents and developers to build and use. All three proposed charts follow the same thin-wrapper pattern as `LineChart`, keeping implementation complexity low.

## What Changes

- Add **GaugeChart** component — ring/progress meter for KPI dashboards (data quality score, match confidence, SLA metrics)
- Add **SankeyChart** component — flow diagram with colored ribbons connecting nodes (data lineage, match/merge pipelines)
- Add **RadarChart** component — polygon spider chart for multi-dimensional comparison (data quality profiles: completeness, accuracy, timeliness)
- Update `charts/index.ts` to export all new components

## Capabilities

### New Capabilities
- `gauge-chart`: GaugeChart component — ring-style progress gauge with declarative value/label API
- `sankey-chart`: SankeyChart component — flow diagram with nodes/links declarative API
- `radar-chart`: RadarChart component — spider/polygon chart with indicators and multi-series comparison

### Modified Capabilities

_None. All new charts reuse the existing `chart-core` base component without modifications._

## Impact

- **Code**: New directories under `charts/` following the established component structure. Each chart registers its own ECharts series type via `echarts.use()` — no changes to the base `Chart` component.
- **Dependencies**: No new npm dependencies. All chart types come from the already-installed `echarts/charts` package. Some charts may need additional ECharts components (e.g., `RadarComponent`, `VisualMapComponent`) registered at module level.
- **Bundle size**: Minimal increase — ECharts tree-shakes unused chart types, and each wrapper only imports its own series module.
- **API surface**: Three new public exports from `@/charts`. All follow the same data-first pattern as `LineChart`.

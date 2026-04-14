## Context

The project already has `LineChart` which accepts `data` (array of records), `xKey` (string or function), and `series` (array of `{ key, name? }`). BarChart is the categorical counterpart — same data shape, same `buildXxxOption()` pattern, just `type: "bar"` instead of `type: "line"`.

## Goals / Non-Goals

**Goals:**
- Add a BarChart wrapper with the same API as LineChart
- Reuse the identical `data`/`xKey`/`series`/`units` prop pattern

**Non-Goals:**
- Horizontal bar chart (future work)
- Stacked bars (future work)
- Mixed line+bar charts

## Decisions

### 1. Identical API to LineChart

BarChart uses the same `BarChartSeries` type as `LineChartSeries` (`{ key: string; name?: string }`), same `xKey` prop (string or function), same `units` prop. The only difference is `type: "bar"` in the ECharts series config.

**Rationale:** Minimizes learning curve — if you know LineChart, you know BarChart. AI agents can swap between them by changing one import.

### 2. Uses `EMPTY_GRID_OPTION` for non-data states

Unlike non-cartesian charts (Gauge, Radar, Sankey), BarChart has cartesian axes and benefits from showing an empty grid behind loading/error/empty overlays — same pattern as LineChart.

## Risks / Trade-offs

- None significant. This is the simplest possible chart wrapper — a near-copy of LineChart with `type: "bar"`.

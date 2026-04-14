## Why

The design system lacks a proportion/composition chart. A DonutChart (pie with hollow center) is the standard way to show part-to-whole relationships — entity type distribution, data source breakdown, match status split. It complements the existing categorical (BarChart) and trend (LineChart) charts.

## What Changes

- Add **DonutChart** component — donut/ring chart for proportional data visualization
- Update `charts/index.ts` to export the new component

## Capabilities

### New Capabilities
- `donut-chart`: DonutChart component — donut ring chart with simple `{ name, value }[]` data API, auto-legend, and tooltip

### Modified Capabilities

_None._

## Impact

- **Code**: New `charts/DonutChart/` directory following the established component structure.
- **Dependencies**: None. Uses `PieChart` from the already-installed `echarts/charts` package (ECharts uses `type: "pie"` for both pie and donut).
- **Bundle size**: Minimal — one additional ECharts series type (~5KB gzipped).
- **API surface**: One new public export from `@/charts`.

## Why

The design system has a LineChart for trend data but lacks a BarChart for categorical comparisons — one of the most common chart types in dashboards. BarChart follows the exact same data-first API pattern as LineChart (`data`/`xKey`/`series`), making it trivial to implement and learn.

## What Changes

- Add **BarChart** component — vertical bar chart for categorical data comparison
- Update `charts/index.ts` to export the new component

## Capabilities

### New Capabilities
- `bar-chart`: BarChart component — vertical bar chart with the same declarative `data`/`xKey`/`series` API as LineChart

### Modified Capabilities

_None._

## Impact

- **Code**: New `charts/BarChart/` directory following the established component structure.
- **Dependencies**: None. Uses `BarChart` from the already-installed `echarts/charts` package.
- **Bundle size**: Minimal — one additional ECharts series type (~5KB gzipped).
- **API surface**: One new public export from `@/charts`.

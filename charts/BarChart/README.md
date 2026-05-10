# BarChart

```tsx
import { BarChart } from "@reltio/design/charts";
```

`BarChart` renders a vertical-bar comparison of one or more series across a categorical X axis. It is a thin Reltio wrapper around the shared internal `Chart` (Apache ECharts) — you pass an array of row-objects + a category key + a list of series; the wrapper builds the `EChartsOption` and delegates rendering to `Chart`.

### Data shape

Each entry in `data` is a free-form object (e.g. one row per month). `xKey` selects (or extracts) the category label for that row, and `series` lists the keys to plot — every series produces one bar group at each X value.

`xKey` accepts either a property name (string) or a function. The function form is useful when you need to format a date column, derive a label from multiple fields, or normalize values from different source systems before display.

### Units

`units` is a free-form suffix appended to Y-axis labels and tooltip values (`"ms"`, `"%"`, `" records"`, ...). Charts share the same `formatWithUnits` helper from `Chart`, so tooltips across the dashboard format consistently regardless of which chart type renders them.

### Empty state

If `data` is missing or empty, the chart renders an empty grid with a "No data" overlay instead of a broken zero-height canvas. Callers do not need to gate the component on data availability.

### See also

- [Apache ECharts — Bar series](https://echarts.apache.org/en/option.html#series-bar) — the underlying option schema (escape-hatched series options are intentionally not exposed by this wrapper)

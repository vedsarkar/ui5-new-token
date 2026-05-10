# RadarChart

```tsx
import { RadarChart } from "@reltio/design/charts";
```

`RadarChart` renders a multi-axis polygon plot for **comparing several entities across the same set of metrics**. Each radial spoke is a metric (`indicators`), each filled polygon is one entity (`series`). Useful for at-a-glance comparison of source-system quality, profile completeness, etc. — situations where the absolute values matter less than the **shape** of each polygon.

### Data shape

- `indicators` defines the spokes — `{ name, max }` per metric. `max` is **per-axis** (different metrics can have different scales).
- Each entry in `series` is `{ name, values }` where `values` is positional — index `i` aligns with `indicators[i]`. Mismatched lengths produce a malformed polygon.

### Number of series

Visually the chart works for ~2–5 polygons. Beyond that, overlapping fill becomes hard to read — switch to `BarChart` with grouped bars instead.

### Units

`units` is a free-form suffix for tooltip values (`"%"`, `" pts"`, `"ms"`). Tooltip shows the original value, not the per-axis-normalized one.

### See also

- [Apache ECharts — Radar series](https://echarts.apache.org/en/option.html#series-radar) — the underlying option schema

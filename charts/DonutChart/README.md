# DonutChart

```tsx
import { DonutChart } from "@reltio/design/charts";
```

`DonutChart` renders a segmented ring showing each item's share of the total. Use it for **proportional comparison** with a small number of segments (typically up to ~7) — for many segments use a `BarChart` instead, where small slices are easier to read.

### Data shape

`data` is a flat list of `{ name, value }` items. The wrapper computes percentages from the raw values (no need to pre-normalize) and renders one slice per item. Slice colors are taken from the chart theme palette in order.

### Units

`units` is a free-form suffix appended to tooltip values (`"records"`, `"%"`, `"users"`). Tooltips show both the absolute value (with units) and the auto-computed percentage.

### Empty state

Empty `data` renders the donut frame with a "No data" overlay — no need to gate the component on data availability.

### See also

- [Apache ECharts — Pie series](https://echarts.apache.org/en/option.html#series-pie) — the underlying option schema (donut is rendered as a pie with a center hole)

# GaugeChart

`GaugeChart` is a single-value progress dial — a half-circle showing how far `value` is along the `0…max` range. Use it for headline metrics where the position relative to a target matters more than the exact number (e.g. data-quality score, SLA compliance, resource utilization).

### Scale & defaults

`max` defaults to `100` so passing only `value` produces a percentage gauge. Override `max` for any other domain. The fill is `value / max` clamped to `[0, 1]`; the wrapper does not throw on out-of-range values, just visually clamps them.

### Center label

`label` is the small caption shown beneath the numeric value in the dial center (e.g. `"Data quality"`). The numeric value itself uses the same `formatWithUnits` helper as the rest of the chart family — pass `units` to add a suffix (`"%"`, `"ms"`, `" pts"`).

### Empty / loading state

Pass `value={undefined}` to render an empty dial (no fill, neutral color). For "still loading", switch the parent layout to a `Skeleton` instead of mounting the gauge with placeholder zeros — the gauge has no internal loading state.

### See also

- [Apache ECharts — Gauge series](https://echarts.apache.org/en/option.html#series-gauge) — the underlying option schema

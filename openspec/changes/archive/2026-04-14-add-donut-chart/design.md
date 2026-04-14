## Context

ECharts implements donut charts as `type: "pie"` with `radius: ["inner%", "outer%"]`. The hollow center distinguishes it from a filled pie. The project already has non-cartesian chart wrappers (GaugeChart) that use simple data shapes without `xKey`/`series` mapping.

## Goals / Non-Goals

**Goals:**
- Add a DonutChart with a simple `{ name, value }[]` data API
- Auto-show legend for segment labels
- Support tooltip on hover

**Non-Goals:**
- Solid pie chart (no inner radius) — donut is the modern standard
- Nested/multi-ring donut — future work
- Custom center text/label — future work

## Decisions

### 1. Data shape: `{ name: string; value: number }[]`

Same shape as FunnelChart's items. Each entry becomes one donut segment. No key-mapping needed — the data is already in the right shape.

**Rationale:** Proportional charts don't have the x-axis/series pattern of cartesian charts. A flat name-value array is the simplest possible API.

### 2. ECharts PieChart with radius gap

Uses `type: "pie"` with `radius: ["40%", "70%"]` to create the donut hole. These are sensible defaults that look good at any size.

### 3. No `EMPTY_GRID_OPTION` — non-cartesian chart

Same as GaugeChart/RadarChart/SankeyChart: uses empty `EChartsOption` (`{}`) for non-data states with React overlay elements.

### 4. Always show legend

Unlike cartesian charts where legend is conditional on multiple series, donut charts always benefit from a legend showing segment labels and colors. Legend is always visible.

## Risks / Trade-offs

- **Many small segments** — More than ~8 segments will crowd the donut. Mitigation: accept ECharts default behavior (small slices are still rendered); documentation recommends grouping small values into "Other".

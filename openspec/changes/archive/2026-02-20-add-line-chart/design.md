## Context

The chart-core foundation (`charts/Chart/`) provides the base `Chart` component with ECharts lifecycle management, dynamic theming from `--reltio-color-*` tokens, and auto-resize. LineChart is the first high-level wrapper — it transforms a simplified declarative API into an ECharts option and passes it to `<Chart>`. The architectural pattern established here will serve as the template for BarChart, DonutChart, and all future chart components.

## Goals / Non-Goals

**Goals:**

- Provide a data-first declarative API that requires zero ECharts knowledge
- Support multiple data series with automatic coloring from the theme palette
- Include built-in loading, empty, and error states
- Create Storybook stories for visual regression testing with Chromatic
- Establish the pattern for all future high-level chart components

**Non-Goals:**

- Custom animation configuration
- Click/hover event callbacks
- Custom tooltip formatting (separate from xKey)
- Area chart variant (separate component later)
- Axis rotation or tick interval options
- Legend positioning customization

## Decisions

### 1. Declarative data-first API

**Decision:** The `LineChart` accepts a flat array of data objects, an `xKey` for the category axis, and a `series` array describing which keys to plot. The component transforms this into an ECharts option internally.

**Alternatives considered:**
- Accept pre-built ECharts option — rejected, defeats the purpose of a simplified API
- Separate `xData` and `yData` arrays — rejected, harder to work with for multi-series data
- Children-based API (`<LineChart><Series key="sales" /></LineChart>`) — rejected, adds JSX complexity without benefit for static configuration
- Separate `xKey` (string) + `xLabelFormat` (function) — rejected, two props doing one job in two steps; merged into a single union-type `xKey`

**API shape:**

```typescript
type LineChartSeries = {
  key: string;          // data object key to plot as Y values
  name?: string;        // legend label (defaults to key)
};

type LineChartProps = {
  data: Record<string, unknown>[];
  xKey: string | ((item: Record<string, unknown>) => string);
  series: LineChartSeries[];
  height?: number | string;
  units?: string;
  loading?: boolean;
  error?: string;
  className?: string;
};
```

The `xKey` prop supports two modes:
- **String** — property name lookup, raw value used as axis label: `xKey="month"`
- **Function** — custom extraction and formatting in one step: `xKey={(d) => formatDate(d.ts)}`

When `xKey` is a function, the returned string is used for both axis labels and tooltip display. If separate tooltip formatting is needed later, a `tooltipFormat` prop can be added without breaking changes.

**Usage:**

```tsx
// Simple — string key, raw values as labels
<LineChart
  data={[
    { month: "Jan", sales: 150, returns: 30 },
    { month: "Feb", sales: 230, returns: 45 },
    { month: "Mar", sales: 224, returns: 38 },
  ]}
  xKey="month"
  series={[
    { key: "sales", name: "Sales" },
    { key: "returns", name: "Returns" },
  ]}
/>

// With formatting — function extracts and formats
<LineChart
  data={apiData}
  xKey={(item) => new Date(item.timestamp as number)
    .toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short" })}
  series={[{ key: "value", name: "Queue Size" }]}
/>
```

### 2. Data-to-option transformation

**Decision:** The `LineChart` component builds the ECharts option from props in a pure function `buildLineOption()`. This function is called on every render (or memoized) and the result is passed to `<Chart option={...} />`.

**Transformation logic:**

```
Input:  data, xKey, series
Output: EChartsOption

xLabels = typeof xKey === "function"
  ? data.map(xKey)
  : data.map(d => d[xKey])

xAxis.type = "category"
xAxis.data = xLabels

series = series.map(s => ({
  type: "line",
  name: s.name ?? s.key,
  data: data.map(d => d[s.key]),
}))

tooltip.trigger = "axis"
legend.show = series.length > 1
```

### 3. Built-in states (loading, empty, error)

**Decision:** The `LineChart` handles states with built-in visuals. No customization of state appearance is supported in v1. The key distinction is between initial loading (no data yet) and background refresh (data visible, update in progress).

**State matrix:**

| loading | data | error | Display |
|---------|------|-------|---------|
| — | — | non-empty | Centered error text overlay + empty grid |
| true | empty | — | ECharts built-in loading overlay + empty grid |
| true | present | — | ECharts built-in loading overlay on rendered chart |
| false | empty | — | Centered "No data" text overlay + empty grid |
| false | present | — | Normal chart rendering |

**Priority:** `error` > everything else.

All non-data states render an empty grid (with Y-axis 0–1000 and split lines) beneath the overlay, so users can see the chart placeholder. The ECharts built-in `showLoading()` is used for both initial loading and background refresh — in the background refresh case, the chart data is visible under the semi-transparent loading overlay.

**Alternatives considered:**
- Custom render props for states — rejected, too complex for v1
- Always show chart skeleton — rejected, will be designed later
- Use ECharts `graphic` component for empty/error text — rejected, simpler to render as plain HTML overlay
- Skeleton component for background refresh — rejected in favor of ECharts built-in overlay for simplicity and consistency

### 4. ECharts series type registration

**Decision:** `LineChart.tsx` registers the ECharts `LineChart` series type at module level. This follows the distributed registration pattern from chart-core.

```typescript
import { LineChart as EChartsLine } from "echarts/charts";
import { echarts } from "@/charts/Chart";
echarts.use([EChartsLine]);
```

### 5. Y-axis units formatting

**Decision:** An optional `units` string prop is appended as a suffix to Y-axis labels and tooltip values. Applied via ECharts `axisLabel.formatter` and `tooltip.valueFormatter`. When not provided, default ECharts number formatting is used.

**Alternatives considered:**
- `yFormat` function prop — rejected for v1, too verbose for common cases. Can be added later without breaking changes.
- Prefix/suffix convention — rejected, suffix covers 95% of Reltio use cases (ms, %, records, MB)

### 7. Storybook stories

**Decision:** Stories demonstrate each variant and state as separate stories under `"Charts/LineChart"`. One variant per story following the design system convention.

**Stories to create:**

| Story | What it demonstrates |
|-------|---------------------|
| Default | Single series line chart |
| MultipleSeries | Two or three series with legend |
| WithUnits | Units prop (e.g. "ms" suffix on Y-axis) |
| FormattedXAxis | xKey as function (e.g. timestamp → readable date) |
| Loading | Initial loading state (no data) |
| BackgroundRefresh | Loading with existing data (ECharts overlay) |
| Empty | Empty data state |
| Error | Error state with message |
| CustomHeight | Non-default height |

### 8. Component file structure

**Decision:** Standard component structure following the design system conventions.

```
charts/LineChart/
├── LineChart.tsx
├── LineChart.types.ts
├── LineChart.module.css
├── LineChart.stories.tsx
└── index.ts
```

`charts/index.ts` is updated to export `LineChart` and `LineChartProps` as the first public chart API.

## Risks / Trade-offs

- **Minimal API may be too limiting** → Intentional for v1. If teams need more control (custom tooltips, axis formatting), we can add specific props later without breaking the existing API.
- **No event handling** → Charts are display-only in v1. Click-to-drill-down or hover callbacks can be added later as optional props.
- **Simple text for empty/error states** → Visually basic but functional. Custom designs can be added later without API changes since states are not customizable.

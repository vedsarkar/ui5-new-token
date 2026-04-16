# Chart Development Guidelines

This directory contains all chart components for the Reltio Design Platform, built on [Apache ECharts](https://echarts.apache.org/) v6.

## Architecture

Charts follow a two-layer architecture:

```
charts/
├── Chart/              ← Internal base component (DO NOT use directly)
│   ├── Chart.tsx        ECharts lifecycle, resize, theme
│   ├── Chart.types.ts   ChartProps type
│   ├── Chart.module.css Container styles
│   ├── theme.ts         Dynamic theme from CSS tokens
│   └── index.ts         Internal exports (Chart, echarts)
├── LineChart/          ← Public high-level component
│   ├── LineChart.tsx
│   ├── LineChart.types.ts
│   ├── LineChart.module.css
│   ├── LineChart.stories.tsx
│   └── index.ts
├── index.ts            ← Public API (only high-level charts)
└── AGENTS.md
```

**Layer 1 — Base `Chart` (internal):** Manages ECharts instance lifecycle, dynamic theming, and resize. Also serves as the single source for shared chart utilities (formatting helpers, constants, etc.). Never used directly by consumers. No Storybook stories.

**Layer 2 — High-level charts (public):** `LineChart`, `BarChart`, `DonutChart`, etc. Each wraps `<Chart>` with a simplified declarative API. These are what consumers import and use.

### Shared Utilities

Any utility function or constant used by more than one chart MUST live in `charts/Chart/` and be exported from its `index.ts`. High-level charts import shared code from `@/charts/Chart` — never duplicate logic across chart components.

## Creating a New Chart Component

### 1. File Structure (MANDATORY)

Every high-level chart MUST follow this structure:

```
charts/ChartName/
├── ChartName.tsx           # Component implementation
├── ChartName.types.ts      # Type definitions (REQUIRED - separate file)
├── ChartName.module.css    # Scoped styles
├── ChartName.stories.tsx   # Storybook stories
└── index.ts                # Public exports
```

### 2. ECharts Series Registration

Each chart component registers its own ECharts series type at module level. This is required for tree-shaking — only imported chart types are bundled.

```typescript
import { BarChart as EChartsBar } from "echarts/charts";
import { echarts } from "@/charts/Chart";

echarts.use([EChartsBar]);
```

`echarts.use()` is idempotent — duplicate registrations are safe. Do NOT modify the base `Chart` component when adding new chart types.

### 3. Build Option Function

Every chart MUST have a pure `buildXxxOption()` function that transforms props into an ECharts option object:

```typescript
function buildBarOption(
  data: Record<string, unknown>[],
  categoryKey: string,
  series: BarChartSeries[],
): EChartsOption {
  // Transform simplified props → ECharts option
  return { xAxis: {...}, yAxis: {...}, series: [...] };
}
```

**Rules:**
- Pure function — no side effects, no DOM access
- Receives only the data-related props, not `loading`/`error`/`className`
- Returns a complete `EChartsOption` object
- When adding optional formatting props (like `units`), use conditional spread to avoid overwriting theme defaults:

```typescript
// ✅ GOOD — only includes axisLabel when units is provided
yAxis: {
  type: "value",
  ...(units && {
    axisLabel: { formatter: (v: number) => `${v} ${units}` },
  }),
},

// ❌ BAD — undefined overwrites theme's axisLabel config
yAxis: {
  type: "value",
  axisLabel: units ? { formatter: ... } : undefined,
},
```

### 4. Empty State

When `data` is empty or undefined, charts show a "No data" text overlay on top of an empty grid. Use `EMPTY_GRID_OPTION` for cartesian charts to render axes behind the overlay:

```typescript
const EMPTY_GRID_OPTION: EChartsOption = {
  xAxis: { type: "category" },
  yAxis: { type: "value", min: 0, max: 1000, splitLine: { show: true } },
  series: [],
  grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
};
```

The overlay is a plain React element positioned absolutely over the ECharts canvas.

### 5. Component Implementation Pattern

Follow this template for all high-level chart components:

```tsx
export const BarChart = ({
  data,
  categoryKey,
  series,
  className,
  ...rest,
}: BarChartProps) => {
  const hasData = Array.isArray(data) && data.length > 0;
  const option = hasData
    ? buildBarOption(data, categoryKey, series)
    : EMPTY_GRID_OPTION;

  return (
    <div className={classNames(styles.root, className)} {...rest}>
      {!hasData && (
        <div className={classNames(styles.overlay)}>No data</div>
      )}
      <Chart option={option} />
    </div>
  );
};
```

### Sizing

Charts fill 100% of their parent container (both width and height). The consumer controls dimensions by sizing the parent element or passing `style` / `className` directly to the chart component:

```tsx
<BarChart data={data} xKey="month" series={series} style={{ height: 300 }} />
```

### 6. CSS Styles

Chart CSS modules follow the same rules as component CSS:

- Colors MUST use `--reltio-color-*` tokens
- `classNames()` utility on all className attributes
- Standard overlay styles for empty/error states:

```css
.root {
  position: relative;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--reltio-color-text-secondary);
  font-size: 14px;
  z-index: 1;
  pointer-events: none;
}
```

### 7. Types

Use `type` keyword, never `interface`. All types in separate `.types.ts` file.

Every chart MUST define:
- `XxxChartSeries` — series configuration type
- `XxxChartProps` — component props type

Common props pattern:

```typescript
export type XxxChartProps = HtmlProps<
  "div",
  {
    data?: Record<string, unknown>[];
    // ... chart-specific data mapping props
    series: XxxChartSeries[];
    units?: string;
  }
>;
```

### 8. Exports

- `charts/XxxChart/index.ts` — exports component and types
- `charts/index.ts` — MUST be updated to include new chart exports
- The base `Chart` component is NEVER exported from `charts/index.ts`

### 9. Storybook Stories

Stories go under `"Charts/XxxChart"` title. One variant per story. MUST include `cssClasses` parameter.

**Required stories for every chart:**
- `Default` — simplest use case
- `Empty` — empty data

**Additional stories** specific to the chart type (e.g., `MultipleSeries`, `WithUnits`, `FormattedXAxis`).

```tsx
const meta = preview.meta({
  title: "Charts/BarChart",
  component: BarChart,
  parameters: {
    layout: "padded",
    cssClasses,
  },
  args: { /* default args */ },
});
```

## Theme System

The chart theme is built dynamically from `--reltio-color-*` CSS tokens at mount time via `buildTheme()` in `charts/Chart/theme.ts`. This means:

- Charts automatically use the correct colors for light/dark mode based on `data-theme` attribute
- Theme is read once at mount — runtime theme switching requires page refresh
- The 9-color data series palette is: primary, success, warning, orange, pink, purple, aqua-font, lime, error

Do NOT hardcode any color values in chart components or option builders. All colors come from the theme.

## API Design Principles

- **Data-first** — `data` is an array of objects, keys are specified via props
- **Minimal props** — only essential configuration exposed, no ECharts options leak through
- **No escape hatches** — consumers cannot access the ECharts instance or pass raw options
- **Empty state built-in** — "No data" overlay is handled internally when data is empty
- **Consumer-controlled sizing** — charts fill 100% of parent; no `height` prop
- **Canvas only** — high-level charts always use canvas renderer, no `renderer` prop
- **Formatting via functions** — `xKey` accepts string or function for extraction + formatting

## Pre-Commit Checklist

- [ ] Types in `.types.ts` file using `type` keyword
- [ ] ECharts series type registered at module level
- [ ] `buildXxxOption()` is a pure function
- [ ] Shared logic imported from `@/charts/Chart`, not duplicated
- [ ] Empty state handled ("No data" overlay when data is empty)
- [ ] No `undefined` values in ECharts option (use conditional spread)
- [ ] Colors use `--reltio-color-*` tokens, no hardcoded hex values
- [ ] All className attributes use `classNames()` utility
- [ ] Storybook stories added (one variant per story, all required states)
- [ ] Exported from `charts/index.ts`
- [ ] `npm run format` executed
- [ ] `npm run lint` passes

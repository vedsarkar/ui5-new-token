## Context

The Reltio Design System has 13 UI components, a token-based color system (`public/variables.css`) with light/dark theme support via `data-theme` attribute, and Storybook 10 with Chromatic for documentation and visual testing. There are no charting components. Product teams implement charts independently, leading to inconsistency and zero visual test coverage.

Apache ECharts v6 is selected as the rendering engine. It provides 20+ chart types, built-in theming, Canvas/SVG renderers, tree-shakeable modular architecture, and handles millions of data points. The `charts/` directory will live at the repository root, parallel to `components/`, with its own Storybook section.

## Goals / Non-Goals

**Goals:**

- Establish the foundational architecture for all future chart components
- Create a dynamic theme system that automatically reflects Reltio design tokens including dark mode
- Build an internal base `Chart` component that handles ECharts lifecycle, resize, and theme switching
- Enable visual regression testing of charts through Storybook stories and Chromatic
- Keep bundle impact minimal through tree-shaking — only imported charts add to bundle size

**Non-Goals:**

- High-level chart components (LineChart, BarChart, DonutChart) — separate changes
- Custom loading/empty/error state visuals — will be designed later, first version uses simple text
- Server-side rendering support
- ECharts GL (3D visualizations)
- Map chart support
- Exposing the ECharts instance or raw option API to consumers
- Animations customization API

## Decisions

### 1. ECharts modular imports with distributed registration

**Decision:** Use `echarts/core` with modular imports. Each component registers only the ECharts modules it needs at module level. No centralized `setup.ts` file.

**Alternatives considered:**
- Full `echarts` import (~1MB) — rejected due to bundle size
- Centralized `setup.ts` — rejected because adding a new chart type (in a separate change) would require modifying a core file, creating cross-change dependencies and hurting tree-shaking

**Approach:** The base `Chart` component registers shared infrastructure (renderers, tooltip, grid, legend). Each high-level chart component registers its own ECharts series type. `echarts.use()` is idempotent, so duplicate registrations are safe.

```
// Chart.tsx — registers infrastructure
import * as echarts from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
echarts.use([CanvasRenderer, SVGRenderer, TooltipComponent, GridComponent, LegendComponent]);

// LineChart.tsx — registers only its series type
import { LineChart as EChartsLine } from "echarts/charts";
echarts.use([EChartsLine]);
```

This keeps each module self-contained and enables perfect tree-shaking — only imported chart types are bundled.

### 2. Dynamic theme from CSS custom properties

**Decision:** Build the ECharts theme object at runtime by reading computed CSS custom property values from the Chart's DOM container.

**Alternatives considered:**
- Two static theme objects (light/dark) — rejected because it duplicates token values and falls out of sync when tokens change
- Reading from `:root` — rejected because `data-theme` can be set on any ancestor, not just `:root`

**Approach:** A `buildTheme()` function accepts a DOM element, calls `getComputedStyle(element).getPropertyValue()` to read `--reltio-color-*` values, and returns an ECharts theme object. CSS custom properties are inherited through the DOM tree, so reading from the chart's container element correctly resolves values based on the nearest ancestor's `data-theme` attribute.

The theme is built once at mount time. Runtime theme switching (e.g. toggling dark mode without page refresh) is not supported in v1. ECharts bakes the theme into the chart instance at init time and does not support live theme changes, so supporting this would require a full dispose/re-init cycle with MutationObserver — unnecessary complexity for now. If needed later, it can be added without breaking changes.

### 3. Data series color palette

**Decision:** Use 9 colors from the extended token palette, ordered for maximum visual distinction between adjacent series.

```
Palette order:
1. --reltio-color-primary       #0000cc  (blue)
2. --reltio-color-success       #449977  (green)
3. --reltio-color-warning       #ffcc00  (yellow)
4. --reltio-color-orange        #ee6611  (orange)
5. --reltio-color-pink          #ff44aa  (pink)
6. --reltio-color-purple        #6611cc  (purple)
7. --reltio-color-aqua          #009999  (teal — using aqua-font token for better contrast)
8. --reltio-color-lime           #6b9900  (lime)
9. --reltio-color-error         #ee3333  (red)
```

These are read dynamically from CSS tokens, so dark mode variants are picked up automatically.

**Alternatives considered:**
- Hardcoded hex values — rejected, breaks dark mode and token consistency
- Fewer colors (5-6) — rejected, Dashboard charts can have 8+ series
- Semantic-only colors (success/warning/error) — insufficient variety

### 4. Chart component lifecycle management

**Decision:** All lifecycle logic lives inside the `Chart` component — no separate `useChart` hook.

**Lifecycle:**

| Phase | Mechanism | Action |
|-------|-----------|--------|
| Mount | `useEffect` | Read tokens → `buildTheme()` → `echarts.init(container, theme)` → `setOption()` |
| Option update | `useEffect` on `option` | `chart.setOption(newOption)` with ECharts built-in diffing |
| Loading on | `useEffect` on `loading` | `chart.showLoading({ maskColor })` — maskColor from `--reltio-color-bg-white` token |
| Loading off | `useEffect` on `loading` | `chart.hideLoading()` |
| Resize | `ResizeObserver` | `chart.resize()` |
| Unmount | `useEffect` cleanup | `dispose()`, disconnect ResizeObserver |

**Why no hook:** The `Chart` component is the only consumer of this logic. High-level charts (LineChart, etc.) compose over `<Chart>` by transforming their simplified props into an ECharts `option` object and passing it down. Extracting a hook adds indirection with no reuse benefit.

### 5. Chart component API (internal)

**Decision:** The base `Chart` accepts a raw ECharts option object and rendering configuration. It is internal and not exported from the public API.

```
type ChartProps = {
  option: EChartsOption;
  renderer?: "canvas" | "svg";    // default: "canvas"
  height?: number | string;        // default: 300
  loading?: boolean;
  className?: string;
};
```

High-level components (LineChart, BarChart, etc.) will:
1. Accept simplified, domain-specific props (`data`, `xKey`, `series`)
2. Transform them into an ECharts `option` object
3. Pass the `option` to `<Chart>`
4. Handle loading/empty/error states before rendering

### 6. Directory structure

**Decision:** Charts live in `charts/` at repository root. The base `Chart` directory contains all core infrastructure (theme, ECharts registration) alongside the component itself — `Chart` is the core.

```
charts/
├── Chart/
│   ├── Chart.tsx             ← Base component (internal), registers ECharts infrastructure
│   ├── Chart.types.ts
│   ├── Chart.module.css
│   ├── theme.ts              ← buildTheme(), color palette
│   └── index.ts
└── index.ts                  ← Public exports (empty for now — no public charts in this change)
```

Future high-level charts will be added as sibling directories:
```
charts/
├── Chart/                    ← core (theme, setup, base component)
├── LineChart/                ← added by add-line-chart change
├── BarChart/                 ← added by add-bar-chart change
├── DonutChart/               ← added by add-donut-chart change
└── index.ts
```

### 7. Storybook integration

**Decision:** Chart stories use the `"Charts/"` title prefix for sidebar grouping. The existing Storybook config already picks up `**/*.stories.tsx` so no `main.ts` changes are needed.

The `data-theme` switching already works via `withThemeByDataAttribute` decorator in `preview.tsx`. Charts will automatically support the Storybook theme switcher through the dynamic theme system.

The base `Chart` component has no Storybook stories — it is internal infrastructure, not a consumer-facing component. Only high-level chart components (LineChart, BarChart, etc.) will have stories under `"Charts/LineChart"`, `"Charts/BarChart"`, etc.

### 8. Renderer strategy

**Decision:** The base `Chart` component supports both `"canvas"` (default) and `"svg"` renderers via prop. High-level chart components always use canvas and do not expose the renderer prop.

The `renderer` prop is init-time only — it is read once at mount and changes are ignored. ECharts bakes the renderer into the instance at `echarts.init()`, and switching renderer at runtime is not a meaningful operation.

**Rationale:**
- Canvas is faster for large datasets and supports more visual effects
- SVG is useful for accessibility tooling and print scenarios — available through base `Chart` for edge cases
- High-level components optimize for the common case (canvas) and keep their API minimal

## Risks / Trade-offs

- **ECharts bundle size** → Mitigated by tree-shaking. Only registered chart types and components are included. Consumers who don't import any chart components pay zero cost.
- **No runtime theme switching in v1** → Toggling dark mode without page refresh won't update charts. Acceptable trade-off: users rarely switch themes, and runtime support can be added later without breaking changes.
- **Canvas rendering is not accessible** → Screen readers cannot interpret canvas content. Mitigated by ARIA attributes on the container element. SVG renderer available via base `Chart` for accessibility-critical use cases.
- **ECharts v6 is a major dependency** → Ties the charting layer to ECharts long-term. Mitigated by the layered architecture: high-level components hide ECharts completely, so the engine could theoretically be swapped without changing consumer APIs.
- **Dynamic theme reads from DOM** → Requires the component to be mounted before theme is available (no SSR). Acceptable since SSR is a non-goal.

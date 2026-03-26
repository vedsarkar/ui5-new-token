## Context

The design platform has a `charts/` directory for chart components. The existing `LineChart` wraps ECharts with a declarative API. The SetOverlapChart serves a fundamentally different purpose — visualizing record overlap across source systems — and requires a fundamentally different rendering approach. It was ported from an internal Reltio repository and adapted to follow the design platform conventions (CSS Modules, `classNames()`, `HtmlProps`, accessibility).

## Goals / Non-Goals

**Goals:**

- Visualize set overlaps for 2–10+ source systems using the UpSet plot pattern
- Support two combination semantics: inclusive intersection and distinct (exact-region) intersection
- Handle large-scale datasets (hundreds of thousands of records) without UI lag during hover
- Follow design platform conventions: `HtmlProps`, `classNames()`, CSS Modules, `...rest` forwarding, keyboard and ARIA accessibility
- Create Storybook stories for visual regression testing with Chromatic

**Non-Goals:**

- Union mode (a third UpSet semantics — not needed for Reltio use cases)
- Click event callbacks (charts are display-only)
- Sorting or filtering intersections by size
- ECharts integration (custom SVG is required for this chart type)
- Configurable row height or column width
- Server-side rendering support

## Decisions

### 1. Custom SVG + d3-scale instead of ECharts

**Decision:** Build the chart entirely with custom SVG elements and use `d3-scale` only for axis scale calculations (`scaleBand`, `scaleLinear`). No ECharts dependency.

**Alternatives considered:**
- ECharts custom series — rejected, ECharts has no native UpSet plot support and custom series adds unnecessary complexity for a layout this specialized
- Recharts — rejected, no UpSet support and would add a large dependency for one chart
- D3 full rendering — rejected, D3's imperative DOM manipulation conflicts with React's declarative model; only the stateless scale functions are used

### 2. Three coordinated sub-components

**Decision:** Split the visualization into five SVG sub-components rendered within a single `<svg>` element:
- `IntersectionsChart` — vertical bars (top)
- `IntersectionsMatrix` — dot grid (middle)
- `SetsChart` — horizontal bars (left)
- `IntersectionsChartAxis` — Y-axis for intersection chart
- `SetsChartAxis` — X-axis for set chart

All sub-components share scales (`matrixXScale`, `matrixYScale`) computed in the parent and passed as props, ensuring pixel-perfect alignment.

**Alternatives considered:**
- Single monolithic component — rejected, too complex to maintain; sub-components isolate rendering logic
- Separate SVGs per sub-chart — rejected, alignment between charts would require complex positioning; a single SVG ensures coordinates are shared

### 3. Two combination modes with different hover strategies

**Decision:** Support `INTERSECTION` and `DISTINCT_INTERSECTION` as an enum prop. Each mode uses a fundamentally different hover computation algorithm:

| Mode | Hover strategy | Complexity | Data requirement |
|------|---------------|------------|-----------------|
| `INTERSECTION` | Element-level filtering via `Array.includes()` | O(E_i × E_h) per bar | `elements` arrays populated |
| `DISTINCT_INTERSECTION` | Structural matching via set-name/index lookup | O(S) or O(I) per bar | `elements` arrays empty |

**Rationale:** The `INTERSECTION` mode was built first and works by filtering individual record identifiers. When the `DISTINCT_INTERSECTION` mode was needed for a large-scale dataset (hundreds of thousands of records), the element-level approach would have caused unacceptable hover lag. The structural approach was designed specifically to keep hover performance independent of dataset size.

**Alternatives considered:**
- Unified algorithm that works for both modes — rejected, the performance characteristics are fundamentally different; a single approach would either be slow for large data or lose the element-level precision needed for `INTERSECTION` mode
- Web Worker for element filtering — rejected, adds complexity and latency for hover interactions that need to feel instantaneous
- Virtualized/debounced hover — rejected, produces visible visual lag that degrades the experience

### 4. Responsive sizing with useSetOverlapChartSizes hook

**Decision:** A custom hook computes all layout dimensions from `width`, `height`, number of sets, and number of intersections:
- Matrix column width: 28px × 1.2 per intersection
- Sets chart width: clamped between 100px and 200px
- Intersections chart height: minimum 120px
- Labels truncated dynamically based on available space

When the computed SVG width exceeds the container, the container scrolls horizontally via `overflow: auto`.

**Alternatives considered:**
- CSS Grid layout — rejected, not applicable inside SVG
- Fixed dimensions — rejected, doesn't accommodate varying numbers of sets and intersections

### 5. Color customization via CSS custom properties

**Decision:** The `options` prop provides `primaryColor`, `secondaryColor`, and `secondaryColorOpacity`. The primary color overrides `--reltio-color-brand-blue` on the chart root element. The secondary color is set via a component-level `--secondary-color` CSS variable (encapsulated with explicit default on root, per AGENTS.md guidelines).

**Alternatives considered:**
- Expose individual CSS variables as public API — rejected per AGENTS.md: external customization uses React props and global tokens, not component-level CSS variables
- Theme context provider — rejected, over-engineered for a single chart's color needs

### 6. Keyboard accessibility and ARIA

**Decision:** Interactive hover rects receive `tabIndex={0}`, `role="button"`, descriptive `aria-label`, `onFocus`/`onBlur` handlers (mirroring mouse behavior), and CSS `:focus-visible` styles. The root `<svg>` has `role="img"` and a dynamic `aria-label`. Biome's `useSemanticElements` lint rule is suppressed on SVG `<rect>` elements with `role="button"` since HTML `<button>` cannot be used inside SVG.

**Alternatives considered:**
- Full arrow-key navigation within the chart — rejected for v1, adds significant complexity for a data visualization component
- `<foreignObject>` with HTML buttons — rejected, causes rendering issues across browsers and breaks the SVG coordinate system

### 7. Component file structure

**Decision:** Follow the design platform convention with sub-components in a nested `components/` directory.

```
charts/SetOverlapChart/
├── SetOverlapChart.tsx
├── SetOverlapChart.types.ts
├── SetOverlapChart.module.css
├── SetOverlapChart.stories.tsx
├── index.ts
├── constants.ts
├── helpers.ts
├── useSetOverlapChartSizes.ts
└── components/
    ├── IntersectionsChart/
    ├── IntersectionsMatrix/
    ├── SetsChart/
    ├── IntersectionsChartAxis/
    └── SetsChartAxis/
```

### 8. Storybook stories

**Decision:** Six stories demonstrating the key variants and states:

| Story | What it demonstrates |
|-------|---------------------|
| Default | Basic 4-set INTERSECTION mode |
| InteractionMode | 5-set INTERSECTION mode with more overlaps |
| DistinctIntersectionMode | Large-scale data with DISTINCT_INTERSECTION mode |
| HorizontalScrolling | 6 sets with 31 intersections causing scroll |
| WithAxisLabels | Custom axis labels via options |
| Empty | Empty state with no data |

## Risks / Trade-offs

- **INTERSECTION mode may lag with very large datasets** → Documented as a known performance characteristic. If needed, element filtering could be moved to a Web Worker in a future iteration.
- **No click/drill-down events** → Charts are display-only in v1. Callbacks can be added later as optional props without breaking changes.
- **d3-scale is a runtime dependency** → Minimal footprint (only `scaleBand` and `scaleLinear`), tree-shakeable, and already a standard choice for scale calculations.
- **Two modes require different data shapes despite shared types** → Documented extensively in types JSDoc and spec. Runtime validation could be added later but would add overhead on every render.

## Context

The project has a two-layer chart architecture: an internal `Chart` base component (ECharts lifecycle, theming, resize) and public high-level wrappers (`BarChart`, `DonutChart`, `LineChart`, etc.) with simplified declarative APIs. The `charts/AGENTS.md` defines patterns: file structure, `buildXxxOption()` pure function, state management, and Storybook requirements. The new GeoChart follows this architecture with two additions: auto-registration of GeoJSON via WeakMap and CSS-driven sequential color shades via `color-mix()`.

Primary use case is rendering inside the AI Chat component, where charts are generated dynamically by agents. This rules out imperative setup steps — everything must be declarative via props.

## Goals / Non-Goals

**Goals:**
- Add a choropleth map wrapper with the same declarative pattern as existing charts
- Accept GeoJSON as a prop (no imperative `registerMap` step) for seamless use in AI Chat
- Provide discrete value-range legend with hover-to-highlight and click-to-toggle behavior
- Generate sequential color shades from a single `--reltio-color-primary` token using CSS `color-mix(in oklch)`
- Auto-generate 5 equal ranges when `ranges` prop is not provided

**Non-Goals:**
- Scatter/bubble point overlays on the map (future work)
- Region click callbacks / drill-down navigation (future work)
- Selected region highlighting API (future work)
- Bundling GeoJSON data — consumers provide their own
- Modifying the base `Chart` component's `useEffect` lifecycle

## Decisions

### 1. GeoJSON as prop, not imperative registration

Each GeoChart instance accepts a `map` prop containing a GeoJSON object. The component handles `echarts.registerMap()` internally.

**Alternative considered:** Export a `registerMap()` function that consumers call before rendering. Rejected because the primary use case (AI Chat) renders charts dynamically — there is no stable setup phase where registration can happen. Passing GeoJSON as a prop keeps everything declarative and self-contained.

### 2. WeakMap-based auto-registration

A module-level `WeakMap<object, string>` tracks GeoJSON objects → generated map names. On first encounter, a unique name (`__geo_0`, `__geo_1`, ...) is generated, `echarts.registerMap()` is called, and the mapping is stored. Subsequent renders with the same object reference skip registration.

| Property | Behavior |
|----------|----------|
| Same GeoJSON reference | Reuses existing registration (O(1) lookup) |
| Different GeoJSON object | New registration with new name |
| GeoJSON garbage collected | WeakMap entry is also collected |

**Alternative considered:** Hashing GeoJSON content for deduplication. Rejected because GeoJSON objects can be 500KB+ and hashing is expensive. Reference equality via WeakMap is O(1) and sufficient — if consumers want to share registrations across components, they reuse the same object reference.

### 3. Piecewise visualMap for discrete legend

The legend shows value ranges (e.g., "0 - 9%", "10 - 19%") using ECharts `visualMap` with `type: "piecewise"`. Configuration: `selectedMode: "multiple"` for click-to-toggle, `hoverLink: true` for hover-to-highlight.

**Alternative considered:** Multiple map series (one per range) + standard `legend` component. Rejected because overlapping map series cause rendering artifacts (border conflicts, z-ordering issues). A single map series with piecewise visualMap is the native ECharts pattern for choropleth range legends.

Visual consistency with line/bar chart legends is achieved by adding `visualMap` text styling to `buildTheme()` in `theme.ts` — matching `legend.textStyle` settings.

### 4. Sequential color shades via CSS `color-mix(in oklch)`

Five CSS custom properties are defined on the GeoChart root element, each mixing `--reltio-color-primary` with white at increasing concentrations (15%, 35%, 55%, 75%, 100%). At mount time, `getComputedStyle()` resolves them to concrete color strings that ECharts can use in the `visualMap.inRange.color` array.

```css
.root {
  --geo-shade-1: color-mix(in oklch, var(--reltio-color-primary) 15%, white);
  --geo-shade-2: color-mix(in oklch, var(--reltio-color-primary) 35%, white);
  --geo-shade-3: color-mix(in oklch, var(--reltio-color-primary) 55%, white);
  --geo-shade-4: color-mix(in oklch, var(--reltio-color-primary) 75%, white);
  --geo-shade-5: var(--reltio-color-primary);
}
```

**Why `oklch`:** Perceptually uniform color space — equal numeric steps produce visually equal lightness steps. Critical for choropleth readability.

**Why CSS, not JS:** The same CSS properties automatically resolve to different values in light/dark mode (because `--reltio-color-primary` changes). No JS branching for theme support. This follows the existing `buildTheme()` pattern of reading CSS → passing to ECharts.

**Alternative considered:** Computing OKLCH shades in JavaScript. Rejected because it would require parsing the primary color, implementing OKLCH math, and manually handling light/dark mode. CSS `color-mix()` delegates all of this to the browser (baseline 2023, Chrome 111+, Firefox 113+, Safari 16.2+).

### 5. `useLayoutEffect` for shade reading

Shades are read via `useLayoutEffect` (not `useEffect`) to avoid a visible flash. The flow: first render mounts the root div → `useLayoutEffect` reads computed shades → state update triggers re-render with full option — all before browser paint.

### 6. Auto-generated ranges

When the `ranges` prop is omitted, the component computes 5 equal-width ranges from data:
1. Find min and max values from `data`
2. Round outward to "nice" boundaries (nearest multiple of step size)
3. Split into 5 equal ranges
4. Generate labels as `"{min} - {max}"` (with `units` suffix if provided)

This covers the AI Chat scenario where the agent provides data without knowing the range boundaries.

### 7. GeoJSON type — minimal custom definition

A `GeoJSON` type is defined in `GeoChart.types.ts` with just the fields ECharts needs: `type: string` and `features: Record<string, unknown>[]`. This provides IDE guidance without depending on `@types/geojson`.

### 8. Empty state — no empty grid

Like SankeyChart and DonutChart, GeoChart has no cartesian axes. The empty/error/loading states use an empty ECharts option (`{}`) with React overlay elements. No `EMPTY_GRID_OPTION` equivalent.

## Risks / Trade-offs

- **WeakMap + inline GeoJSON** — If a consumer passes a new GeoJSON object on every render (e.g., `map={{ type: "FeatureCollection", features: [...] }}` inline), each render creates a new registration. Mitigation: document that GeoJSON should be hoisted to a constant or wrapped in `useMemo`. This is standard React discipline for object props.
- **5 fixed shades** — The palette always has exactly 5 colors, matching the number of auto-generated ranges. If the user provides more or fewer ranges, some shades may be unused or reused. Mitigation: for v1, document that the component supports up to 5 ranges. This covers the vast majority of choropleth use cases.
- **`color-mix` browser support** — Requires Chrome 111+, Firefox 113+, Safari 16.2+ (baseline 2023). No fallback for older browsers. Mitigation: the product targets modern browsers; this matches the existing use of other modern CSS features.
- **GeoJSON bundle size is consumer's responsibility** — World map GeoJSON is ~500KB. Mitigation: documentation will include recommended sources and loading strategies (dynamic import, lazy fetch).

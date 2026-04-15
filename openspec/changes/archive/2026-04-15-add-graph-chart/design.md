## Context

The chart library wraps ECharts with domain-specific, data-driven components. Each high-level chart (LineChart, BarChart, DonutChart, SankeyChart, GeoChart, etc.) follows a consistent architecture: a pure `buildXxxOption()` function transforms simplified props into an `EChartsOption`, which is passed to the internal `Chart` component. All charts share the same state management pattern (error > loading > empty > chart), overlay CSS, and theme integration.

`SankeyChart` is the closest existing analog — it also uses `nodes[]` + `links[]`. `GeoChart` establishes the pattern for container-filling charts (no `height` prop, `width: 100%; height: 100%` on root).

## Goals / Non-Goals

**Goals:**
- Provide a minimal, data-driven API for force-directed graph visualization
- Follow all established chart patterns (state management, overlays, theme, CSS modules)
- Use `id`-based node identification for robustness (not `name`)
- Auto-size nodes from `value` with sensible defaults
- Fill parent container, consistent with GeoChart pattern

**Non-Goals:**
- Directional edges (arrows) — future feature
- Node categories / color grouping — future feature
- Interactive features beyond hover (drag, zoom/pan, click handlers) — future feature
- Alternative layouts (circular, fixed position) — future feature
- Custom node shapes or icons — future feature

## Decisions

### 1. Node identification: `id` field instead of `name`

ECharts identifies nodes by `name` by default. We introduce a separate `id` field as the stable identifier and use `name` for display only.

**Rationale:** In entity resolution scenarios, multiple nodes can share the same display name (e.g., two "John Smith" records). Using `name` as identifier would cause collisions. Internally, `buildGraphOption()` maps `id` to ECharts' `id` field and `name` to the display label.

**Alternative considered:** Using `name` as identifier (ECharts default) — rejected due to collision risk in real Reltio data.

### 2. Container sizing: fill parent (no `height` prop)

The component root uses `width: 100%; height: 100%`, delegating size control to the parent container. The internal `Chart` receives `height="100%"`.

**Rationale:** Graph charts have no natural "correct" height. The parent container context determines the appropriate size. This matches the `GeoChart` pattern and avoids an arbitrary default. Force layout adapts to any container size via ECharts' built-in resize handling.

**Alternative considered:** `height` prop with default 300px (like LineChart) — rejected because graphs are typically used in dedicated panels/views where the container defines the space.

### 3. Node sizing: auto-normalize `value` to symbol size range

When nodes have `value`, sizes are normalized to a `[20, 60]` pixel range using linear interpolation. When no node has `value`, all nodes render at a fixed default size (30px).

**Rationale:** Consumers provide domain values (e.g., connection count, importance score) without needing to think about pixel sizes. The range `[20, 60]` ensures nodes are distinguishable but not overwhelming.

**Formula:**
```
if all values are equal → all nodes get 30px
otherwise → symbolSize = 20 + (value - min) / (max - min) * 40
```

### 4. Labels: hover-only via ECharts emphasis

Node labels (`name`) are hidden by default (`label.show: false`) and shown on hover (`emphasis.label.show: true`). Link labels are shown in tooltips.

**Rationale:** For v1, hover-only labels keep the graph clean, especially with many nodes. A future `showLabels` prop can override this behavior.

### 5. Force layout parameters

Fixed force configuration for v1:
- `repulsion: 200` — keeps nodes separated
- `gravity: 0.1` — gentle pull toward center
- `edgeLength: [80, 200]` — range based on link value (stronger links = closer)
- `layoutAnimation: true` — smooth initial positioning

**Rationale:** These defaults produce good results for typical entity relation graphs (5-50 nodes). Exposing force tuning is deferred to future versions.

### 6. Tooltip format

- **Node hover:** shows `name` and `value` (with units suffix if provided)
- **Link hover:** shows `source.name → target.name` with `label` and `value` (with units suffix if provided)

Follows the same `units` prop pattern as SankeyChart, BarChart, LineChart.

## Risks / Trade-offs

**Performance with large graphs (100+ nodes)** → Force layout becomes slow with many nodes. This is an ECharts limitation. Mitigation: document recommended node count in stories; consider adding `roam` in a future version so users can navigate large graphs.

**Fixed force parameters may not suit all data shapes** → The chosen repulsion/gravity/edgeLength defaults work well for typical entity relation graphs but may produce poor layouts for very sparse or very dense graphs. Mitigation: acceptable for v1; future versions can expose a `forceOptions` prop for fine-tuning.

**No `id` in ECharts link matching** → ECharts links use `source`/`target` matching against node `name` or node array index by default. We must set `id` on each node in ECharts data and use node IDs in link `source`/`target` to enable id-based matching. This requires ECharts graph to be configured correctly.

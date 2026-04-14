## Why

The AI Chat component renders dynamic visualizations from agent responses. Geographic data (customer distribution by country, regional metrics, compliance coverage by state) is a frequent use case that currently has no chart wrapper. Adding a GeoChart enables agents and developers to render choropleth maps with the same zero-ECharts-knowledge API as existing charts.

## What Changes

- Add `GeoChart` component in `charts/GeoChart/` — a declarative choropleth map wrapper over the base `Chart` component
- GeoChart accepts a GeoJSON object as a prop (no imperative `registerMap` step) — critical for dynamic rendering inside AI Chat where imperative registration is impractical
- Discrete value-range legend (piecewise visualMap) with hover-to-highlight and click-to-toggle behavior, styled consistently with line/bar chart legends
- Sequential color shades generated from `--reltio-color-primary` token via CSS `color-mix(in oklch)` — auto-adapts to light/dark themes
- Auto-generated ranges when not explicitly provided (splits data min/max into 5 equal buckets)
- Internal WeakMap-based auto-registration of GeoJSON objects to avoid redundant `echarts.registerMap()` calls across re-renders

## Capabilities

### New Capabilities
- `geo-chart`: Declarative choropleth map component with GeoJSON-as-prop API, discrete value-range legend, and CSS-driven sequential color shades

### Modified Capabilities
- `chart-core`: Theme system extended — `buildTheme()` gains `visualMap` text styling to ensure piecewise legend matches standard legend appearance

## Impact

- **New files**: `charts/GeoChart/` directory (component, types, styles, stories, index)
- **Modified files**: `charts/Chart/theme.ts` (add visualMap section), `charts/index.ts` (export GeoChart)
- **Dependencies**: `echarts/charts` — `MapChart` series type (already available via echarts, tree-shakeable)
- **Bundle size**: MapChart series type adds ~8-12KB gzipped; GeoJSON data is consumer-provided and not bundled

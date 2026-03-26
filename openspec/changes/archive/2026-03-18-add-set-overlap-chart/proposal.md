## Why

Reltio products need a way to visualize how records overlap across multiple source systems (e.g., SAP, Oracle, LegacyMDM). Standard bar charts and Venn diagrams don't scale beyond 3 sets. The UpSet plot is the established visualization for this problem — it shows all possible set intersections in a compact, scannable layout. No existing chart component in this design platform covers this use case, and the Reltio Console product requires it for data stewardship and match/merge analysis workflows.

## What Changes

- Add the `SetOverlapChart` component — a custom SVG-based UpSet plot visualization using d3-scale for axis calculations (no ECharts dependency)
- Introduce two combination modes: `INTERSECTION` (overlapping counts with element-level hover) and `DISTINCT_INTERSECTION` (mutually exclusive counts with structural hover optimized for large datasets)
- Add five coordinated SVG sub-components: `IntersectionsChart`, `IntersectionsMatrix`, `SetsChart`, `IntersectionsChartAxis`, `SetsChartAxis`
- Add responsive sizing via `useSetOverlapChartSizes` hook with horizontal scrolling for large datasets
- Add interactive hover highlighting with mode-specific computation strategies (element-level filtering vs. structural matching)
- Add color customization, axis labels, label truncation, keyboard accessibility, and ARIA attributes
- Export component and all public types from `charts/index.ts` barrel

## Capabilities

### New Capabilities
- `set-overlap-chart`: UpSet-style set overlap visualization component with two combination modes, interactive hover, keyboard accessibility, and ARIA support

### Modified Capabilities
None — this is a new addition with no changes to existing capabilities.

## Impact

- **New files**: `charts/SetOverlapChart/` directory with component, types, styles, stories, constants, helpers, sizing hook, and five sub-component directories
- **Modified files**: `charts/index.ts` (re-export of SetOverlapChart and its public types)
- **New dependency**: `d3-scale` (band and linear scales for axis calculations)
- **Public API**: Exports `SetOverlapChart`, `SetOverlapChartProps`, `DataSet`, `Intersection`, `SetOverlapChartMode`, `SetOverlapChartOptions`
- **Storybook**: Six stories under "Charts/SetOverlapChart" (Default, InteractionMode, DistinctIntersectionMode, HorizontalScrolling, WithAxisLabels, Empty)

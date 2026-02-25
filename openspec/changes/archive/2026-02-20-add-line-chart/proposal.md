## Why

The chart-core foundation (change `add-charts-core`) provides the base `Chart` component, dynamic theming, and ECharts integration — but it is internal infrastructure, not usable by application developers directly. LineChart is the first high-level chart component that product teams and AI agents (via AgentFlow) can actually use to visualize data. Line charts are the most common visualization type across Reltio applications: queue size trends in Performance Monitoring, activity timelines in Dashboard, and data quality metrics over time.

## What Changes

- Add `LineChart` component to `charts/LineChart/` with a simplified declarative API — consumers provide data as an array of objects and specify keys, no ECharts knowledge required
- Register ECharts `LineChart` series type at module level for tree-shaking
- Implement built-in loading, empty, and error states (simple text messages for v1)
- Add Storybook stories under `"Charts/LineChart"` demonstrating all variants and states for visual regression testing with Chromatic

## Capabilities

### New Capabilities

- `line-chart`: LineChart component with declarative data-first API, multiple series support, built-in loading/empty/error states, and Storybook stories for visual testing

### Modified Capabilities

None — builds on top of chart-core without modifying it.

## Impact

- **New directory**: `charts/LineChart/`
- **Storybook**: New stories under `"Charts/LineChart"` — first visible charts in the design system
- **Bundle size**: Adds ECharts LineChart series type (~20-30KB gzipped) on top of chart-core infrastructure
- **Dependency**: Requires chart-core (`charts/Chart/`) to be implemented first
- **No breaking changes** to existing components or APIs

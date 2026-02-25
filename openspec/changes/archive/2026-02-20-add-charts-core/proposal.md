## Why

Reltio applications (Hub Dashboard, Data Quality, Performance Monitoring, UI Modeller) rely heavily on data visualizations — line charts, bar charts, donut charts, maps, and more. Currently there are no chart components in the design system, forcing each product team to implement charting independently. This leads to visual inconsistency, duplicated effort, and no shared theming (including dark mode support).

AgentFlow — Reltio's AI chat interface — is a key consumer of chart components. AI agents need the ability to visualize data inline during conversations with users. Having chart components documented in Storybook is essential for this: the Storybook team is actively developing [Storybook MCP](https://storybook.js.org/blog/storybook-mcp-sneak-peek/) which will allow AI agents to automatically access component documentation, usage examples, and props metadata — enabling agents to generate correct chart code without manual guidance.

Another critical driver is testing. Charts are inherently visual — DOM assertions are practically useless for verifying that a chart renders correctly, handles edge cases (empty data, large datasets, axis overflow), or maintains visual consistency across themes. Today, teams essentially don't test complex charts at all. Our design platform built on Storybook and Chromatic enables visual regression testing through pixel-level snapshot comparisons, making it the right place to define and test chart components.

A foundational charting layer built on Apache ECharts will establish the architecture, theming, and React integration that all specialized chart components will build upon.

## What Changes

- Add `echarts` (v6) as a project dependency with modular tree-shakeable imports
- Create `charts/` directory as a separate section in the repository (not mixed with primitive `components/`)
- Implement a dynamic Reltio theme that reads `--reltio-color-*` CSS tokens at runtime and responds to `data-theme` attribute changes (light/dark)
- Implement an internal base `Chart` component that manages the full ECharts lifecycle: init, option updates, resize (ResizeObserver), theme switching (MutationObserver), and disposal. This component is not intended for direct use in applications — only as a building block for specialized chart wrappers (LineChart, BarChart, DonutChart, etc.)
- Add a dedicated "Charts" section in Storybook for chart documentation and visual testing
- Establish the data series color palette derived from the existing extended color tokens (primary, success, warning, orange, pink, purple, aqua, lime, error)

## Capabilities

### New Capabilities

- `chart-core`: Foundation for the charting library — ECharts modular setup with tree-shaking, dynamic theme system that maps Reltio design tokens to ECharts theming, and internal base `Chart` component with renderer choice (canvas/svg), auto-resize, and theme reactivity

### Modified Capabilities

None — this is a new subsystem with no changes to existing capabilities.

## Impact

- **New dependency**: `echarts` v6 added to `package.json`
- **New directory**: `charts/` at repository root (parallel to `components/`)
- **Storybook**: New "Charts" category in sidebar navigation, enabling Chromatic visual regression testing for all chart states and themes
- **Bundle size**: ~200-300KB additional (with tree-shaking, canvas renderer only for the base setup). Consumers who don't import charts pay nothing — ECharts code is only included when chart components are imported.
- **No breaking changes** to existing components or APIs

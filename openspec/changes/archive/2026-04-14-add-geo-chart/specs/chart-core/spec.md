## MODIFIED Requirements

### Requirement: Dynamic theme from CSS tokens
The `Chart` component SHALL build an ECharts theme object at mount time by reading `--reltio-color-*` CSS custom properties from the chart's container element using `getComputedStyle().getPropertyValue()`. A `buildTheme()` function in `theme.ts` SHALL accept a DOM element and return a complete ECharts theme object. The theme SHALL include a `visualMap` section with text styling matching the `legend.textStyle` configuration to ensure piecewise visualMap legends are visually consistent with standard chart legends.

#### Scenario: Theme reflects light mode tokens
- **WHEN** the `Chart` component mounts inside a DOM tree without `data-theme` attribute (or with `data-theme="light"`)
- **THEN** the ECharts instance is initialized with theme colors matching light mode token values (e.g. `--reltio-color-primary` resolves to `#0000cc`)

#### Scenario: Theme reflects dark mode tokens
- **WHEN** the `Chart` component mounts inside a DOM tree where an ancestor has `data-theme="dark"`
- **THEN** the ECharts instance is initialized with theme colors matching dark mode token values (e.g. `--reltio-color-primary` resolves to `#6161ff`)

#### Scenario: Theme is not updated at runtime
- **WHEN** the `data-theme` attribute changes on an ancestor after the chart has mounted
- **THEN** the chart remains rendered with the original theme — a page refresh is required to pick up the new theme

#### Scenario: VisualMap text matches legend text
- **WHEN** a chart renders with a piecewise visualMap (e.g., GeoChart)
- **THEN** the visualMap item labels use the same text color (`--reltio-color-text-secondary`) as standard legend labels

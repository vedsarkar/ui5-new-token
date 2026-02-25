### Requirement: ECharts modular registration
The `Chart` component SHALL register shared ECharts infrastructure modules (CanvasRenderer, SVGRenderer, TooltipComponent, GridComponent, LegendComponent) at module level using `echarts.use()`. Registration MUST use modular imports from `echarts/core`, `echarts/renderers`, and `echarts/components` to enable tree-shaking.

#### Scenario: Only registered modules are bundled
- **WHEN** a consumer imports the `Chart` component
- **THEN** only the registered infrastructure modules (renderers, tooltip, grid, legend) are included in the bundle — no chart series types (line, bar, pie) are bundled

#### Scenario: High-level charts register their own series types
- **WHEN** a high-level chart component (e.g. LineChart) is implemented in a separate change
- **THEN** it SHALL register its own ECharts series type at module level without modifying the base `Chart` component

### Requirement: Dynamic theme from CSS tokens
The `Chart` component SHALL build an ECharts theme object at mount time by reading `--reltio-color-*` CSS custom properties from the chart's container element using `getComputedStyle().getPropertyValue()`. A `buildTheme()` function in `theme.ts` SHALL accept a DOM element and return a complete ECharts theme object.

#### Scenario: Theme reflects light mode tokens
- **WHEN** the `Chart` component mounts inside a DOM tree without `data-theme` attribute (or with `data-theme="light"`)
- **THEN** the ECharts instance is initialized with theme colors matching light mode token values (e.g. `--reltio-color-primary` resolves to `#0000cc`)

#### Scenario: Theme reflects dark mode tokens
- **WHEN** the `Chart` component mounts inside a DOM tree where an ancestor has `data-theme="dark"`
- **THEN** the ECharts instance is initialized with theme colors matching dark mode token values (e.g. `--reltio-color-primary` resolves to `#6161ff`)

#### Scenario: Theme is not updated at runtime
- **WHEN** the `data-theme` attribute changes on an ancestor after the chart has mounted
- **THEN** the chart remains rendered with the original theme — a page refresh is required to pick up the new theme

### Requirement: Data series color palette
The theme SHALL include a 9-color data series palette read dynamically from CSS tokens in this order: primary, success, warning, orange, pink, purple, aqua-font, lime, error. When a chart has more than 9 series, ECharts default cycling behavior applies (series 10 reuses color 1).

#### Scenario: Series colors match token palette
- **WHEN** a chart renders with 3 data series
- **THEN** the first series uses `--reltio-color-primary`, the second uses `--reltio-color-success`, the third uses `--reltio-color-warning`

#### Scenario: Colors cycle after 9 series
- **WHEN** a chart renders with 10 data series
- **THEN** the 10th series reuses the color of the 1st series (`--reltio-color-primary`)

### Requirement: Chart component renders ECharts instance
The `Chart` component SHALL render a container `<div>` element and initialize an ECharts instance inside it. The component SHALL accept an `option` prop of type `EChartsOption` and pass it to `chart.setOption()`.

#### Scenario: Chart renders with valid option
- **WHEN** the `Chart` component receives a valid `option` prop
- **THEN** an ECharts instance is created in the container and the option is applied via `setOption()`

#### Scenario: Option updates are applied without re-init
- **WHEN** the `option` prop changes after initial mount
- **THEN** `chart.setOption(newOption)` is called on the existing ECharts instance (no `dispose()` / `init()` cycle) — ECharts handles diffing and animation internally

### Requirement: Chart container height
The `Chart` component SHALL accept a `height` prop (number or string) that sets the CSS height of the container `<div>`. The default height SHALL be `300` (pixels). ECharts fills the container dimensions.

#### Scenario: Default height
- **WHEN** no `height` prop is provided
- **THEN** the container renders with `height: 300px`

#### Scenario: Custom numeric height
- **WHEN** `height={500}` is provided
- **THEN** the container renders with `height: 500px`

#### Scenario: Custom string height
- **WHEN** `height="100%"` is provided
- **THEN** the container renders with `height: 100%`

### Requirement: Renderer selection
The `Chart` component SHALL accept a `renderer` prop with values `"canvas"` (default) or `"svg"`. The renderer is passed to `echarts.init()` and is read once at mount — subsequent changes to the `renderer` prop are ignored.

#### Scenario: Default canvas renderer
- **WHEN** no `renderer` prop is provided
- **THEN** the ECharts instance is initialized with the Canvas renderer

#### Scenario: SVG renderer
- **WHEN** `renderer="svg"` is provided
- **THEN** the ECharts instance is initialized with the SVG renderer

#### Scenario: Renderer changes are ignored
- **WHEN** the `renderer` prop changes from `"canvas"` to `"svg"` after mount
- **THEN** the chart continues using the Canvas renderer without re-initialization

### Requirement: Auto-resize via ResizeObserver
The `Chart` component SHALL observe its container element with a `ResizeObserver` and call `chart.resize()` whenever the container's dimensions change.

#### Scenario: Chart resizes when container changes
- **WHEN** the container element changes size (e.g. window resize, parent layout change)
- **THEN** `chart.resize()` is called and the chart redraws to fill the new dimensions

#### Scenario: Observer is disconnected on unmount
- **WHEN** the `Chart` component unmounts
- **THEN** the `ResizeObserver` is disconnected

### Requirement: Loading state
The `Chart` component SHALL accept a `loading` prop (boolean, default `false`). When `true`, ECharts built-in loading indicator is shown via `chart.showLoading()` with `maskColor` read from the `--reltio-color-bg-white` CSS token for theme-appropriate overlay color. When `false`, it is hidden via `chart.hideLoading()`.

#### Scenario: Loading indicator shown
- **WHEN** `loading={true}` is provided
- **THEN** `chart.showLoading()` is called with `maskColor` from CSS tokens and a loading overlay appears on the chart

#### Scenario: Loading indicator hidden
- **WHEN** `loading` changes from `true` to `false`
- **THEN** `chart.hideLoading()` is called and the loading overlay is removed

### Requirement: Cleanup on unmount
The `Chart` component SHALL dispose the ECharts instance and disconnect the ResizeObserver when the component unmounts.

#### Scenario: Resources are released
- **WHEN** the `Chart` component unmounts
- **THEN** `chart.dispose()` is called on the ECharts instance and the ResizeObserver is disconnected — no memory leaks

### Requirement: CSS class support
The `Chart` component SHALL accept a `className` prop and apply it to the container `<div>` using the `classNames()` utility from `@/utils/classNames`.

#### Scenario: Custom class is applied
- **WHEN** `className="my-chart"` is provided
- **THEN** the container `<div>` has both the component's own CSS Module class and `"my-chart"` in its `className`

### Requirement: Internal component — not publicly exported
The `Chart` component SHALL NOT be exported from `charts/index.ts`. It is internal infrastructure used only by high-level chart components within the `charts/` directory.

#### Scenario: Public exports do not include Chart
- **WHEN** a consumer imports from `charts/index.ts`
- **THEN** the `Chart` component is not available in the export list

### Requirement: Directory structure
The chart-core files SHALL be located in `charts/Chart/` with the following structure: `Chart.tsx` (component), `Chart.types.ts` (types), `Chart.module.css` (styles), `theme.ts` (theme builder and palette), `index.ts` (internal exports). No stories file — the base Chart has no Storybook stories.

#### Scenario: Files exist at expected paths
- **WHEN** the chart-core implementation is complete
- **THEN** the following files exist: `charts/Chart/Chart.tsx`, `charts/Chart/Chart.types.ts`, `charts/Chart/Chart.module.css`, `charts/Chart/theme.ts`, `charts/Chart/index.ts`

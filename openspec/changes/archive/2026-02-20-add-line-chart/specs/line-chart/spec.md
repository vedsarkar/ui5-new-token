## ADDED Requirements

### Requirement: Declarative data-first API
The `LineChart` component SHALL accept a `data` prop (array of `Record<string, unknown>`), an `xKey` prop, and a `series` prop (array of `LineChartSeries`). The component SHALL transform these props into an ECharts option and render via the base `Chart` component. Consumers SHALL NOT need any ECharts knowledge to use `LineChart`.

#### Scenario: Render with string xKey
- **WHEN** `LineChart` receives `data`, `xKey="month"`, and `series=[{ key: "sales" }]`
- **THEN** the chart renders a line with X-axis labels taken from `data[i].month` and Y values from `data[i].sales`

#### Scenario: Render with function xKey
- **WHEN** `LineChart` receives `data` with timestamp values and `xKey` as a function `(item) => formatDate(item.ts)`
- **THEN** the chart renders with X-axis labels showing the formatted date strings returned by the function

### Requirement: Multiple series support
The `LineChart` SHALL render one line per entry in the `series` array. Each series SHALL be colored automatically from the theme palette. When there are multiple series, a legend SHALL be displayed automatically.

#### Scenario: Single series without legend
- **WHEN** `series` contains a single entry `[{ key: "sales" }]`
- **THEN** one line is rendered and no legend is shown

#### Scenario: Multiple series with legend
- **WHEN** `series` contains multiple entries `[{ key: "sales", name: "Sales" }, { key: "returns", name: "Returns" }]`
- **THEN** each series renders as a separate line with automatic theme colors, and a legend is displayed showing the series names

#### Scenario: Series name defaults to key
- **WHEN** a series entry has no `name` property `{ key: "revenue" }`
- **THEN** the legend label for that series defaults to `"revenue"` (the key value)

### Requirement: X-axis label formatting via xKey
The `xKey` prop SHALL accept either a string (property name for direct value lookup) or a function `(item: Record<string, unknown>) => string` (custom extraction and formatting). When `xKey` is a function, the returned strings SHALL be used for both axis labels and tooltip display.

#### Scenario: String xKey shows raw values
- **WHEN** `xKey="month"` and data contains `{ month: "January" }`
- **THEN** the X-axis label shows `"January"` and the tooltip displays `"January"`

#### Scenario: Function xKey formats values
- **WHEN** `xKey` is a function that formats timestamps to `"Mon 23 Feb"` and data contains `{ ts: 1708646400000 }`
- **THEN** the X-axis label shows `"Mon 23 Feb"` and the tooltip displays `"Mon 23 Feb"`

### Requirement: Chart height
The `LineChart` SHALL accept a `height` prop (number or string) passed through to the base `Chart` component. The default height SHALL be inherited from the base `Chart` (300px).

#### Scenario: Default height
- **WHEN** no `height` prop is provided
- **THEN** the chart renders at 300px height

#### Scenario: Custom height
- **WHEN** `height={500}` is provided
- **THEN** the chart renders at 500px height

### Requirement: Error state
When the `error` prop contains a non-empty string, the `LineChart` SHALL display the error message as centered text within the chart container, replacing the chart content entirely. Error state takes priority over all other states.

#### Scenario: Error replaces chart
- **WHEN** `error="Failed to load data"` is provided, regardless of `loading` or `data` values
- **THEN** the chart is not rendered and the container displays centered text `"Failed to load data"`

### Requirement: Initial loading state
When `loading={true}` and `data` is empty or undefined, the `LineChart` SHALL display the ECharts built-in loading indicator via the base `Chart` component's `loading` prop.

#### Scenario: Loading with no data
- **WHEN** `loading={true}` and `data` is an empty array or undefined
- **THEN** the ECharts loading indicator is displayed (full overlay)

### Requirement: Background refresh state
When `loading={true}` and `data` is present (non-empty array), the `LineChart` SHALL render the chart normally AND show the ECharts built-in loading overlay on top of the existing chart data via the base `Chart` component's `loading` prop.

#### Scenario: Loading with existing data shows chart with overlay
- **WHEN** `loading={true}` and `data` contains entries
- **THEN** the chart renders with data visible under a semi-transparent ECharts loading overlay

#### Scenario: Loading overlay disappears when loading completes
- **WHEN** `loading` changes from `true` to `false` while data is present
- **THEN** the loading overlay disappears and only the chart remains

### Requirement: Empty state
When `data` is empty or undefined and `loading` is `false`, the `LineChart` SHALL display centered "No data" text within the chart container.

#### Scenario: Empty data shows message
- **WHEN** `data` is an empty array `[]` and `loading={false}` and no `error`
- **THEN** the container displays centered text "No data"

#### Scenario: Undefined data shows message
- **WHEN** `data` is `undefined` and `loading={false}` and no `error`
- **THEN** the container displays centered text "No data"

### Requirement: ECharts series type registration
The `LineChart` module SHALL register the ECharts `LineChart` series type at module level using `echarts.use()`, following the distributed registration pattern. This registration MUST be a side effect of importing the `LineChart` component.

#### Scenario: Line series type is available
- **WHEN** the `LineChart` component is imported and rendered with valid data
- **THEN** ECharts renders a line series without "series type not registered" errors

### Requirement: Tooltip on axis hover
The `LineChart` SHALL display a tooltip on axis hover showing all series values for the hovered X-axis position. The tooltip trigger SHALL be `"axis"`.

#### Scenario: Tooltip shows all series
- **WHEN** the user hovers over a data point on a chart with multiple series
- **THEN** a tooltip appears showing the X-axis label and values for all series at that position

### Requirement: CSS class support
The `LineChart` SHALL accept a `className` prop applied to the outermost container element using the `classNames()` utility.

#### Scenario: Custom class is applied
- **WHEN** `className="my-line-chart"` is provided
- **THEN** the outermost container has both the component's CSS Module class and `"my-line-chart"`

### Requirement: Public export
The `LineChart` component and `LineChartProps` type SHALL be exported from `charts/index.ts` as part of the public chart API.

#### Scenario: LineChart is importable
- **WHEN** a consumer imports from `@/charts`
- **THEN** `LineChart` and `LineChartProps` are available

### Requirement: Storybook stories
The `LineChart` SHALL have Storybook stories under the title `"Charts/LineChart"` demonstrating all variants and states, one variant per story.

#### Scenario: Stories exist for all variants
- **WHEN** the Storybook sidebar is opened under "Charts/LineChart"
- **THEN** the following stories are available: Default, MultipleSeries, WithUnits, FormattedXAxis, Loading, BackgroundRefresh, Empty, Error, CustomHeight

### Requirement: Y-axis units formatting
The `LineChart` SHALL accept an optional `units` prop (string) that is appended as a suffix to Y-axis labels and tooltip values. When `units` is not provided, values are displayed without suffix.

#### Scenario: Units shown on Y-axis and tooltip
- **WHEN** `units="ms"` is provided
- **THEN** Y-axis labels show values with " ms" suffix (e.g. "150 ms") and tooltip values also show the suffix

#### Scenario: No units by default
- **WHEN** no `units` prop is provided
- **THEN** Y-axis labels and tooltip values show raw numbers without suffix

### Requirement: Component file structure
The `LineChart` files SHALL follow the design system component conventions at `charts/LineChart/`.

#### Scenario: Files exist at expected paths
- **WHEN** the LineChart implementation is complete
- **THEN** the following files exist: `charts/LineChart/LineChart.tsx`, `charts/LineChart/LineChart.types.ts`, `charts/LineChart/LineChart.module.css`, `charts/LineChart/LineChart.stories.tsx`, `charts/LineChart/index.ts`

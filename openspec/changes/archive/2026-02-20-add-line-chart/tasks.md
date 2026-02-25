## 1. Setup

- [x] 1.1 Create `charts/LineChart/` directory structure
- [x] 1.2 Register ECharts `LineChart` series type at module level in `LineChart.tsx`

## 2. Types

- [x] 2.1 Create `charts/LineChart/LineChart.types.ts` with `LineChartSeries` type (`key`, `name?`)
- [x] 2.2 Define `LineChartProps` type (`data`, `xKey` as `string | ((item) => string)`, `series`, `height?`, `loading?`, `error?`, `className?`)

## 3. Core Implementation

- [x] 3.1 Implement `buildLineOption()` function: transform `data`, `xKey`, and `series` props into an ECharts option object (xAxis categories, line series, tooltip trigger axis, legend auto-show for multiple series)
- [x] 3.2 Handle `xKey` as string (property lookup) and function (custom extraction/formatting) in `buildLineOption()`
- [x] 3.3 Implement `LineChart` component rendering logic: determine state (error > loading > empty > chart) and render accordingly

## 4. States

- [x] 4.1 Implement error state: render centered error text when `error` prop is non-empty
- [x] 4.2 Implement initial loading state: pass `loading={true}` to base `Chart` when loading and data is empty
- [x] 4.3 Implement background refresh state: render chart with data + `Skeleton` bar (`rows={1}`, `size={3}`) at top of container when loading and data is present
- [x] 4.4 Implement empty state: render centered "No data" text when data is empty and not loading

## 5. Styles

- [x] 5.1 Create `charts/LineChart/LineChart.module.css` with container styles, state overlay positioning, and Skeleton bar positioning (absolute, top: 0)

## 6. Exports

- [x] 6.1 Create `charts/LineChart/index.ts` exporting `LineChart` component and `LineChartProps` type
- [x] 6.2 Update `charts/index.ts` to export `LineChart` and `LineChartProps` as the first public chart API

## 7. Storybook Stories

- [x] 7.1 Create `charts/LineChart/LineChart.stories.tsx` with meta under `"Charts/LineChart"`
- [x] 7.2 Add `Default` story: single series line chart
- [x] 7.3 Add `MultipleSeries` story: two or three series with legend
- [x] 7.4 Add `FormattedXAxis` story: xKey as function formatting timestamps to readable dates
- [x] 7.5 Add `Loading` story: initial loading state with no data
- [x] 7.6 Add `BackgroundRefresh` story: loading with existing data showing Skeleton bar
- [x] 7.7 Add `Empty` story: empty data state
- [x] 7.8 Add `Error` story: error state with message
- [x] 7.9 Add `CustomHeight` story: non-default height

## 8. Code Quality

- [x] 8.1 Run `npm run format` and ensure `npm run lint` passes

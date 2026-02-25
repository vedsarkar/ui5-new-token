## 1. Project Setup

- [x] 1.1 Install `echarts` v6 as a dependency in `package.json`
- [x] 1.2 Create `charts/` directory structure: `charts/Chart/` and `charts/index.ts`
- [x] 1.3 Verify `@/*` path alias resolves correctly for the new `charts/` directory

## 2. Theme System

- [x] 2.1 Create `charts/Chart/theme.ts` with `buildTheme()` function that reads `--reltio-color-*` tokens via `getComputedStyle().getPropertyValue()`
- [x] 2.2 Define the 9-color data series palette in `buildTheme()` (primary, success, warning, orange, pink, purple, aqua-font, lime, error)
- [x] 2.3 Map remaining theme properties: text colors, background, tooltip, axis lines, grid, legend styling

## 3. Chart Component

- [x] 3.1 Create `charts/Chart/Chart.types.ts` with `ChartProps` type (`option`, `renderer`, `height`, `loading`, `className`)
- [x] 3.2 Create `charts/Chart/Chart.tsx` — register ECharts infrastructure modules (CanvasRenderer, SVGRenderer, TooltipComponent, GridComponent, LegendComponent) at module level
- [x] 3.3 Implement mount lifecycle: create container ref, call `buildTheme()`, `echarts.init(container, theme, { renderer })`, `chart.setOption(option)`
- [x] 3.4 Implement option update: `useEffect` on `option` prop calls `chart.setOption(newOption)` on existing instance
- [x] 3.5 Implement loading state: `useEffect` on `loading` prop calls `chart.showLoading()` / `chart.hideLoading()`
- [x] 3.6 Implement auto-resize: attach `ResizeObserver` to container, call `chart.resize()` on size change
- [x] 3.7 Implement cleanup: `useEffect` cleanup calls `chart.dispose()` and disconnects `ResizeObserver`
- [x] 3.8 Apply `height` prop as CSS on container `<div>` (default `300px`)
- [x] 3.9 Apply `className` prop via `classNames()` utility on container `<div>`

## 4. Styles

- [x] 4.1 Create `charts/Chart/Chart.module.css` with base container styles (width: 100%, default height)

## 5. Exports

- [x] 5.1 Create `charts/Chart/index.ts` exporting Chart component and ChartProps type (internal — for use by high-level charts only)
- [x] 5.2 Create `charts/index.ts` as public API — empty for now (no public exports in this change)

## 6. Code Quality

- [x] 6.1 Run `npm run format` and ensure `npm run lint` passes
- [x] 6.2 Verify ECharts tree-shaking works: no chart series types (line, bar, pie) in the bundle from base Chart alone

## 1. GaugeChart

- [x] 1.1 Create `charts/GaugeChart/GaugeChart.types.ts` with `GaugeChartProps` type (value, label, max, height, loading, error, className)
- [x] 1.2 Create `charts/GaugeChart/GaugeChart.module.css` with root and overlay styles
- [x] 1.3 Create `charts/GaugeChart/GaugeChart.tsx` — register ECharts GaugeChart series, implement `buildGaugeOption()` pure function, component with state management
- [x] 1.4 Create `charts/GaugeChart/index.ts` with public exports
- [x] 1.5 Create `charts/GaugeChart/GaugeChart.stories.tsx` with required stories (Default, WithLabel, CustomMax, Loading, BackgroundRefresh, Empty, Error, CustomHeight)

## 2. RadarChart

- [x] 2.1 Create `charts/RadarChart/RadarChart.types.ts` with `RadarChartIndicator`, `RadarChartSeries`, and `RadarChartProps` types
- [x] 2.2 Create `charts/RadarChart/RadarChart.module.css` with root and overlay styles
- [x] 2.3 Create `charts/RadarChart/RadarChart.tsx` — register ECharts RadarChart series and RadarComponent, implement `buildRadarOption()` pure function, component with state management
- [x] 2.4 Create `charts/RadarChart/index.ts` with public exports
- [x] 2.5 Create `charts/RadarChart/RadarChart.stories.tsx` with required stories (Default, MultipleSeries, Loading, BackgroundRefresh, Empty, Error, CustomHeight)

## 3. SankeyChart

- [x] 3.1 Create `charts/SankeyChart/SankeyChart.types.ts` with `SankeyChartNode`, `SankeyChartLink`, and `SankeyChartProps` types
- [x] 3.2 Create `charts/SankeyChart/SankeyChart.module.css` with root and overlay styles
- [x] 3.3 Create `charts/SankeyChart/SankeyChart.tsx` — register ECharts SankeyChart series, implement `buildSankeyOption()` pure function, component with state management
- [x] 3.4 Create `charts/SankeyChart/index.ts` with public exports
- [x] 3.5 Create `charts/SankeyChart/SankeyChart.stories.tsx` with required stories (Default, MultiLevel, WithUnits, Loading, BackgroundRefresh, Empty, Error, CustomHeight)

## 4. Integration

- [x] 4.1 Update `charts/index.ts` to export all 3 new chart components
- [x] 4.2 Run `npm run format` and `npm run lint` to verify code quality

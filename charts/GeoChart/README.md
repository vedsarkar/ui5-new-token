# GeoChart

`GeoChart` is a **choropleth map** — colored regions over an arbitrary geography. You provide the geometry as a GeoJSON FeatureCollection and the per-region values as a flat list; the wrapper buckets values into ranges and renders one color per bucket.

### Data shape

- `map` — a GeoJSON `FeatureCollection`. The `name` field on each feature must match `data[i].name` for the value to bind.
- `data` — `{ name, value }` per region. Regions present in the GeoJSON but missing from `data` render in the neutral "no data" color.

### Bucketing

Values are auto-bucketed into 4–5 visual-map ranges. The wrapper does not currently expose explicit `ranges` configuration; if you need fixed bucket boundaries (e.g. SLA thresholds), the right place to add it is `buildGeoOption` inside `GeoChart.tsx` rather than at the call site.

### Geography source

The wrapper deliberately does not bundle a world map or any specific geography — pass whatever GeoJSON your dataset uses. This keeps the bundle small and the chart unbiased about country / region naming. Common sources: [Natural Earth](https://www.naturalearthdata.com/), [GADM](https://gadm.org/), or your own custom regions (sales territories, business units).

### Units

`units` suffixes tooltip values and the auto-generated range labels in the legend (`"%"`, `"customers"`, `"M$"`).

### See also

- [Apache ECharts — Map series](https://echarts.apache.org/en/option.html#series-map) — the underlying option schema
- [GeoJSON spec](https://geojson.org/) — the format expected by the `map` prop

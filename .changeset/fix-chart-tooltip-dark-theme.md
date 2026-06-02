---
"@reltio/design": patch
---

Fix unreadable chart tooltip text in dark theme.

- Tooltip now uses `--sapGroup_ContentBackground` and `--sapTextColor` so background and text contrast correctly in both light and dark themes
- Affects all charts (`BarChart`, `LineChart`, `DonutChart`, `RadarChart`, `SankeyChart`, `GraphChart`, `GeoChart`)

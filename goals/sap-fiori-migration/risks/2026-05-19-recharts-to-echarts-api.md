---
title: "Recharts → ECharts API migration"
date: 2026-05-19
severity: "medium"
---

# Recharts → ECharts API migration

Five Reltio apps use Recharts (composable React component API: `<LineChart><XAxis/><YAxis/><Line/></LineChart>`). `@reltio/design/charts` is built on Apache ECharts, which uses an imperative configuration-object API (`{ xAxis: {...}, yAxis: {...}, series: [{...}] }`).

The conceptual model is different enough that a mechanical port is impossible. Each chart needs to be re-implemented against the ECharts config schema, and edge cases (custom tooltips, animations, dynamic series) require hands-on work per chart. RDM is the biggest single consumer and the highest concentration of charts.

## Mitigation

- Publish a Recharts → ECharts mapping guide as a Storybook page, covering the most common chart types (line, bar, area, pie/donut, radar) with side-by-side before/after snippets
- Co-locate the migration with the first chart-heavy app port (RDM) so the guide is grounded in real code, not synthetic examples
- Where ECharts cannot match a Recharts feature 1:1, document the trade-off explicitly so app teams can choose to keep a chart on Recharts temporarily or accept the visual delta

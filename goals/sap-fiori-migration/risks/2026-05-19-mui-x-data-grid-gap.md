---
title: "MUI X Data Grid has no direct replacement in @reltio/design"
date: 2026-05-19
severity: "high"
---

# MUI X Data Grid has no direct replacement in @reltio/design

Usage Reporting UI depends heavily on MUI X Data Grid (sorting, filtering, virtualisation, column resizing). `@reltio/design` currently exposes no equivalent. UI5 ships `Table` and `AnalyticalTable` components, but neither has been endorsed yet and their API differs significantly from MUI X Data Grid — column definitions, row models, virtualisation hooks, and filter UX all need rewriting.

Until this gap is closed, Usage Reporting UI cannot start migrating, and any other app that adopts MUI X Data Grid in the future will hit the same wall.

## Mitigation

- Evaluate UI5 `Table` and `AnalyticalTable` against the actual Usage Reporting UI feature set; identify must-have features
- If UI5's surface is sufficient, ship endorsement + a Storybook migration guide for MUI X Data Grid → UI5 `AnalyticalTable`
- If a focused Reltio business component is warranted (e.g. `<DataGrid />` wrapping `AnalyticalTable` with Reltio-specific column types), spec it via OpenSpec before committing
- De-risk by porting one small Usage Reporting UI table first, before tackling the central data grid

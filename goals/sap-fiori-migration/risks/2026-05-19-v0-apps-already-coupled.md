---
title: "Two apps already depend on @reltio/design v0 / custom components"
date: 2026-05-19
severity: "medium"
---

# Two apps already depend on @reltio/design v0 / custom components

`agent-flow-ui` and `reltio-react-ui` (HUB UI) currently mix `@reltio/design` v0 (an experimental preview line built on a different tech stack), `@reltio/components`, and custom components / styles. The 1.0 line is a full rewrite on UI5 — there is no automated migration path from 0.x.

Untangling v0 usage is harder than migrating from a clean MUI baseline because the existing component names / props **look** similar to v1 but the underlying implementation, theming model, and customization API are different. Visual regressions are likely.

## Mitigation

- Capture Chromatic baselines for every v0-consuming screen before the migration starts
- Treat all v0 components as deprecated and replace them incrementally, one screen at a time, with Chromatic snapshots gating each change
- Do not run v0 and v1 in parallel inside the same page — switch entire pages at once to avoid layout / theme conflicts
- Document v0 → v1 component substitutions in a dedicated Storybook guide before either app starts migrating

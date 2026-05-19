---
title: "Legacy build systems block 3 apps"
date: 2026-05-19
severity: "high"
---

# Legacy build systems block 3 apps

Three apps cannot install `@reltio/design` until their underlying framework or build system is upgraded:

- **Data Modeller** — React 16 + CRACO
- **Export UI** — React 16 + class components
- **Env Management** — React 17 (closer, but still pre-18)

`@reltio/design@1.0.2` requires `react` / `react-dom` `^18 || ^19` because the bundled `@ui5/webcomponents-react@2.21.3` needs React 18+. React 17 silently fails at runtime in UI5 React 2.x.

The framework upgrade is a multi-week piece of work per app (class-to-function-component migration, build-system swap from CRACO to Vite or Next.js, dependency audit). Coupling it with the design-system migration would create one huge, hard-to-review PR per app.

## Mitigation

- Treat framework upgrade as a **prerequisite epic** per app, scoped and tracked separately from the design-system migration
- Sequence: framework upgrade → land on `main` → migrate to `@reltio/design`. Never combine the two in a single PR
- Identify the smallest of the three apps (likely Env Management, already on React 17) and start there to validate the workflow
- Treat Export UI as a deliberate pilot for the "legacy stack" track — picking it gives us a realistic baseline for how long React 16 → React 18 + design-system migration takes end to end

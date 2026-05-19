---
title: "Documentation-only endorsement scales better than wrappers"
date: 2026-05-19
---

# Documentation-only endorsement scales better than wrappers

Endorsing a UI5 component requires only `README.md` + a types re-export + `*.stories.tsx` + the auto-generated `schema.json` — no runtime wrapper, no duplicated implementation, no maintenance debt. The directory under `components/<UI5Name>/` exists purely to provide a stable Storybook navigation path and to drive the Reltio Design MCP catalogue.

This let us ship 42 endorsed UI5 components with effectively zero new code, and lets the next ~120 components be onboarded in proportional, low-risk increments. Restyling is done through `--sap*` tokens or CSS Parts — never through a wrapper.

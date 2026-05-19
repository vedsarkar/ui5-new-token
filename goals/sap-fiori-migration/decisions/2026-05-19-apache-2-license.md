---
title: "Apache 2.0 license for @reltio/design"
date: 2026-05-19
---

# Apache 2.0 license for @reltio/design

`@reltio/design` is published under the Apache License, Version 2.0, aligned with the upstream `@ui5/webcomponents-react` license. The bundle ships `LICENSE` (full Apache 2.0 text) and `NOTICE` (attribution for redistributed Apache 2.0 software from SAP SE — `@ui5/webcomponents-react`, `@ui5/webcomponents`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, and the SAP Horizon tokens / SAP 72 fonts from `@sap-theming/theming-base-content`).

## Rationale

- **Removes legal ambiguity for customers and partners** that redistribute Reltio applications. The previous `UNLICENSED` metadata blocked legitimate redistribution scenarios.
- **License compatibility with the entire downstream stack.** UI5 React is Apache 2.0; mixing in a stricter license at the `@reltio/design` layer would have created friction or required dual-licensing carve-outs for OSS-only consumers.
- **Trademarks remain protected.** Apache License Section 6 explicitly excludes trademark grants — the Reltio name and logo are not granted by this license, so brand identity is preserved.
- **One-time metadata change**, no API impact. Released as `@reltio/design@1.0.1` with zero functional changes.

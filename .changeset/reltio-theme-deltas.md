---
"@reltio/design": minor
---

Ship `variables.css` as Reltio-only theme deltas; activate the theme via `data-theme`.

- `variables.css` now contains **only the tokens Reltio customizes** (the delta over stock SAP Horizon), roughly 4× smaller. The full stock token set is already injected at runtime by the UI5 web components, so it is no longer duplicated here.
- Activate the Reltio palette with `data-theme="sap-reltio-light"` / `data-theme="sap-reltio-dark"` on an ancestor element. The previous `horizon-light` / `horizon-dark` values keep working as a deprecated alias.
- Reltio token values now reliably win over UI5's runtime-injected defaults: each theme is emitted under both `:root[data-theme="…"]` and `[data-theme="…"]`, so `data-theme` works on `<html>` or any nested element.

Note: with no `data-theme` ancestor, content now falls back to UI5's stock SAP Horizon values instead of the Reltio light palette. Set `data-theme="sap-reltio-light"` (or `"sap-reltio-dark"`) on `<html>` or `<body>` to opt into the Reltio brand. See the [Design Tokens guide](https://reltio.design/?path=/docs/design-tokens--docs).

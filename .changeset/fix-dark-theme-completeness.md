---
"@reltio/design": patch
---

Fix the dark theme rendering incompletely when nested under a light theme.

- `variables.css` now emits every token that differs from UI5's stock light theme for **both** themes, so a `data-theme="sap-reltio-dark"` subtree no longer inherits light values (e.g. background, text, surface colors) from a light ancestor. This affects nested/sibling theming such as light and dark panels shown side by side.
- `ShellBar` now swaps to its light logo correctly under the `sap-reltio-dark` theme.

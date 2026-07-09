---
"@reltio/design": patch
---

Fix the block-layer dimming overlay rendering as fully opaque black.

- `--sapBlockLayer_Opacity` is now the numeric SAP Horizon default (`0.6`) instead of an invalid color value, so overlays (side navigation drawer, dialogs, busy indicators) dim the content behind them with proper translucency instead of covering it with solid black.

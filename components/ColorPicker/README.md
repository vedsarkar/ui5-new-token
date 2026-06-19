# ColorPicker

`ColorPicker` is the SAP Fiori color selection control, re-exported from `@ui5/webcomponents-react/ColorPicker` as the canonical Reltio entry point. Use it where a user picks an arbitrary color value — theming a workspace, color-coding a segment or tag category, configuring a chart series.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ColorPicker`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Value and modes

- **`value`** — the current color; accepts CSS color strings (`"#1873b4"`, `"rgba(24,115,180,1)"`). Read the resulting value from `onChange`.
- **`simplified`** — a compact picker without the full HSL/alpha sliders, for quick selection from a smaller surface.

### Note on app theming

For Reltio product UI, prefer the SAP Horizon `--sap*` tokens for component colors. `ColorPicker` is for user-chosen data colors (categories, charts, labels), not for overriding the design system.

### See also

- [UI5 ColorPicker reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/inputs-colorpicker--docs) — full underlying API
- `Tag` — `colorScheme` for predefined category colors

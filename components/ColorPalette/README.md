# ColorPalette

`ColorPalette` is the SAP Fiori color palette, re-exported from `@ui5/webcomponents-react/ColorPalette` as the canonical Reltio entry point. Use it to let users pick from a predefined set of colors — categorizing segments, tagging records, choosing a chart series color — rather than the full color space. Compose swatches from `ColorPaletteItem`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ColorPalette`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`ColorPaletteItem`** — one swatch; set `value` to any CSS color and `selected` for the active one. Handle selection via the palette's `onItemClick`.
- **`ColorPalettePopover`** — opens the palette from a trigger (`open` + `opener`), for compact placements; optionally offers "More colors" and "Default color".

### When to use `ColorPalette` vs `ColorPicker`

- **`ColorPalette`** — choose from a curated, stable set of colors.
- **`ColorPicker`** — choose any arbitrary color from the full space.

### See also

- [UI5 ColorPalette reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/inputs-colorpalette--docs) — full underlying API
- `ColorPicker` — for free-form color selection

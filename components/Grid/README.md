# Grid

`Grid` is the SAP Fiori responsive grid layout, re-exported from `@ui5/webcomponents-react/Grid` as the canonical Reltio entry point. Use it for two-dimensional, breakpoint-aware layouts — dashboards, form sections, card galleries — where children occupy a portion of a 12-column track that reflows as the viewport changes.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Grid`. The Reltio layer adds curation (this is the endorsed responsive grid), pinned versioning, and richer documentation.

### The 12-column span system

`Grid` divides each row into 12 columns. Children are sized with breakpoint span strings:

- **`defaultSpan`** — columns each child occupies per breakpoint, e.g. `"XL3 L3 M6 S12"` = 4-up on extra-large/large, 2-up on medium, full width on small.
- **`defaultIndent`** — empty columns to offset children, same `XL/L/M/S` syntax.
- Per-child overrides go on the child via `data-layout-span` / `data-layout-indent`.

Breakpoints follow SAP sizes: `S` (phone), `M` (tablet), `L` (desktop), `XL` (large desktop).

### Spacing

`hSpacing` and `vSpacing` set the horizontal/vertical gutters (default `1rem`); pass any CSS length.

### When to use `Grid` vs `FlexBox`

- **`Grid`** — responsive multi-column layouts that reflow by breakpoint.
- **`FlexBox`** — one-dimensional rows/columns sized to content.

### See also

- [UI5 Grid reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-grid--docs) — full underlying API
- `FlexBox` — for one-dimensional layouts

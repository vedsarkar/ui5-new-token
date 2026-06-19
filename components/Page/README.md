# Page

`Page` is the SAP Fiori page container, re-exported from `@ui5/webcomponents-react/Page` as the canonical Reltio entry point. Use it as the scrollable shell for a view: a fixed `header` at the top, a scrolling content area in the middle, and an optional `footer` (typically an action bar) pinned at the bottom.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Page`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Slots and options

- **`header`** / **`footer`** — pass a `Bar` (with `slot="startContent"` / `slot="endContent"` children) for the title row and action bar.
- **`backgroundDesign`** — `Solid` (default), `Transparent`, or `List`.
- **`fixedFooter`** / **`hideFooter`** — keep the footer pinned, or hide it.
- **`noScrolling`** — disable the built-in content scroll when an inner region scrolls instead.

### When to use `Page` vs `DynamicPage` vs `ObjectPage`

- **`Page`** — a simple header/content/footer shell.
- **`DynamicPage`** — a page with a collapsible, snapping header (not yet endorsed).
- **`ObjectPage`** — a full object floorplan with anchored sections (not yet endorsed).

### See also

- [UI5 Page reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-page--docs) — full underlying API
- `Bar` — header/footer content · `ShellBar` — top app chrome

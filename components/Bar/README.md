# Bar

`Bar` is the SAP Fiori toolbar container, re-exported from `@ui5/webcomponents-react/Bar` as the canonical Reltio entry point. Use it to build page headers, sub-headers, and footers that hold titles, action buttons, and navigation controls while keeping content logically centered between a start and end zone.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Bar`. The Reltio layer adds curation (this is the endorsed toolbar surface), pinned versioning, and Reltio-specific guidance.

### Why use Bar

Reltio applications frequently need a consistent toolbar surface across page headers, detail panels, and form footers. Using `Bar` from `@reltio/design` ensures all toolbar surfaces pick up the same pinned UI5 version, the same SAP Horizon theme, and the same accessibility scaffolding as every other endorsed component.

### Header vs Subheader vs Footer

The `design` prop is semantic — it drives the visual treatment and the correct ARIA landmark behavior:

- **`Header` (default)** — Top-of-page bar. Use for the primary page title, key actions, and navigation controls.
- **`Subheader`** — Secondary bar placed directly below a `Header`. Use for contextual controls like filters, sort triggers, and result counts that apply to the page content.
- **`Footer`** — Pinned-to-bottom bar. Use for form commit actions (Save, Cancel, Submit) that remain visible while the user scrolls through content.
- **`FloatingFooter`** — Floating variant of Footer with a drop shadow, visually separated from the page surface. Prefer this over `Footer` when the footer overlays scrollable content rather than sitting flush at the page edge.

Do not nest a `Bar` inside another `Bar` or inside any bar-like component (`ShellBar`, `DynamicPage` header area). The SAP Fiori specification treats nesting as undefined behavior.

### The three slots

`Bar` divides its width into three zones:

- **`startContent`** — Left zone. Typically holds a back-navigation button, a title, or a branding element.
- **`children`** (default slot, center) — Centered between start and end. Typically holds a page title or a status label.
- **`endContent`** — Right zone. Typically holds primary action buttons.

The center slot is positioned relative to the available space between start and end — it is not always centered in the full bar width. If strict centering relative to the full bar is required, use an empty start or end slot to balance the occupied zone.

### See also

- [SAP Fiori Bar design guideline](https://experience.sap.com/fiori-design-web/bar/) — placement rules and layout patterns
- [UI5 Bar web component reference](https://ui5.github.io/webcomponents/components/Bar) — full underlying API

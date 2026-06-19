# FlexBox

`FlexBox` is the SAP Fiori flexbox layout container, re-exported from `@ui5/webcomponents-react/FlexBox` as the canonical Reltio entry point. Use it to arrange a row or column of elements with consistent alignment, distribution, and spacing — toolbars, button rows, card content, form action bars. It is a thin, declarative wrapper over CSS flexbox with SAP-friendly prop names, so layouts read the same across every Reltio application.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/FlexBox`. The Reltio layer adds curation (this is the endorsed flex layout primitive), pinned versioning, and richer documentation.

### Layout props

- **`direction`** — `Row` (default) or `Column` (plus the `*Reverse` variants).
- **`justifyContent`** — distribution along the main axis (`Start`, `Center`, `End`, `SpaceBetween`, `SpaceAround`).
- **`alignItems`** — alignment across the cross axis (`Start`, `Center`, `End`, `Baseline`, `Stretch`).
- **`wrap`** — allow items to wrap onto multiple lines.
- **`gap`** — spacing between items; takes any CSS length (`"8px"`, `"1rem"`). Prefer `gap` over margins on children.
- **`fitContainer`** — stretch the box to fill its parent so `justifyContent` has room to distribute.

### When to use `FlexBox` vs `Grid`

- **`FlexBox`** — one-dimensional layout (a single row or column) where items size to content or distribute along one axis.
- **`Grid`** — two-dimensional, responsive column layouts driven by the SAP 12-column breakpoint span system.

### See also

- [SAP Fiori Flexible layout guidance](https://experience.sap.com/fiori-design-web/) — layout principles
- [UI5 FlexBox reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-flexbox--docs) — full underlying API
- `Grid` — for responsive 12-column layouts

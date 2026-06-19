# NumericSideIndicator

`NumericSideIndicator` is the SAP Fiori secondary-KPI element, re-exported from `@ui5/webcomponents-react/NumericSideIndicator` as the canonical Reltio entry point. Use it for the smaller supporting figures shown beside a headline number — a target, a deviation, a previous-period value — typically inside a KPI card or an object header.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/NumericSideIndicator`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Props

- **`titleText`** — the label for the figure (required).
- **`number`** — the value (required).
- **`unit`** — optional unit suffix (`%`, `K`, currency code).
- **`state`** — semantic color (`None`, `Good`, `Critical`, `Error`, `Neutral`). Map it to real meaning; don't use color decoratively.

### See also

- [UI5 NumericSideIndicator reference](https://ui5.github.io/webcomponents-react/v2/) — full underlying API
- `ObjectStatus` — for textual status · `Card` — common container for KPIs

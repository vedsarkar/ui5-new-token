# ToggleButton

`ToggleButton` is the SAP Fiori two-state button, re-exported from `@ui5/webcomponents-react/ToggleButton` as the canonical Reltio entry point. Use it for a button that stays visibly pressed to represent an on/off choice tied to an action — toggling a filter, pinning a column, enabling a view mode. It shares the full `Button` API plus a `pressed` state.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ToggleButton`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### State

- **`pressed`** — the toggled (active) state. Drive it from your own state and update on `onClick`.
- Inherits `design`, `icon`, `endIcon`, `disabled`, etc. from `Button`.

### When to use `ToggleButton` vs `Switch` vs `CheckBox`

- **`ToggleButton`** — a toolbar/action affordance that is itself the control (e.g. "Filters" that opens/activates filtering).
- **`Switch`** — an immediate on/off setting in a form or settings surface.
- **`CheckBox`** — a selectable option, especially in lists and multi-select.

### See also

- [UI5 ToggleButton reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/inputs-togglebutton--docs) — full underlying API
- `Button` — for one-shot actions · `Switch` — for settings toggles

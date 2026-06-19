# Menu

`Menu` is the SAP Fiori menu, re-exported from `@ui5/webcomponents-react/Menu` as the canonical Reltio entry point. Use it for a list of actions or options shown on demand from a trigger — a row's "more actions", a toolbar overflow, a context menu. It opens anchored to an `opener` element and supports grouped, checkable, and nested items.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Menu`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Opening

`Menu` is controlled: set `open` and point `opener` at the trigger element's id. Handle `onClose` to reset state. It positions itself relative to the opener (`placement`, `horizontalAlign`).

### Composition

- **`MenuItem`** — an action; supports `icon`, `additionalText` (shortcut hint), `checked`, `disabled`, and nested `MenuItem` children for submenus.
- **`MenuItemGroup`** — groups items with a `checkMode` (`None`, `Single`, `Multiple`) for selectable option sets.
- **`MenuSeparator`** — a divider between logical groups.

### When to use `Menu` vs `Select` vs `ActionSheet`

- **`Menu`** — actions/commands triggered from a control, including nested and checkable items.
- **`Select`** — choosing one value for a form field.
- **`ActionSheet`** — a small set of buttons, especially on phone-sized surfaces.

### See also

- [UI5 Menu reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/modals-popovers-menu--docs) — full underlying API
- `ActionSheet` — action buttons in a sheet · `Toolbar` — inline action bars

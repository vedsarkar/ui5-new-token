# ActionSheet

`ActionSheet` is the SAP Fiori action sheet, re-exported from `@ui5/webcomponents-react/ActionSheet` as the canonical Reltio entry point. Use it to present a small set of actions as buttons in a popover (or a full-width sheet on phones) — the "more actions" affordance for a record, a card, or a selection. Children are `Button`s.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ActionSheet`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Opening and content

- Controlled like a popover: set `open` and point `opener` at the trigger element's id; reset on `onClose`.
- **children** must be `Button`s — each is rendered as one action row. Use `design="Negative"` for destructive actions.
- **`headerText`** / **`header`** slot — an optional title.
- On phone-sized devices it expands to a bottom sheet with a Cancel button (`hideCancelButton` to suppress).

### When to use `ActionSheet` vs `Menu`

- **`ActionSheet`** — a short, flat list of button actions; mobile-friendly.
- **`Menu`** — richer command menus with groups, checkable items, shortcuts, and submenus.

### See also

- [UI5 ActionSheet reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/modals-popovers-actionsheet--docs) — full underlying API
- `Menu` — for richer command menus · `Button` — the action entity

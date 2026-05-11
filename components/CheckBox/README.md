# CheckBox

`CheckBox` is the SAP Fiori binary-choice control, re-exported from `@ui5/webcomponents-react/CheckBox` as the canonical Reltio entry point. Use it for independent toggles, multi-select lists, opt-in confirmations, and any "yes / no" decision where the user can see all the options at once.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/CheckBox`. The Reltio layer adds curation (this is the endorsed binary-choice surface), pinned versioning, and Reltio-specific guidance.

### CheckBox vs. Switch vs. RadioButton

- **`CheckBox`** — Multi-select within a list, opt-in confirmations, "include / exclude" filters. The state is applied on form submit, not immediately.
- **`Switch`** — Immediate, persistent setting toggle (feature on/off, dark-mode, notifications). The change takes effect right away.
- **`RadioButton`** — Exactly one option from a small, mutually-exclusive set (≤ 5 options). For more options use `Select`.

If the choice represents a single binary attribute on an entity, prefer `CheckBox` over `Switch` when the decision is part of a Save / Cancel form, and prefer `Switch` when the change persists immediately.

### Labels — always set `text`

Every `CheckBox` MUST have a visible `text` label. Screen readers, focus order, and click targets all rely on it. Do not place a `<label>` element next to a bare `CheckBox` — UI5 already renders the label and handles the click target.

For wrapping multi-line labels (long disclosure text, terms-of-service confirmations), pass `wrappingType="Normal"`.

### Tri-state — `indeterminate`

The `indeterminate` state (a horizontal dash, not a checkmark) signals "partially selected" — useful for a parent checkbox that controls a group of children, some of which are checked and some are not. Set both `checked={true}` and `indeterminate={true}` on the parent. Toggle behavior is up to you: typically the next click clears all children.

### `valueState` — validation feedback

Use `valueState` to signal validation outcomes inline:

- **`None` (default)** — Neutral.
- **`Information`** — Informational hint, not a problem.
- **`Critical`** — Warning — proceed with caution.
- **`Negative`** — Error — must be resolved before submission.
- **`Positive`** — Confirmed valid.

Provide `valueStateMessage` for the supporting text. Without a message, screen readers only announce the color, which is meaningless.

### Required vs. disabled vs. readonly

- **`required`** — the user must make a choice; the form will reject submission without it.
- **`disabled`** — the control is unavailable in this context and the user cannot change it; usually paired with an explanation elsewhere.
- **`readonly`** — the value is set and the user is told what it is, but cannot change it (a tenant-policy-enforced setting).

### See also

- [SAP Fiori CheckBox design guideline](https://experience.sap.com/fiori-design-web/checkbox/) — semantic guidance and visual patterns
- [UI5 CheckBox web component reference](https://ui5.github.io/webcomponents/components/CheckBox/) — full underlying API
- [RadioButton](?path=/docs/components-radiobutton--docs) — single-select alternative
- [Switch](?path=/docs/components-switch--docs) — immediate-toggle alternative

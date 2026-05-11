# RadioButton

`RadioButton` is the SAP Fiori single-select control for small, mutually-exclusive option sets, re-exported from `@ui5/webcomponents-react/RadioButton` as the canonical Reltio entry point. Use it for "exactly one of these few" choices — source-priority strategy, layout mode, match-rule severity threshold — where the user benefits from seeing every option at once.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/RadioButton`. The Reltio layer adds curation (this is the endorsed single-select-from-small-set surface), pinned versioning, and Reltio-specific guidance.

### RadioButton vs. Select vs. CheckBox vs. Switch

- **`RadioButton`** — 2–5 mutually-exclusive options. Every option visible. State applied on form submit.
- **`Select`** — 6+ options or limited screen space. Options hidden until the dropdown opens.
- **`CheckBox`** — Independent toggles or multi-select.
- **`Switch`** — Single binary setting that takes effect immediately.

If the choice has more than five reasonable options, switch to `Select` — long radio groups are exhausting to scan.

### `name` — groups radios together

Radios with the same `name` form a group: selecting one auto-deselects the others. This is mandatory — without `name`, every radio behaves independently and the user can select all of them.

```tsx
<RadioButton name="source-priority" text="SAP wins" checked />
<RadioButton name="source-priority" text="Salesforce wins" />
<RadioButton name="source-priority" text="Workday wins" />
```

Wrap the group in `<div role="radiogroup" aria-label="Source priority">` so screen readers announce the group purpose.

### Labels — always set `text`

Every `RadioButton` MUST have a visible `text` label. Screen readers, focus order, and click targets all rely on it. Do not place a `<label>` element next to a bare `RadioButton` — UI5 already renders the label and handles the click target.

For wrapping multi-line labels (long policy text), pass `wrappingType="Normal"`.

### Validation — `valueState`

`valueState` on a single radio is rare; usually validation lives on the group level. When you do need it (e.g. "this choice will overwrite a default"), pair with `valueStateMessage` slot for the explanation.

### Required vs. disabled vs. readonly

- **`required`** — at least one radio in the group must be checked before form submission.
- **`disabled`** — the option is unavailable in this context; usually paired with an explanation.
- **`readonly`** — the choice is shown but the user cannot change it (tenant policy).

### See also

- [SAP Fiori Radio Button design guideline](https://experience.sap.com/fiori-design-web/radio-button/) — semantic guidance and visual patterns
- [UI5 RadioButton web component reference](https://ui5.github.io/webcomponents/components/RadioButton/) — full underlying API
- [Select](?path=/docs/components-select--docs) — dropdown variant for longer option sets
- [CheckBox](?path=/docs/components-checkbox--docs) — independent / multi-select variant
- [Switch](?path=/docs/components-switch--docs) — immediate-toggle variant

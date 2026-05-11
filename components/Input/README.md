# Input

`Input` is the SAP Fiori single-line text field, re-exported from `@ui5/webcomponents-react/Input` as the canonical Reltio entry point. Use it for every free-text or short structured value — entity attribute fields, search inputs, ID lookups, numeric scores, password/secret fields.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Input`. The Reltio layer adds curation (this is the endorsed text-input surface), pinned versioning, and Reltio-specific guidance.

### When to use Input vs. ComboBox vs. MultiInput vs. TextArea

- **`Input`** — Single line, free text. Optionally an open-ended suggestion list (no strict match).
- **`ComboBox`** — Single line, dropdown of canonical options the user filters. The chosen value usually has to match an option.
- **`MultiInput`** — Several tagged values in a single field (multi-select free-text, recipient lists, tag-style filters).
- **`TextArea`** — Multiple lines of free text (description, notes, JSON snippet).

### `type` — semantic + browser keyboard

- **`Text` (default)** — Generic text field. Plain string.
- **`Email`** — Email address. Mobile keyboard shows `@`; browser validates basic format.
- **`Tel`** — Phone number. Mobile keyboard shows digits.
- **`URL`** — URL. Mobile keyboard shows `/`.
- **`Number`** — Numeric input. Mobile shows numeric pad; arrow keys step the value.
- **`Password`** — Secret value. Characters are masked; pair with `accessibleName` like "API client secret".
- **`Search`** — Search field. Some platforms show a "search" submit key.

`type` is a hint to the browser/keyboard layer — it does NOT enforce validation. Always validate semantically in the form layer.

### Suggestions — `showSuggestions` + `SuggestionItem`

Toggle `showSuggestions` and pass `SuggestionItem` / `SuggestionItemGroup` / `SuggestionItemCustom` children to attach an autocomplete list:

```tsx
<Input showSuggestions placeholder="Pick an entity type">
  <SuggestionItem text="Organization" />
  <SuggestionItem text="Individual" />
  <SuggestionItem text="Product" />
</Input>
```

For server-driven suggestion lists (Reltio API lookup), update the children in response to `onInput`. Group with `SuggestionItemGroup` so users can scan by category.

Use `SuggestionItemCustom` when you need a richer cell layout (icon, secondary text, badge). Each custom suggestion's wrapper still controls selection — just style the inner content.

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation. Without a message, the color alone is meaningless to screen readers.

### Slots — icon, `valueStateMessage`

- **`icon`** slot — render a glyph or value-help button on the right of the input. Pair with `accessibleName` on the icon for screen readers.
- **`valueStateMessage`** slot — multi-line / formatted validation message anchored below the field.

### Required vs. disabled vs. readonly

- **`required`** — form rejects submission without a value; pair with a visible asterisk in the label.
- **`disabled`** — field unavailable in this context; pair with an explanation elsewhere.
- **`readonly`** — value set; user is told what it is, cannot change it.

### Accessibility

Set `accessibleName` (or `accessibleNameRef` pointing at a visible label) so screen readers announce the field's purpose. `placeholder` is **not a substitute** for an accessible name — it disappears once the user starts typing.

### See also

- [SAP Fiori Input design guideline](https://experience.sap.com/fiori-design-web/input/) — semantic guidance and visual patterns
- [UI5 Input web component reference](https://ui5.github.io/webcomponents/components/Input/) — full underlying API
- [ComboBox](?path=/docs/components-combobox--docs) — autocomplete with a canonical list
- [MultiInput](?path=/docs/components-multiinput--docs) — multi-tag variant
- [TextArea](?path=/docs/components-textarea--docs) — multi-line variant

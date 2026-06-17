# Label

`Label` is the SAP Fiori form label component, re-exported from `@ui5/webcomponents-react/Label` as the canonical Reltio entry point. Use it to associate descriptive text with form inputs — `Input`, `Select`, `ComboBox`, `CheckBox`, `Switch`, and native HTML controls — so screen readers can announce the label when the user focuses the corresponding field.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Label`. The Reltio layer adds curation (this is the endorsed label primitive for all Reltio forms), pinned versioning, and Reltio-specific guidance.

### `for` association

Always set the `for` prop to the `id` of the input it describes. This is what wires the accessible name in the browser and in screen readers. Without it, the label is visually present but programmatically disconnected.

```tsx
<Label for="tenant-name">Tenant name</Label>
<Input id="tenant-name" placeholder="my-tenant" />
```

The `for` prop works with both UI5 inputs (via their internal `id`) and native `<input>` elements.

### Required fields

Set `required` on the `Label` to render the asterisk (`*`) that conventions dictate for mandatory fields. Mirror this with `required` on the paired input so both visual and programmatic affordances agree.

### Colon convention

Pass `showColon` when the surrounding form layout calls for label-colon-field alignment (common in dense data-entry screens). The colon is rendered inside the label's DOM so it is excluded from screen-reader text.

### Text wrapping

By default `wrappingType` is `"Normal"` — text wraps to the next line. Set `wrappingType="None"` to clip to a single line (use only when the container width is reliably large enough, or you accept truncation).

### See also

- [SAP Fiori Label design guideline](https://experience.sap.com/fiori-design-web/label/) — visual patterns and accessibility guidance
- [UI5 Label web component reference](https://ui5.github.io/webcomponents/components/Label/) — full underlying API

# MultiComboBox

`MultiComboBox` is the SAP Fiori multi-select autocomplete input, re-exported from `@ui5/webcomponents-react/MultiComboBox` as the canonical Reltio entry point. Use it when the user has to pick **several** options from a long list — multiple source systems, multiple match-rule tags, multiple tenant roles — with filter-as-you-type and selected values rendered as removable tokens.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/MultiComboBox`. The Reltio layer adds curation (this is the endorsed multi-select autocomplete surface), pinned versioning, and Reltio-specific guidance.

### MultiComboBox vs. ComboBox vs. MultiInput

- **`MultiComboBox`** — Multi-select from a canonical list. User filters and ticks options; selected values become tokens inside the field.
- **`ComboBox`** — Same look but **single** selection.
- **`MultiInput`** — Multiple free-text or token values where the list is open-ended (recipients, tags). No canonical option set.

### Items — `MultiComboBoxItem` + groups

Pass items as children. Selection state is bound to each item via `selected`:

```tsx
<MultiComboBox placeholder="Source systems">
  <MultiComboBoxItem text="SAP" selected />
  <MultiComboBoxItem text="Salesforce" selected />
  <MultiComboBoxItem text="Workday" />
</MultiComboBox>
```

Group with `MultiComboBoxItemGroup` so users can scan a long list by category.

### "Select All" — `showSelectAll`

Set `showSelectAll` to add a checkbox at the top of the dropdown that toggles every visible (post-filter) item. Useful for "include every source" workflows. The check state is tri-state — partial selection shows a dash.

### Filtering — `filter`

- **`StartsWithPerTerm` (default)** — The typed text matches the start of any word in the item.
- **`StartsWith`** — The typed text matches the start of the item only.
- **`Contains`** — The typed text appears anywhere in the item.
- **`None`** — No client-side filter; the parent decides which items to render (server-driven).

### Reading the selection

The full selection is exposed via the change event detail. Selected items are also reflected in each child item's `selected` prop (controlled or uncontrolled depending on how you wire it):

```tsx
<MultiComboBox
  onSelectionChange={(event) => {
    const selectedIds = event.detail.items.map((item) => item.text);
    persistSourcePriority(selectedIds);
  }}
/>
```

### Validation — `valueState`

Use `valueState` (`None`, `Information`, `Critical`, `Negative`, `Positive`) and pair with `valueStateMessage` slot for the explanation.

### See also

- [SAP Fiori MultiComboBox design guideline](https://experience.sap.com/fiori-design-web/multi-combobox/) — semantic guidance and visual patterns
- [UI5 MultiComboBox web component reference](https://ui5.github.io/webcomponents/components/MultiComboBox/) — full underlying API
- [ComboBox](?path=/docs/components-combobox--docs) — single-select variant
- [MultiInput](?path=/docs/components-multiinput--docs) — free-text multi-token variant

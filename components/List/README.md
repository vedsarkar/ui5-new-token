# List

`List` is the SAP Fiori vertical list surface, re-exported from `@ui5/webcomponents-react/List` as the canonical Reltio entry point. Use it for menus, option lists inside popovers, and any context where rows of items must be scannable and optionally selectable. Compose rows with `ListItem`, and wrap related rows in `ListItemGroup` for sectioned lists.

There is no Reltio wrapping or default override on `List` itself: the props, slots, and runtime behavior are exactly those of the underlying UI5 component. The Reltio layer adds curation (these are the endorsed list surfaces), pinned versioning, and Reltio-specific guidance.

### Basic list

```tsx
<List>
  <ListItem>Organizations</ListItem>
  <ListItem>Individuals</ListItem>
  <ListItem>Products</ListItem>
</List>
```

`ListItem` accepts an `icon` prop (import the icon's name from `@reltio/design/icons/sap/<kebab-name>` and pass the binding), a `description` prop for secondary text, an `additionalText` prop for right-aligned metadata, and arbitrary `children` for custom formatted content. See the [ListItem docs](?path=/docs/components-listitem--docs) for the full row API.

### Selection modes

By default `selectionMode` is `"None"` — rows are not selectable. Set it on `List` to enable row selection:

- `"Single"` — one item selected at a time; fires `onSelectionChange` with the new selection.
- `"SingleStart"` / `"SingleEnd"` — single pick with the selection indicator at the start or end of the row.
- `"Multiple"` — any number of items selected; fires `onSelectionChange` with the full selected set.
- `"Delete"` — shows a delete button per row; fires `onItemDelete`.

Mark the initially selected item with `selected` on `ListItem`. React to changes via `onSelectionChange` (e.detail.selectedItems) or `onItemClick` (e.detail.item) for navigation-style lists.

### Grouping

Wrap related items in `ListItemGroup` with a `headerText` prop. Groups are visual only — they do not affect selection or keyboard navigation.

```tsx
<List>
  <ListItemGroup headerText="Records">
    <ListItem icon="account">Organizations</ListItem>
    <ListItem icon="employee">Individuals</ListItem>
  </ListItemGroup>
  <ListItemGroup headerText="Configuration">
    <ListItem icon="settings">Settings</ListItem>
  </ListItemGroup>
</List>
```

### When to prefer List over Table

Use `List` when rows have a single primary concern (navigation, selection, command). Use `Table` when rows have multiple independent columns that users compare across rows (data grids, record lists with sortable attributes). `List` inside a `Popover` or `ResponsivePopover` is the standard pattern for dropdown menus and context menus in Reltio applications.

### See also

- [ListItem](?path=/docs/components-listitem--docs) — the single endorsed row entity and its customization API
- [SAP Fiori List design guideline](https://experience.sap.com/fiori-design-web/list/) — semantic guidance and visual patterns
- [UI5 List web component reference](https://ui5.github.io/webcomponents/components/List/) — full underlying API
- [Table](?path=/docs/components-table--docs) — multi-column data grid alternative
- [Select](?path=/docs/components-select--docs) — closed-list single-pick dropdown

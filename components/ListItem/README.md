# ListItem

`ListItem` is the single endorsed row entity for [`List`](?path=/docs/components-list--docs). It is backed by SAP Fiori `ListItemStandard` and exposed under the name `ListItem`.

This is a deliberate Reltio decision. UI5 ships two row components — `ListItemStandard` (typed props for the common text/icon/metadata layout) and `ListItemCustom` (an empty slot for arbitrary content). Reltio collapses that split into **one** obvious entity: you reach for `ListItem` every time and customise it through props and `children`, rather than choosing between two wrappers. `ListItemCustom` is intentionally not part of the endorsed surface. This mirrors how mainstream React libraries (MUI, Mantine) expose a single list-item primitive that is composed via its content, and removes the recurring "which list item do I use?" question.

### Customising a row

A row is shaped entirely through props — no wrapper choice required:

- `icon` — leading SAP icon. Import its name from `@reltio/design/icons/sap/<kebab-name>` (which registers it) and pass the binding, e.g. `import inboxIcon from "@reltio/design/icons/sap/inbox"` → `icon={inboxIcon}`. Use `iconEnd` to move it to the end.
- `description` — secondary text under the title.
- `additionalText` / `additionalTextState` — right-aligned metadata with an optional value state (`Positive`, `Critical`, `Information`, `Negative`).
- `type` — `Active` (default), `Inactive`, `Navigation` (chevron), or `Detail`.
- `selected` — initial selection state (the parent `List` drives the `selectionMode`).

```tsx
<ListItem icon="account" description="ada@example.com" additionalText="Admin">
  Ada Lovelace
</ListItem>
```

### Custom content via children

When a row needs formatting the props don't cover, pass `children`:

```tsx
<ListItem>
  <b>Acme</b> — San Francisco
</ListItem>
```

Children render as the row's formatted content. For the title to wrap rather than truncate, set `wrappingType="Normal"`. If a future layout genuinely cannot be expressed through props or children, the platform will extend `ListItem` rather than reintroduce a second item entity — raise it with the UI CoE.

### See also

- [List](?path=/docs/components-list--docs) — the container, selection modes, and grouping
- [SAP Fiori List design guideline](https://experience.sap.com/fiori-design-web/list/) — semantic guidance and visual patterns
- [UI5 ListItemStandard reference](https://ui5.github.io/webcomponents/components/ListItemStandard/) — full underlying API

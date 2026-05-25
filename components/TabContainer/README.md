# TabContainer

`TabContainer` is the SAP Fiori tab strip, re-exported from `@ui5/webcomponents-react/TabContainer` as the canonical Reltio entry point. Pair it with `Tab` (also re-exported from `@reltio/design/components`) to switch between sibling content panes that share the same viewport — task lists by status, entity profile sections, settings categories.

There is no Reltio wrapping around the underlying UI5 component: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/TabContainer`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Pairing with `Tab`

`Tab` is a slot child of `TabContainer`. Each `<Tab>` represents one selectable tab plus the content that appears when it is active. Children of `<Tab>` are the panel body.

```tsx
<TabContainer>
  <Tab text="Pending" additionalText="12" selected>
    {/* pending list */}
  </Tab>
  <Tab text="Failed" additionalText="3">
    {/* failed list */}
  </Tab>
</TabContainer>
```

### When to use Tabs vs SegmentedButton vs Select

- **TabContainer** — three or more sibling views that share the same screen real estate and each view is content-heavy (table, form, chart).
- **SegmentedButton** — two-to-five short options that change a small piece of state inline (filter, view-mode toggle, sort direction).
- **Select** — many options (≥5) where the user picks one and the rest collapse into a dropdown.

### Counters and icons

`additionalText` puts a numeric counter on the tab label — use it for status counts (12 pending, 3 failed) but keep the number short; long counters wrap the tab. `icon` adds a leading SAP Fiori icon — pick the icon set from `@ui5/webcomponents-icons` and load it as a side-effect import in the file that mounts the TabContainer.

### Accessibility

`TabContainer` implements the WAI-ARIA tabs pattern: arrow keys move between tabs, `Home`/`End` jump to first/last, `Tab` moves focus to the active panel. Always pair the tab label with content inside `<Tab>` — empty panels confuse screen readers.

### See also

- [SAP Fiori Tab Container guideline](https://experience.sap.com/fiori-design-web/tab-container/)
- [UI5 TabContainer reference](https://ui5.github.io/webcomponents/components/main/TabContainer/)

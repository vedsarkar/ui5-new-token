# Avatar

`Avatar` is the SAP Fiori avatar element, re-exported from `@ui5/webcomponents-react/Avatar` as the canonical Reltio entry point. Use it to represent a person, an organization, a tenant, or any other identifiable entity in Reltio MDM screens — the user menu in the page header, the assignee column in a table, the entity-card thumbnail.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Avatar`. The Reltio layer adds curation (this is the endorsed surface for product apps), pinned versioning, and richer documentation (the stories on this page cover Reltio MDM usage patterns).

### When to pass `initials` vs `icon` vs `image`

- **`initials`** — the default presentation for a known person or organization. SAP recommends 1-3 uppercase letters (`"JD"`, `"AB"`, `"REL"`).
- **`icon`** — for entity types that don't have human initials (an MDM relationship, a process step, a system actor). Pass any [SAP Fiori icon](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html) name.
- **`image`** — for actual user/organization profile pictures. Pass via `<img>` child with `slot` rules; falls back to initials/icon when missing.

When all three are absent, the avatar renders the default placeholder icon. Always provide at least `initials` or `icon` for unknown-image fallback so the avatar stays meaningful.

### Color scheme — semantic, not decorative

`colorScheme` accepts `Accent1`-`Accent10` (and `Placeholder`/`Random`). For Reltio MDM:

- Use a **stable** color per entity type or per record so an entity always renders with the same color across sessions. Hash the entity ID into 1-10 to derive the accent index — never pick randomly per render.
- Don't use color to encode status or severity (use `MessageStrip` for that). Avatar color is identity, not state.

### Sizes

| `size` | Usage |
|---|---|
| `XS` | Inline reference inside a sentence or small badge. |
| `S` | Compact list rows, table cell. |
| `M` (default) | Standard list / card row. |
| `L` | Page header, entity profile summary. |
| `XL` | Hero / landing screens. |

### Accessibility

If the avatar is not purely decorative, set `accessibleName` to the represented entity's full name (not the initials). Screen readers will announce the entity, not the abbreviation.

```tsx
<Avatar initials="JD" accessibleName="Jane Doe — Account Manager" />
```

For purely decorative avatars (e.g. listed alongside a textual entity name), omit `accessibleName` so the screen reader doesn't repeat the same label twice.

### See also

- [SAP Fiori Avatar design guideline](https://experience.sap.com/fiori-design-web/avatar/) — semantic guidance and visual patterns
- [UI5 Avatar web component reference](https://ui5.github.io/webcomponents/components/Avatar/) — full underlying API

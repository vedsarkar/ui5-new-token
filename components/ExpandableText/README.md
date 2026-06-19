# ExpandableText

`ExpandableText` is the SAP Fiori expandable text element, re-exported from `@ui5/webcomponents-react/ExpandableText` as the canonical Reltio entry point. Use it for long, free-form text that should be collapsed by default with a "Show More" affordance — entity descriptions, notes, audit comments, long attribute values — so the surface stays compact while the full text remains one click away.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/ExpandableText`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Overflow behavior

- **`maxCharacters`** — the collapsed length (default 100). Beyond it, a "Show More" toggle appears.
- **`overflowMode`** — `InPlace` (default) expands the text inline; `Popover` reveals the full text in a popover, keeping the surrounding layout fixed. Use `Popover` inside dense rows (tables, cards) where inline expansion would shift content.

### Empty values

Set `emptyIndicatorMode="On"` to render a placeholder dash when the text is empty, keeping data-driven layouts aligned.

### See also

- [UI5 ExpandableText reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/data-display-expandabletext--docs) — full underlying API
- `Text` — for short body copy that does not need truncation

# Tag

`Tag` is the SAP Fiori tag element, re-exported from `@ui5/webcomponents-react/Tag` as the canonical Reltio entry point. Use it for short, scannable labels that classify or qualify a record — a data-quality state, a lifecycle stage, an active filter chip, a category. It renders a compact pill with an optional state icon, sized to sit inline within table cells, cards, and headers.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Tag`. The Reltio layer adds curation (this is the endorsed tag surface), pinned versioning, and richer documentation.

### Semantic `design` vs decorative `colorScheme`

`Tag` has two coloring inputs — pick one intentionally:

- **`design`** — semantic state: `Neutral` (default), `Information`, `Positive`, `Critical`, `Negative`. Use this when the tag communicates status or severity (validation passed, review pending, match rejected). It also drives the built-in state icon, so the meaning is not conveyed by color alone.
- **`colorScheme`** — a decorative palette index (`"1"`–`"10"`) with no semantic meaning. Use it only to visually distinguish categories that carry no status (e.g. data-source tags), and keep the mapping stable per category across sessions.

Do not use `design` states for non-status categorization, and do not use `colorScheme` to imply success/error — that meaning must come from `design`.

### Interactive tags

Set `interactive` when the tag is clickable — typically a removable filter chip or a tag that drills into a filtered view. Non-interactive tags are read-only classifiers and must not carry click handlers.

### Sizes

`size="S"` (default) suits inline use in tables and dense rows; `size="L"` is for prominent placement in headers or summary cards.

### See also

- [SAP Fiori Tag design guideline](https://experience.sap.com/fiori-design-web/object-status/) — semantic state guidance
- [UI5 Tag web component reference](https://ui5.github.io/webcomponents/components/Tag/) — full underlying API
- `ObjectStatus` — for text-with-state status that isn't a pill · `MessageStrip` — for inline messages

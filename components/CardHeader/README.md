# CardHeader

`CardHeader` is the SAP Fiori card header, re-exported from `@ui5/webcomponents-react/CardHeader` as the canonical Reltio entry point. It is the entity you pass to a `Card`'s `header` slot: a title, optional subtitle, a counter/status (`additionalText`), an avatar, and an optional action. Keep it for the card's identifying header row; put the body in the card's children.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/CardHeader`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Props and slots

- **`titleText`** — the primary heading; required for a meaningful header.
- **`subtitleText`** — secondary line (entity type, owner, timestamp).
- **`additionalText`** — a trailing counter or short status (e.g. item count).
- **`avatar`** slot — an `Avatar` representing the entity.
- **`action`** slot — a trailing control (e.g. a `Button`).
- **`interactive`** — makes the whole header focusable/clickable; pair with `onClick` when the header navigates into the entity.

### See also

- [UI5 CardHeader reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-card--docs) — full underlying API
- `Card` — the container · `Avatar` — for the avatar slot

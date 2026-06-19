# Timeline

`Timeline` is the SAP Fiori timeline, re-exported from `@ui5/webcomponents-react/Timeline` as the canonical Reltio entry point. Use it to show a chronological sequence of events for an entity or process — record history, audit trail, lifecycle milestones, activity feed. Compose entries from `TimelineItem`, optionally grouped with `TimelineGroupItem`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/Timeline`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`TimelineItem`** — one event: `titleText`, `subtitleText`, `icon`, `name` (actor), `state` for semantic coloring, and children for the body.
- **`TimelineGroupItem`** — groups items under a heading (e.g. by month), collapsible.
- **`layout`** — `Vertical` (default) or `Horizontal`.
- **`growing`** — load-more behavior for long histories.

### See also

- [UI5 Timeline reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/layouts-floorplans-timeline--docs) — full underlying API
- `NotificationList` — for actionable notifications rather than a history log

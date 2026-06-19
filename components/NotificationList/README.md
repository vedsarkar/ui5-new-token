# NotificationList

`NotificationList` is the SAP Fiori notification list, re-exported from `@ui5/webcomponents-react/NotificationList` as the canonical Reltio entry point. Use it to present actionable notifications — match candidates, validation failures, job completions, review requests — with read/unread state, importance, and inline actions. Compose entries from `NotificationListItem`, optionally grouped with `NotificationListGroupItem`.

There is no Reltio wrapping or default override: the props, slots, and runtime behavior are exactly those of `@ui5/webcomponents-react/NotificationList`. The Reltio layer adds curation, pinned versioning, and richer documentation.

### Composition

- **`NotificationListItem`** — one notification: `titleText`, body children, `state` for semantic coloring, `importance` (`High` raises prominence), and `read` to mark as seen.
- **`NotificationListGroupItem`** — a collapsible group of items under a heading.
- Handle `onItemClick`, `onItemClose`, and `onItemToggle` on the list.

### When to use `NotificationList` vs `Timeline`

- **`NotificationList`** — actionable, dismissible notifications the user triages.
- **`Timeline`** — a read-only chronological history of events.

### See also

- [UI5 NotificationList reference](https://ui5.github.io/webcomponents-react/v2/?path=/docs/data-display-notificationlistitem--docs) — full underlying API
- `MessageStrip` — for a single inline message · `Timeline` — for history logs

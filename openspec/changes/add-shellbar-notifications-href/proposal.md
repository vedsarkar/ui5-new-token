## Why

Every Reltio application surfaces a notifications icon in the top header that opens an external notifications page (`https://<env>.reltio.com/notifications` or similar). Today each app wires the UI5 `showNotifications` flag + `onNotificationsClick` handler + `window.open(href, "_blank")` boilerplate by hand, and the resulting tab-open semantics drift between apps (sometimes `noopener`, sometimes a hard navigation, sometimes the URL is computed inside the handler instead of declaratively). We do not yet have an unread-count API, so the icon is always shown without a badge.

This proposal collapses the boilerplate to a single declarative prop on `ShellBar` and locks the tab-open semantics in one place.

## What Changes

- Add a `notificationsHref?: string` prop to `ShellBar`. When set to a non-empty string, the wrapper internally enables the UI5 notifications icon (`showNotifications`) and wires the click handler to open the URL in a new tab via `window.open(href, "_blank", "noopener,noreferrer")`.
- The badge is intentionally never rendered through this helper — `notificationsCount` is NOT derived from `notificationsHref`. When the unread-count API ships, a separate change will add the badge wiring.
- The existing UI5 props (`showNotifications`, `onNotificationsClick`, `notificationsCount`) remain available as direct pass-through and, when supplied, override the helper. Consumers that need custom click behavior (in-app overlay, analytics, prevent-default routing) bypass the helper by passing `onNotificationsClick` explicitly.
- Document the helper in the ShellBar `README.md` and add a `WithNotificationsHref` story.

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `shell-bar-component`: gains the `notificationsHref` helper prop.

## Impact

- `components/ShellBar/ShellBar.types.ts` — add `notificationsHref?: string` to `ShellBarProps`.
- `components/ShellBar/ShellBar.tsx` — derive `showNotifications` and `onNotificationsClick` from `notificationsHref` when not explicitly supplied.
- `components/ShellBar/README.md` — document the helper and the override precedence.
- `components/ShellBar/ShellBar.stories.tsx` — add a `WithNotificationsHref` story.
- One changeset entry — **minor** bump of `@reltio/design` (additive prop).
- Apps that currently roll their own `onNotificationsClick={() => window.open(...)}` can collapse to `notificationsHref="..."` in follow-up cleanup PRs (out of scope here).

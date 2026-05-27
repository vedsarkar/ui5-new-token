## Context

`ShellBar` already wraps `@ui5/webcomponents-react/ShellBar` and pipes its UI5 props through unchanged. UI5 exposes three primitives for the notifications cluster:

- `showNotifications: boolean` — toggles the bell icon
- `notificationsCount?: string` — renders the red badge with a number
- `onNotificationsClick: (event) => void` — click handler

Every Reltio app currently spells these out by hand and the resulting tab-open behavior is inconsistent: some apps use `<a href target="_blank">` mounted inside the slot, some use `window.open(href, "_blank")` with no `noopener`, some lazily compute the URL inside the handler.

This is the first of six `ShellBar`-related changes. The other five (`add-shellbar-app-selector-slot`, `add-navigation-drawer`, `add-tenant-selector`, `add-customer-selector`, `add-user-menu`) add slot props for Reltio sub-components; this one adds a plain helper prop.

## Goals / Non-Goals

**Goals:**

- Single declarative prop (`notificationsHref="..."`) replaces the three-line UI5 boilerplate.
- Tab-open semantics are normalized (`_blank` + `noopener,noreferrer`) in one place.
- No behavior change for consumers that already pass `showNotifications` / `onNotificationsClick` / `notificationsCount` explicitly — the helper is purely additive.

**Non-Goals:**

- Rendering an unread-count badge. The product does not yet expose a counts API; when it does, a separate change will add the badge wiring.
- Generic "open in new tab" abstraction. The helper is specific to the notifications icon; other slots use their own components.
- Validating `notificationsHref` is a well-formed URL. The string is passed through to `window.open` verbatim — typo'd URLs will fail at click time as they do today.

## Decisions

### Decision 1 — Helper precedence

When `notificationsHref` is supplied, the wrapper derives:

- `showNotifications = true` (unless the consumer also passed `showNotifications={false}` — explicit false wins)
- `onNotificationsClick = () => window.open(notificationsHref, "_blank", "noopener,noreferrer")` (unless the consumer also passed `onNotificationsClick` — explicit handler wins)

`notificationsCount` is NEVER derived from `notificationsHref`. If the consumer wants the badge they pass `notificationsCount` directly.

**Why:** explicit consumer props always win. The helper is sugar, not a takeover.

**Alternative considered:** make the helper mutually exclusive with the raw UI5 props (TypeScript union). Rejected — too aggressive for a tiny convenience prop, and breaks the "every UI5 prop passes through unchanged" contract documented in `add-shell-bar`.

### Decision 2 — Tab-open semantics

Always `window.open(href, "_blank", "noopener,noreferrer")`. The features string is fixed.

**Why:** `noopener,noreferrer` is the modern safe default (avoids reverse-tabnabbing) and matches what the platform already does for `AppSelector` links. Apps that want different semantics pass their own `onNotificationsClick`.

**Alternative considered:** render an `<a href target="_blank" rel="noopener noreferrer">` inside the slot. Rejected — UI5's bell icon is not an anchor and there is no clean slot to inject one without re-implementing the icon.

### Decision 3 — Empty string treated as absent

A `notificationsHref=""` (empty string) is treated as if the prop was not supplied: the helper does nothing, `showNotifications` defaults to whatever the consumer passed or UI5's `false` default. This matches the existing `AppSelector.label === undefined` convention and avoids breaking apps that pass an empty fallback during loading.

## Risks / Trade-offs

- [Risk] A consumer passing `notificationsHref="..."` AND `onNotificationsClick={...}` may be surprised that their handler wins. → Mitigation: README documents the precedence order explicitly. The whole point of the override path is to let consumers add analytics or routing on top — silent override is the right default.
- [Risk] Browsers can block `window.open` if not invoked from a direct user-gesture context. → Mitigation: the call site IS a click handler, so this is fine. Documented in the README as a "do not call notificationsHref logic from async code" note.
- [Trade-off] We don't validate that `notificationsHref` is `https://`. A relative path like `/notifications` will resolve against the current document origin in `window.open` — that may or may not be what the consumer wants. We document this and rely on the consumer's discipline. Adding `URL` parsing for validation would be over-engineering for a one-line prop.

## Migration Plan

None — purely additive. Existing apps continue to work. Follow-up cleanup PRs (in each app repo) can collapse the boilerplate:

```diff
- <ShellBar
-   showNotifications
-   onNotificationsClick={() => window.open(notificationsUrl, "_blank")}
- />
+ <ShellBar notificationsHref={notificationsUrl} />
```

## Open Questions

None — the helper is intentionally small and well-defined.

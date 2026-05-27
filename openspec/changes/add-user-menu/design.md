## Context

UI5 ships `UserMenu` as a separate component (`@ui5/webcomponents-fiori`) that renders as a popover anchored to an opener element via the `opener="<id>"` attribute. Inside the popover, UI5 exposes slots for the account header (`UserMenuAccount`), menu items (`UserMenuItem`), and a Sign Out footer button. The avatar trigger goes into UI5 `ShellBar`'s `profile` slot.

So the canonical Reltio user-menu rendering needs three React elements working together:

1. The `<Avatar>` trigger in the ShellBar profile slot.
2. The UI5 `<UserMenu opener="...">` popover bound to the avatar's id.
3. A separate `<Dialog>` for the About modal opened from inside the popover.

The trigger and the two surfaces live in different parts of the DOM (trigger inside the ShellBar host, popover and dialog as direct children of `<body>` via UI5's portal mounting). The Reltio component owns the wiring between all three.

This is one of six `ShellBar`-related changes. The decision was made during exploration to keep `UserMenu` self-contained (no provider compound pattern).

## Goals / Non-Goals

**Goals:**

- A single self-contained component that bundles avatar + UserMenu popover + About modal.
- Required user info (`name`, `email`) and About info (`title`, `copyright`, `version`, `legalLinks`).
- Sign Out is a callback; auth flow is the consumer's concern.
- Avatar mounts into UI5 ShellBar `profile` slot via `slot=` attribute.
- Popover and About-modal open/close are internal state (consistent with `TenantSelector`/`CustomerSelector`/`AppSelector` precedent).

**Non-Goals:**

- Account switching. The screenshot shows multiple accounts; v1 supports one user per `UserMenu` instance.
- Product-specific action slot. The UI5 reference screenshot shows a "Product-specific account action" entry; we do not surface this in v1 — apps that need it bypass the slot prop and compose their own. Adding it later is additive.
- Settings link. Same reasoning.
- Custom popover items beyond About + Sign Out. v1 ships exactly these two; consumer-defined items can be added in a later additive change.
- i18n.
- Avatar size customization. The avatar uses the canonical ShellBar profile size (UI5's profile slot enforces this).

## Decisions

### Decision 1 — Self-contained, no provider

`UserMenu` renders the avatar, popover, and About modal as a single Fragment. The consumer passes the whole `<UserMenu>` element via `ShellBar`'s `userMenu` slot prop. The avatar inside carries `slot="profile"`; UI5's slot routing mounts it in the canonical profile position when the Fragment is consumed by the ShellBar.

**Why:** explicit user decision during exploration ("no providers, slot via props").

### Decision 2 — Internal open/close state for popover AND modal

Both the user-menu popover (`open`) AND the About modal (`aboutOpen`) are internal `useState` flags. The component does NOT expose `open`/`onOpenChange` for either surface.

**Why:** these are ephemeral interaction states reflexively driven by user clicks (avatar click → popover; About item click → modal). Apps don't open the user menu programmatically — they reference auth state directly. The internal-state choice matches `AppSelector`, `TenantSelector`, and `CustomerSelector` precedents.

### Decision 3 — Required `about` props

The `about` object (`title`, `copyright`, `version`, `legalLinks?`) is a required prop. There is no opt-out — the menu always shows the About item.

**Why:** every Reltio app has an About modal today. Making the About metadata required surfaces the legal/compliance content the platform expects (copyright notice, version stamping for support, legal links per region). Apps that genuinely don't want an About modal (rare) can pass minimal placeholders or — in a future change — opt out via a `showAbout={false}` prop.

**Alternative considered:** make `about` optional and hide the About item when omitted. Rejected — the current Console + admin-tools UX has About in every menu; making it required is the right default to lock in the canonical layout.

### Decision 4 — UI5 `UserMenu` + standalone `Dialog` for About

The user-menu popover is the UI5 `UserMenu` component (`@ui5/webcomponents-fiori`). The About modal is a separate UI5 `Dialog` rendered by `UserMenu` and opened from inside the popover's "About" menu item handler. The Dialog is NOT a child slot of `UserMenu`; it's a sibling in the rendered DOM, just like in the screenshot examples.

**Why:** matches UI5's intended composition. The `UserMenu` component is purposely focused on the user-account popover; the About modal is a separate Dialog overlay.

### Decision 5 — Avatar variant and colorScheme

- If `avatarUrl` is provided: avatar renders the image.
- If `initials` is provided: avatar uses `colorScheme="Accent4"` (or the value picked during implementation to match the Console default) with the initials.
- If neither is provided: the component derives initials from `user.name` (first letter of each space-separated word, up to two characters).

**Why:** zero-config for the common case (name → initials); graceful upgrade to a real photo when available.

### Decision 6 — `onSignOut` does NOT redirect

`onSignOut` is a fire-and-forget callback. The component closes the popover and calls the callback synchronously. The component does NOT itself navigate, set cookies, call `@reltio/auth`, or do anything beyond invoking the callback.

**Why:** auth flow varies per app (some use `@reltio/auth`, some have legacy session cookies, some redirect to a hosted logout page). Wiring auth is the consumer's job.

### Decision 7 — About modal content layout

The About modal body renders, in order:

1. Title (modal heading)
2. Copyright (small paragraph)
3. Version (labelled value, e.g. `"Version: 2.21.3"`)
4. Legal links (rendered as a horizontal list of anchors with `target="_blank" rel="noopener noreferrer"`)

The footer has a single `Close` button. ESC and backdrop click also close the modal.

**Why:** matches the typical About-modal pattern (terse, informational, no interaction beyond Close). Apps that need richer content (release notes, support contacts) skip the slot prop and roll their own.

## Risks / Trade-offs

- [Risk] UI5 React's slot-attribute routing may NOT route the avatar to `profile` when the whole `<UserMenu>` element is supplied via `ShellBar`'s `userMenu` slot. → Mitigation: smoke-test during implementation. The same risk applies to `NavigationDrawer`'s `startButton` slot — both share the resolution path (verify once, fall back to `cloneElement` inside ShellBar if needed).
- [Risk] Two `UserMenu` instances mounted at once (unlikely but possible in stories) would create two popovers anchored to two avatars. → Acceptable: they don't share an opener id, so they coexist; React's `useId` ensures unique opener ids.
- [Trade-off] Required `about` props force every consumer to think about copyright/version even if they don't display them. → Accepted: matches the legal/compliance default. Easier to relax later (make `about` optional) than to tighten.
- [Trade-off] No account-switcher in v1. → Accepted: not on the user's list. Additive in the future.

## Migration Plan

None — purely additive. Existing apps roll their own UserMenu compositions and migrate at their own pace.

## Open Questions

- What `colorScheme` does the default avatar use? Pick during implementation to match the existing Console/admin-tools default; document in the README.
- Should the About modal render the `version` next to a logo (Reltio brand mark) or as plain text? v1: plain text, keep it minimal. Logo can be added later.
- What `accessibleName` does the avatar trigger button carry? Default: the user's name. Document in the README.

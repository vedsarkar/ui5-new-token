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
- Required user info (`name`, `email`) and the application `version`. The About-modal title, copyright, and legal links are fixed inside the component (locked Reltio branding) and are NOT part of the public API — `version` is the only About field a consumer controls.
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

### Decision 3 — Locked About branding; expose only `version`

The only consumer-controlled About field is `version: string` (required). The About-modal title (`"About"`), the Reltio copyright paragraph, and the legal links (Privacy Policy, Terms of Use) are constants inside the component — there are no `title`/`copyright`/`legalLinks` props. There is no opt-out; the menu always shows the About item.

**Why:** the About modal carries Reltio's brand and legal references (copyright notice, Privacy Policy, Terms of Use). Applications must not be able to alter or omit them — letting each app pass its own copyright/legal text risks inconsistent or non-compliant legal copy across the product suite. Locking them inside the component guarantees one canonical, compliant About surface everywhere, while `version` (the one genuinely app-specific value, needed for support) stays consumer-supplied.

**Alternative considered:** an `about` object prop (`title`, `copyright`, `version`, `legalLinks?`) letting consumers supply all fields. Rejected — it lets an app override Reltio branding and legal references, which is exactly what must be centrally controlled. If a real need for richer per-app About content emerges, it can be added additively (e.g. a `children` slot below the fixed legal block) without unlocking the branding.

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

1. The fixed heading `"About"` (modal heading).
2. The fixed Reltio copyright paragraph (small paragraph).
3. The consumer-supplied `version` as a labelled value, e.g. `"Version: 2.21.3"` — the only variable line.
4. The fixed legal links (Privacy Policy, Terms of Use) rendered as a horizontal list of anchors with `target="_blank" rel="noopener noreferrer"`.

The footer has a single `Close` button. ESC and backdrop click also close the modal.

**Why:** matches the typical About-modal pattern (terse, informational, no interaction beyond Close). Everything except `version` is fixed inside the component per Decision 3 (locked branding). Apps that need richer content (release notes, support contacts) skip the slot prop and roll their own.

## Risks / Trade-offs

- [Risk] UI5 React's slot-attribute routing may NOT route the avatar to `profile` when the whole `<UserMenu>` element is supplied via `ShellBar`'s `userMenu` slot. → Mitigation: smoke-test during implementation. The same risk applies to other element-valued ShellBar slots (e.g. `sideNavigation`) — both share the resolution path (verify once, fall back to `cloneElement` inside ShellBar if needed).
- [Risk] Two `UserMenu` instances mounted at once (unlikely but possible in stories) would create two popovers anchored to two avatars. → Acceptable: they don't share an opener id, so they coexist; React's `useId` ensures unique opener ids.
- [Trade-off] Locked About branding (only `version` is configurable) means an app cannot customise the copyright text or legal links even when it has a legitimate reason. → Accepted: a single, centrally-controlled legal/branding surface across the product suite outweighs per-app flexibility. Easier to relax later (open a `children` slot) than to claw back an over-permissive `about` object.
- [Trade-off] No account-switcher in v1. → Accepted: not on the user's list. Additive in the future.

## Migration Plan

None — purely additive. Existing apps roll their own UserMenu compositions and migrate at their own pace.

## Open Questions

- What `colorScheme` does the default avatar use? Pick during implementation to match the existing Console/admin-tools default; document in the README.
- Should the About modal render the `version` next to a logo (Reltio brand mark) or as plain text? v1: plain text, keep it minimal. Logo can be added later.
- What `accessibleName` does the avatar trigger button carry? Default: the user's name. Document in the README.

## Why

Every Reltio application renders a user avatar in the top-right of the header that, when clicked, opens a popover with the user's name + email, a link to an About modal (copyright + version + legal links), and a Sign Out button. Today each app rolls its own composition on top of UI5 `Avatar` + UI5 `UserMenu` + a custom About dialog, and the resulting visual rhythm, popover placement, and About-modal contents drift between apps.

This proposal ships a single endorsed Reltio `UserMenu` business component that bundles the trigger avatar + the UI5 user-menu popover + the About modal, and surfaces it as a typed slot on `ShellBar`.

## What Changes

- Add a new `UserMenu` Reltio business component under `components/UserMenu/`. The component is self-contained — it renders the avatar trigger (with `slot="profile"` for UI5 routing), the UI5 `UserMenu` popover anchored to the avatar, and the About modal opened from inside the popover.
- API:
  - `user: { name: string; email: string; initials?: string; avatarUrl?: string }` — required.
  - `about: { title: string; copyright: string; version: string; legalLinks?: { label: string; href: string }[] }` — required. Drives the About modal content. The modal title is `title` (typically `"About Console"` or `"About <App Name>"`); the body shows `copyright`, `version`, and the list of `legalLinks` rendered as anchors.
  - `onSignOut: () => void` — required callback fired when the user clicks the Sign Out button. The component does NOT itself redirect or clear cookies — the consumer's app-level auth flow handles that.
- Behavior:
  - Avatar: rendered using UI5 `Avatar` with `initials` (or `avatarUrl` if provided) and the canonical `colorScheme="Accent4"` (or similar — picked to match the existing Console default in stories).
  - User-menu popover: opens on avatar click; shows the user's name and email in the header area; shows a single primary action "About <appName>" (label derived from `about.title`) and the secondary "Sign Out" footer button. Closes on ESC, backdrop click, or after a menu item activation.
  - About modal: opens when the user clicks the "About" item in the popover. Renders `title` as the modal heading, `copyright` as a small body paragraph, `version` as a labelled value, and `legalLinks` as a list of inline anchors that open in a new tab. Closes on ESC, backdrop click, or the `Close` footer button.
  - Sign Out: clicking the popover's Sign Out button calls `onSignOut()` and closes the popover; the component does NOT clear the page or redirect by itself.
- The component owns the popover open/close state AND the About modal open/close state internally — there are NO `open`/`onOpenChange` props for either surface. (Same rationale as `TenantSelector` and `CustomerSelector`: ephemeral interaction state.)
- Add a corresponding `userMenu?: ReactElement` slot prop to `ShellBar`. When supplied, `ShellBar` passes the slot element through to the UI5 ShellBar `profile` slot. The avatar inside `<UserMenu>` carries the `slot="profile"` attribute so UI5's slot routing mounts it in the canonical profile position.
- Export the new component and its types from `@reltio/design/components`.

## Capabilities

### New Capabilities

- `user-menu`: Reltio user-menu business component (avatar trigger + UI5 user-menu popover + About modal) with required `user`, `about`, and `onSignOut` props.

### Modified Capabilities

- `shell-bar-component`: gains a `userMenu?: ReactElement` slot prop that hosts the new component in the UI5 ShellBar `profile` slot.

## Impact

- New directory `components/UserMenu/` with the canonical 6-file Reltio component layout.
- `components/ShellBar/ShellBar.types.ts` — add `userMenu?: ReactElement`.
- `components/ShellBar/ShellBar.tsx` — pipe the slot element through; route to UI5 `profile` via the avatar's `slot=` attribute.
- `components/ShellBar/README.md` — document the slot.
- `components/index.ts` — re-export `UserMenu` and its types.
- One changeset entry — **minor** bump of `@reltio/design` (additive component + additive slot prop).

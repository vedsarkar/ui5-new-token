---
"@reltio/design": major
---

**`<ShellBar>`**: added native product-switch integration driven by the new `apps` / `env` / `tenant` props; several existing composition props now route into UI5's protected native slots instead of the default children cluster.

**Behaviour changes (visual regressions for consumers who rely on the previous DOM shape)**

- `<ShellBar>` now maps `userMenu` onto UI5's native `profile` slot (protected, never in overflow) instead of rendering `<UserMenu>` as a default-children slot child. The avatar moves to the far-right actions cluster; UI5 wraps profile-slot content in its own `<Button data-profile-btn>` with a built-in click handler, so `<ShellBar>` also clones the supplied `<UserMenu>` into controlled mode (see below) — the inner avatar becomes a static picture, keyboard/pointer activation flows through UI5's wrapping button, and popover open/close is owned by `<ShellBar>`.
- `<ShellBar>` now maps `notificationsUrl` onto UI5's native notifications button (`showNotifications` + `notifications-click`) instead of a custom `<Button>` in the default children cluster.
- `<AppSelector>`'s trigger changed from a UI5 `<Button>` to a `<ShellBarItem>`. That is the shape UI5 expects in its `DefaultSlot<ShellBarItem>` and the correct home for `AppSelector` when routed through `<ShellBar>`. Consequences per UI5's `ShellBarItem` template: the item is icon-only in the main bar, and the `label` prop now surfaces as the button's accessible name, its hover tooltip, and its label inside the "…" overflow menu — it is no longer rendered as visible text next to the icon. The `AppSelectorProps` type explicitly `Omit`s `icon` / `text` / `id` / `onClick` (previously the wrapper silently overwrote them).

Consumers do not need to touch call-sites, but any screenshot / DOM-snapshot / precise-selector tests will need to be re-baselined.

**Additions**

- New `apps` / `env` / `tenant` props on `<ShellBar>` enable UI5's native product-switch button (grid icon) in the right actions cluster and mount the app-catalog popover anchored to it. The button is protected — UI5 never places it into the overflow group — so the app switcher stays reachable at any viewport width.
- `<UserMenu>`: added controlled-mode props `open?: boolean` and `onOpenChange?: (open: boolean) => void`. When `open` is provided, the trigger avatar renders as a non-interactive picture and popover open/close is driven by the consumer through `onOpenChange`. Omitting the props keeps the current uncontrolled behavior (interactive avatar, internal state). No changes required for standalone consumers.
- `<SideNavigation>`: added `defaultCollapsed?: boolean` prop. When paired with `collapsable`, the menu starts collapsed on mount and the built-in toggle owns the state from that point on. Ignored when `collapsable` is `false`.

**Deprecated**

- `appSelector` prop on `<ShellBar>`. It is redundant — the same "grid icon in the actions cluster" affordance can be produced either by passing a `<ShellBarItem>` directly as a child of `<ShellBar>` (as the app-template `AppShell` already does), or by using the new `apps` / `env` / `tenant` props for a fully managed product-switch button + app-catalog popover. The legacy path keeps working for backwards compatibility and is scheduled for removal in a future major.

**RP-194777 (overflow-loop bug) — scope of the fix**: the fix reaches consumers only on the new API path. To preserve the current visual order (avatar to the left of the app selector), the deprecated `appSelector` branch keeps `<UserMenu>` in UI5's default children slot next to the app selector. UI5's default slot is typed `DefaultSlot<ShellBarItem>` and its overflow algorithm targets each child via a `data-ui5-stable` selector; `<ui5-avatar>` is not a `ShellBarItem` and does not carry `stableDomRef`, so the overflow loop still fires on that path at narrow viewports. Consumers on `appSelector` need to migrate to `apps` / `env` / `tenant` to receive the fix — the new path routes `userMenu` into UI5's protected `profile` slot and leaves the default children slot free of non-`ShellBarItem` elements.

**Migration**

```tsx
// Before
<ShellBar
  appSelector={<AppSelector apps={apps} env={env} tenant={tenant} />}
  userMenu={<UserMenu ... />}
  notificationsUrl="https://…/notifications"
/>

// After
<ShellBar
  apps={apps}
  env={env}
  tenant={tenant}
  userMenu={<UserMenu ... />}
  notificationsUrl="https://…/notifications"
/>
```

Standalone `<AppSelector>` (with its own trigger + popover) remains available. Its trigger is now a `<ShellBarItem>` instead of a `<Button>` — see the behaviour-change bullet above for what changes visually.

**Wrapping `<UserMenu>`**: `<ShellBar>` clones the supplied `userMenu` element with `open` and `onOpenChange` props in the profile-slot path so the inner avatar can render non-interactive. If you pass a wrapper (e.g. `<AppUserMenu ...>`) instead of `<UserMenu>` directly, that wrapper **must accept and forward `open` and `onOpenChange` down to the underlying `<UserMenu>`** — otherwise `<UserMenu>` stays uncontrolled, the avatar keeps `mode="Interactive"`, and it ends up nested inside UI5's `<Button data-profile-btn>` (dual focus, two accessible names, dead keyboard). The prop type surfaces the requirement (`ReactElement<Pick<UserMenuProps, "open" | "onOpenChange">>`), but TypeScript's `React.JSX.Element` is `ReactElement<any, any>`, so the compile-time check is documentation-in-hover rather than a hard error — forwarding is your responsibility.

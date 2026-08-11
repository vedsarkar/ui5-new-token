# ShellBar

`ShellBar` is the Reltio top navigation chrome, built on top of `@ui5/webcomponents-react/ShellBar`. Every Reltio application mounts a `ShellBar` at the top of its layout — it carries the Reltio brand mark, the app title, tenant and application selectors, notifications, the user menu, and any application-specific actions. The wrapper exposes a curated subset of UI5 ShellBar props together with Reltio-specific composition props.

### Branding

When `logo` is omitted, the wrapper renders the default Reltio mark, which adapts to the active theme (`horizon-light` / `horizon-dark`) based on the closest `[data-theme]` ancestor — no JavaScript, pure CSS, and nested themes work. The `logo` prop is the recommended way to override it with a custom mark; theme behavior for a custom mark is then the consumer's responsibility.

> The experimental UI5 `branding` slot is intentionally not used — customize the brand mark through `logo`.

### Reltio slots

Beyond the curated UI5 pass-through props, the wrapper adds several convenience composition props:

- `sideNavigation` — hosts a UI5 `<SideNavigation>` (see "Side navigation slot" below).
- `tenantSelector` — hosts a `<TenantSelector>` in the left content area, composed with (not replacing) any `content` prop.
- `userMenu` — hosts a `<UserMenu>` in UI5's native `profile` slot at the far right (see "User menu slot" below).
- `notificationsUrl` — enables UI5's native notifications button (bell icon) that opens the given URL on click.
- `apps` / `env` / `tenant` — enables UI5's native product-switch button and renders the app-catalog popover anchored to it (see "Applications" below).
- `appSelector` — **deprecated** legacy hook for an `<AppSelector>` element; the same affordance is available either by passing a `<ShellBarItem>` directly as a `<ShellBar>` child, or via the new `apps` / `env` / `tenant` props.

Composition props are wired to UI5's protected slots — `profile`, notifications button, product-switch button, start button — which UI5 never places into the overflow group. Custom `children` still go into UI5's default slot for consumer-defined items.

### Title and subtitle

`primaryTitle` is the app name (one or two words: "Console", "Match", "Hub"). `secondaryTitle` is the contextual subtitle that changes with the active route ("Entity profile", "Search", "Tenant settings").

### Side navigation slot

`sideNavigation` hosts the application's global navigation. Pass a [`SideNavigation`](/?path=/docs/components-sidenavigation--docs) element built from `SideNavigationItem`, `SideNavigationGroup`, and `SideNavigationSubItem`.

`ShellBar` renders it as a **fully encapsulated left drawer**: a full-height panel that slides in from the left over a backdrop that dims the page, covering the full viewport. The trigger is automatic — whenever `sideNavigation` is supplied, `ShellBar` renders the hamburger toggle in the start area, owns the open/closed state, and wires the handlers. Clicking the hamburger or the backdrop, or pressing `Escape`, toggles the drawer. None of this is customizable — supply the menu, and the overlay behavior comes for free. When the hamburger is present, the bar also tightens its inline gutter from UI5's default `2rem` to `0.875rem 1rem` (the SAP "has-side-navigation" rhythm) so the trigger sits snug at the edge.

```tsx
<ShellBar
  primaryTitle="Console"
  sideNavigation={
    <SideNavigation accessibleName="Main navigation">
      <SideNavigationItem text="Home" icon="home" selected />
      <SideNavigationItem text="Entities" icon="business-objects-experience" />
      <SideNavigationItem text="Relationships" icon="org-chart" />
    </SideNavigation>
  }
/>;
```

### Tenant selector slot

`tenantSelector` accepts a `<TenantSelector>` element and renders it into the UI5
ShellBar `content` slot, so the picker sits in the content area just after the
branding/title (left cluster), not in the right actions cluster. It takes
the first position when a directly supplied `content` prop is also present.
Omit it to render only `content`.

```tsx
<ShellBar
  primaryTitle="Console"
  tenantSelector={
    <TenantSelector
      tenants={tenants}
      selectedTenantId={currentTenantId}
      onSelect={(tenant) => setCurrentTenantId(tenant.tenantId)}
    />
  }
/>
```

### User menu slot

`userMenu` accepts a [`UserMenu`](/?path=/docs/components-usermenu--docs) element and mounts it into UI5's native `profile` slot at the far right of the actions cluster. The profile slot is protected — UI5's overflow algorithm never hides it — so the avatar is always reachable. The menu popover and About modal are portaled to `document.body`, so they do not consume additional ShellBar layout slots. The wrapper intentionally does not expose the raw UI5 `profile` prop or `onProfileClick` handler.

```tsx
<ShellBar
  primaryTitle="Console"
  userMenu={
    <UserMenu
      user={{ username: "Jane Doe", email: "jane.doe@sap.com" }}
      appVersion="2.21.3"
      onSignOut={handleSignOut}
    />
  }
/>
```

### Applications

Pass `apps`, `env`, and `tenant` together to enable UI5's native product-switch button (grid icon) in the right actions cluster. `ShellBar` mounts an app-catalog popover anchored to the button and owns its open/close state — no separate consumer wiring is needed.

`env` and `tenant` are **required** whenever `apps` is set — each app's `uri` may contain `${environment}` and `${tenant}` template placeholders that are substituted at render time. When either value is missing, the placeholder resolves to the literal string `"undefined"`, which almost certainly breaks the target URL.

```tsx
<ShellBar
  primaryTitle="Console"
  apps={apps}
  env="us-prod"
  tenant="acme-corp"
/>
```

For a standalone app grid outside a ShellBar, use [`AppSelector`](/?path=/docs/components-appselector--docs) — it owns both the trigger and the popover.

> **Deprecated**: the `appSelector` prop still accepts an `<AppSelector>` element and renders it as a UI5 default-slot child alongside `userMenu`. It is redundant — the same visual can be produced either by passing a `<ShellBarItem>` directly as a `<ShellBar>` child, or by using `apps` / `env` / `tenant` for the fully managed product-switch integration. The path is kept for backwards compatibility and is scheduled for removal in the next major.
>
> **RP-194777 (overflow-loop) is not fixed on this path.** To preserve the current visual order (avatar left of the app selector), the deprecated branch keeps `<UserMenu>` in UI5's default children slot. `<ui5-avatar>` is not a `ShellBarItem` and lacks `stableDomRef`, so UI5's overflow algorithm still loops on it at narrow viewports. Migrate to `apps` / `env` / `tenant` to receive the fix — that path routes `userMenu` into UI5's protected `profile` slot and leaves the default children slot free of non-`ShellBarItem` elements.

### Notifications

Pass `notificationsUrl` to enable UI5's native notifications button (bell icon) in the right actions cluster. Clicking it opens the given URL in a new browser tab (`target="_blank"` with `noopener,noreferrer`). Omit the prop to hide the bell entirely — the wrapper intentionally does not expose the raw UI5 `showNotifications` / `notificationsCount` / `onNotificationsClick` surface, favoring this single link-based prop.

```tsx
<ShellBar
  primaryTitle="Console"
  notificationsUrl="https://console.reltio.com/notifications"
/>
```

### Accessibility

The default Reltio brand mark `<img>` has `alt="Reltio"` so screen readers announce the brand. The hidden dark `<img>` is `aria-hidden` to avoid duplicate announcements. When you pass a custom `logo`, set `alt` (or `aria-label`) on the inner logo image.

### See also

- [SAP Fiori Shell Bar guideline](https://experience.sap.com/fiori-design-web/shell-bar/)
- [UI5 ShellBar reference](https://ui5.github.io/webcomponents/components/fiori/ShellBar/)

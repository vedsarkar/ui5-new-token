# ShellBar

`ShellBar` is the Reltio top navigation chrome, built on top of `@ui5/webcomponents-react/ShellBar`. Every Reltio application mounts a `ShellBar` at the top of its layout — it carries the Reltio brand mark, the app title, search, user profile, and any sub-app-specific actions. Every UI5 ShellBar prop passes through unchanged.

### Branding

When `logo` is omitted, the wrapper renders the default Reltio mark, which adapts to the active theme (`horizon-light` / `horizon-dark`) based on the closest `[data-theme]` ancestor — no JavaScript, pure CSS, and nested themes work. The `logo` prop is the recommended way to override it with a custom mark; theme behavior for a custom mark is then the consumer's responsibility.

> The experimental UI5 `branding` slot is intentionally not used — customize the brand mark through `logo`.

### Reltio slots

Beyond the UI5 pass-through props, the wrapper adds three convenience slots:

- `sideNavigation` — hosts a UI5 `<SideNavigation>` (see "Side navigation slot" below).
- `tenantSelector` — hosts a `<TenantSelector>` in the left content area, composed with (not replacing) any `content` prop.
- `userMenu` — hosts a `<UserMenu>` whose avatar is routed into the user (`profile`) area. This is the only way to populate the user area; the UI5 `profile` and `onProfileClick` props are intentionally not exposed.

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
precedence over a directly-supplied `content` prop. Omit it to render nothing
extra.

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

`userMenu` accepts a [`UserMenu`](/?path=/docs/components-usermenu--docs) element. Its inner avatar carries `slot="profile"`, so UI5 mounts the avatar in the canonical user position while the menu popover and About modal render as overlays. This is the only way to populate the user area — the UI5 `profile` and `onProfileClick` props are intentionally not exposed.

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

### Accessibility

The default Reltio brand mark `<img>` has `alt="Reltio"` so screen readers announce the brand. The hidden dark `<img>` is `aria-hidden` to avoid duplicate announcements. When you pass a custom `logo`, set `alt` (or `aria-label`) on the inner logo image.

### See also

- [SAP Fiori Shell Bar guideline](https://experience.sap.com/fiori-design-web/shell-bar/)
- [UI5 ShellBar reference](https://ui5.github.io/webcomponents/components/fiori/ShellBar/)

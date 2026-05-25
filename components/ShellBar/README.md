# ShellBar

`ShellBar` is the Reltio top navigation chrome, built on top of `@ui5/webcomponents-react/ShellBar`. Every Reltio application mounts a `ShellBar` at the top of its layout — it carries the Reltio brand mark, the app title, search, user profile, and any sub-app-specific actions.

The Reltio layer adds exactly two things on top of the underlying UI5 component:

1. A **default Reltio brand mark** rendered in the new UI5 `branding` slot via a bundled `<picture>` that swaps between `ReltioLogo.light.svg` and `ReltioLogo.dark.svg` based on the closest `[data-theme]` ancestor. Apps do not need to copy a Reltio SVG into their own `public/` directories.
2. **`data-test-id` forwarding** to the rendered light-DOM host for Playwright tests.

Every other UI5 ShellBar prop (`primaryTitle`, `secondaryTitle`, `startButton`, `searchField`, `profile`, `notificationsCount`, `showNotifications`, …) passes through unchanged.

### Default branding

> **Heads up — `branding` slot is `@experimental` in `@ui5/webcomponents-fiori`.** SAP marks it as subject to change. The Reltio default rendering may break on a UI5 minor bump; the CoE pins UI5 versions in `@reltio/design` and tests every release, so the consumer-facing API is stable in practice. If SAP graduates or replaces the slot, this README and the type signature follow.

When `branding` is omitted, the wrapper renders the canonical Reltio mark inside a `<ShellBarBranding>`. The mark adapts to the active theme:

- `data-theme="horizon-light"` (or no theme attribute) → `ReltioLogo.light.svg`
- `data-theme="horizon-dark"` → `ReltioLogo.dark.svg`

The swap is implemented with two layered `<img>` elements in a `<picture>` slot and pure CSS — no JavaScript, no theme observer. Nested themes work: a `<div data-theme="horizon-dark">` containing a ShellBar shows the dark logo even when the document root is `horizon-light`.

```tsx
<ShellBar primaryTitle="Console" />
```

### Custom branding override

Sub-apps that need their own brand mark (partner products, internal tools) pass `branding` with a `<ShellBarBranding>` containing their own logo. The Reltio layer does NOT impose theme behavior on a custom mark — that becomes the consumer's responsibility.

```tsx
<ShellBar
  primaryTitle="Acme Module"
  branding={
    <ShellBarBranding accessibleName="Acme">
      <img slot="logo" src="/acme-logo.svg" alt="Acme" height={15} />
    </ShellBarBranding>
  }
/>
```

### `logo` slot (legacy)

UI5 ShellBar still exposes a `logo` slot for backwards compatibility, but it now renders near the profile (right side of the bar), not as the left brand mark. The Reltio default uses the `branding` slot instead. The `logo` prop remains available as a regular UI5 pass-through if you need a secondary mark in that position.

### Title and subtitle

`primaryTitle` is the app name (one or two words: "Console", "Match", "Hub"). `secondaryTitle` is the contextual subtitle that changes with the active route ("Entity profile", "Search", "Tenant settings").

### Actions

- `profile` — user avatar + dropdown trigger. Pass `<Avatar />`.
- `startButton` — typically a hamburger menu trigger. Pass `<Button icon="menu2" />`.
- `searchField` — search input slot. Pass `<ShellBarSearch />` or omit.
- `notificationsCount` + `showNotifications` — bell + count badge.
- Children — additional `<ShellBarItem>` entries for Help, Settings, etc.

### Accessibility

The default Reltio brand mark `<img>` has `alt="Reltio"` so screen readers announce the brand. The hidden dark `<img>` is `aria-hidden` to avoid duplicate announcements. When you pass a custom `branding`, set `accessibleName` on `<ShellBarBranding>` and `alt` (or `aria-label`) on the inner logo image.

### See also

- [SAP Fiori Shell Bar guideline](https://experience.sap.com/fiori-design-web/shell-bar/)
- [UI5 ShellBar reference](https://ui5.github.io/webcomponents/components/fiori/ShellBar/)
- [UI5 ShellBarBranding reference](https://ui5.github.io/webcomponents/components/fiori/ShellBarBranding/)

## ADDED Requirements

### Requirement: Component export

The `ShellBar` component SHALL be exported from `@reltio/design/components` as a named export, together with its `ShellBarProps` type.

#### Scenario: Public import

- **WHEN** a consumer writes `import { ShellBar, type ShellBarProps } from "@reltio/design/components"`
- **THEN** module resolution succeeds and both symbols are available with TypeScript types

### Requirement: UI5 prop pass-through

The component SHALL accept every prop that `@ui5/webcomponents-react/ShellBar` accepts EXCEPT `branding`, which is re-typed (see the next requirement). All other props SHALL be forwarded 1:1 to the underlying UI5 element.

#### Scenario: Title and items pass through

- **WHEN** a consumer passes `primaryTitle="Console"`, `notificationsCount="10"`, `showNotifications={true}`, and `startButton={<Button … />}`
- **THEN** the UI5 ShellBar receives them unchanged

### Requirement: Default Reltio branding

When `branding` is omitted, the component SHALL render a `<ShellBarBranding>` element in UI5 ShellBar's `branding` slot containing the Reltio brand mark. The mark SHALL adapt to the active Reltio theme: `horizon-light` → `ReltioLogo.light.svg`, `horizon-dark` → `ReltioLogo.dark.svg`. When no `data-theme` attribute is present on any ancestor, the light variant SHALL render.

#### Scenario: Light theme default

- **WHEN** the component is rendered with no `branding` prop inside a `<div data-theme="horizon-light">`
- **THEN** the rendered `<img>` inside the branding slot resolves to `ReltioLogo.light.svg`

#### Scenario: Dark theme default

- **WHEN** the component is rendered with no `branding` prop inside a `<div data-theme="horizon-dark">`
- **THEN** the rendered `<img>` inside the branding slot resolves to `ReltioLogo.dark.svg`

#### Scenario: No theme attribute

- **WHEN** the component is rendered with no `branding` prop and no `[data-theme]` on any ancestor
- **THEN** the light variant renders as fallback

#### Scenario: Nested theme override

- **WHEN** the document root carries `data-theme="horizon-light"` but the ShellBar is inside a `<div data-theme="horizon-dark">`
- **THEN** the dark variant renders (nested attribute wins)

### Requirement: Branding override

The component SHALL accept an optional `branding` prop of type `ReactNode`. When provided, the override SHALL be passed to the UI5 ShellBar `branding` slot verbatim; the default Reltio branding SHALL NOT render. The component SHALL NOT impose theme behavior on a custom branding — that is the consumer's responsibility.

#### Scenario: Custom branding replaces default

- **WHEN** the component is rendered with `branding={<ShellBarBranding><img slot="logo" src="/my-app/logo.svg" alt="My App" /></ShellBarBranding>}`
- **THEN** the rendered branding slot contains exactly the custom node and neither `ReltioLogo.light.svg` nor `ReltioLogo.dark.svg` is in the DOM

### Requirement: data-test-id forwarding

The `ShellBar` component SHALL forward a `data-test-id` prop to the rendered light-DOM host element.

#### Scenario: Playwright can locate the ShellBar

- **WHEN** the component is rendered with `data-test-id="app-shell-bar"`
- **THEN** `document.querySelector('[data-test-id="app-shell-bar"]')` returns a non-null element

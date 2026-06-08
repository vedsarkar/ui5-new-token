# ShellBar

`ShellBar` is the Reltio top navigation chrome, built on top of `@ui5/webcomponents-react/ShellBar`. Every Reltio application mounts a `ShellBar` at the top of its layout — it carries the Reltio brand mark, the app title, search, user profile, and any sub-app-specific actions. Every UI5 ShellBar prop passes through unchanged.

### Branding

When `logo` is omitted, the wrapper renders the default Reltio mark, which adapts to the active theme (`horizon-light` / `horizon-dark`) based on the closest `[data-theme]` ancestor — no JavaScript, pure CSS, and nested themes work. The `logo` prop is the recommended way to override it with a custom mark; theme behavior for a custom mark is then the consumer's responsibility.

> The experimental UI5 `branding` slot is intentionally not used — customize the brand mark through `logo`.

### Reltio slots

Beyond the UI5 pass-through props, the wrapper adds two convenience slots:

- `tenantSelector` — hosts a `<TenantSelector>` in the left content area, composed with (not replacing) any `content` prop.
- `userMenu` — hosts a `<UserMenu>` whose avatar is routed into the user (`profile`) area. This is the only way to populate the user area; the UI5 `profile` and `onProfileClick` props are intentionally not exposed.

### See also

- [SAP Fiori Shell Bar guideline](https://experience.sap.com/fiori-design-web/shell-bar/)
- [UI5 ShellBar reference](https://ui5.github.io/webcomponents/components/fiori/ShellBar/)

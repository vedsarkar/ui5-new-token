## ADDED Requirements

### Requirement: appSelector slot prop

The `ShellBar` component SHALL accept an optional `appSelector?: ReactElement` slot prop. When provided, the wrapper SHALL render the slot element inside the underlying UI5 ShellBar's `children` slot, AFTER any explicit `children` the consumer supplies. The slot prop is intended to host a `<AppSelector …/>` element (the Reltio app-navigator component already exported from `@reltio/design/components`), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

#### Scenario: appSelector renders alongside the right cluster

- **WHEN** the component is rendered with `appSelector={<AppSelector apps={[…]} env="EUS102-DEVELOP" tenant="autoAnyCloud" />}` and no explicit `children`
- **THEN** the underlying UI5 ShellBar receives a `children` payload containing the rendered `<AppSelector>` element; the app-selector grid icon appears in the right cluster

#### Scenario: appSelector renders after explicit children

- **WHEN** the component is rendered with `appSelector={<AppSelector …/>}` AND `children={<ShellBarItem icon="sys-help" text="Help" />}`
- **THEN** the underlying UI5 ShellBar receives a `children` payload where the `<ShellBarItem>` is rendered first and the `<AppSelector>` is rendered last (the app-selector sits to the right of the Help item)

#### Scenario: omitting appSelector renders nothing extra

- **WHEN** the component is rendered with no `appSelector` prop and no `children`
- **THEN** the underlying UI5 ShellBar receives no extra children; the right cluster shows only the UI5-managed slots (search, notifications, profile)

#### Scenario: appSelector accepts any ReactElement type

- **WHEN** the component is rendered with `appSelector={<div data-test-id="custom-launcher">launcher</div>}`
- **THEN** TypeScript compilation succeeds (the prop type is `ReactElement`) AND the custom element is rendered inside the underlying UI5 ShellBar's `children` slot

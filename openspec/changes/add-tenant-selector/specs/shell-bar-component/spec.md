## ADDED Requirements

### Requirement: tenantSelector slot prop

The `ShellBar` component SHALL accept an optional `tenantSelector?: ReactElement` slot prop. When provided, the wrapper SHALL render the slot element inside the underlying UI5 ShellBar's `children` slot. The slot prop is intended to host a `<TenantSelector …/>` element (the Reltio tenant-picker component), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

The wrapper SHALL NOT use the UI5 experimental `content` slot to host the tenant selector — final positioning relative to the title area is handled by CSS inside the `TenantSelector` component itself.

The order of `children`-slot members SHALL be: explicit `children` first, then `tenantSelector`, then `customerSelector`, then `appSelector` (each rendered only if its slot prop is supplied). This puts the tenant/customer selectors closer to the title area and the app selector closer to the right cluster.

#### Scenario: tenantSelector renders in children slot

- **WHEN** the component is rendered with `tenantSelector={<TenantSelector tenants={[…]} selectedTenantId="..." onSelect={…} />}` and no other children-slot props
- **THEN** the underlying UI5 ShellBar receives a `children` payload containing the rendered `<TenantSelector>` element

#### Scenario: tenantSelector order with siblings

- **WHEN** the component is rendered with `tenantSelector={<TenantSelector …/>}` AND `appSelector={<AppSelector …/>}` AND `customerSelector={<CustomerSelector …/>}`
- **THEN** the underlying UI5 ShellBar's children payload renders, in order: `tenantSelector`, `customerSelector`, `appSelector`

#### Scenario: omitting tenantSelector renders nothing extra

- **WHEN** the component is rendered with no `tenantSelector` prop
- **THEN** the underlying UI5 ShellBar's children payload does NOT include any tenant-selector element

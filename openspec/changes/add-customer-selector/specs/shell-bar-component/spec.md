## ADDED Requirements

### Requirement: customerSelector slot prop

The `ShellBar` component SHALL accept an optional `customerSelector?: ReactElement` slot prop. When provided, the wrapper SHALL render the slot element inside the underlying UI5 ShellBar's `children` slot. The slot prop is intended to host a `<CustomerSelector …/>` element (the Reltio customer-picker component), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

The wrapper SHALL NOT use the UI5 experimental `content` slot to host the customer selector — final positioning relative to the title area is handled by CSS inside the `CustomerSelector` component itself.

When BOTH `tenantSelector` and `customerSelector` are supplied, the rendering order inside the UI5 children slot SHALL be: `tenantSelector` first, then `customerSelector`. (See `add-tenant-selector` for the complete ordering rule.)

#### Scenario: customerSelector renders in children slot

- **WHEN** the component is rendered with `customerSelector={<CustomerSelector customers={[…]} selectedCustomerId="..." onSelect={…} />}` and no other children-slot props
- **THEN** the underlying UI5 ShellBar receives a `children` payload containing the rendered `<CustomerSelector>` element

#### Scenario: customerSelector renders after tenantSelector

- **WHEN** the component is rendered with `tenantSelector={<TenantSelector …/>}` AND `customerSelector={<CustomerSelector …/>}`
- **THEN** the underlying UI5 ShellBar's children payload renders `tenantSelector` first and `customerSelector` second

#### Scenario: omitting customerSelector renders nothing extra

- **WHEN** the component is rendered with no `customerSelector` prop
- **THEN** the underlying UI5 ShellBar's children payload does NOT include any customer-selector element

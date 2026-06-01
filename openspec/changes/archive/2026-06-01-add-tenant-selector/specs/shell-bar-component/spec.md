## ADDED Requirements

### Requirement: tenantSelector slot prop

The `ShellBar` component SHALL accept an optional `tenantSelector?: ReactElement` slot prop. When provided, the wrapper SHALL render the slot element into the underlying UI5 ShellBar's `content` slot, so the tenant picker sits in the content area just after the branding/title (left cluster), not in the right actions cluster. The slot prop is intended to host a `<TenantSelector …/>` element (the Reltio tenant-picker component), but the TypeScript type is `ReactElement` and the wrapper does not enforce the runtime element type.

The `tenantSelector` prop SHALL take precedence over a directly-supplied `content` prop: when both are provided, the wrapper routes `tenantSelector` into the `content` slot.

#### Scenario: tenantSelector renders in content slot

- **WHEN** the component is rendered with `tenantSelector={<TenantSelector tenants={[…]} selectedTenantId="..." onSelect={…} />}`
- **THEN** the underlying UI5 ShellBar receives the rendered `<TenantSelector>` element in its `content` slot, positioned after the branding/title

#### Scenario: tenantSelector wins over content

- **WHEN** the component is rendered with BOTH `tenantSelector={<TenantSelector …/>}` AND a `content` prop
- **THEN** the underlying UI5 ShellBar's `content` slot receives the `tenantSelector` element

#### Scenario: omitting tenantSelector renders nothing extra

- **WHEN** the component is rendered with no `tenantSelector` prop
- **THEN** the underlying UI5 ShellBar's `content` slot is filled only by whatever the consumer passes via `content`, if anything

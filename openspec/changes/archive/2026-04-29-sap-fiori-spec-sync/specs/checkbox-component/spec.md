# Checkbox Component — SAP Fiori Spec Sync Delta

## MODIFIED Requirements
### Requirement: Indeterminate and Value State
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Add indeterminate and valueState props
- **WHEN** the checkbox represents a partial selection
- **THEN** support `indeterminate: boolean` prop rendering a custom SVG dash indicator
- **WHEN** the checkbox needs to indicate validation status
- **THEN** use `valueState` prop accepting `Error | Warning` to style the border and indicator accordingly

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP tokens
- **WHEN** styling the checkbox border, check indicator, and states
- **THEN** use `--sapField_BorderColor` for default border instead of `--reltio-color-*`
- **THEN** use `--sapBrandColor` for checked state background
- **THEN** use `--sapNegativeElementColor` for error state border and indicator
- **THEN** render check and dash marks as custom inline SVG elements

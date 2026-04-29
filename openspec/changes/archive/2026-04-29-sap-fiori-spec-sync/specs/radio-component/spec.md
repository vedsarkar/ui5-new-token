# Radio Component — SAP Fiori Spec Sync Delta

## MODIFIED Requirements
### Requirement: Value State Support
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Add valueState prop for validation feedback
- **WHEN** the radio button needs to indicate validation status
- **THEN** use `valueState` prop accepting `Error | Warning`
- **THEN** apply `--sapNegativeElementColor` for error state border and indicator
- **THEN** render a custom circular indicator using CSS `scale` transform on selection

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP tokens
- **WHEN** styling the radio button border, indicator, and states
- **THEN** use `--sapField_BorderColor` for default border instead of `--reltio-color-*`
- **THEN** use `--sapBrandColor` for selected state indicator
- **THEN** use `--sapHighlightColor` for hover state border
- **THEN** use `--sapNegativeElementColor` for error state styling

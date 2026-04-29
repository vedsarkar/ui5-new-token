# Switch Component — SAP Fiori Spec Sync Delta

## MODIFIED Requirements
### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP tokens
- **WHEN** styling the switch track, handle, and states
- **THEN** use `--sapField_BorderColor` for default track border instead of `--reltio-color-*`
- **THEN** use `--sapField_Background` for unchecked track background
- **THEN** use `--sapBrandColor` for checked track background
- **THEN** use `--sapHighlightColor` for hover state border
- **THEN** use `--sapContent_FocusColor` for focus outline

### Requirement: Animated Track and Handle
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Add transition details for toggle animation
- **WHEN** the switch toggles between on and off
- **THEN** animate the handle position with a CSS transition on `transform`
- **THEN** animate the track background color transition between `--sapField_Background` and `--sapBrandColor`

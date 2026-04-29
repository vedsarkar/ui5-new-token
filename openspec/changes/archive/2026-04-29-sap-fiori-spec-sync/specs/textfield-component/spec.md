# TextField Component — SAP Fiori Spec Sync Delta

## MODIFIED Requirements
### Requirement: Validation and Value State
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace boolean error with SAP valueState enum
- **WHEN** the component needs to indicate validation status
- **THEN** use `valueState` prop accepting `None | Error | Warning | Success | Information` instead of `error: boolean`
- **THEN** use `valueStateMessage` prop instead of `helperText` for contextual guidance

#### Scenario: Clear icon API rename
- **WHEN** the field supports user-initiated clearing
- **THEN** use `clearable: boolean` prop instead of `showClearIcon`

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP Field tokens
- **WHEN** styling the component
- **THEN** use `--sapField_BorderColor`, `--sapField_Background`, `--sapField_TextColor`, `--sapField_HoverBorderColor`, `--sapField_FocusColor` instead of `--reltio-color-*` tokens
- **THEN** reference SAP Fiori design system instead of Material Design 3

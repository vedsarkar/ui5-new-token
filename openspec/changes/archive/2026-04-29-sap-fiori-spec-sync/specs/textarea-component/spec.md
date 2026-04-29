# TextArea Component — SAP Fiori Spec Sync Delta

## MODIFIED Requirements
### Requirement: Validation and Layout
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace error/supportingText with SAP valueState pattern
- **WHEN** the component needs to indicate validation status
- **THEN** use `valueState` prop (`None | Error | Warning | Success | Information`) instead of `error: boolean`
- **THEN** use `valueStateMessage` prop instead of `supportingText`

#### Scenario: Add toolbar slot and auto-grow
- **WHEN** the textarea needs inline actions or dynamic height
- **THEN** support a `toolbar` slot for embedding controls above the input area
- **THEN** use `field-sizing: content` CSS for native auto-grow behavior
- **THEN** use `forwardRef` pattern to expose the underlying `<textarea>` element

### Requirement: Design Token Migration
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace custom tokens with SAP Field tokens
- **WHEN** styling the component
- **THEN** use `--sapField_BorderColor`, `--sapField_Background`, `--sapField_TextColor`, `--sapField_HoverBorderColor` instead of `--reltio-textarea-*` tokens

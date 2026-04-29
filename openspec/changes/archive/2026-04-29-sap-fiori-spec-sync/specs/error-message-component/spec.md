## MODIFIED Requirements

### Requirement: Color Tokens

The ErrorMessage component SHALL use SAP Horizon design tokens instead of `--reltio-error-message-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the ErrorMessage component is rendered
- **THEN** it uses `--sapErrorBackground` for the container background
- **AND** `--sapNegativeElementColor` for the error icon color
- **AND** `--sapNegativeTextColor` for the error message text
- **AND** no `--reltio-error-message-*` tokens are referenced in the component CSS

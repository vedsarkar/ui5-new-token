## MODIFIED Requirements

### Requirement: Color Tokens

The Details component SHALL use SAP Horizon design tokens instead of `--reltio-details-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the Details component is rendered
- **THEN** it uses `--sapGroup_ContentBackground` for the content area background
- **AND** `--sapBackgroundColor` for the summary area background
- **AND** `--sapField_BorderColor` for borders
- **AND** `--sapTextColor` for body text
- **AND** `--sapBrandColor` for interactive/accent elements
- **AND** no `--reltio-details-*` tokens are referenced in the component CSS

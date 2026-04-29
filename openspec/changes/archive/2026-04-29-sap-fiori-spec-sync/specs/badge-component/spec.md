## MODIFIED Requirements

### Requirement: Color Tokens

The Badge component SHALL use SAP Horizon design tokens instead of `--reltio-color-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the Badge component is rendered in any variant
- **THEN** it uses `--sapBrandColor` for the default background
- **AND** `--sapNegativeElementColor` for the error/alert variant background
- **AND** `--sapContent_ContrastTextColor` for the label text color
- **AND** no `--reltio-color-*` tokens are referenced in the component CSS

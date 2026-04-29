## MODIFIED Requirements

### Requirement: Color Tokens

The Chip component SHALL use SAP Horizon `--sap*` semantic design tokens instead of `--reltio-chip-*` custom properties for all color values. Future alignment with dedicated SAP Token component tokens is expected.

#### Scenario: SAP token migration

- **WHEN** the Chip component is rendered in any variant
- **THEN** it uses `--sap*` semantic tokens for background, text, and border colors
- **AND** no `--reltio-chip-*` tokens are referenced in the component CSS
- **AND** token choices are documented as subject to future SAP Token alignment

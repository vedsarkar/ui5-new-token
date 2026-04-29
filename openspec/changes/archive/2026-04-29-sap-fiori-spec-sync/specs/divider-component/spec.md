## MODIFIED Requirements

### Requirement: Color Tokens

The Divider component SHALL use SAP Horizon design tokens instead of `--reltio-color-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the Divider component is rendered
- **THEN** the line color uses `--sapNeutralBackground`
- **AND** the label text color uses `--sapContent_LabelColor`
- **AND** no `--reltio-color-*` tokens are referenced in the component CSS

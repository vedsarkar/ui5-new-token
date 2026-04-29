## MODIFIED Requirements

### Requirement: Color Tokens

The Breadcrumbs component SHALL use SAP Horizon design tokens instead of `--reltio-color-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the Breadcrumbs component is rendered
- **THEN** it uses `--sapContent_LabelColor` for separator and inactive item colors
- **AND** `--sapTextColor` for the current (last) breadcrumb item
- **AND** `--sapNeutralBackground` for hover background on interactive items
- **AND** `--sapContent_FocusColor` for the focus indicator outline
- **AND** no `--reltio-color-*` tokens are referenced in the component CSS

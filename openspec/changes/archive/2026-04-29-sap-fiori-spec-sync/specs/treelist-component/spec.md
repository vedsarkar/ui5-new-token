## MODIFIED Requirements

### Requirement: Color Tokens and Controlled Mode

The TreeList component SHALL use SAP Horizon design tokens instead of `--reltio-tree-list-*` custom properties and SHALL operate in controlled-only mode.

#### Scenario: SAP token migration and controlled-only simplification

- **WHEN** the TreeList component is rendered
- **THEN** it uses `--sapTextColor` for node label text
- **AND** no `--reltio-tree-list-*` tokens are referenced in the component CSS
- **AND** the component operates exclusively in controlled mode via `expandedKeys` prop
- **AND** uncontrolled (internal state) mode is removed

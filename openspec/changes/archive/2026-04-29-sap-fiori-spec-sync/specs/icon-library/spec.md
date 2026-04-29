## MODIFIED Requirements

### Requirement: Icon Source and Color Tokens

The Icon library SHALL use SAP theming-base-content as the icon source instead of Material Design 3, and SHALL use SAP Horizon tokens instead of `--reltio-icon-*` custom properties.

#### Scenario: SAP icon source and token migration

- **WHEN** an Icon component is rendered
- **THEN** the icon SVG originates from SAP theming-base-content
- **AND** default color uses `--sapBrandColor`
- **AND** semantic colors map to `--sapNeutralColor`, `--sapPositiveColor`, `--sapCriticalColor`, `--sapNegativeColor`
- **AND** icons are generated via the `build-icons` script
- **AND** no `--reltio-icon-*` tokens are referenced in the component CSS

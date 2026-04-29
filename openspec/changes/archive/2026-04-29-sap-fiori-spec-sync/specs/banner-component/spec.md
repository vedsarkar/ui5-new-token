## MODIFIED Requirements

### Requirement: Design Variants
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Replace color prop with design prop
- **WHEN** configuring banner appearance
- **THEN** use a `design` prop: `"information"` | `"positive"` | `"critical"` | `"negative"` instead of the old `color` prop
- **AND** default value is `"information"`

#### Scenario: SAP semantic token migration
- **WHEN** rendering a banner in any design variant
- **THEN** information uses `--sapInformationBackground`, `--sapInformationBorderColor`, `--sapInformativeColor`
- **AND** positive uses `--sapSuccessBackground`, `--sapSuccessBorderColor`, `--sapPositiveElementColor`
- **AND** critical uses `--sapWarningBackground`, `--sapWarningBorderColor`, `--sapCriticalElementColor`
- **AND** negative uses `--sapErrorBackground`, `--sapErrorBorderColor`, `--sapNegativeElementColor`
- **AND** no `--reltio-color-*` tokens are referenced

### Requirement: Default Icons
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Each design variant has a default icon
- **WHEN** no custom `icon` prop is provided
- **THEN** information shows Info icon, positive shows CheckCircle, critical shows Warning, negative shows ErrorCircle

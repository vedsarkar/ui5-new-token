## MODIFIED Requirements

### Requirement: Square Layout
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: SAP token for icon-only dimensions
- **WHEN** icon-only mode is active
- **THEN** `min-width` uses `var(--sapElement_Height)` instead of a hardcoded size
- **AND** `aspect-ratio: 1`, `padding: 0`, icon centered via flexbox

### Requirement: All Designs Supported
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Aligned with 7-variant design prop
- **WHEN** button is in icon-only mode
- **THEN** it works with all 7 `design` variants (default, emphasized, ghost, transparent, positive, negative, attention)
- **AND** each variant applies its corresponding `--sapButton_*` token set
- **AND** no `--reltio-button-*` tokens are referenced

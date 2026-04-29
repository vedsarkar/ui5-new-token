## MODIFIED Requirements

### Requirement: Color Tokens and Positioning

The Popover component SHALL use SAP Horizon design tokens instead of `--reltio-color-*` custom properties and SHALL use CSS Anchor Positioning for placement.

#### Scenario: SAP token migration and anchor positioning

- **WHEN** the Popover component is rendered
- **THEN** it uses `--sapGroup_ContentBackground` for the popover background
- **AND** `--sapField_BorderColor` for the border
- **AND** `--sapContent_Shadow1` for the elevation shadow
- **AND** CSS Anchor Positioning is used for placement relative to the trigger element
- **AND** no `--reltio-color-*` tokens are referenced in the component CSS

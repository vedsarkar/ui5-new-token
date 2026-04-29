## MODIFIED Requirements

### Requirement: Visual Design
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: SAP Icon Tab Bar token migration
- **WHEN** styling the tab bar
- **THEN** use `--sapObjectHeader_Background` for tab bar background
- **AND** use `--sapTab_Selected_TextColor` for active tab text
- **AND** use `--sapTab_ForegroundColor` for the 3px selection indicator bar
- **AND** use `--sapFontHeaderFamily` with `--sapFontFamily` fallback for tab typography
- **AND** no `--reltio-tabs-*` tokens are referenced in the component CSS

### Requirement: Items Array API
The component SHALL use SAP Fiori Horizon design system conventions and tokens.

#### Scenario: Declarative tab items replace children-based API
- **WHEN** configuring tabs
- **THEN** accept an `items` array of `TabItem` objects with `value`, `label`, and optional `disabled`
- **AND** selection is controlled via `value` prop and reported via `onValueChange(tabValue)`

#### Scenario: 3px selection bar replaces 2px indicator
- **WHEN** a tab is active
- **THEN** a 3px bottom bar renders in `--sapTab_ForegroundColor`
- **AND** replaces the previous 2px `--reltio-tabs-indicator-*` pseudo-element animation

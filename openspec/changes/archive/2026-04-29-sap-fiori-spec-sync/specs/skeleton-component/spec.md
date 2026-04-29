## MODIFIED Requirements

### Requirement: Color Tokens

The Skeleton component SHALL use SAP Horizon design tokens instead of `--reltio-skeleton-*` custom properties for all color values.

#### Scenario: SAP token migration

- **WHEN** the Skeleton component is rendered
- **THEN** it uses `--sapBackgroundColor` for the base placeholder color
- **AND** `--sapNeutralBackground` for the shimmer highlight color
- **AND** no `--reltio-skeleton-*` tokens are referenced in the component CSS

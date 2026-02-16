## ADDED Requirements

### Requirement: Dark mode rendering
The Skeleton component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: Skeleton renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** Skeleton shimmer and background colors adapt to the dark theme via global color tokens

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
CSS custom properties SHALL be defined on the `.skeletonRoot` class. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values.

#### Scenario: CSS variables supported via style prop
- **WHEN** the Skeleton component is rendered
- **THEN** `--reltio-skeleton-row-height` and `--reltio-skeleton-row-gap` are customizable via style prop
- **AND** color-related properties reference global tokens without hardcoded hex fallbacks

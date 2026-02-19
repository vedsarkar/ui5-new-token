## ADDED Requirements

### Requirement: Dark mode rendering
The ErrorMessage component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: ErrorMessage renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** ErrorMessage background, border, text, and icon colors adapt to the dark theme via global color tokens
- **AND** the error state remains visually distinguishable in the dark theme

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-error-message-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens (specifically error-scoped tokens) without hardcoded fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the ErrorMessage component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-error-message-` prefix
- **AND** color variables reference global `--reltio-color-error-*` tokens without hardcoded hex fallbacks

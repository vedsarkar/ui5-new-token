## ADDED Requirements

### Requirement: Dark mode rendering
The Button component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: Button renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** Button text, background, and border colors adapt to the dark theme via global color tokens

#### Scenario: All button variants render in dark theme
- **WHEN** `data-theme="dark"` is set and Button is rendered in each variant (primary, secondary, ghost, inherited)
- **THEN** each variant has appropriate contrast and legibility in the dark theme

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-button-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables (spacing, typography, border-radius) SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the Button component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-button-` prefix
- **AND** color variables reference global tokens (e.g. `var(--reltio-color-text)`) without hardcoded hex fallbacks
- **AND** non-color variables include fallback values

#### Scenario: CSS variables for colors
- **WHEN** the Button component is rendered
- **THEN** the following color variables are defined: `--reltio-button-color-primary`, `--reltio-button-color-primary-text`, `--reltio-button-color-text`
- **AND** each references a global `--reltio-color-*` token

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables (e.g. `style={{ "--reltio-button-color-primary": "red" }}`)
- **THEN** the Button applies the custom values, overriding both global tokens and component defaults

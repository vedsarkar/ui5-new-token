## ADDED Requirements

### Requirement: Dark mode rendering
The Details component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: Details renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** Details background, border, text, chevron, and code block colors adapt to the dark theme via global color tokens

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-details-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables (border-radius, border-width, font-size, transitions, spacing) SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the Details component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-details-` prefix
- **AND** color variables (background-color, border-color, text-color, chevron-color, code colors) reference global tokens without hardcoded hex fallbacks

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables (e.g. `style={{ "--reltio-details-border-color": "#0066cc" }}`)
- **THEN** the Details applies the custom values, overriding both global tokens and component defaults

#### Scenario: DetailsStyleVars type defines CSS custom properties
- **WHEN** a developer uses the `DetailsStyleVars` type
- **THEN** autocomplete is provided for all `--reltio-details-*` CSS variables with all properties typed as optional string

## ADDED Requirements

### Requirement: Dark mode rendering
The TextArea component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: TextArea renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** TextArea border, background, text, label, and supporting text colors adapt to the dark theme via global color tokens

#### Scenario: TextArea error state renders in dark theme
- **WHEN** `data-theme="dark"` is set and TextArea has an error
- **THEN** error border and supporting text colors use dark theme error tokens while remaining visually distinguishable

## MODIFIED Requirements

### Requirement: CSS Custom Properties
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-textarea-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables (border-radius, padding, min/max-height, typography sizes) SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the TextArea component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-textarea-` prefix
- **AND** color variables reference global tokens without hardcoded hex fallbacks
- **AND** no design tokens are hardcoded in the CSS

#### Scenario: CSS variables for colors
- **WHEN** the TextArea component is rendered
- **THEN** the following color variables are defined: `--reltio-textarea-color-border`, `--reltio-textarea-color-border-focus`, `--reltio-textarea-color-background`, `--reltio-textarea-color-error`, `--reltio-textarea-color-label`, `--reltio-textarea-color-supporting-text`, `--reltio-textarea-color-text`
- **AND** each references a global `--reltio-color-*` token

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables (e.g. `style={{ "--reltio-textarea-border-radius": "8px" }}`)
- **THEN** the TextArea applies the custom values, overriding both global tokens and component defaults

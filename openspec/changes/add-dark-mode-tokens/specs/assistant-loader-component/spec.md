## ADDED Requirements

### Requirement: Dark mode rendering
The AssistantLoader component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: AssistantLoader renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** AssistantLoader colors adapt to the dark theme via global color tokens

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-assistant-loader-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the AssistantLoader component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-assistant-loader-` prefix
- **AND** color variables reference global tokens without hardcoded hex fallbacks

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables
- **THEN** the AssistantLoader applies the custom values, overriding both global tokens and component defaults

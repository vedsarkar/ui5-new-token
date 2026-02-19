## ADDED Requirements

### Requirement: Dark mode rendering
The Chat component and its subcomponents (AssistantMessage, UserMessage) SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: Chat renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** Chat container, AssistantMessage, and UserMessage colors adapt to the dark theme via global color tokens

#### Scenario: Message bubbles have appropriate contrast in dark theme
- **WHEN** `data-theme="dark"` is set
- **THEN** AssistantMessage and UserMessage backgrounds are visually distinct from each other and from the Chat container background

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-chat-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the Chat component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class with `--reltio-chat-` prefix
- **AND** color variables reference global tokens without hardcoded hex fallbacks

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables
- **THEN** the Chat applies the custom values, overriding both global tokens and component defaults

## ADDED Requirements

### Requirement: Dark mode rendering
The Markdown component SHALL render correctly in both light and dark themes when `data-theme="dark"` is set on an ancestor element.

#### Scenario: Markdown renders in dark theme
- **WHEN** `data-theme="dark"` is set on an ancestor element
- **THEN** Markdown text, link, heading, code block, blockquote, table, and horizontal rule colors adapt to the dark theme via global color tokens

#### Scenario: Code blocks render in dark theme
- **WHEN** `data-theme="dark"` is set and markdown content contains code blocks
- **THEN** code block background and border colors use dark theme tokens with appropriate contrast

## MODIFIED Requirements

### Requirement: CSS Custom Properties Customization
All CSS custom properties SHALL be defined on the `.root` class. Variables SHALL use the `--reltio-markdown-` prefix. Color-related variables SHALL reference global `--reltio-color-*` tokens without hardcoded fallback values. Non-color variables (typography sizes, spacing, line-height) SHALL retain fallback values.

#### Scenario: All CSS variables defined on root
- **WHEN** the Markdown component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class
- **AND** color variables (text, link, blockquote, table border, code background, code text, strikethrough) reference global tokens without hardcoded hex fallbacks

#### Scenario: External customization via inline styles
- **WHEN** a developer provides a `style` prop with CSS variables
- **THEN** the Markdown applies the custom values, overriding both global tokens and component defaults

#### Scenario: MarkdownCSSVariables type
- **WHEN** a developer uses the `MarkdownCSSVariables` type
- **THEN** autocomplete is provided for all `--reltio-markdown-*` CSS variables including typography, heading sizes, code, color, and spacing variables

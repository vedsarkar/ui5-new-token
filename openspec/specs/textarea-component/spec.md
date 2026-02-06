# textarea-component Specification

## Purpose
TBD - created by archiving change add-textarea-component. Update Purpose after archive.
## Requirements
### Requirement: Material Design 3 Styling

The TextArea component SHALL follow Material Design 3 (M3) guidelines for text field appearance and behavior, implemented with custom CSS (no MUI or other React component library dependencies).

#### Scenario: Outlined text field variant
- **WHEN** TextArea is rendered
- **THEN** component uses M3 outlined text field styling
- **AND** has visible border around the input container
- **AND** border color changes on focus to indicate active state

#### Scenario: Focus state follows M3 guidelines
- **WHEN** textarea receives focus
- **THEN** border width increases (1px to 2px)
- **AND** border color changes to primary color
- **AND** floating label uses primary color

#### Scenario: No external UI library dependencies
- **WHEN** TextArea component is built
- **THEN** implementation uses only CSS Modules
- **AND** does not depend on MUI, Ant Design, or similar libraries
- **AND** React and React DOM are the only peer dependencies

### Requirement: Native Props Passthrough

The TextArea component SHALL pass all props except component-specific ones (label, error, supportingText, toolbar) to the underlying textarea element.

#### Scenario: Native attributes passed to textarea
- **WHEN** developer provides native textarea attributes (value, onChange, disabled, name, placeholder, rows, etc.)
- **THEN** attributes are spread to the native textarea element
- **AND** textarea behaves as expected with those attributes

#### Scenario: Event handlers passed to textarea
- **WHEN** developer provides event handlers (onKeyDown, onKeyPress, onFocus, onBlur, etc.)
- **THEN** handlers are attached to the native textarea element
- **AND** events fire with the full event object

#### Scenario: Data attributes and aria attributes passed through
- **WHEN** developer provides data-testid or aria-* attributes
- **THEN** attributes are spread to the native textarea element
- **AND** testing and accessibility tools can access them

#### Scenario: onChange receives full event
- **WHEN** user types in the textarea
- **THEN** onChange callback is called with the full React.ChangeEvent
- **AND** developer can access event.target.value and other event properties

### Requirement: Ref Forwarding

The TextArea component SHALL forward refs to the underlying textarea element for imperative access.

#### Scenario: Ref provides access to textarea element
- **WHEN** ref prop is provided
- **THEN** ref.current points to the native textarea element
- **AND** allows imperative methods like focus() and select()

### Requirement: Floating Label

The TextArea component SHALL support a floating label that animates from placeholder position to above the input when focused or containing text.

#### Scenario: Label displays as placeholder when empty
- **WHEN** textarea is empty and not focused
- **AND** label prop is provided
- **THEN** label displays inside textarea at placeholder position
- **AND** label uses placeholder color

#### Scenario: Label floats on focus
- **WHEN** textarea receives focus
- **AND** label prop is provided
- **THEN** label animates to position above textarea
- **AND** label uses primary color
- **AND** label font size reduces

#### Scenario: Label stays floated with content
- **WHEN** textarea has content
- **AND** textarea loses focus
- **THEN** label remains in floated position above textarea
- **AND** label color returns to default

#### Scenario: Native placeholder when no label
- **WHEN** label prop is not provided
- **AND** placeholder prop is provided
- **THEN** native placeholder attribute is used on textarea element

### Requirement: Toolbar Slot

The TextArea component SHALL support a toolbar slot below the textarea for action buttons, formatting controls, or other interactive elements.

#### Scenario: Toolbar renders below textarea
- **WHEN** toolbar prop is provided with a React node
- **THEN** toolbar content renders below the textarea
- **AND** toolbar is inside the component border

#### Scenario: Toolbar layout
- **WHEN** toolbar is rendered
- **THEN** toolbar uses flex layout with horizontal arrangement
- **AND** toolbar has appropriate padding

### Requirement: Error State

The TextArea component SHALL support a boolean error state with visual feedback.

#### Scenario: Error changes border color
- **WHEN** error prop is true
- **THEN** border color changes to error color
- **AND** label color changes to error color

#### Scenario: Supporting text shows in error styling
- **WHEN** error prop is true
- **AND** supportingText prop is provided
- **THEN** supporting text displays below the textarea
- **AND** supporting text uses error color

### Requirement: Supporting Text

The TextArea component SHALL support helper text that displays below the textarea.

#### Scenario: Supporting text displays
- **WHEN** supportingText prop is provided
- **AND** error prop is false or not provided
- **THEN** supporting text displays below the textarea
- **AND** supporting text uses secondary text color

### Requirement: Disabled State

The TextArea component SHALL support a disabled state that prevents interaction and provides visual feedback.

#### Scenario: Disabled prevents input
- **WHEN** disabled prop is true
- **THEN** textarea cannot be edited
- **AND** textarea does not receive focus on click

#### Scenario: Disabled reduces opacity
- **WHEN** disabled prop is true
- **THEN** component opacity is reduced
- **AND** cursor shows not-allowed state

#### Scenario: Disabled passed to native element
- **WHEN** disabled prop is true
- **THEN** native disabled attribute is set on textarea element

### Requirement: Auto-resize

The TextArea component SHALL automatically resize based on content using CSS field-sizing.

#### Scenario: Textarea grows with content
- **WHEN** user types content that exceeds initial height
- **THEN** textarea height increases to fit content
- **AND** scrollbar does not appear until max height

#### Scenario: Textarea respects max height
- **WHEN** content exceeds maximum height (defined by CSS variable)
- **THEN** textarea stops growing
- **AND** scrollbar appears for overflow content

#### Scenario: Textarea shrinks when content removed
- **WHEN** user deletes content
- **THEN** textarea height decreases accordingly

### Requirement: CSS Custom Properties

The TextArea component SHALL define all design tokens as CSS custom properties on the root element with no hardcoded values, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** TextArea component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-textarea- prefix
- **AND** all variables include fallback values
- **AND** no design tokens are hardcoded in the CSS

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** component applies custom values
- **AND** example: `<TextArea style={{ "--reltio-textarea-border-radius": "8px" }}>`

#### Scenario: CSS variables for typography
- **WHEN** TextArea is rendered
- **THEN** font-family defined as --reltio-textarea-font-family
- **AND** font-size defined as --reltio-textarea-font-size
- **AND** line-height defined as --reltio-textarea-line-height
- **AND** text-color defined as --reltio-textarea-color-text

#### Scenario: CSS variables for colors
- **WHEN** TextArea is rendered
- **THEN** border-color defined as --reltio-textarea-color-border
- **AND** focus border color defined as --reltio-textarea-color-border-focus
- **AND** background defined as --reltio-textarea-color-background
- **AND** error-color defined as --reltio-textarea-color-error
- **AND** label color defined as --reltio-textarea-color-label
- **AND** supporting text color defined as --reltio-textarea-color-supporting-text

#### Scenario: CSS variables for sizing
- **WHEN** TextArea is rendered
- **THEN** border-radius defined as --reltio-textarea-border-radius
- **AND** padding defined as --reltio-textarea-padding
- **AND** min-height defined as --reltio-textarea-min-height
- **AND** max-height defined as --reltio-textarea-max-height

### Requirement: className Utility Usage

The TextArea component SHALL use the classNames utility from utils/classNames.ts for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** TextArea is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** provides stable base classes

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved

### Requirement: Keyboard Accessibility

The TextArea component SHALL be fully keyboard accessible with proper focus management.

#### Scenario: Tab key focuses textarea
- **WHEN** user presses Tab key
- **THEN** textarea receives keyboard focus
- **AND** focus indicator becomes visible

#### Scenario: Focus visible styling
- **WHEN** textarea receives keyboard focus
- **THEN** visible focus indicator appears (outline)
- **AND** focus color uses primary color

### Requirement: Screen Reader Support

The TextArea component SHALL provide proper ARIA attributes and semantic HTML for screen reader compatibility.

#### Scenario: Label associated with textarea
- **WHEN** label prop is provided
- **THEN** label is properly associated with textarea
- **AND** screen readers announce the label

#### Scenario: Error state announced
- **WHEN** error prop is true
- **THEN** aria-invalid="true" is set on textarea
- **AND** supporting text is associated via aria-describedby

#### Scenario: Supporting text associated
- **WHEN** supportingText prop is provided
- **THEN** supporting text is associated via aria-describedby
- **AND** screen readers announce supporting text

### Requirement: TypeScript Type Safety

The TextArea component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate TextArea.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props extend textarea attributes
- **WHEN** developer uses TextArea component
- **THEN** TextAreaProps extends React.TextareaHTMLAttributes
- **AND** TypeScript provides autocomplete for all native textarea attributes

#### Scenario: Custom props typed
- **WHEN** developer uses TextArea component
- **THEN** label, error, supportingText, toolbar props have proper types
- **AND** TypeScript provides autocomplete

#### Scenario: Types exported alongside component
- **WHEN** developer imports TextArea
- **THEN** TextAreaProps type can be imported
- **AND** all types use `type` keyword, not `interface`

### Requirement: Storybook Documentation

The TextArea component SHALL have comprehensive Storybook stories demonstrating all variants and use cases, with each story showing only ONE variant.

#### Scenario: Stories for basic usage
- **WHEN** viewing Storybook
- **THEN** Default story shows basic textarea
- **AND** story is interactive and functional

#### Scenario: Stories for label patterns
- **WHEN** viewing Storybook
- **THEN** WithLabel story demonstrates floating label
- **AND** WithPlaceholder story shows native placeholder fallback

#### Scenario: Stories for toolbar
- **WHEN** viewing Storybook
- **THEN** WithToolbar story demonstrates toolbar slot

#### Scenario: Stories for states
- **WHEN** viewing Storybook
- **THEN** WithError story shows error state with supportingText
- **AND** Disabled story shows disabled state
- **AND** WithSupportingText story shows helper text

#### Scenario: Stories for auto-resize
- **WHEN** viewing Storybook
- **THEN** AutoResize story demonstrates height growing with content

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** WithCustomCssVariables story lists all CSS variables
- **AND** variables are demonstrable


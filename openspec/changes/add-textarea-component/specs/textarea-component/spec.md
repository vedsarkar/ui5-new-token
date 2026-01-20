## ADDED Requirements

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

### Requirement: Controlled Value Management

The TextArea component SHALL support a controlled value pattern with value and onChange props, allowing consuming applications to manage state externally.

#### Scenario: Value prop sets textarea content
- **WHEN** value prop is provided
- **THEN** textarea displays the provided value
- **AND** textarea content updates when value prop changes

#### Scenario: onChange callback fires on input
- **WHEN** user types in the textarea
- **THEN** onChange callback is called with the new value string
- **AND** consuming application can update state accordingly

#### Scenario: Uncontrolled mode with defaultValue
- **WHEN** value prop is not provided
- **AND** defaultValue prop is provided
- **THEN** textarea initializes with defaultValue
- **AND** textarea manages its own state internally

#### Scenario: Name prop for form submission
- **WHEN** name prop is provided
- **THEN** textarea element has name attribute set
- **AND** value is included in native form submission

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
- **THEN** label displays inside textarea at placeholder position
- **AND** label uses placeholder color

#### Scenario: Label floats on focus
- **WHEN** textarea receives focus
- **THEN** label animates to position above textarea
- **AND** label uses primary color
- **AND** label font size reduces

#### Scenario: Label stays floated with content
- **WHEN** textarea has content
- **AND** textarea loses focus
- **THEN** label remains in floated position above textarea
- **AND** label color returns to default

#### Scenario: Placeholder fallback
- **WHEN** label prop is not provided
- **AND** placeholder prop is provided
- **THEN** native placeholder attribute is used instead

### Requirement: Icon Slots

The TextArea component SHALL support leading and trailing icon slots for visual affordances and actions.

#### Scenario: Leading icon renders before textarea
- **WHEN** leadingIcon prop is provided with a React node
- **THEN** icon renders to the left of the textarea
- **AND** icon aligns to the top of the input area

#### Scenario: Trailing icon renders after textarea
- **WHEN** trailingIcon prop is provided with a React node
- **THEN** icon renders to the right of the textarea
- **AND** icon aligns to the top of the input area
- **AND** icon is always visible regardless of textarea content

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

The TextArea component SHALL support an error state with visual feedback and error message display.

#### Scenario: Error changes border color
- **WHEN** error prop is provided with a string message
- **THEN** border color changes to error color
- **AND** label color changes to error color

#### Scenario: Error message displays
- **WHEN** error prop is provided
- **THEN** error message displays below the textarea
- **AND** error message uses error color

#### Scenario: Error takes precedence over supporting text
- **WHEN** both error and supportingText props are provided
- **THEN** error message displays
- **AND** supporting text is hidden

### Requirement: Supporting Text

The TextArea component SHALL support helper text that displays below the textarea.

#### Scenario: Supporting text displays
- **WHEN** supportingText prop is provided
- **AND** error prop is not provided
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

#### Scenario: Disabled sets native attribute
- **WHEN** disabled prop is true
- **THEN** native disabled attribute is set on textarea element

### Requirement: Submit on Enter

The TextArea component SHALL support an optional submitOnEnter behavior for chat-style inputs where Enter submits the form.

#### Scenario: Enter submits form when enabled
- **WHEN** submitOnEnter prop is true
- **AND** user presses Enter key without Shift
- **AND** textarea has content
- **THEN** form requestSubmit is called
- **AND** default Enter behavior is prevented

#### Scenario: Shift+Enter inserts newline
- **WHEN** submitOnEnter prop is true
- **AND** user presses Shift+Enter
- **THEN** newline is inserted in textarea
- **AND** form is not submitted

#### Scenario: Enter on empty prevents submission
- **WHEN** submitOnEnter prop is true
- **AND** textarea is empty or whitespace only
- **AND** user presses Enter
- **THEN** default behavior is prevented
- **AND** form is not submitted

#### Scenario: Normal behavior when disabled
- **WHEN** submitOnEnter prop is false or not provided
- **THEN** Enter key inserts newline as normal

### Requirement: Auto-resize

The TextArea component SHALL automatically resize based on content using CSS field-sizing.

#### Scenario: Textarea grows with content
- **WHEN** user types content that exceeds initial height
- **THEN** textarea height increases to fit content
- **AND** scrollbar does not appear until max height

#### Scenario: Textarea respects max height
- **WHEN** content exceeds maximum height
- **THEN** textarea stops growing
- **AND** scrollbar appears for overflow content

#### Scenario: Textarea shrinks when content removed
- **WHEN** user deletes content
- **THEN** textarea height decreases accordingly

### Requirement: CSS Custom Properties Customization

The TextArea component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** TextArea component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-textarea- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** component applies custom values
- **AND** example: `<TextArea style={{ "--reltio-textarea-border-radius": "8px" }}>`

#### Scenario: CSS variables for typography
- **WHEN** TextArea is rendered
- **THEN** font-family defined as --reltio-textarea-font-family
- **AND** font-size defined as --reltio-textarea-font-size
- **AND** text-color defined as --reltio-textarea-color-text

#### Scenario: CSS variables for appearance
- **WHEN** TextArea is rendered
- **THEN** border-radius defined as --reltio-textarea-border-radius
- **AND** border-color defined as --reltio-textarea-color-border
- **AND** background defined as --reltio-textarea-color-background
- **AND** error-color defined as --reltio-textarea-color-error

#### Scenario: CSS variables for spacing
- **WHEN** TextArea is rendered
- **THEN** padding defined as --reltio-textarea-padding
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
- **WHEN** error prop is provided
- **THEN** aria-invalid="true" is set on textarea
- **AND** error message has aria-live or is associated via aria-describedby

#### Scenario: Supporting text associated
- **WHEN** supportingText prop is provided
- **THEN** supporting text is associated via aria-describedby
- **AND** screen readers announce supporting text

### Requirement: TypeScript Type Safety

The TextArea component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate TextArea.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses TextArea component
- **THEN** all props have proper TypeScript types
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
- **AND** WithPlaceholder story shows placeholder fallback

#### Scenario: Stories for icon slots
- **WHEN** viewing Storybook
- **THEN** WithLeadingIcon story shows leading icon
- **AND** WithTrailingIcon story shows trailing icon

#### Scenario: Stories for toolbar
- **WHEN** viewing Storybook
- **THEN** WithToolbar story demonstrates toolbar slot

#### Scenario: Stories for states
- **WHEN** viewing Storybook
- **THEN** WithError story shows error state
- **AND** Disabled story shows disabled state
- **AND** WithSupportingText story shows helper text

#### Scenario: Stories for keyboard behavior
- **WHEN** viewing Storybook
- **THEN** SubmitOnEnter story demonstrates chat-style behavior

#### Scenario: Stories for auto-resize
- **WHEN** viewing Storybook
- **THEN** AutoResize story demonstrates height growing with content

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** WithCustomCssVariables story lists all CSS variables
- **AND** variables are demonstrable

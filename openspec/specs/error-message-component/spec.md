# error-message-component Specification

## Purpose

Displays a standardized error message with an error icon, consistent styling, and screen reader support for alerting users to error conditions.

## Requirements

### Requirement: Error Message Display

The ErrorMessage component SHALL display error messages via the `children` prop, falling back to a default message when children are empty, null, or undefined.

#### Scenario: Custom error message displays correctly
- **WHEN** `children` prop contains content
- **THEN** the custom content is displayed in a `<p>` element with error styling
- **AND** the message is clearly visible and readable

#### Scenario: Default error message displays when no children provided
- **WHEN** `children` prop is not provided, is empty, null, or undefined
- **THEN** the default message "Something went wrong. Please try again." is displayed
- **AND** the default message follows the same styling as custom messages

### Requirement: Error Icon

The ErrorMessage component SHALL always display an ErrorCircle icon to the left of the error text as a visual indicator.

#### Scenario: Icon always displayed
- **WHEN** ErrorMessage component is rendered
- **THEN** an `ErrorCircle` icon with `size="small"` and `color="error"` is displayed
- **AND** the icon is wrapped in a `span` with class `iconWrapper`
- **AND** the icon wrapper has `aria-hidden="true"` (decorative)

#### Scenario: Icon and text layout
- **WHEN** ErrorMessage is rendered
- **THEN** the icon and text are properly aligned via CSS
- **AND** spacing between icon and text is appropriate

### Requirement: Accessibility

The ErrorMessage component SHALL use ARIA attributes to announce errors to screen readers.

#### Scenario: Error message announced to screen readers
- **WHEN** ErrorMessage is rendered
- **THEN** the root element has `role="alert"`
- **AND** the root element has `aria-live="polite"`
- **AND** screen readers announce the error message

### Requirement: CSS Custom Properties Customization

The ErrorMessage component SHALL define design tokens as CSS custom properties on the `.root` class with `--reltio-error-message-` prefix.

#### Scenario: All CSS variables defined on root
- **WHEN** ErrorMessage component is rendered
- **THEN** CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-error-message-` prefix
- **AND** all variables include fallback values

### Requirement: className Utility Usage

The ErrorMessage component SHALL use the `classNames` utility for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** ErrorMessage is rendered
- **THEN** `classNames` utility combines `styles.root` with custom className

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element
- **AND** CSS module classes are preserved

### Requirement: Props Passthrough

The ErrorMessage component SHALL accept and pass through standard div HTML attributes (excluding `children` and `className`) to the root element.

#### Scenario: Additional HTML attributes passed through
- **WHEN** developer provides additional HTML attributes (e.g., `id`, `data-testid`)
- **THEN** attributes are spread onto the root `<div>` element via `...rest`

### Requirement: TypeScript Type Safety

The ErrorMessage component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `ErrorMessage.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses ErrorMessage component
- **THEN** `children` is typed as optional `React.ReactNode | null`
- **AND** `className` is typed as optional string
- **AND** additional div attributes are typed via `Omit<React.ComponentPropsWithoutRef<"div">, "children" | "className">`

#### Scenario: Types exported alongside component
- **WHEN** developer imports ErrorMessage
- **THEN** `ErrorMessageProps` type can be imported
- **AND** types are in `ErrorMessage.types.ts`

### Requirement: Storybook Documentation

The ErrorMessage component SHALL have Storybook stories demonstrating error message display and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for error message display
- **WHEN** viewing Storybook
- **THEN** story exists for default message (no children)
- **AND** story exists for custom message (children provided)

#### Scenario: Stories for accessibility
- **WHEN** viewing Storybook
- **THEN** stories demonstrate `role="alert"` and `aria-live` attributes
- **AND** a11y addon shows no violations

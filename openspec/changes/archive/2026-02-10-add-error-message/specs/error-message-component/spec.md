# ErrorMessage Component Specification

## Purpose

The ErrorMessage component provides a standardized, reusable way to display error states across the application. It ensures consistent error messaging, styling, and accessibility patterns, making it easy to communicate errors to users in a clear and accessible manner.

## ADDED Requirements

### Requirement: Error Message Display

The ErrorMessage component SHALL display error messages with consistent styling and clear visual indication that the content represents an error.

#### Scenario: Custom error message displays correctly
- **WHEN** message prop is provided with text
- **THEN** custom error message is displayed
- **AND** message text is clearly visible and readable
- **AND** message is styled as an error (error colors, distinct appearance)

#### Scenario: Default error message displays when no message provided
- **WHEN** message prop is not provided or is empty
- **THEN** default error message is displayed
- **AND** default message is appropriate and user-friendly
- **AND** default message follows same styling as custom messages

#### Scenario: Empty message handled gracefully
- **WHEN** message prop is empty string, null, or undefined
- **THEN** default error message is displayed
- **AND** no errors are thrown
- **AND** component remains stable

### Requirement: Error Icon Support

The ErrorMessage component SHALL support optional error icon display to provide visual indication of error state.

#### Scenario: Icon displays when showIcon is true
- **WHEN** showIcon prop is true (default)
- **THEN** ErrorCircle icon is displayed
- **AND** icon is positioned appropriately relative to message text
- **AND** icon uses error colors
- **AND** icon is properly sized

#### Scenario: Icon hidden when showIcon is false
- **WHEN** showIcon prop is false
- **THEN** icon is not displayed
- **AND** message text still displays correctly
- **AND** layout adjusts appropriately

#### Scenario: Icon accessibility
- **WHEN** icon is displayed
- **THEN** icon has aria-hidden="true" (decorative)
- **AND** icon does not interfere with screen reader announcements
- **AND** error message text provides all necessary information

### Requirement: Accessibility

The ErrorMessage component SHALL be fully accessible, ensuring error messages are announced to screen readers and properly identified as errors.

#### Scenario: Error message announced to screen readers
- **WHEN** ErrorMessage is rendered
- **THEN** component has role="alert" attribute
- **AND** error message is announced to screen readers
- **AND** screen readers identify content as an error

#### Scenario: Live region for dynamic errors
- **WHEN** ErrorMessage is rendered dynamically (e.g., after user action)
- **THEN** component has aria-live="polite" or aria-live="assertive" attribute
- **AND** screen readers announce error when it appears
- **AND** aria-live value is appropriate for error severity

#### Scenario: Keyboard accessibility
- **WHEN** ErrorMessage is rendered
- **THEN** component is keyboard accessible
- **AND** focus management works correctly if component is focusable
- **AND** keyboard navigation does not interfere with error display

### Requirement: Visual Design

The ErrorMessage component SHALL have distinct visual styling that clearly identifies content as an error, with appropriate colors, spacing, and layout.

#### Scenario: Error styling is visually distinct
- **WHEN** ErrorMessage is rendered
- **THEN** component uses error colors (typically red/error palette)
- **AND** error styling is clearly distinguishable from normal content
- **AND** error styling is consistent across application

#### Scenario: Error container styling
- **WHEN** ErrorMessage is rendered
- **THEN** error container has appropriate background color
- **AND** error container has appropriate border (if applicable)
- **AND** error container has appropriate padding and border-radius
- **AND** error container has proper spacing from surrounding content

#### Scenario: Error text styling
- **WHEN** ErrorMessage is rendered
- **THEN** error text has appropriate color and contrast
- **AND** error text is readable
- **AND** error text has appropriate font size and weight
- **AND** error text meets WCAG contrast requirements

#### Scenario: Icon and text layout
- **WHEN** ErrorMessage is rendered with icon
- **THEN** icon and text are properly aligned
- **AND** spacing between icon and text is appropriate
- **AND** layout works correctly for single and multi-line messages

### Requirement: CSS Custom Properties Customization

The ErrorMessage component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** ErrorMessage component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-error-message- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** ErrorMessage applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<ErrorMessage style={{ "--reltio-error-message-background": "#fee" }}>`

#### Scenario: CSS variables for colors
- **WHEN** ErrorMessage is rendered
- **THEN** background color defined
- **AND** text color defined
- **AND** border color defined (if applicable)
- **AND** icon color defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for spacing
- **WHEN** ErrorMessage is rendered
- **THEN** padding defined
- **AND** margin defined
- **AND** icon spacing defined
- **AND** border-radius defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for typography
- **WHEN** ErrorMessage is rendered
- **THEN** font-family, font-size, font-weight, line-height defined
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The ErrorMessage component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** ErrorMessage is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The ErrorMessage component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate ErrorMessage.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses ErrorMessage component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Message prop type
- **WHEN** message prop is provided
- **THEN** message accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: ShowIcon prop type
- **WHEN** showIcon prop is provided
- **THEN** showIcon accepts boolean type
- **AND** default value is true
- **AND** type is clearly documented

#### Scenario: Types exported alongside component
- **WHEN** developer imports ErrorMessage
- **THEN** ErrorMessageProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The ErrorMessage component SHALL have comprehensive Storybook stories demonstrating error message display, icon usage, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for error message display
- **WHEN** viewing Storybook
- **THEN** separate stories exist for default message, custom message, with icon, without icon
- **AND** each story shows single variant
- **AND** stories are interactive and functional

#### Scenario: Stories for icon usage
- **WHEN** viewing Storybook
- **THEN** stories exist for error message with icon
- **AND** stories exist for error message without icon
- **AND** icon positioning and styling are clearly visible

#### Scenario: Stories for edge cases
- **WHEN** viewing Storybook
- **THEN** stories exist for empty/null message
- **THEN** stories exist for long error messages
- **AND** edge cases are clearly demonstrated

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate role="alert" and aria-live attributes
- **AND** a11y addon shows no violations
- **AND** keyboard navigation works correctly
- **AND** screen reader compatibility is demonstrated

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage

## Technical Implementation

### Component Structure
- `ErrorMessage.tsx` - Component implementation
- `ErrorMessage.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `ErrorMessage.module.css` - CSS Modules styles with all CSS variables on .root
- `ErrorMessage.stories.tsx` - Storybook stories (one variant per story)
- `index.ts` - Public exports

### Dependencies
- React 17+
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts
- ErrorCircle icon from icon library

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- WCAG 2.1 Level AA compliant
- role="alert" for error identification
- aria-live for dynamic error announcements
- Screen reader compatible
- Keyboard navigation support
- Proper color contrast for error text

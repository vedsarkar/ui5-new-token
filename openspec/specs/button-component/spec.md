# Button Component Specification

## Purpose

The Button component is a universal, accessible button that supports multiple visual variants, colors, sizes, states, and can render as either a `<button>` or `<a>` element based on the presence of an `href` prop. It follows all Reltio Design Platform constitution principles including CSS Modules, CSS custom properties, TypeScript strict typing, and accessibility standards.

## Requirements

### Requirement: Visual Variants

The Button component SHALL support three visual variants: filled, outlined, and text. Each variant provides distinct visual appearance while maintaining consistent behavior and accessibility.

#### Scenario: Filled variant renders with solid background
- **WHEN** variant prop is set to "filled"
- **THEN** button renders with solid background color
- **AND** no visible border
- **AND** contrasting text color for readability

#### Scenario: Outlined variant renders with border only
- **WHEN** variant prop is set to "outlined"
- **THEN** button renders with transparent background
- **AND** visible border matching the color theme
- **AND** text color matching the border color

#### Scenario: Text variant renders without background or border
- **WHEN** variant prop is set to "text"
- **THEN** button renders with transparent background
- **AND** no visible border
- **AND** text color only

#### Scenario: Default variant is filled
- **WHEN** no variant prop is provided
- **THEN** button uses "filled" variant as default

### Requirement: Color Options

The Button component SHALL support two color options: primary and inherited. Primary uses the design system's primary color, while inherited uses colors from parent context.

#### Scenario: Primary color uses design system primary
- **WHEN** color prop is set to "primary"
- **THEN** button uses --reltio-button-color-primary CSS variable
- **AND** applies appropriate contrast colors for accessibility

#### Scenario: Inherited color uses parent context
- **WHEN** color prop is set to "inherited"
- **THEN** button inherits colors from parent element
- **AND** maintains visual consistency with surrounding content

#### Scenario: Default color is inherited
- **WHEN** no color prop is provided
- **THEN** button uses "inherited" color as default

### Requirement: Size Variants

The Button component SHALL support three size variants: small, medium, and large. Each size adjusts padding, height, and font size proportionally.

#### Scenario: Small size for compact layouts
- **WHEN** size prop is set to "small"
- **THEN** button renders with min-height of 32px
- **AND** font-size of 0.875rem (14px)
- **AND** compact padding (8px vertical, 16px horizontal)

#### Scenario: Medium size for standard usage
- **WHEN** size prop is set to "medium"
- **THEN** button renders with min-height of 40px
- **AND** font-size of 1rem (16px)
- **AND** standard padding (12px vertical, 20px horizontal)

#### Scenario: Large size for emphasis
- **WHEN** size prop is set to "large"
- **THEN** button renders with min-height of 48px
- **AND** font-size of 1rem (16px)
- **AND** generous padding (16px vertical, 32px horizontal)

#### Scenario: Default size is medium
- **WHEN** no size prop is provided
- **THEN** button uses "medium" size as default

### Requirement: Disabled State

The Button component SHALL support a disabled state that prevents interaction and provides clear visual feedback. When disabled, the button removes focus if currently focused.

#### Scenario: Disabled button prevents interaction
- **WHEN** disabled prop is true
- **THEN** button cannot be clicked or activated
- **AND** pointer-events are disabled
- **AND** cursor shows not-allowed state

#### Scenario: Disabled button has reduced opacity
- **WHEN** disabled prop is true
- **THEN** button opacity is set to 0.38
- **AND** visual appearance clearly indicates disabled state

#### Scenario: Disabled button removes focus
- **WHEN** button is currently focused
- **AND** disabled prop becomes true
- **THEN** button automatically loses focus (blur)

#### Scenario: Disabled button sets ARIA attribute
- **WHEN** disabled prop is true
- **THEN** aria-disabled attribute is set to true
- **AND** screen readers announce disabled state

#### Scenario: Disabled link prevents navigation
- **WHEN** button is rendered as anchor (href provided)
- **AND** disabled prop is true
- **THEN** href attribute is removed
- **AND** click event is prevented
- **AND** navigation does not occur

### Requirement: Polymorphic Rendering

The Button component SHALL render as either a `<button>` or `<a>` element based on the presence of an `href` prop, maintaining consistent appearance and behavior across both element types.

#### Scenario: Renders as button element by default
- **WHEN** no href prop is provided
- **THEN** component renders as native <button> element
- **AND** supports type attribute (button, submit, reset)
- **AND** default type is "button"

#### Scenario: Renders as anchor element with href
- **WHEN** href prop is provided
- **THEN** component renders as native <a> element
- **AND** supports standard anchor attributes (target, rel)
- **AND** maintains button-like appearance and behavior

#### Scenario: Anchor element supports keyboard navigation
- **WHEN** rendered as anchor element
- **AND** user presses Enter or Space key
- **THEN** navigation is triggered
- **AND** Space key press prevents page scroll

### Requirement: Keyboard Accessibility

The Button component SHALL be fully keyboard accessible, supporting Tab navigation, Enter and Space activation, and visible focus indicators.

#### Scenario: Tab key focuses button
- **WHEN** user presses Tab key
- **THEN** button receives keyboard focus
- **AND** focus indicator becomes visible

#### Scenario: Enter key activates button
- **WHEN** button has keyboard focus
- **AND** user presses Enter key
- **THEN** onClick handler is called
- **AND** button action is executed

#### Scenario: Space key activates button
- **WHEN** button has keyboard focus
- **AND** user presses Space key
- **THEN** onClick handler is called
- **AND** page scroll is prevented
- **AND** button action is executed

#### Scenario: Focus visible outline
- **WHEN** button receives keyboard focus
- **THEN** 2px solid outline appears
- **AND** outline uses primary color
- **AND** outline has 2px offset from button

#### Scenario: Disabled button prevents keyboard activation
- **WHEN** button is disabled
- **AND** user presses Enter or Space
- **THEN** event is prevented
- **AND** onClick handler is not called

### Requirement: Screen Reader Support

The Button component SHALL provide proper ARIA attributes and semantic HTML for screen reader compatibility.

#### Scenario: Button has accessible label
- **WHEN** aria-label prop is provided
- **THEN** button has aria-label attribute
- **AND** screen readers announce the label

#### Scenario: Disabled state announced to screen readers
- **WHEN** button is disabled
- **THEN** aria-disabled="true" is set
- **AND** screen readers announce disabled state

#### Scenario: Button content is accessible
- **WHEN** button contains text content
- **THEN** text is accessible to screen readers
- **AND** provides clear action description

### Requirement: CSS Custom Properties Customization

The Button component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** button component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-button- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** button applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<Button style={{ "--reltio-button-color-primary": "red" }}>`

#### Scenario: CSS variables for colors
- **WHEN** button is rendered
- **THEN** primary color defined as --reltio-button-color-primary
- **AND** primary text color as --reltio-button-color-primary-text
- **AND** text color as --reltio-button-color-text
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for spacing
- **WHEN** button is rendered
- **THEN** padding values defined for each size (small, medium, large)
- **AND** gap between content items defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for typography
- **WHEN** button is rendered
- **THEN** font-family, font-size, font-weight defined
- **AND** line-height and letter-spacing defined
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The Button component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization. The composition SHALL include the `iconOnly` class when icon-only mode is detected.

#### Scenario: classNames utility composes CSS modules
- **WHEN** button is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to button element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

#### Scenario: iconOnly class added when icon-only mode detected
- **WHEN** children is a single React component element
- **THEN** classNames composition includes the `iconOnly` CSS module class
- **AND** the stable class `reltio_Button_iconOnly` is available for external customization

### Requirement: Full Width Layout Support

The Button component SHALL support a fullWidth option that makes the button expand to fill its container's width.

#### Scenario: Full width button spans container
- **WHEN** fullWidth prop is true
- **THEN** button width is set to 100%
- **AND** button fills parent container horizontally
- **AND** maintains all other styling and behavior

#### Scenario: Default width is auto
- **WHEN** fullWidth prop is false or not provided
- **THEN** button width is determined by content
- **AND** button uses inline-flex display

### Requirement: Click Event Handling

The Button component SHALL handle click events properly for both button and anchor elements, with proper disabled state handling.

#### Scenario: Click handler called on click
- **WHEN** button is clicked
- **AND** button is not disabled
- **THEN** onClick handler is called with event
- **AND** event contains proper target and meta information

#### Scenario: Disabled button prevents click
- **WHEN** button is clicked
- **AND** button is disabled
- **THEN** event is prevented
- **AND** onClick handler is not called

#### Scenario: Link click respects disabled state
- **WHEN** button is rendered as anchor
- **AND** button is disabled
- **AND** button is clicked
- **THEN** navigation is prevented
- **AND** onClick handler is not called

### Requirement: TypeScript Type Safety

The Button component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate Button.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses Button component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Polymorphic types for button vs anchor
- **WHEN** href prop is provided
- **THEN** anchor-specific props are available (target, rel)
- **AND** button-specific props are excluded (type)
- **WHEN** href prop is not provided
- **THEN** button-specific props are available (type)
- **AND** anchor-specific props are excluded

#### Scenario: Types exported alongside component
- **WHEN** developer imports Button
- **THEN** ButtonProps type can be imported
- **AND** ButtonVariant, ButtonColor, ButtonSize types available
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The Button component SHALL have comprehensive Storybook stories demonstrating all variants, states, and use cases, with each story showing only ONE variant. This includes icon-only mode stories.

#### Scenario: Stories for all visual variants
- **WHEN** viewing Storybook
- **THEN** separate stories exist for Filled, Outlined, Text
- **AND** each story shows single variant
- **AND** stories are interactive and functional

#### Scenario: Stories for all color options
- **WHEN** viewing Storybook
- **THEN** stories exist for Primary color in each variant
- **AND** stories exist for Inherited color
- **AND** each story shows single color option

#### Scenario: Stories for all sizes
- **WHEN** viewing Storybook
- **THEN** separate stories exist for Small, Medium, Large
- **AND** each story shows single size
- **AND** size differences are clearly visible

#### Scenario: Stories for disabled state
- **WHEN** viewing Storybook
- **THEN** stories exist for disabled state in each variant
- **AND** disabled behavior is demonstrable
- **AND** disabled styling is clearly visible

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate aria-label usage
- **AND** stories show keyboard navigation
- **AND** a11y addon shows no violations

#### Scenario: Stories for link behavior
- **WHEN** viewing Storybook
- **THEN** stories exist for button as link (with href)
- **AND** stories show external link with target="_blank"
- **AND** stories show disabled link behavior

#### Scenario: Stories for custom styling
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage
- **AND** stories demonstrate fullWidth option

#### Scenario: Stories for icon-only mode
- **WHEN** viewing Storybook
- **THEN** stories exist for icon-only buttons across variants
- **AND** each story shows a single circular icon-only button
- **AND** icon-only stories demonstrate variant and color combinations

## Technical Implementation

### Component Structure
- `Button.tsx` - Component implementation
- `Button.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `Button.module.css` - CSS Modules styles with all CSS variables on .root
- `Button.stories.tsx` - Storybook stories (one variant per story)
- `index.ts` - Public exports

### Dependencies
- React 19
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- WCAG 2.1 Level AA compliant
- Keyboard navigable (Tab, Enter, Space)
- Screen reader compatible
- Proper ARIA attributes
- Visible focus indicators

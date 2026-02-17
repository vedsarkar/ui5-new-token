# Loading Component Specification

## Purpose

The Loading component provides a standardized, reusable way to display loading states across the application. It ensures consistent loading indicators, styling, and accessibility patterns, making it easy to communicate loading states to users in a clear and accessible manner.

## ADDED Requirements

### Requirement: Loading Indicator Display

The Loading component SHALL display a loading GIF indicator that clearly communicates a loading state to users.

#### Scenario: Loading GIF displays correctly
- **WHEN** Loading component is rendered
- **THEN** loading GIF is displayed
- **AND** GIF is visually distinct and clearly indicates loading state
- **AND** GIF animation plays continuously

#### Scenario: GIF animation
- **WHEN** Loading component is rendered
- **THEN** GIF plays continuously
- **AND** animation is smooth and performant
- **AND** animation does not cause performance issues

### Requirement: Size Variants

The Loading component SHALL support different size variants to accommodate various use cases and contexts.

#### Scenario: Small size displays correctly
- **WHEN** size prop is "small"
- **THEN** loading GIF is displayed at small size
- **AND** GIF is appropriately sized for compact contexts
- **AND** GIF remains clearly visible

#### Scenario: Medium size displays correctly
- **WHEN** size prop is "medium" (default)
- **THEN** loading GIF is displayed at medium size
- **AND** GIF is appropriately sized for standard contexts
- **AND** GIF is clearly visible

#### Scenario: Large size displays correctly
- **WHEN** size prop is "large"
- **THEN** loading GIF is displayed at large size
- **AND** GIF is appropriately sized for prominent contexts
- **AND** GIF is clearly visible

### Requirement: Accessibility

The Loading component SHALL be fully accessible, ensuring loading states are announced to screen readers and properly identified as loading indicators.

#### Scenario: Loading state announced to screen readers
- **WHEN** Loading component is rendered
- **THEN** component has aria-busy="true" attribute
- **AND** loading state is announced to screen readers
- **AND** screen readers identify content as loading

#### Scenario: Loading label announced
- **WHEN** label prop is provided
- **THEN** component has aria-label with custom label text
- **AND** screen readers announce custom label
- **WHEN** label prop is not provided
- **THEN** component has aria-label with default label text
- **AND** screen readers announce default label

#### Scenario: Keyboard accessibility
- **WHEN** Loading component is rendered
- **THEN** component is keyboard accessible if focusable
- **AND** keyboard navigation does not interfere with loading display

### Requirement: Visual Design

The Loading component SHALL have distinct visual styling that clearly identifies content as a loading indicator, with appropriate sizing and spacing.

#### Scenario: Loading styling is visually distinct
- **WHEN** Loading component is rendered
- **THEN** loading GIF uses appropriate styling
- **AND** GIF styling is clearly distinguishable from normal content
- **AND** GIF styling is consistent across application

#### Scenario: GIF container styling
- **WHEN** Loading component is rendered
- **THEN** GIF container has appropriate sizing
- **AND** GIF container has proper spacing
- **AND** GIF container does not interfere with surrounding content

#### Scenario: GIF animation styling
- **WHEN** Loading component is rendered
- **THEN** GIF plays smoothly
- **AND** GIF animation is visually appealing
- **AND** GIF animation does not cause visual fatigue

### Requirement: CSS Custom Properties Customization

The Loading component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** Loading component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-loading- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** Loading applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<Loading style={{ "--reltio-loading-size": "48px" }}>`

#### Scenario: CSS variables for sizing
- **WHEN** Loading component is rendered
- **THEN** GIF size defined for each size variant
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The Loading component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Loading component is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The Loading component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate Loading.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses Loading component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Size prop type
- **WHEN** size prop is provided
- **THEN** size accepts "small" | "medium" | "large" type
- **AND** default value is "medium"
- **AND** type is clearly documented

#### Scenario: Label prop type
- **WHEN** label prop is provided
- **THEN** label accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: Types exported alongside component
- **WHEN** developer imports Loading
- **THEN** LoadingProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The Loading component SHALL have comprehensive Storybook stories demonstrating loading states, size variants, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for size variants
- **WHEN** viewing Storybook
- **THEN** separate stories exist for small, medium, large sizes
- **AND** each story shows single variant
- **AND** stories are interactive and functional

#### Scenario: Stories for label usage
- **WHEN** viewing Storybook
- **THEN** stories exist for loading with custom label
- **AND** stories exist for loading without label (default)
- **AND** label accessibility is clearly visible

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate aria-busy and aria-label attributes
- **AND** a11y addon shows no violations
- **AND** keyboard navigation works correctly
- **AND** screen reader compatibility is demonstrated

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage

## Technical Implementation

### Component Structure
- `Loading.tsx` - Component implementation
- `Loading.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `Loading.module.css` - CSS Modules styles with all CSS variables on .root
- `Loading.stories.tsx` - Storybook stories (one variant per story)
- `index.ts` - Public exports

### Dependencies
- React 17+
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)
- GIF image format support required

### Accessibility Standards
- WCAG 2.1 Level AA compliant
- aria-busy="true" for loading identification
- aria-label for loading state description
- Screen reader compatible
- Keyboard navigation support

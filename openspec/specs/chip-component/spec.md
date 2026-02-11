# Chip Component Specification

## Purpose

The Chip component is a compact, inline element used to display labels, tags, statuses, or user selections. It supports two visual variants (filled and outlined), five semantic colors, two sizes, an optional leading icon, an optional remove button, and an optional click action that upgrades the element to an interactive `<button>`. It follows all Reltio Design Platform constitution principles including CSS Modules, CSS custom properties, TypeScript strict typing, and accessibility standards.

## Requirements

### Requirement: Visual Variants

The Chip component SHALL support two visual variants: filled and outlined.

#### Scenario: Filled variant renders with tinted background

- **WHEN** variant prop is set to "filled"
- **THEN** chip renders with a tinted background color matching the selected color
- **AND** text color contrasts against the background for readability
- **AND** border is transparent

#### Scenario: Outlined variant renders with border only

- **WHEN** variant prop is set to "outlined"
- **THEN** chip renders with transparent background
- **AND** a visible border matching the selected color
- **AND** text color matching the border color

#### Scenario: Default variant is filled

- **WHEN** no variant prop is provided
- **THEN** chip uses "filled" variant as default

### Requirement: Color Options

The Chip component SHALL support five semantic color options: default, primary, success, warning, and error.

#### Scenario: Default color uses surface tones

- **WHEN** color prop is set to "default" or not provided
- **THEN** chip uses neutral surface background and text colors

#### Scenario: Primary color uses design system primary

- **WHEN** color prop is set to "primary"
- **THEN** chip uses --reltio-color-primary for text/border
- **AND** a light tinted background in filled variant

#### Scenario: Success color indicates positive status

- **WHEN** color prop is set to "success"
- **THEN** chip uses green tones for background, text, and border

#### Scenario: Warning color indicates caution

- **WHEN** color prop is set to "warning"
- **THEN** chip uses amber/orange tones for background, text, and border

#### Scenario: Error color indicates negative status

- **WHEN** color prop is set to "error"
- **THEN** chip uses red tones for background, text, and border

#### Scenario: Default color is default

- **WHEN** no color prop is provided
- **THEN** chip uses "default" color as default

### Requirement: Size Variants

The Chip component SHALL support two size variants: small and medium.

#### Scenario: Medium size for standard usage

- **WHEN** size prop is set to "medium" or not provided
- **THEN** chip renders with height of 32px
- **AND** font-size of 14px
- **AND** horizontal padding of 12px
- **AND** icon size of 18px
- **AND** border-radius of 8px

#### Scenario: Small size for compact layouts

- **WHEN** size prop is set to "small"
- **THEN** chip renders with height of 26px
- **AND** font-size of 12px
- **AND** horizontal padding of 8px
- **AND** icon size of 16px
- **AND** border-radius of 6px

#### Scenario: Default size is medium

- **WHEN** no size prop is provided
- **THEN** chip uses "medium" size as default

### Requirement: Leading Icon

The Chip component SHALL support an optional leading icon displayed before the label text.

#### Scenario: Icon displayed before label

- **WHEN** the icon prop is provided with a React node
- **THEN** the icon is rendered before the children text
- **AND** the icon is sized to match --reltio-chip-icon-size
- **AND** the icon is vertically centered with the label

#### Scenario: No icon by default

- **WHEN** the icon prop is not provided
- **THEN** no icon container is rendered

### Requirement: Removable Action

The Chip component SHALL support an optional close button that triggers a removal callback.

#### Scenario: Close button displayed

- **WHEN** the onRemove prop is provided
- **THEN** a close button with the Close icon SHALL be displayed after the label text
- **AND** the close button starts at 0.7 opacity and transitions to 1.0 on hover

#### Scenario: Close button interaction

- **WHEN** the user clicks the close button
- **THEN** the onRemove callback SHALL be invoked
- **AND** the click event SHALL NOT propagate to the chip's onClick handler

#### Scenario: Keyboard removal

- **WHEN** the close button has focus and the user presses Enter or Space
- **THEN** the onRemove callback SHALL be invoked

### Requirement: Clickable Chip

The Chip component SHALL support an optional onClick handler that makes the chip interactive.

#### Scenario: Clickable chip renders as button element

- **WHEN** the onClick prop is provided
- **THEN** the chip renders as a `<button>` element instead of a `<span>`
- **AND** the cursor changes to pointer
- **AND** a subtle box-shadow appears on hover
- **AND** the box-shadow is removed on active press

#### Scenario: Non-interactive chip renders as span

- **WHEN** the onClick prop is not provided
- **THEN** the chip renders as a `<span>` element
- **AND** no interactive hover or focus styles are applied

#### Scenario: Interactive hover with color variants

- **WHEN** a clickable chip is hovered
- **THEN** the background color darkens slightly for the active variant and color combination

### Requirement: Disabled State

The Chip component SHALL support a disabled state that prevents interaction.

#### Scenario: Disabled appearance

- **WHEN** the disabled prop is true
- **THEN** the chip renders with opacity of 0.38
- **AND** pointer-events are disabled

#### Scenario: Disabled close button

- **WHEN** the disabled prop is true and onRemove is provided
- **THEN** the close button is disabled via the HTML disabled attribute
- **AND** the close button is not clickable

#### Scenario: Disabled clickable chip

- **WHEN** the disabled prop is true and onClick is provided
- **THEN** the button element is disabled via the HTML disabled attribute

### Requirement: Props API

The Chip component SHALL accept the following props for customization.

#### Scenario: Props accepted

- **WHEN** the Chip is instantiated
- **THEN** it SHALL accept `children`, `variant`, `color`, `size`, `icon`, `onRemove`, `onClick`, `disabled`, `className`, and `style` props
- **AND** the `style` prop SHALL support CSS custom property overrides with `--reltio-chip-` prefix

### Requirement: CSS Custom Properties

All visual properties of the Chip SHALL be defined as CSS custom properties on the `.root` class.

#### Scenario: CSS variable definitions

- **WHEN** the Chip is rendered
- **THEN** the `.root` class SHALL define CSS variables with `--reltio-chip-` prefix for: background, color, border-color, font-family, font-size, font-weight, letter-spacing, height, padding-x, padding-y, gap, border-radius, icon-size, disabled-opacity, transition-duration, and transition-timing
- **AND** all CSS variables SHALL include fallback values

#### Scenario: External customization

- **WHEN** a consumer overrides `--reltio-chip-background` via the style prop
- **THEN** the Chip background SHALL reflect the overridden value

#### Scenario: Transitions

- **WHEN** the Chip state changes (hover, active)
- **THEN** background-color, border-color, and box-shadow transitions SHALL use 180ms ease timing

### Requirement: Accessibility

The Chip component SHALL be accessible to screen readers and keyboard users.

#### Scenario: Close button accessibility

- **WHEN** the close button is rendered
- **THEN** it SHALL have an aria-label of "Remove"
- **AND** it SHALL be focusable via keyboard navigation
- **AND** it SHALL show a 2px primary-colored focus ring on focus-visible

#### Scenario: Clickable chip accessibility

- **WHEN** the chip is rendered as a button element
- **THEN** it SHALL be focusable via keyboard navigation
- **AND** it SHALL show a 2px primary-colored focus ring on focus-visible

### Requirement: className Utility Usage

The Chip component SHALL use the classNames utility from utils/classNames.ts for all className composition.

#### Scenario: classNames utility composes CSS modules

- **WHEN** chip is rendered
- **THEN** classNames utility combines root, variant, color, size, interactive, disabled, and custom className
- **AND** filters out falsy values

#### Scenario: Custom className support

- **WHEN** developer provides className prop
- **THEN** custom classes are added to the chip element
- **AND** CSS module classes are preserved

### Requirement: TypeScript Type Safety

The Chip component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate Chip.types.ts file using the `type` keyword.

#### Scenario: Component props fully typed

- **WHEN** developer uses Chip component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete for variant, color, and size

#### Scenario: Types exported alongside component

- **WHEN** developer imports Chip
- **THEN** ChipProps, ChipVariant, ChipColor, and ChipSize types can be imported

### Requirement: Storybook Documentation

The Chip component SHALL have comprehensive Storybook stories demonstrating all variants, states, and use cases, with each story showing only ONE variant.

#### Scenario: Stories for core functionality

- **WHEN** viewing Storybook
- **THEN** separate stories exist for Default, Removable, Clickable, WithIcon, Small, and Disabled

#### Scenario: Stories for filled color variants

- **WHEN** viewing Storybook
- **THEN** separate stories exist for FilledPrimary, FilledSuccess, FilledWarning, and FilledError

#### Scenario: Stories for outlined color variants

- **WHEN** viewing Storybook
- **THEN** separate stories exist for OutlinedDefault, OutlinedPrimary, OutlinedSuccess, OutlinedWarning, and OutlinedError

#### Scenario: Stories for custom styling

- **WHEN** viewing Storybook
- **THEN** a CustomStyled story demonstrates CSS variable overrides via the style prop

## Technical Implementation

### Component Structure
- `Chip.tsx` - Component implementation
- `Chip.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `Chip.module.css` - CSS Modules styles with all CSS variables on .root
- `Chip.stories.tsx` - Storybook stories (one variant per story)
- `Spec.story.mdx` - Component specification rendered in Storybook
- `index.ts` - Public exports

### Dependencies
- React 19
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts
- Close icon from icons/Close

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

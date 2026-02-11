# chip-component Specification

## Purpose
TBD - created by archiving change add-chip-component. Update Purpose after archive.
## Requirements
### Requirement: Chip Rendering

The Chip component SHALL render as an inline-flex container displaying a text label.

#### Scenario: Default rendering

- **WHEN** the Chip is rendered with children text
- **THEN** it SHALL display the text inside a styled container
- **AND** the container SHALL have background color, border radius, and padding per design tokens

#### Scenario: Rendering without close button

- **WHEN** the Chip is rendered without an `onRemove` prop
- **THEN** it SHALL NOT display a close button

### Requirement: Chip Removable Action

The Chip component SHALL support an optional close button that triggers a removal callback.

#### Scenario: Close button displayed

- **WHEN** the `onRemove` prop is provided
- **THEN** a close button with the Close icon SHALL be displayed after the label text

#### Scenario: Close button interaction

- **WHEN** the user clicks the close button
- **THEN** the `onRemove` callback SHALL be invoked

#### Scenario: Keyboard removal

- **WHEN** the close button has focus and the user presses Enter or Space
- **THEN** the `onRemove` callback SHALL be invoked

### Requirement: Chip Props API

The Chip component SHALL accept standard component props for customization.

#### Scenario: Props accepted

- **WHEN** the Chip is instantiated
- **THEN** it SHALL accept `children`, `onRemove`, `disabled`, `className`, and `style` props
- **AND** the `style` prop SHALL support CSS custom property overrides with `--reltio-chip-` prefix

### Requirement: Chip Disabled State

The Chip component SHALL support a disabled state that prevents interaction.

#### Scenario: Disabled appearance

- **WHEN** the `disabled` prop is `true`
- **THEN** the Chip SHALL render with reduced opacity
- **AND** the close button SHALL NOT be clickable

### Requirement: Chip CSS Custom Properties

All visual properties of the Chip SHALL be defined as CSS custom properties on the `.root` class.

#### Scenario: CSS variable definitions

- **WHEN** the Chip is rendered
- **THEN** the `.root` class SHALL define CSS variables with `--reltio-chip-` prefix for background, color, font-family, font-size, letter-spacing, padding, gap, border-radius, icon-size, and disabled-opacity
- **AND** all CSS variables SHALL include fallback values

#### Scenario: External customization

- **WHEN** a consumer overrides `--reltio-chip-background` via the `style` prop
- **THEN** the Chip background SHALL reflect the overridden value

### Requirement: Chip Accessibility

The Chip component SHALL be accessible to screen readers and keyboard users.

#### Scenario: Close button accessibility

- **WHEN** the close button is rendered
- **THEN** it SHALL have an `aria-label` describing its action
- **AND** it SHALL be focusable via keyboard navigation

### Requirement: Chip Storybook Documentation

The Chip component SHALL have Storybook stories demonstrating all variants.

#### Scenario: Stories provided

- **WHEN** viewing the Chip in Storybook
- **THEN** there SHALL be individual stories for Default, Removable, Disabled, and CustomStyled variants
- **AND** each story SHALL demonstrate exactly one variant


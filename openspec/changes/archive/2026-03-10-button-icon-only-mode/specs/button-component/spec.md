## MODIFIED Requirements

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

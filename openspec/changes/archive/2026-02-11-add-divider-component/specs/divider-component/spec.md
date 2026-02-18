## ADDED Requirements

### Requirement: Horizontal Rendering

The Divider component SHALL render as a horizontal line separator by default. It MUST use an `<hr>` HTML element to provide semantic meaning as a thematic break between content sections.

#### Scenario: Default horizontal divider renders correctly

- **WHEN** the Divider component is rendered without any props
- **THEN** it displays a horizontal line spanning the full width of its container
- **AND** it renders as an `<hr>` element

#### Scenario: Divider fills container width

- **WHEN** the Divider component is placed inside a container
- **THEN** its width is 100% of the parent container
- **AND** it maintains consistent height defined by the thickness CSS variable

### Requirement: CSS Custom Properties

The Divider component SHALL define all design tokens as CSS custom properties on the `.root` class element, using the `--reltio-divider-` prefix. All variables MUST include fallback values to ensure the component renders correctly without external theme configuration.

#### Scenario: All CSS variables defined on root

- **WHEN** the Divider component is rendered
- **THEN** all CSS custom properties are defined on the `.root` class
- **AND** variables use the `--reltio-divider-` prefix
- **AND** all variables include fallback values

#### Scenario: Color variable with fallback

- **WHEN** the Divider component is rendered
- **THEN** `--reltio-divider-color` is defined with a fallback value
- **AND** the divider line uses this variable for its color

#### Scenario: Thickness variable with fallback

- **WHEN** the Divider component is rendered
- **THEN** `--reltio-divider-thickness` is defined with a fallback value of `1px`
- **AND** the divider line uses this variable for its height

#### Scenario: Spacing variable with fallback

- **WHEN** the Divider component is rendered
- **THEN** `--reltio-divider-spacing` is defined with a fallback value
- **AND** the divider uses this variable for vertical margin

#### Scenario: External customization via inline styles

- **WHEN** a developer provides a `style` prop with CSS variables
- **THEN** the Divider applies the custom values
- **AND** maintains all other styling and behavior

### Requirement: Accessibility

The Divider component SHALL provide proper ARIA attributes for screen reader compatibility. It MUST use `role="separator"` and `aria-orientation="horizontal"` to communicate its purpose to assistive technologies.

#### Scenario: Separator role is set

- **WHEN** the Divider component is rendered
- **THEN** it has `role="separator"` attribute
- **AND** screen readers announce it as a separator

#### Scenario: Horizontal orientation is communicated

- **WHEN** the Divider component is rendered
- **THEN** it has `aria-orientation="horizontal"` attribute
- **AND** assistive technologies understand its orientation

#### Scenario: Decorative divider is hidden from screen readers

- **WHEN** the Divider component is rendered with `aria-hidden="true"`
- **THEN** screen readers skip the divider element
- **AND** it serves as purely visual decoration

### Requirement: className Utility Usage

The Divider component SHALL use the `classNames` utility from `@/utils/classNames` for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules

- **WHEN** the Divider component is rendered
- **THEN** the `classNames` utility combines all applicable CSS module classes
- **AND** filters out falsy values

#### Scenario: Custom className support

- **WHEN** a developer provides a `className` prop
- **THEN** custom classes are added to the divider element
- **AND** CSS module classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The Divider component SHALL be fully typed with TypeScript using strict mode. All types MUST be defined in a separate `Divider.types.ts` file using the `type` keyword exclusively (never `interface`).

#### Scenario: Component props fully typed

- **WHEN** a developer uses the Divider component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete for props
- **AND** invalid prop values are caught at compile time

#### Scenario: Types exported alongside component

- **WHEN** a developer imports Divider
- **THEN** `DividerProps` type can be imported from the same path
- **AND** all types use the `type` keyword

### Requirement: Storybook Documentation

The Divider component SHALL have comprehensive Storybook stories demonstrating all variants, with each story showing only ONE variant. Stories MUST use the autodocs tag for auto-documentation.

#### Scenario: Default story shows basic divider

- **WHEN** viewing the Default story in Storybook
- **THEN** a horizontal divider is displayed with default styling
- **AND** the story is interactive and functional

#### Scenario: Custom color story shows color customization

- **WHEN** viewing the CustomColor story in Storybook
- **THEN** the divider is displayed with a custom color via `--reltio-divider-color` CSS variable
- **AND** the story demonstrates CSS variable customization

#### Scenario: Custom spacing story shows spacing customization

- **WHEN** viewing the CustomSpacing story in Storybook
- **THEN** the divider is displayed with custom vertical spacing via `--reltio-divider-spacing` CSS variable
- **AND** surrounding content demonstrates the spacing effect

#### Scenario: Custom thickness story shows thickness customization

- **WHEN** viewing the CustomThickness story in Storybook
- **THEN** the divider is displayed with a custom thickness via `--reltio-divider-thickness` CSS variable
- **AND** the visual difference from default thickness is clear

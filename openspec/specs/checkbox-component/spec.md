# checkbox-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Controlled Checked State

The Checkbox component SHALL operate in controlled mode only. The `checked` prop determines the visual state; `onChange` reports user intent.

#### Scenario: Unchecked state renders empty box
- **WHEN** checked is false
- **AND** indeterminate is false or not provided
- **THEN** checkbox renders an empty box with border

#### Scenario: Checked state renders check mark
- **WHEN** checked is true
- **AND** indeterminate is false or not provided
- **THEN** checkbox renders a filled box with a check mark icon

#### Scenario: Indeterminate state renders dash
- **WHEN** indeterminate is true
- **THEN** checkbox renders a filled box with a horizontal dash icon
- **AND** the dash overrides the check mark regardless of checked value
- **AND** the native input's `indeterminate` property is set via ref

#### Scenario: onChange fires on toggle
- **WHEN** user clicks the checkbox or presses Space while focused
- **AND** the checkbox is not disabled
- **THEN** onChange callback is invoked with the React ChangeEvent from the native input

#### Scenario: onChange not called when disabled
- **WHEN** the checkbox is disabled
- **THEN** onChange callback is not invoked on any interaction attempt

### Requirement: Label via Children

The Checkbox component SHALL render label content from the `children` prop. The `<input>` is wrapped inside a `<label>` element, so no `htmlFor`/`id` pairing is needed.

#### Scenario: Label rendered from children
- **WHEN** children prop is provided
- **THEN** label content renders to the right of the checkbox indicator
- **AND** clicking the label text toggles the checkbox

#### Scenario: No children renders checkbox only
- **WHEN** children prop is not provided
- **THEN** only the checkbox indicator is rendered

### Requirement: Error State

The Checkbox component SHALL support an `error` boolean prop that applies error styling.

#### Scenario: Error state applies red border
- **WHEN** error is true
- **THEN** checkbox border uses --reltio-color-negative
- **AND** checked/indeterminate background uses --reltio-color-negative

#### Scenario: Default state uses standard colors
- **WHEN** error is false or not provided
- **THEN** unchecked checkbox uses --reltio-color-border-2 for the border
- **AND** checked/indeterminate checkbox uses --reltio-color-primary for the background

### Requirement: Disabled State

The Checkbox component SHALL support a disabled state that prevents all interaction and provides clear visual feedback.

#### Scenario: Disabled checkbox prevents interaction
- **WHEN** disabled is true
- **THEN** native input receives the disabled attribute
- **AND** pointer-events are disabled on the component
- **AND** opacity is set to 0.38

#### Scenario: Disabled checkbox is not focusable
- **WHEN** disabled is true
- **THEN** the checkbox is removed from the tab order

### Requirement: Rest Props Forwarded to Native Input

All additional props (`...rest`) SHALL be forwarded to the native `<input type="checkbox">` element. See MDN reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox.

#### Scenario: HTML attributes pass through
- **WHEN** developer provides name, value, form, required, or any other native checkbox attribute
- **THEN** the attribute is set on the underlying `<input type="checkbox">`

#### Scenario: Storybook demonstrates common HTML attributes
- **WHEN** viewing Storybook
- **THEN** stories exist for common HTML attributes (name, value, form)

### Requirement: Keyboard Accessibility

The Checkbox component SHALL be fully keyboard accessible.

#### Scenario: Tab key focuses checkbox
- **WHEN** user presses Tab
- **THEN** the checkbox receives keyboard focus
- **AND** a visible focus indicator appears around the checkbox indicator

#### Scenario: Space key toggles checkbox
- **WHEN** checkbox has keyboard focus
- **AND** user presses Space
- **THEN** the checkbox toggles and onChange is invoked

#### Scenario: Focus visible outline
- **WHEN** checkbox receives keyboard focus (focus-visible)
- **THEN** a 2px solid outline appears with 2px offset using the primary color

### Requirement: Screen Reader Support

The Checkbox component SHALL use native `<input type="checkbox">` for full assistive technology support.

#### Scenario: Native checkbox announces state
- **WHEN** checkbox is rendered
- **THEN** screen readers announce "checkbox" role, checked state, and label

#### Scenario: Indeterminate state announced
- **WHEN** indeterminate is true
- **THEN** screen readers announce "mixed" state via aria-checked="mixed"

#### Scenario: Disabled state announced
- **WHEN** disabled is true
- **THEN** screen readers announce the disabled state

### Requirement: CSS Styling

The Checkbox component SHALL use CSS Modules with the `classNames()` utility and `--reltio-color-*` global tokens. The default visual follows Material Design 3; future theming (e.g., SAP) is achievable via CSS file swap.

#### Scenario: Custom checkbox indicator via CSS
- **WHEN** the checkbox is rendered
- **THEN** the native input is visually hidden (not display:none, to preserve accessibility)
- **AND** a custom visual indicator renders the appropriate icon (check mark or dash) based on state

#### Scenario: Colors use global tokens only
- **WHEN** checkbox CSS is authored
- **THEN** all color values reference --reltio-color-* tokens
- **AND** no hardcoded hex or rgba values are present
- **AND** dark mode works automatically via data-theme="dark"

#### Scenario: Hover state feedback
- **WHEN** user hovers over an enabled checkbox
- **THEN** the checkbox indicator shows a subtle visual change
- **AND** cursor shows as pointer

#### Scenario: classNames utility composes CSS modules
- **WHEN** checkbox is rendered
- **THEN** classNames utility combines root, checked, indeterminate, disabled, error CSS module classes
- **AND** automatically adds stable prefixed classes (e.g., reltio_Checkbox_root)

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to the wrapper element
- **AND** CSS module classes are preserved

### Requirement: TypeScript Type Safety

All types SHALL be in a separate `Checkbox.types.ts` file using the `type` keyword (not `interface`).

#### Scenario: CheckboxProps uses HtmlProps
- **WHEN** CheckboxProps type is defined
- **THEN** it uses HtmlProps<"input", CheckboxCustomProps> from @/utils/types
- **AND** custom props (checked, onChange, children, indeterminate, error, disabled) are combined with native input attributes

#### Scenario: CheckboxGroupProps uses HtmlProps
- **WHEN** CheckboxGroupProps type is defined
- **THEN** it uses HtmlProps<"div", CheckboxGroupCustomProps> from @/utils/types

#### Scenario: Types exported alongside components
- **WHEN** developer imports Checkbox or CheckboxGroup
- **THEN** CheckboxProps and CheckboxGroupProps types can be imported
- **AND** all types use the `type` keyword

### Requirement: Storybook Documentation

Each story SHALL show only ONE variant. Stories use the "autodocs" tag.

#### Scenario: Stories for checked states
- **WHEN** viewing Storybook
- **THEN** separate stories exist for Default (unchecked), Checked, and Indeterminate

#### Scenario: Stories for label
- **WHEN** viewing Storybook
- **THEN** a WithLabel story shows a checkbox with label text
- **AND** a NoLabel story shows a standalone checkbox

#### Scenario: Stories for error state
- **WHEN** viewing Storybook
- **THEN** an Error story shows the checkbox with error styling

#### Scenario: Stories for disabled state
- **WHEN** viewing Storybook
- **THEN** a Disabled story demonstrates the disabled appearance and behavior

#### Scenario: Stories for HTML attributes
- **WHEN** viewing Storybook
- **THEN** stories demonstrate name, value, and form attributes via rest props

### Requirement: CheckboxGroup Layout

The CheckboxGroup component SHALL render children in a flex container with vertical or horizontal orientation.

#### Scenario: Vertical layout is default
- **WHEN** orientation is "vertical" or not provided
- **THEN** checkboxes are stacked vertically (flex-direction: column)

#### Scenario: Horizontal layout arranges inline
- **WHEN** orientation is "horizontal"
- **THEN** checkboxes are arranged horizontally (flex-direction: row)
- **AND** checkboxes wrap to the next line if they overflow

### Requirement: CheckboxGroup Shared Props

The CheckboxGroup component SHALL propagate `disabled` and `error` to all child Checkbox components.

#### Scenario: Group disabled applies to all children
- **WHEN** CheckboxGroup has disabled set to true
- **THEN** all child Checkbox components are disabled

#### Scenario: Group error applies to all children
- **WHEN** CheckboxGroup has error set to true
- **THEN** all child Checkbox components show error styling

### Requirement: CheckboxGroup Rest Props

All additional props (`...rest`) on CheckboxGroup SHALL be forwarded to the wrapper `<div>` element.

#### Scenario: HTML attributes forwarded to wrapper
- **WHEN** data attributes or className are provided to CheckboxGroup
- **THEN** the wrapper `<div>` element receives those props

### Requirement: CheckboxGroup Storybook Documentation

The CheckboxGroup component SHALL have Storybook stories demonstrating all layout variants and shared prop behaviors.

#### Scenario: Stories for group layouts
- **WHEN** viewing Storybook
- **THEN** separate stories exist for DefaultGroup (vertical) and HorizontalGroup

#### Scenario: Stories for group shared props
- **WHEN** viewing Storybook
- **THEN** a DisabledGroup story shows all checkboxes disabled via the group prop
- **AND** an ErrorGroup story shows all checkboxes with error styling via the group prop


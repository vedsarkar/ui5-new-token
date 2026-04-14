# radio-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Controlled Selection via RadioGroup

RadioGroup SHALL operate in controlled mode only. The `value` prop determines which Radio is selected; `onChange` fires when the user picks a different option. Individual Radio components do not accept `checked` or `onChange` — selection is managed entirely by the parent RadioGroup.

#### Scenario: RadioGroup selects the matching Radio
- **WHEN** RadioGroup `value` prop matches a Radio's `value`
- **THEN** that Radio displays as checked (filled inner dot, primary border)
- **AND** all other Radios in the group display as unchecked

#### Scenario: User selects a different Radio
- **WHEN** the user clicks an unchecked Radio (or its label)
- **THEN** `onChange` is called with the selected Radio's `value` string
- **AND** the visual state updates only when the parent passes a new `value`

#### Scenario: Clicking the already-selected Radio does nothing
- **WHEN** the user clicks the Radio that is already selected
- **THEN** `onChange` is not called
- **AND** the state does not change

#### Scenario: onChange callback signature
- **WHEN** `onChange` fires
- **THEN** it receives a single argument: the `value` string of the newly selected Radio

### Requirement: Radio Value Prop

Each Radio SHALL have a required `value` prop (string) that uniquely identifies it within the group.

#### Scenario: Value set on native input
- **WHEN** `value` is provided
- **THEN** the native `<input type="radio">` element's `value` attribute is set to that string
- **AND** RadioGroup uses it for selection matching

### Requirement: Label via Children

The Radio component SHALL render label content provided via the `children` prop. Clicking the label selects the Radio.

#### Scenario: Text label displayed next to radio circle
- **WHEN** `children` contains text
- **THEN** the text renders adjacent to the radio circle, vertically centered

#### Scenario: Clicking label selects the radio
- **WHEN** the user clicks the label text
- **THEN** the associated Radio becomes selected (via RadioGroup `onChange`)

#### Scenario: No label when children is empty
- **WHEN** `children` is not provided
- **THEN** only the radio circle renders

#### Scenario: Rich content as label
- **WHEN** `children` contains React nodes
- **THEN** the content renders as the label and click interaction still works

### Requirement: Disabled State

The Radio component SHALL support a `disabled` prop that prevents interaction.

#### Scenario: Disabled radio prevents interaction
- **WHEN** `disabled` is true
- **THEN** the radio cannot be clicked or activated
- **AND** the native input has the `disabled` attribute
- **AND** cursor shows not-allowed state

#### Scenario: Disabled radio has reduced opacity
- **WHEN** `disabled` is true
- **THEN** the radio renders with opacity of 0.38

#### Scenario: Disabled radio is not focusable
- **WHEN** `disabled` is true
- **THEN** the radio is skipped during keyboard navigation

#### Scenario: RadioGroup disabled cascades to all children
- **WHEN** RadioGroup `disabled` is true
- **THEN** all Radio children are disabled regardless of their individual `disabled` prop

### Requirement: Error State

RadioGroup SHALL support an `error` prop (boolean) that applies error styling to the entire group.

#### Scenario: Error state applies error color
- **WHEN** RadioGroup `error` is true
- **THEN** all radio circle borders use the error color token (`--reltio-color-negative`)
- **AND** the checked radio's filled dot also uses the error color

#### Scenario: No error by default
- **WHEN** `error` is not provided or is false
- **THEN** radios use default color tokens (border for unchecked, primary for checked)

### Requirement: RadioGroup Layout

RadioGroup SHALL support vertical and horizontal orientations.

#### Scenario: Vertical orientation is default
- **WHEN** `orientation` is "vertical" or not provided
- **THEN** Radio children stack vertically, each on its own line
- **AND** gap between radios is 8px

#### Scenario: Horizontal orientation
- **WHEN** `orientation` is "horizontal"
- **THEN** Radio children arrange in a horizontal row
- **AND** radios wrap to the next line on overflow
- **AND** gap between radios is 16px

### Requirement: Rest Props Forwarded to Native Input

Radio SHALL forward all rest props (`...rest`) to the native `<input type="radio">` element. This allows setting any standard HTML input attribute.

Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio

#### Scenario: Standard HTML attributes forwarded
- **WHEN** developer passes `data-testid`, `aria-label`, or other HTML attributes
- **THEN** they appear on the native `<input type="radio">` element

### Requirement: RadioGroup Rest Props Forwarded to Wrapper

RadioGroup SHALL forward all rest props to the wrapper `<div>` element.

#### Scenario: Standard HTML attributes forwarded
- **WHEN** developer passes `data-testid`, `aria-label`, or other HTML attributes
- **THEN** they appear on the wrapper `<div>` element

### Requirement: Name Attribute Generated Internally

RadioGroup SHALL generate a shared `name` attribute for all Radio children internally (e.g., using `useId`). There is no explicit `name` prop on RadioGroup.

#### Scenario: All radios share the same name
- **WHEN** Radio components render inside a RadioGroup
- **THEN** each native input receives the same auto-generated `name`
- **AND** this ensures native radio grouping and form compatibility

### Requirement: Keyboard Navigation

Radio SHALL support full keyboard accessibility following the WAI-ARIA radio group pattern.

#### Scenario: Tab enters and exits the radio group
- **WHEN** the user presses Tab
- **THEN** focus moves to the currently selected radio in the group
- **AND** if no radio is selected, focus moves to the first radio
- **WHEN** the user presses Tab again
- **THEN** focus moves out of the radio group to the next focusable element

#### Scenario: Arrow Down/Right moves to next radio and selects it
- **WHEN** a radio within a group has focus
- **AND** the user presses Down Arrow or Right Arrow
- **THEN** focus moves to the next radio
- **AND** that radio becomes selected (onChange fires)

#### Scenario: Arrow Up/Left moves to previous radio and selects it
- **WHEN** a radio within a group has focus
- **AND** the user presses Up Arrow or Left Arrow
- **THEN** focus moves to the previous radio
- **AND** that radio becomes selected (onChange fires)

#### Scenario: Arrow keys wrap around
- **WHEN** focus is on the last radio and the user presses Down/Right
- **THEN** focus wraps to the first radio and selects it

#### Scenario: Arrow keys skip disabled radios
- **WHEN** the next radio in sequence is disabled
- **THEN** it is skipped and focus moves to the next non-disabled radio

#### Scenario: Space key selects focused radio
- **WHEN** a radio has keyboard focus and the user presses Space
- **THEN** the focused radio becomes selected
- **AND** page scroll is prevented

#### Scenario: Focus visible outline
- **WHEN** the radio receives keyboard focus
- **THEN** a 2px solid outline appears around the radio circle
- **AND** the outline uses the primary color with 2px offset

### Requirement: Accessibility

Radio and RadioGroup SHALL provide proper ARIA attributes and semantic HTML.

#### Scenario: Each Radio wraps input inside label
- **WHEN** the Radio component renders
- **THEN** a `<label>` wraps the native `<input type="radio">` and the label content
- **AND** clicking anywhere in the label activates the input

#### Scenario: Native input is visually hidden but accessible
- **WHEN** the Radio component renders
- **THEN** the native input is visually hidden (not `display: none`)
- **AND** screen readers can still interact with it

#### Scenario: RadioGroup has role="radiogroup"
- **WHEN** the RadioGroup component renders
- **THEN** the container element has `role="radiogroup"`

#### Scenario: Disabled state announced
- **WHEN** the radio is disabled
- **THEN** the native input has the `disabled` attribute
- **AND** screen readers announce the disabled state

### Requirement: TypeScript Type Safety

All types SHALL be defined in separate `.types.ts` files using the `type` keyword.

#### Scenario: Radio props typed
- **WHEN** developer uses Radio
- **THEN** RadioProps uses `HtmlProps<"input", CustomProps>` where rest props forward to the native input
- **AND** `value` (string, required), `children` (ReactNode), `disabled` (boolean) are typed

#### Scenario: RadioGroup props typed
- **WHEN** developer uses RadioGroup
- **THEN** RadioGroupProps uses `HtmlProps<"div", CustomProps>` for the wrapper
- **AND** `value` (string), `onChange` (function), `orientation`, `disabled`, `error` are typed

#### Scenario: Types exported
- **WHEN** developer imports Radio or RadioGroup
- **THEN** RadioProps, RadioGroupProps, and RadioGroupOrientation types are available

### Requirement: CSS Styling

Radio SHALL use CSS Modules with `classNames()` utility. Colors reference global `--reltio-color-*` tokens. No component-level CSS custom properties.

#### Scenario: Custom radio visual
- **WHEN** rendered
- **THEN** the native input is visually hidden
- **AND** a custom circle (18px) uses pseudo-elements or styled spans for outer ring and inner dot
- **AND** the inner dot animates on check/uncheck with a scale transition

#### Scenario: Color tokens for all states
- **WHEN** rendered in any state
- **THEN** checked uses `--reltio-color-primary`
- **AND** unchecked uses `--reltio-color-border-*` tokens
- **AND** no hardcoded hex values in CSS

#### Scenario: Hover state
- **WHEN** hovering over an enabled radio
- **THEN** the circle border color darkens slightly
- **AND** a subtle background highlight appears on the target area

### Requirement: className Utility Usage

Radio and RadioGroup SHALL use `classNames()` for all className composition.

#### Scenario: Radio stable classes
- **WHEN** rendered
- **THEN** stable classes: `reltio_Radio_root`, `reltio_Radio_circle`, `reltio_Radio_label`
- **AND** conditional: `reltio_Radio_checked`, `reltio_Radio_disabled`

#### Scenario: RadioGroup stable classes
- **WHEN** rendered
- **THEN** stable classes: `reltio_RadioGroup_root`
- **AND** orientation: `reltio_RadioGroup_vertical`, `reltio_RadioGroup_horizontal`

#### Scenario: Custom className support
- **WHEN** developer provides `className` prop
- **THEN** custom classes are added alongside CSS module classes

### Requirement: Storybook Documentation

Radio and RadioGroup SHALL have stories with each story showing ONE variant.

#### Scenario: Radio stories
- **WHEN** viewing Storybook
- **THEN** stories exist for: Default, Checked, WithLabel, Disabled

#### Scenario: RadioGroup stories
- **WHEN** viewing Storybook
- **THEN** stories exist for: DefaultGroup, HorizontalGroup, ControlledGroup, DisabledGroup, ErrorGroup

#### Scenario: ControlledGroup story
- **WHEN** viewing the ControlledGroup story
- **THEN** a RadioGroup with controlled `value` + `onChange` is displayed
- **AND** selection changes update state via callback


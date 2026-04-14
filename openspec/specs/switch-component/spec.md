# switch-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Controlled Checked State

The Switch component SHALL support a controlled checked state only. The parent component owns the state via `checked` and `onChange` props.

#### Scenario: Checked state renders "on" position
- **WHEN** checked prop is true
- **THEN** handle is positioned to the end of the track
- **AND** track uses `var(--reltio-color-primary)`

#### Scenario: Unchecked state renders "off" position
- **WHEN** checked prop is false
- **THEN** handle is positioned to the start of the track
- **AND** track uses inactive/muted color

#### Scenario: onChange fires on toggle
- **WHEN** user clicks the switch or presses Space/Enter
- **THEN** onChange callback is invoked with the React change event

### Requirement: Label

The Switch component SHALL support an optional label via the `children` prop, rendered inside the wrapping `<label>` element after the switch control.

#### Scenario: Label rendered after switch
- **WHEN** children prop is provided
- **THEN** label text renders after the switch control
- **AND** clicking the label toggles the switch

#### Scenario: No label
- **WHEN** children prop is not provided
- **THEN** no label text is rendered
- **AND** switch control renders standalone

### Requirement: Disabled State

The Switch component SHALL support a disabled state that prevents all interaction.

#### Scenario: Disabled switch prevents interaction
- **WHEN** disabled prop is true
- **THEN** the native input has the disabled attribute
- **AND** pointer-events are disabled
- **AND** opacity is reduced to 0.38

### Requirement: Rest Props Forwarded to Native Input

The Switch component SHALL forward all rest props (`...rest`) to the underlying `<input type="checkbox" role="switch">` element. This covers `name`, `value`, `required`, `aria-label`, `aria-describedby`, `id`, `tabIndex`, and any other valid [checkbox input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).

#### Scenario: Form attributes passed via rest
- **WHEN** name and value props are provided
- **THEN** the native input receives name and value attributes
- **AND** form submission includes the switch data

#### Scenario: ARIA attributes passed via rest
- **WHEN** aria-label prop is provided
- **THEN** the native input receives the aria-label attribute

### Requirement: Keyboard Accessibility

The Switch component SHALL be fully keyboard accessible via the native checkbox input.

#### Scenario: Tab key focuses switch
- **WHEN** user presses Tab
- **THEN** the native input receives focus
- **AND** a visible focus indicator appears on the track

#### Scenario: Space key toggles switch
- **WHEN** switch has focus and user presses Space
- **THEN** onChange is invoked

#### Scenario: Focus visible outline
- **WHEN** input receives keyboard focus (focus-visible)
- **THEN** 2px solid outline appears around the track
- **AND** outline uses primary color with 2px offset

### Requirement: Screen Reader Support

The Switch component SHALL use `role="switch"` with `aria-checked` on the native input for screen reader compatibility.

#### Scenario: Role and state announced
- **WHEN** switch is rendered
- **THEN** input has `role="switch"` and `aria-checked` matching the checked prop
- **AND** screen readers announce label text and current state

### Requirement: CSS Styling

The Switch component SHALL use CSS Modules with the classNames utility. Colors reference global `--reltio-color-*` tokens. No component-level CSS custom properties.

#### Scenario: Colors use global tokens
- **WHEN** switch is rendered
- **THEN** active track uses `var(--reltio-color-primary)`
- **AND** inactive track uses a neutral token
- **AND** handle uses `var(--reltio-color-surface-1)`
- **AND** no hardcoded hex values in CSS

#### Scenario: Smooth toggle animation
- **WHEN** state changes
- **THEN** handle slides with CSS transition of 150ms ease
- **AND** track background transitions smoothly

#### Scenario: Stable CSS classes for external customization
- **WHEN** switch is rendered
- **THEN** classNames utility provides stable prefixed classes (e.g. `reltio_Switch_root`, `reltio_Switch_track`)

### Requirement: TypeScript Type Safety

All types SHALL be in `Switch.types.ts` using the `type` keyword.

#### Scenario: Props use HtmlProps
- **WHEN** developer uses Switch
- **THEN** SwitchProps extends `HtmlProps<"input", CustomSwitchProps>`
- **AND** custom props: `checked`, `onChange`, `children`, `disabled`, `className`, `style`
- **AND** rest props are forwarded to the native input

### Requirement: Storybook Documentation

The Switch component SHALL have Storybook stories demonstrating all variants with interaction tests.

#### Scenario: Stories cover all states
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows an unchecked switch without a label
- **AND** a **Checked** story shows a checked switch
- **AND** a **WithLabel** story shows a switch with children label text
- **AND** a **Disabled** story shows a disabled switch


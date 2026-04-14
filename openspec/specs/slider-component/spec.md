# slider-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Controlled Value

The Slider component SHALL support a controlled value only. The parent component owns the state via `value` and `onChange` props.

#### Scenario: Value reflects current position
- **WHEN** value prop is provided
- **THEN** the native input's value matches the provided value
- **AND** the thumb position reflects the value within the min–max range

#### Scenario: onChange fires on user interaction
- **WHEN** user drags the thumb or clicks the track
- **THEN** onChange callback is invoked with the React change event and the new numeric value
- **AND** signature is `(event: React.ChangeEvent<HTMLInputElement>, value: number) => void`

### Requirement: Range Configuration

The Slider component SHALL support `min`, `max`, and `step` props forwarded to the native input.

#### Scenario: Default range
- **WHEN** min, max, and step are not provided
- **THEN** the native input uses min=0, max=100, step=1

#### Scenario: Custom range
- **WHEN** min=0, max=10, step=1 are provided
- **THEN** the slider allows selection of values 0 through 10
- **AND** each drag increment moves by 1

### Requirement: Disabled State

The Slider component SHALL support a disabled state that prevents all interaction.

#### Scenario: Disabled slider prevents interaction
- **WHEN** disabled prop is true
- **THEN** the native input has the disabled attribute
- **AND** pointer-events are disabled
- **AND** opacity is reduced to 0.38

### Requirement: Rest Props Forwarded to Native Input

The Slider component SHALL forward all rest props (`...rest`) to the underlying `<input type="range">` element. This covers `name`, `aria-label`, `aria-describedby`, `id`, `tabIndex`, and any other valid [range input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range).

#### Scenario: ARIA attributes passed via rest
- **WHEN** aria-label prop is provided
- **THEN** the native input receives the aria-label attribute

#### Scenario: Data attributes passed via rest
- **WHEN** data-testid prop is provided
- **THEN** the native input receives the data-testid attribute

### Requirement: Keyboard Accessibility

The Slider component SHALL be fully keyboard accessible via the native range input.

#### Scenario: Arrow keys change value
- **WHEN** slider has focus and user presses Left/Down arrow
- **THEN** value decreases by step
- **WHEN** slider has focus and user presses Right/Up arrow
- **THEN** value increases by step

#### Scenario: Focus visible outline
- **WHEN** input receives keyboard focus (focus-visible)
- **THEN** a visible focus indicator appears on the thumb
- **AND** outline uses primary color with 2px offset

### Requirement: CSS Styling

The Slider component SHALL use CSS Modules with the classNames utility. Colors reference global `--reltio-color-*` tokens. No component-level CSS custom properties.

#### Scenario: Colors use global tokens
- **WHEN** slider is rendered
- **THEN** filled track uses `var(--reltio-color-primary)`
- **AND** unfilled track uses a neutral token
- **AND** thumb uses `var(--reltio-color-primary)`
- **AND** no hardcoded hex values in CSS

#### Scenario: Stable CSS classes for external customization
- **WHEN** slider is rendered
- **THEN** classNames utility provides stable prefixed classes (e.g. `reltio_Slider_root`)

### Requirement: TypeScript Type Safety

All types SHALL be in `Slider.types.ts` using the `type` keyword.

#### Scenario: Props use HtmlProps
- **WHEN** developer uses Slider
- **THEN** SliderProps extends `HtmlProps<"input", CustomSliderProps>`
- **AND** custom props: `value`, `onChange`, `min`, `max`, `step`, `disabled`, `className`, `style`
- **AND** rest props are forwarded to the native input

### Requirement: Storybook Documentation

The Slider component SHALL have Storybook stories demonstrating all variants with interaction tests.

#### Scenario: Stories cover all states
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows a slider with useState hook for controlled value
- **AND** a **CustomRange** story shows a slider with min=0, max=10
- **AND** a **Disabled** story shows a disabled slider

#### Scenario: Play function tests interaction
- **WHEN** Default story play function runs
- **THEN** the slider value is changed programmatically
- **AND** onChange callback is verified to have been called


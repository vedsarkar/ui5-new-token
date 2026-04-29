# radio-component Specification

## Purpose

SAP Fiori Radio Button — a single-selection form control with custom circular indicator, label, value state support, and keyboard accessibility. Used in groups where only one option can be selected.

SAP equivalent: `ui5-radio-button`. Reference: https://experience.sap.com/fiori-design-web/radio-button/

## Requirements

### Requirement: Checked State

The Radio SHALL operate in controlled mode. The `checked` prop sets the selected state; `onChange` notifies the parent.

#### Scenario: Controlled radio selection
- **WHEN** `checked` and `onChange` are provided
- **THEN** clicking the radio calls `onChange(event, true)`
- **AND** the displayed state only changes when the parent updates `checked`

### Requirement: Radio Group via name

Radio buttons SHALL be grouped using the native `name` prop. Only one radio with the same `name` can be checked.

#### Scenario: Group behavior
- **WHEN** multiple Radio components share the same `name`
- **THEN** selecting one deselects the others (native radio behavior)

### Requirement: Value State

The Radio SHALL support a `valueState` prop (ValueState type) affecting visual appearance.

#### Scenario: Error state (unchecked)
- **WHEN** `valueState` is `"Error"` and radio is unchecked
- **THEN** circle border uses `--sapNegativeElementColor`

#### Scenario: Error state (checked)
- **WHEN** `valueState` is `"Error"` and radio is checked
- **THEN** circle border and inner dot use `--sapNegativeElementColor`

### Requirement: Custom Visual Indicator

The Radio SHALL use a visually hidden native `<input type="radio">` with a custom circular indicator.

#### Scenario: Custom circle rendering
- **WHEN** the radio renders
- **THEN** the native input is visually hidden (1px clipped)
- **AND** a custom 20x20px circle with 2px border renders
- **AND** unchecked: transparent, `--sapField_BorderColor` border
- **AND** checked: `--sapBrandColor` border with 10x10px inner dot that scales from 0 to 1

#### Scenario: Hover state
- **WHEN** hovering unchecked radio
- **THEN** circle border changes to `--sapContent_LabelColor`
- **WHEN** hovering checked radio
- **THEN** circle border changes to `--sapHighlightColor`

### Requirement: Label

#### Scenario: Label renders next to indicator
- **WHEN** `children` is provided
- **THEN** label text renders after the circle with 8px gap at 14px font size in `--sapTextColor`

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.38`, `pointer-events: none`, native input has `disabled` attribute

### Requirement: Keyboard Accessibility

#### Scenario: Focus visible
- **WHEN** the native input receives keyboard focus
- **THEN** a 2px outline in `--sapContent_FocusColor` appears on the circle with 2px offset (uses `input:focus-visible + .circle` selector)

### Requirement: Rest Props Forwarding

All additional props SHALL be forwarded to the native `<input>` element.

### Requirement: TypeScript Types

Props SHALL be defined in `Radio.types.ts` as `RadioProps = HtmlProps<"input", { checked, onChange, children, valueState, disabled }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapTextColor`, `--sapField_BorderColor`, `--sapBrandColor`, `--sapContent_LabelColor`, `--sapHighlightColor`, `--sapNegativeElementColor`, `--sapContent_FocusColor`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default (group of 3 radios with controlled selection)
- ErrorState (checked + unchecked in error)
- Disabled (checked + unchecked)
- Horizontal (row layout)

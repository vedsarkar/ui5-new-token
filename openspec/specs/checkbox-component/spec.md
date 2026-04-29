# checkbox-component Specification

## Purpose

SAP Fiori Checkbox — a boolean/tri-state form control with custom visual indicator, label, value state support, and keyboard accessibility.

SAP equivalent: `ui5-checkbox`. Reference: https://experience.sap.com/fiori-design-web/checkbox/

## Requirements

### Requirement: Checked State

The Checkbox SHALL operate in controlled mode. The `checked` prop sets the state; `onChange` notifies the parent.

#### Scenario: Controlled checked toggle
- **WHEN** `checked` and `onChange` are provided
- **THEN** clicking the checkbox calls `onChange(event, newCheckedState)`
- **AND** the displayed state only changes when the parent updates `checked`

### Requirement: Indeterminate State

The Checkbox SHALL support an `indeterminate` prop for tri-state behavior (e.g., "select all" when some children are checked).

#### Scenario: Indeterminate visual
- **WHEN** `indeterminate` is `true`
- **THEN** the indicator shows a horizontal dash (2px bar in `--sapField_Background`) instead of a checkmark
- **AND** `aria-checked="mixed"` is set on the native `<input>`
- **AND** the indicator uses `--sapBrandColor` background (same as checked)

#### Scenario: Indeterminate overrides checked visual
- **WHEN** both `checked` and `indeterminate` are `true`
- **THEN** the dash icon is shown (indeterminate takes priority)

### Requirement: Value State

The Checkbox SHALL support a `valueState` prop (ValueState type) affecting visual appearance.

#### Scenario: Error state (unchecked)
- **WHEN** `valueState` is `"Error"` and checkbox is unchecked
- **THEN** indicator border uses `--sapNegativeElementColor`

#### Scenario: Error state (checked/indeterminate)
- **WHEN** `valueState` is `"Error"` and checkbox is checked or indeterminate
- **THEN** indicator background and border use `--sapNegativeElementColor`

#### Scenario: Warning state
- **WHEN** `valueState` is `"Warning"`
- **THEN** warning-specific styling applies

### Requirement: Custom Visual Indicator

The Checkbox SHALL use a visually hidden native `<input type="checkbox">` with a custom indicator element.

#### Scenario: Custom indicator rendering
- **WHEN** the checkbox renders
- **THEN** the native input is visually hidden (1px clipped)
- **AND** a custom 18x18px indicator with 2px border and 2px radius renders
- **AND** unchecked: transparent background, `--sapField_BorderColor` border
- **AND** checked: `--sapBrandColor` background and border with SVG checkmark

#### Scenario: Hover state
- **WHEN** the user hovers over the checkbox
- **THEN** indicator border changes to `--sapBrandColor`

### Requirement: Label

#### Scenario: Label renders next to indicator
- **WHEN** `children` is provided
- **THEN** label text renders after the indicator with 8px gap at 14px font size

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.38`, `pointer-events: none`, native input has `disabled` attribute

### Requirement: Keyboard Accessibility

#### Scenario: Focus visible
- **WHEN** the native input receives keyboard focus
- **THEN** a 2px outline in `--sapContent_FocusColor` appears on the indicator with 2px offset

#### Scenario: Space toggles checked
- **WHEN** the checkbox has focus and user presses Space
- **THEN** `onChange` is called (native checkbox behavior)

### Requirement: Rest Props Forwarding

All additional props SHALL be forwarded to the native `<input>` element.

### Requirement: TypeScript Types

Props SHALL be defined in `Checkbox.types.ts` as `CheckboxProps = HtmlProps<"input", { checked, onChange, children, indeterminate, valueState, disabled }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapTextColor`, `--sapField_BorderColor`, `--sapBrandColor`, `--sapContent_FocusColor`, `--sapNegativeElementColor`, `--sapField_Background`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default (group of 3 checkboxes with controlled state)
- Indeterminate
- ErrorState (unchecked + checked in error)
- Disabled (checked + unchecked)
- Horizontal (row layout)

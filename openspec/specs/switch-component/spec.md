# switch-component Specification

## Purpose

SAP Fiori Switch — a boolean toggle control with animated track and handle, label, and keyboard accessibility.

SAP equivalent: `ui5-switch`. Reference: https://experience.sap.com/fiori-design-web/switch/

## Requirements

### Requirement: Checked State

The Switch SHALL operate in controlled mode. The `checked` prop sets the on/off state; `onChange` notifies the parent.

#### Scenario: Controlled toggle
- **WHEN** `checked` and `onChange` are provided
- **THEN** clicking the switch calls `onChange(event, newCheckedState)`
- **AND** the displayed state only changes when the parent updates `checked`

### Requirement: Animated Track and Handle

The Switch SHALL render a track with a sliding circular handle.

#### Scenario: Track rendering
- **WHEN** the switch renders
- **THEN** the track is 36x20px with 10px border-radius
- **AND** unchecked: `--sapField_BorderColor` background
- **AND** checked: `--sapBrandColor` background
- **AND** transitions use 150ms ease

#### Scenario: Handle rendering
- **WHEN** the switch renders
- **THEN** the handle is a 16x16px circle in `--sapField_Background`
- **AND** unchecked: `translateX(2px)`
- **AND** checked: `translateX(18px)`
- **AND** transitions use 150ms ease

#### Scenario: Hover states
- **WHEN** hovering unchecked switch
- **THEN** track background changes to `--sapContent_NonInteractiveIconColor`
- **WHEN** hovering checked switch
- **THEN** track background changes to `--sapHighlightColor`

### Requirement: Label

#### Scenario: Label renders next to track
- **WHEN** `children` is provided
- **THEN** label text renders after the track with 12px gap at 14px font size in `--sapTextColor`

### Requirement: Disabled State

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.38`, `pointer-events: none`, native input has `disabled` attribute

### Requirement: Accessibility

The Switch SHALL use a visually hidden native `<input type="checkbox" role="switch">`.

#### Scenario: ARIA
- **WHEN** the switch renders
- **THEN** the native input has `role="switch"` and `aria-checked` matching the checked state

#### Scenario: Focus visible
- **WHEN** the native input receives keyboard focus
- **THEN** a 2px outline in `--sapContent_FocusColor` appears on the track with 2px offset

### Requirement: Rest Props Forwarding

All additional props SHALL be forwarded to the native `<input>` element.

### Requirement: TypeScript Types

Props SHALL be defined in `Switch.types.ts` as `SwitchProps = HtmlProps<"input", { checked, onChange, children, disabled }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapTextColor`, `--sapField_BorderColor`, `--sapContent_NonInteractiveIconColor`, `--sapBrandColor`, `--sapHighlightColor`, `--sapField_Background`, `--sapContent_FocusColor`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default (single toggle with controlled state)
- Multiple (group of 3 switches)
- Disabled (on + off states)

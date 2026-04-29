# textarea-component Specification

## Purpose

SAP Fiori TextArea — a multi-line text input with label, value state support, toolbar slot, and auto-grow behavior via native `field-sizing: content`.

SAP equivalent: `ui5-textarea`. Reference: https://experience.sap.com/fiori-design-web/text-area/

## Requirements

### Requirement: Multi-line Input

The TextArea SHALL render a native `<textarea>` inside a grid-based container. The textarea auto-grows using `field-sizing: content` with `min-height: 56px` and `max-height: min(500px, 50cqh)` (container query height).

#### Scenario: Auto-grow behavior
- **WHEN** the user types content exceeding the visible area
- **THEN** the textarea height grows automatically up to the max height
- **AND** a vertical scrollbar appears when max height is reached

### Requirement: Label

The TextArea SHALL support a `label` prop rendering text above the input container, using `--sapContent_LabelColor` at 14px / 400 weight. The component wraps everything in a `<label>` for implicit association.

#### Scenario: Required indicator
- **WHEN** `required` is `true`
- **THEN** a red asterisk (`*`) in `--sapNegativeElementColor` appears after the label text

#### Scenario: Error label color
- **WHEN** `valueState` is `"Error"`
- **THEN** label color changes to `--sapField_InvalidColor`

### Requirement: Toolbar Slot

The TextArea SHALL support a `toolbar` prop accepting `ReactNode` rendered below the textarea inside the input container.

#### Scenario: Toolbar renders below textarea
- **WHEN** `toolbar` is provided
- **THEN** content renders in the toolbar grid area below the textarea
- **AND** uses flex row layout with 12px gap and 8px 12px padding

### Requirement: Value State

Same as TextField — `valueState` prop (None/Error/Warning/Success/Information) from `FormControlBase`. Each state applies distinct `--sapField_*` border and background tokens.

#### Scenario: Error state
- **WHEN** `valueState` is `"Error"`
- **THEN** container uses `--sapField_InvalidBackground` and `--sapField_InvalidColor` border

#### Scenario: Warning state
- **WHEN** `valueState` is `"Warning"`
- **THEN** container uses `--sapField_WarningBackground` and `--sapField_WarningColor` border

#### Scenario: Success state
- **WHEN** `valueState` is `"Success"`
- **THEN** container uses `--sapField_SuccessBackground` and `--sapField_SuccessColor` border

#### Scenario: Information state
- **WHEN** `valueState` is `"Information"`
- **THEN** container uses `--sapField_InformationBackground` and `--sapField_InformationColor` border

### Requirement: Value State Message

#### Scenario: Message renders below input container
- **WHEN** `valueStateMessage` is provided and `valueState` is not `"None"`
- **THEN** message renders at 12px font size with color matching the active state token

### Requirement: Disabled and ReadOnly States

#### Scenario: Disabled
- **WHEN** `disabled` is `true`
- **THEN** `opacity: 0.4`, `cursor: not-allowed`, `--sapField_ReadOnly_Background`

#### Scenario: ReadOnly
- **WHEN** `readOnly` is `true`
- **THEN** dashed border, `--sapField_ReadOnly_Background`, user can select/copy but not edit

### Requirement: Focus State

#### Scenario: Focus styling
- **WHEN** the textarea receives focus
- **THEN** container border changes to `--sapField_Focus_BorderColor`
- **AND** 1px outline in `--sapContent_FocusColor` with -2px offset

### Requirement: ForwardRef

The TextArea SHALL use `forwardRef` to expose the native `<textarea>` element ref to consumers.

### Requirement: Rest Props Forwarding

All additional props SHALL be forwarded to the native `<textarea>` element, including `placeholder`, `rows`, `maxLength`, event handlers, and ARIA/data attributes.

### Requirement: TypeScript Types

Props SHALL be defined in `TextArea.types.ts` as `TextAreaProps = HtmlProps<"textarea", FormControlBase & { label, toolbar }>`.

### Requirement: CSS Styling

Colors use `--sap*` tokens. Container uses `container-type: inline-size` for container queries. Grid layout with `textarea` and `toolbar` areas.

**SAP tokens used:** `--sapContent_LabelColor`, `--sapNegativeElementColor`, `--sapField_InvalidColor`, `--sapField_InvalidBackground`, `--sapField_WarningColor`, `--sapField_WarningBackground`, `--sapField_SuccessColor`, `--sapField_SuccessBackground`, `--sapField_InformationColor`, `--sapField_InformationBackground`, `--sapField_BorderColor`, `--sapField_Background`, `--sapField_Focus_BorderColor`, `--sapContent_FocusColor`, `--sapField_ReadOnly_Background`, `--sapField_TextColor`, `--sapField_PlaceholderTextColor`, `--sapField_BorderCornerRadius`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, WithLabel, WithPlaceholder, WithToolbar
- ValueStateError, ValueStateWarning
- Disabled, ReadOnly, AutoResize

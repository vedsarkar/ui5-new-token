# textfield-component Specification

## Purpose

SAP Fiori Input field — a single-line text input with label, value state support, content slots, and clear button. Wraps a native `<input>` inside a `<label>` for implicit association.

SAP equivalent: `ui5-input`. Reference: https://experience.sap.com/fiori-design-web/input-field/

## Requirements

### Requirement: Controlled Value

The TextField SHALL operate in controlled mode only. The `value` prop sets the input content; `onChange` notifies the parent of user input.

#### Scenario: Controlled mode with value and onChange
- **WHEN** `value` and `onChange` props are provided
- **THEN** the native `<input>` element's value is set to the provided value
- **AND** `onChange` is called with `(event: ChangeEvent<HTMLInputElement>, value: string)`

### Requirement: Label

The TextField SHALL support a `label` prop rendering text above the input. The component wraps the `<input>` in a `<label>` for implicit association.

#### Scenario: Label renders above input
- **WHEN** `label` prop is provided
- **THEN** a label text renders above the input container
- **AND** uses `--sapContent_LabelColor` at 14px / 400 weight / 20px line-height

#### Scenario: Clicking label focuses input
- **WHEN** the user clicks the label text
- **THEN** the input receives focus (implicit `<label>` association)

### Requirement: Placeholder

#### Scenario: Placeholder displays when input is empty
- **WHEN** `placeholder` prop is provided and input has no value
- **THEN** placeholder text displays in `--sapField_PlaceholderTextColor`

### Requirement: Value State

The TextField SHALL support a `valueState` prop (from `FormControlBase`) with five states: None, Error, Warning, Success, Information. Each state applies distinct border color, background color, and ARIA attributes.

#### Scenario: Error state
- **WHEN** `valueState` is `"Error"`
- **THEN** input container uses `--sapField_InvalidBackground` and `--sapField_InvalidColor` border
- **AND** label color changes to `--sapField_InvalidColor`
- **AND** `aria-invalid="true"` is set on the native `<input>`

#### Scenario: Warning state
- **WHEN** `valueState` is `"Warning"`
- **THEN** input container uses `--sapField_WarningBackground` and `--sapField_WarningColor` border

#### Scenario: Success state
- **WHEN** `valueState` is `"Success"`
- **THEN** input container uses `--sapField_SuccessBackground` and `--sapField_SuccessColor` border

#### Scenario: Information state
- **WHEN** `valueState` is `"Information"`
- **THEN** input container uses `--sapField_InformationBackground` and `--sapField_InformationColor` border

#### Scenario: None state (default)
- **WHEN** `valueState` is `"None"` or not provided
- **THEN** default styling applies — `--sapField_Background`, `--sapField_BorderColor`

### Requirement: Value State Message

#### Scenario: Message renders below input when valueState is not None
- **WHEN** `valueStateMessage` is provided and `valueState` is not `"None"`
- **THEN** message text renders below the input container at 12px / 16px line-height
- **AND** message color matches the active value state color token

#### Scenario: Message hidden when valueState is None
- **WHEN** `valueState` is `"None"` (or not set)
- **THEN** `valueStateMessage` is not rendered regardless of its value

### Requirement: Content Slots

The TextField SHALL support `startContent` and `endContent` props accepting `ReactNode` for icons, buttons, or other elements inside the input container.

#### Scenario: startContent renders before input
- **WHEN** `startContent` is provided
- **THEN** content renders inside the input container before the native input
- **AND** uses `--sapContent_NonInteractiveIconColor`

#### Scenario: endContent renders after input
- **WHEN** `endContent` is provided
- **THEN** content renders inside the input container after the clear button (if present) and before the container end

### Requirement: Clear Button

The TextField SHALL support a `clearable` prop that displays a close icon button when the input has a value.

#### Scenario: Clear button visible when input has value
- **WHEN** `clearable` is `true` and input has a non-empty value and is not disabled/readOnly
- **THEN** a close icon button renders inside the input container with `aria-label="Clear"`

#### Scenario: Clicking clear empties input
- **WHEN** the user clicks the clear button
- **THEN** `onChange` is called with empty string value
- **AND** input receives focus after clearing

#### Scenario: Clear button hidden when empty, disabled, or readOnly
- **WHEN** input is empty, disabled, or readOnly
- **THEN** clear button is not rendered

### Requirement: Disabled State

#### Scenario: Disabled prevents interaction
- **WHEN** `disabled` is `true`
- **THEN** the component has `opacity: 0.4` and `cursor: not-allowed`
- **AND** input container uses `--sapField_ReadOnly_Background`
- **AND** the native `<input>` has the `disabled` attribute

### Requirement: ReadOnly State

#### Scenario: ReadOnly visual styling
- **WHEN** `readOnly` is `true`
- **THEN** the input border uses dashed style
- **AND** background changes to `--sapField_ReadOnly_Background`
- **AND** the user can select and copy text but cannot edit

### Requirement: Required State

#### Scenario: Required indicator
- **WHEN** `required` is `true`
- **THEN** the native `<input>` has the `required` attribute
- **AND** a red asterisk (`*`) in `--sapNegativeElementColor` appears after the label text

### Requirement: Hover and Focus States

#### Scenario: Hover state
- **WHEN** the user hovers over the component (not disabled/readOnly)
- **THEN** input container uses `--sapField_Hover_Background` and `--sapField_Hover_BorderColor`

#### Scenario: Focus state
- **WHEN** the input receives focus
- **THEN** input container border changes to `--sapField_Focus_BorderColor`
- **AND** a 1px outline in `--sapContent_FocusColor` appears with -2px offset

### Requirement: Rest Props Forwarding

All additional props SHALL be forwarded to the native `<input>` element, including `type`, `name`, `maxLength`, `pattern`, `autoComplete`, `inputMode`, event handlers (`onFocus`, `onBlur`, `onKeyDown`), and ARIA/data attributes.

### Requirement: TypeScript Types

Props SHALL be defined in `TextField.types.ts` as `TextFieldProps = HtmlProps<"input", FormControlBase & { value, onChange, label, placeholder, startContent, endContent, clearable }>`.

### Requirement: CSS Styling

Colors SHALL use `--sap*` tokens. Typography, spacing, and sizing use plain CSS values. No component-level CSS custom properties. The `classNames()` utility composes all CSS module classes.

**SAP tokens used:** `--sapContent_LabelColor`, `--sapNegativeElementColor`, `--sapField_BorderColor`, `--sapField_Background`, `--sapField_Hover_Background`, `--sapField_Hover_BorderColor`, `--sapField_Focus_BorderColor`, `--sapContent_FocusColor`, `--sapField_InvalidColor`, `--sapField_InvalidBackground`, `--sapField_WarningColor`, `--sapField_WarningBackground`, `--sapField_SuccessColor`, `--sapField_SuccessBackground`, `--sapField_InformationColor`, `--sapField_InformationBackground`, `--sapField_ReadOnly_Background`, `--sapField_TextColor`, `--sapField_PlaceholderTextColor`, `--sapContent_NonInteractiveIconColor`, `--sapContent_IconColor`, `--sapField_BorderCornerRadius`, `--sapElement_Height`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default, WithLabel, WithPlaceholder
- ValueStateError, ValueStateWarning, ValueStateSuccess, ValueStateInformation
- WithStartContent, WithEndContent, WithClearIcon
- Disabled, Readonly, Required
- Password (`type="password"`), Email (`type="email"`)

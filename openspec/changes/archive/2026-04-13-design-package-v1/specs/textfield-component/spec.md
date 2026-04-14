# TextField Component Specification

## Purpose

The TextField component is a single-line text input that wraps a native `<input>` element, providing label, placeholder, helper text, error state, and leading/trailing content slots. It uses CSS Modules with the `classNames()` utility, global `--reltio-color-*` tokens for all colors, and strict TypeScript typing. TextField is a foundational Level 1 primitive that unlocks multiple Level 2 and Level 3 composed components including Search, DatePickers, Menu with search, FilterPanel, and Condition.

## ADDED Requirements

### Requirement: Controlled Value

The TextField component SHALL operate in controlled mode only. The `value` prop sets the input content, and `onChange` notifies the parent of user input. No uncontrolled mode is supported.

#### Scenario: Controlled mode with value and onChange
- **WHEN** `value` and `onChange` props are provided
- **THEN** the native `<input>` element's value is set to the provided value
- **AND** typing does not update the displayed value unless the parent updates `value`

#### Scenario: onChange fires on user input
- **WHEN** the user types in the input
- **THEN** the `onChange` callback is called with the full `React.ChangeEvent<HTMLInputElement>`
- **AND** the developer can access `event.target.value`

### Requirement: Label

The TextField component SHALL support a `label` prop that renders a visible label. The `<input>` SHALL be wrapped inside a `<label>` element for implicit association — no `htmlFor`/`id` attributes needed.

#### Scenario: Label renders above input
- **WHEN** `label` prop is provided
- **THEN** a label text renders above the input container
- **AND** the label uses secondary text color at 12px font size

#### Scenario: Clicking label focuses input
- **WHEN** `label` prop is provided
- **AND** the user clicks anywhere on the label area
- **THEN** the input receives focus
- **AND** no `htmlFor`/`id` attributes are needed because the input is a descendant of `<label>`

#### Scenario: No label without prop
- **WHEN** `label` prop is not provided
- **THEN** no label text is rendered

### Requirement: Placeholder

The TextField component SHALL support a `placeholder` prop forwarded to the native `<input>` element.

#### Scenario: Placeholder displays when input is empty
- **WHEN** `placeholder` prop is provided and the input has no value
- **THEN** the placeholder text is displayed inside the input in muted text color

#### Scenario: Placeholder hidden when input has value
- **WHEN** the input has a non-empty value
- **THEN** the placeholder text is not visible

### Requirement: Helper Text

The TextField component SHALL support a `helperText` prop that renders text below the input. Helper text color changes to error color when `error` is true.

#### Scenario: Helper text renders below input
- **WHEN** `helperText` prop is provided
- **THEN** text renders below the input container in secondary text color at 12px font size
- **AND** the helper text element is associated with the input via `aria-describedby`

#### Scenario: Helper text turns red on error
- **WHEN** `helperText` is provided and `error` is `true`
- **THEN** the helper text color changes to `--reltio-color-negative` (or equivalent error token)

#### Scenario: No helper text without prop
- **WHEN** `helperText` prop is not provided
- **THEN** no text is rendered below the input

### Requirement: Error State

The TextField component SHALL support an `error` prop (boolean) that provides visual error feedback. This is the only validation state for v1. Future versions may add `warning`, `success`, `info` or a `status` enum without breaking changes.

#### Scenario: Error state styling
- **WHEN** `error` prop is `true`
- **THEN** the input border color changes to `--reltio-color-negative` (or equivalent error token)
- **AND** helper text turns red (if provided)
- **AND** `aria-invalid="true"` is set on the native `<input>`

#### Scenario: Default state has no error
- **WHEN** `error` prop is not provided or is `false`
- **THEN** the input uses default border color
- **AND** no `aria-invalid` attribute is set

### Requirement: Leading and Trailing Content Slots

The TextField component SHALL support `startContent` and `endContent` props that accept `ReactNode` for rendering icons, buttons, or other elements inside the input container.

#### Scenario: startContent renders before input
- **WHEN** `startContent` prop is provided
- **THEN** the content renders inside the input container before the native input, vertically centered
- **AND** the input text does not overlap the startContent

#### Scenario: endContent renders after input
- **WHEN** `endContent` prop is provided
- **THEN** the content renders inside the input container after the native input, vertically centered
- **AND** the input text does not overlap the endContent

#### Scenario: Interactive elements in content slots
- **WHEN** a button or clickable element is placed in startContent or endContent
- **THEN** the element is clickable, focusable, and keyboard accessible
- **AND** clicking the element does not trigger input focus

#### Scenario: No content slots by default
- **WHEN** neither `startContent` nor `endContent` is provided
- **THEN** the native input takes the full available width

### Requirement: Clear Button

The TextField component SHALL support a `showClearIcon` prop that displays a clear (X) button when the input has a non-empty value.

#### Scenario: Clear icon shows when input has value
- **WHEN** `showClearIcon` is `true` and the input has a non-empty value
- **THEN** a clear (X) icon button renders at the trailing position inside the input
- **AND** the icon has `aria-label="Clear"`

#### Scenario: Clear icon hidden when empty, disabled, or readOnly
- **WHEN** `showClearIcon` is `true`
- **AND** the input is empty, disabled, or readOnly
- **THEN** the clear icon is not rendered

#### Scenario: Clicking clear icon empties input
- **WHEN** the user clicks the clear icon
- **THEN** `onChange` is called with a synthetic event where `event.target.value` is `""`
- **AND** the input receives focus after clearing

#### Scenario: Clear icon is keyboard accessible
- **WHEN** `showClearIcon` is `true` and the input has a value
- **THEN** the clear icon is focusable via Tab
- **AND** pressing Enter or Space clears the input

### Requirement: Disabled State

The TextField component SHALL support a `disabled` prop that prevents all user interaction.

#### Scenario: Disabled prevents interaction
- **WHEN** `disabled` prop is `true`
- **THEN** the native `<input>` has the `disabled` attribute
- **AND** the entire component has reduced opacity (0.38) and `cursor: not-allowed`
- **AND** the input cannot receive focus

#### Scenario: Disabled hides clear icon
- **WHEN** `disabled` is `true` and `showClearIcon` is `true`
- **THEN** the clear icon is not rendered

### Requirement: Readonly State

The TextField component SHALL support a `readOnly` prop that allows selection and copying but prevents editing.

#### Scenario: Readonly allows selection but prevents editing
- **WHEN** `readOnly` prop is `true`
- **THEN** the native `<input>` has the `readonly` attribute
- **AND** the user can select and copy text but cannot type or paste
- **AND** the input can still receive focus

#### Scenario: Readonly visual styling
- **WHEN** `readOnly` prop is `true`
- **THEN** the input border uses a subtle dashed/dotted style
- **AND** the component does not appear disabled (no opacity reduction)

### Requirement: Required State

The TextField component SHALL support a `required` prop that marks the field as required.

#### Scenario: Required indicator and native attribute
- **WHEN** `required` prop is `true`
- **THEN** the native `<input>` has the `required` attribute and `aria-required="true"`
- **AND** if `label` is provided, an asterisk (*) in error color appears after the label text

### Requirement: Rest Props Forwarding

All additional props (`...rest`) SHALL be forwarded to the native `<input>` element. This includes standard HTML input attributes such as `type`, `name`, `maxLength`, `pattern`, `autoComplete`, `aria-label`, `aria-describedby`, `onFocus`, `onBlur`, `onKeyDown`, `data-testid`, etc. See MDN `<input>` reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input.

#### Scenario: Native attributes are forwarded
- **WHEN** props like `type`, `name`, `maxLength`, `pattern`, `autoComplete`, `inputMode` are provided
- **THEN** they are set on the native `<input>` element
- **AND** the input behaves according to those native attributes

#### Scenario: Event handlers are forwarded
- **WHEN** props like `onFocus`, `onBlur`, `onKeyDown`, `onPaste` are provided
- **THEN** they are attached to the native `<input>` element

#### Scenario: Data and ARIA attributes are forwarded
- **WHEN** props like `data-testid`, `aria-label`, `aria-labelledby` are provided
- **THEN** they are set on the native `<input>` element

### Requirement: Theming Architecture

The TextField SHALL follow Material Design 3 visual conventions by default (outlined input, label above). The component structure MUST support future theme switching purely via CSS file replacement — no theme prop or JS-level theming.

#### Scenario: Default MD3 appearance
- **WHEN** the TextField is rendered with default styles
- **THEN** the input has an outlined border, label positioned above the input, and helper text below
- **AND** the visual style follows Material Design 3 outlined text field conventions

#### Scenario: CSS-only theme switching
- **WHEN** a future theme (e.g., SAP Fiori) is applied by replacing the CSS Module file
- **THEN** the same HTML structure (label, input, helper) is restyled entirely via CSS
- **AND** no JavaScript changes or theme props are needed
- **AND** the component renders semantic HTML that is agnostic to any specific design system

### Requirement: Keyboard Accessibility

The TextField component SHALL be fully keyboard accessible with visible focus indicators.

#### Scenario: Focus styling
- **WHEN** the input receives keyboard focus
- **THEN** the border color changes to primary color (or error color if `error` is true)
- **AND** the border width increases from 1px to 2px

#### Scenario: Tab order includes interactive content
- **WHEN** interactive elements exist in startContent or endContent
- **THEN** the tab order is: startContent interactive elements → input → clear icon (if visible) → endContent interactive elements

### Requirement: TypeScript Type Safety

All types SHALL be defined in `TextField.types.ts` using the `type` keyword. The component props SHALL use `HtmlProps<"input", CustomProps>` from `@/utils/types`.

#### Scenario: TextFieldProps uses HtmlProps
- **WHEN** a developer imports `TextFieldProps`
- **THEN** it extends native `<input>` attributes via `HtmlProps<"input", CustomProps>`
- **AND** custom props (`label`, `helperText`, `error`, `startContent`, `endContent`, `showClearIcon`) are available
- **AND** TypeScript provides autocomplete for all props

#### Scenario: Types exported alongside component
- **WHEN** a developer imports from the TextField module
- **THEN** `TextFieldProps` type can be imported using the `type` keyword

### Requirement: CSS Styling

The TextField component SHALL use CSS Modules with the `classNames()` utility for all className composition. All color values SHALL use global `--reltio-color-*` tokens. Typography, spacing, and sizing use plain CSS values. No component-level CSS custom properties.

#### Scenario: classNames utility composes CSS modules
- **WHEN** the TextField is rendered
- **THEN** the `classNames()` utility combines all applicable CSS module classes
- **AND** automatically adds stable prefixed classes (e.g. `reltio_TextField_root`, `reltio_TextField_input`)

#### Scenario: Custom className and style support
- **WHEN** a developer provides `className` or `style` props
- **THEN** they are applied to the root wrapper element

#### Scenario: Colors use global tokens, everything else is plain values
- **WHEN** the TextField is rendered
- **THEN** border, text, background, focus, and error colors use `--reltio-color-*` tokens
- **AND** font-size, padding, min-height, border-radius use plain values (e.g. `14px`, `0 12px`, `40px`, `4px`)
- **AND** no hardcoded hex color values exist in the CSS

#### Scenario: Hover and focus states
- **WHEN** the user hovers over the input (not disabled/readonly)
- **THEN** the border color changes to a darker shade
- **WHEN** the input receives focus
- **THEN** the border changes to primary color with 2px width

### Requirement: Storybook Documentation

The TextField component SHALL have Storybook stories demonstrating all variants and common HTML attribute usage. Each story shows ONE variant. Stories use the "autodocs" tag.

#### Scenario: Core stories
- **WHEN** viewing Storybook
- **THEN** separate stories exist for: Default, WithLabel, WithPlaceholder, WithHelperText, Error, WithStartContent, WithEndContent, WithClearIcon, Disabled, Readonly, Required

#### Scenario: HTML attribute stories
- **WHEN** viewing Storybook
- **THEN** stories exist demonstrating common `...rest` usage: Password (type="password"), Email (type="email"), Maxlength (maxLength={10})
- **AND** these stories show that native HTML attributes work via rest props forwarding


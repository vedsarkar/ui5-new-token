# Button Icon-Only Mode Specification

## Purpose

The Button component automatically detects icon-only mode when children contains a single React component element, switching to a circular layout. This eliminates the need for a separate IconButton component while supporting all existing variants, colors, sizes, and states.

## Requirements

### Requirement: Icon-Only Detection

The Button component SHALL automatically detect icon-only mode when `children` contains exactly one React component element (not a native HTML element string and not a text node). No explicit prop is required to activate icon-only mode.

#### Scenario: Single icon component triggers icon-only mode

- **WHEN** children is a single React component element (e.g., `<Star />`)
- **THEN** Button applies the `iconOnly` CSS class to the root element
- **AND** Button renders with circular shape

#### Scenario: Icon with text does not trigger icon-only mode

- **WHEN** children contains a React component element and text (e.g., `<Star /> Label`)
- **THEN** Button does NOT apply the `iconOnly` CSS class
- **AND** Button renders with standard pill shape

#### Scenario: Text-only does not trigger icon-only mode

- **WHEN** children is a text string (e.g., `"Submit"`)
- **THEN** Button does NOT apply the `iconOnly` CSS class
- **AND** Button renders with standard pill shape

#### Scenario: Multiple elements do not trigger icon-only mode

- **WHEN** children contains more than one element (e.g., `<Star /> Label <Chevron />`)
- **THEN** Button does NOT apply the `iconOnly` CSS class
- **AND** Button renders with standard pill shape

### Requirement: Circular Layout in Icon-Only Mode

The Button component in icon-only mode SHALL render as a circle with the icon centered. The circle diameter SHALL equal the `min-height` defined by the current size variant.

#### Scenario: Icon-only button has equal width and height

- **WHEN** Button is in icon-only mode
- **THEN** the button has `aspect-ratio: 1`
- **AND** horizontal and vertical padding is `0`
- **AND** the icon is centered via flexbox

#### Scenario: Small icon-only button is 32px circle

- **WHEN** Button is in icon-only mode
- **AND** size is "small"
- **THEN** the button renders as a 32px diameter circle

#### Scenario: Medium icon-only button is 40px circle

- **WHEN** Button is in icon-only mode
- **AND** size is "medium"
- **THEN** the button renders as a 40px diameter circle

#### Scenario: Large icon-only button is 48px circle

- **WHEN** Button is in icon-only mode
- **AND** size is "large"
- **THEN** the button renders as a 48px diameter circle

### Requirement: Icon-Only Preserves All Variants and States

Icon-only mode SHALL work with all existing Button variants, colors, and states without any special handling.

#### Scenario: Icon-only with filled primary variant

- **WHEN** Button is in icon-only mode
- **AND** variant is "filled" and color is "primary"
- **THEN** the circular button uses the filled primary styling (background, text color, hover)

#### Scenario: Icon-only with outlined primary variant

- **WHEN** Button is in icon-only mode
- **AND** variant is "outlined" and color is "primary"
- **THEN** the circular button uses the outlined primary styling (border, text color, hover)

#### Scenario: Icon-only with text variant

- **WHEN** Button is in icon-only mode
- **AND** variant is "text"
- **THEN** the circular button uses the text variant styling (no background, no border)

#### Scenario: Icon-only disabled state

- **WHEN** Button is in icon-only mode
- **AND** disabled is true
- **THEN** the circular button applies disabled styling (opacity 0.38, no pointer events)

#### Scenario: Icon-only as anchor

- **WHEN** Button is in icon-only mode
- **AND** href is provided
- **THEN** the circular button renders as an `<a>` element with icon-only styling

### Requirement: Icon-Only Storybook Stories

The Button component SHALL have Storybook stories demonstrating icon-only mode across variants and colors.

#### Scenario: Icon-only stories exist for each variant-color combination

- **WHEN** viewing Storybook
- **THEN** separate stories exist for icon-only in filled, outlined, and text variants
- **AND** stories exist for both primary and inherited colors
- **AND** each story shows a single icon-only button

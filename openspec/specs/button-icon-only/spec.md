# button-icon-only Specification

## Purpose

Describes the automatic icon-only detection mode of the Button component. When `children` is a single React component element, the button switches to a square layout. This eliminates the need for a separate IconButton component.

## Requirements

### Requirement: Automatic Detection

The Button SHALL detect icon-only mode when `children` is a single React component element (not a string, not a Fragment).

#### Scenario: Single component child triggers icon-only
- **WHEN** `React.Children.count(children) === 1`
- **AND** `React.isValidElement(children)`
- **AND** `typeof children.type !== "string"` (not a native HTML element)
- **AND** `children.type !== React.Fragment`
- **THEN** the `.iconOnly` CSS class is applied

#### Scenario: Text children do not trigger icon-only
- **WHEN** children is a string or contains mixed text and components
- **THEN** standard button layout is used

### Requirement: Square Layout

#### Scenario: Icon-only dimensions
- **WHEN** icon-only mode is active
- **THEN** `aspect-ratio: 1`, `padding: 0`, `min-width: var(--sapElement_Height)`
- **AND** the icon is centered via flexbox

### Requirement: Accessibility

#### Scenario: aria-label required
- **WHEN** button is in icon-only mode
- **THEN** an `aria-label` SHOULD be provided for screen reader accessibility
- **AND** no visible text is available to describe the action

### Requirement: All Designs Supported

Icon-only mode works with all 7 design variants (default, emphasized, ghost, transparent, positive, negative, attention) — the same token sets apply.

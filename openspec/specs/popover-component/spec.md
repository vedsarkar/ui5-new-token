# popover-component Specification

## Purpose

Popover — a floating overlay anchored to a trigger element, using CSS Anchor Positioning for placement. Supports header, body, and footer slots.

SAP equivalent: `ui5-popover`. Reference: https://experience.sap.com/fiori-design-web/popover/

## Requirements

### Requirement: CSS Anchor Positioning

The Popover SHALL use the CSS Anchor Positioning API (`anchor-name`, `position-anchor`, `position-area`) for placement relative to the trigger.

#### Scenario: Position area
- **WHEN** `positionArea` is set (default: `"bottom"`)
- **THEN** the popover positions itself relative to the trigger using the specified CSS `position-area` value

### Requirement: Trigger

#### Scenario: Click toggle
- **WHEN** the user clicks the `trigger` element
- **THEN** the popover toggles visibility via the Popover API

### Requirement: Header and Footer Slots

#### Scenario: Header
- **WHEN** `header` is provided
- **THEN** header content renders at the top with a bottom border in `--sapGroup_ContentBorderColor`

#### Scenario: Footer
- **WHEN** `footer` is provided
- **THEN** footer content renders at the bottom, right-aligned, with a top border

### Requirement: Body Scrolling

#### Scenario: Overflow
- **THEN** the body area has `overflow-y: auto` with constrained max-width/max-height

### Requirement: Toggle Event

#### Scenario: onToggle callback
- **WHEN** `onToggle` is provided
- **THEN** it is called with a synthetic event when the popover opens or closes
- **AND** `event.newState` indicates the new visibility state

### Requirement: TypeScript Types

Props SHALL be defined as `PopoverProps = HtmlProps<"div", { trigger, positionArea, onToggle, header, footer }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapField_BorderColor`, `--sapGroup_ContentBackground`, `--sapTextColor`, `--sapContent_Shadow1`, `--sapGroup_ContentBorderColor`.

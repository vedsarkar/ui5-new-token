# error-message-component Specification

## Purpose

ErrorMessage — a styled error message block with icon and text, used to display error states in forms or content areas.

No direct SAP equivalent (custom component using SAP Horizon tokens).

## Requirements

### Requirement: Error Display

#### Scenario: Error message with icon
- **WHEN** the component renders
- **THEN** an error icon (20x20px) renders on the left with the message text on the right
- **AND** uses flex layout with `flex-start` alignment and 8px gap

#### Scenario: Custom message
- **WHEN** `children` is provided
- **THEN** the custom message text is displayed

#### Scenario: Default message
- **WHEN** `children` is not provided or `null`
- **THEN** a default error message is displayed

### Requirement: TypeScript Types

Props SHALL be defined as `ErrorMessageProps = HtmlProps<"div", { children }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapErrorBackground` (background), `--sapNegativeElementColor` (border), `--sapNegativeTextColor` (text).

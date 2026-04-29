# dialog-component Specification

## Purpose

SAP Fiori Dialog — a controlled modal dialog built on the native HTML `<dialog>` element. Opens via `showModal()`, providing backdrop, focus trapping, Esc dismiss, and click-outside dismiss automatically. Supports optional header (with close button) and footer slots.

SAP equivalent: `ui5-dialog`. Reference: https://experience.sap.com/fiori-design-web/dialog/

## Requirements

### Requirement: Controlled Open State

The Dialog SHALL operate in controlled mode via the `open` prop. It calls `showModal()` when `open` becomes `true` and `close()` when `open` becomes `false`.

#### Scenario: Opening the dialog
- **WHEN** `open` changes from `false` to `true`
- **THEN** `showModal()` is called on the native `<dialog>`
- **AND** the dialog appears in the top layer with backdrop

#### Scenario: Closing the dialog
- **WHEN** `open` changes from `true` to `false`
- **THEN** `close()` is called on the native `<dialog>`

### Requirement: Dismissal

The Dialog SHALL support dismissal via Esc key, click outside (light dismiss), and the close button. All methods call `onClose`.

#### Scenario: Esc key dismiss
- **WHEN** the dialog is open and the user presses Escape
- **THEN** `onClose` is called (native dialog behavior via `closedby="any"`)

#### Scenario: Click outside dismiss
- **WHEN** the user clicks on the backdrop
- **THEN** `onClose` is called (native dialog behavior via `closedby="any"`)

#### Scenario: Close button dismiss
- **WHEN** `header` is provided and the user clicks the close button
- **THEN** `onClose` is called

### Requirement: Header and Footer Slots

#### Scenario: Header with close button
- **WHEN** `header` is provided
- **THEN** header content renders in the header area at 16px / 600 weight
- **AND** a close button with `aria-label="Close"` appears in the top-right corner
- **AND** close button uses `--sapContent_LabelColor`, hover: `--sapNeutralBackground`

#### Scenario: Footer
- **WHEN** `footer` is provided
- **THEN** footer content renders right-aligned with 8px gap

#### Scenario: Body content
- **WHEN** `children` is provided
- **THEN** body renders in a scrollable card area with `--sapGroup_ContentBackground` background
- **AND** `--sapGroup_ContentBorderColor` border with 12px radius

### Requirement: Animation

#### Scenario: Open animation
- **WHEN** the dialog opens
- **THEN** scale transitions from 0.97 to 1 with 200ms ease-out
- **AND** opacity transitions from 0 to 1
- **AND** backdrop opacity transitions from 0 to 1

### Requirement: Focus Management

#### Scenario: Default focus
- **WHEN** the dialog opens
- **THEN** the browser focuses the first focusable element (native behavior)

#### Scenario: Custom autofocus
- **WHEN** an element inside the dialog has `data-autofocus` attribute
- **THEN** that element receives focus after opening

### Requirement: Layout Constraints

#### Scenario: Max dimensions
- **WHEN** the dialog renders
- **THEN** `max-width: min(640px, calc(100vw - 48px))`
- **AND** `max-height: min(480px, calc(100vh - 48px))`
- **AND** body area scrolls when content overflows

### Requirement: TypeScript Types

Props SHALL be defined as `DialogProps = HtmlProps<"dialog", { open, onClose, header, footer }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapField_BorderColor`, `--sapBackgroundColor`, `--sapTextColor`, `--sapContent_Shadow2`, `--sapBlockLayer_Background`, `--sapNeutralBackground`, `--sapContent_LabelColor`, `--sapContent_FocusColor`, `--sapGroup_ContentBackground`, `--sapGroup_ContentBorderColor`.

### Requirement: Storybook Stories

#### Scenario: Stories
- Default (body content only)
- WithHeaderAndFooter (header, footer buttons, data-autofocus on TextArea)
- CustomBody (no header/footer props, all content in body)
- ScrollableContent (long body demonstrating scroll)

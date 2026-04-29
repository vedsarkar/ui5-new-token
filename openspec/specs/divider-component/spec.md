# divider-component Specification

## Purpose

Divider — a horizontal rule with optional label text, used to visually separate content sections.

No direct SAP equivalent (custom component using SAP Horizon tokens).

## Requirements

### Requirement: Basic Divider

#### Scenario: Line-only divider
- **WHEN** no `children` is provided
- **THEN** renders a full-width horizontal line in `--sapNeutralBackground`

### Requirement: Labeled Divider

#### Scenario: Labeled divider with alignment
- **WHEN** `children` (label text) is provided
- **THEN** label renders in `--sapContent_LabelColor` with lines on either side
- **AND** line segments use `::before` and `::after` pseudo-elements

#### Scenario: Align start
- **WHEN** `align` is `"start"` or not set
- **THEN** label appears at the start, line appears after

#### Scenario: Align center
- **WHEN** `align` is `"center"`
- **THEN** lines appear on both sides of the label

#### Scenario: Align end
- **WHEN** `align` is `"end"`
- **THEN** line appears before, label at the end

### Requirement: TypeScript Types

Props SHALL be defined as `DividerProps = HtmlProps<"div", { align, children }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapNeutralBackground`, `--sapContent_LabelColor`.

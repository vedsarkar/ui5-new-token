# details-component Specification

## Purpose

Details — a collapsible disclosure widget built on the native `<details>/<summary>` elements, used for expandable content sections with code block styling support.

No direct SAP equivalent (custom component using SAP Horizon tokens).

## Requirements

### Requirement: Native Details/Summary

The Details SHALL use native `<details>` and `<summary>` HTML elements for built-in accessibility and no-JS fallback.

#### Scenario: Toggle behavior
- **WHEN** the user clicks the summary
- **THEN** the content expands or collapses (native `<details>` behavior)

#### Scenario: Open prop
- **WHEN** `open` is `true`
- **THEN** the native `open` attribute is set and content is visible

### Requirement: Custom Chevron

#### Scenario: Chevron animation
- **THEN** a custom chevron icon rotates 180 degrees when the details element is open

### Requirement: Hover State

#### Scenario: Summary hover
- **WHEN** the user hovers over the summary
- **THEN** background changes to `--sapBrandColor` at 12% opacity (via `color-mix`)

### Requirement: Theme-aware Code Blocks

#### Scenario: Code styling
- **THEN** `<code>` and `<pre>` elements inside details use theme-aware backgrounds
- **AND** light theme: `--sapBackgroundColor`
- **AND** borders use `--sapField_BorderColor`

### Requirement: TypeScript Types

Props SHALL be defined as `DetailsProps = HtmlProps<"details", { open }>`.

### Requirement: CSS Styling

**SAP tokens used:** `--sapGroup_ContentBackground`, `--sapBackgroundColor`, `--sapField_BorderColor`, `--sapTextColor`, `--sapBrandColor`.

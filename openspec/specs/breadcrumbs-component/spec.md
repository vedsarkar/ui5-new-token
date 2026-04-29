# breadcrumbs-component Specification

## Purpose

Breadcrumbs — a horizontal navigation trail showing the user's location in a page hierarchy. Built with semantic `<nav>/<ul>/<li>/<a>` structure.

SAP equivalent: `ui5-breadcrumbs`. Reference: https://experience.sap.com/fiori-design-web/breadcrumb/

> **Note:** A future change will add overflow collapsing behavior via `useOverflow` hook.

## Requirements

### Requirement: Semantic Structure

#### Scenario: HTML structure
- **WHEN** the Breadcrumbs renders
- **THEN** it uses `<nav>` → `<ul>` → `<li>` → `<a>` structure
- **AND** items are separated by ">" separator characters

### Requirement: Breadcrumb Items

#### Scenario: Link breadcrumb
- **WHEN** a Breadcrumb has `href`
- **THEN** it renders as an `<a>` link in `--sapContent_LabelColor`

#### Scenario: Current page (last item)
- **WHEN** a Breadcrumb is the last child
- **THEN** it renders in `--sapTextColor` with `font-weight: 600`
- **AND** has no link styling

### Requirement: Hover and Focus States

#### Scenario: Link hover
- **WHEN** the user hovers over a breadcrumb link
- **THEN** text changes to `--sapTextColor` with `--sapNeutralBackground` background

#### Scenario: Link focus
- **WHEN** a link receives keyboard focus
- **THEN** 2px outline in `--sapContent_FocusColor`

### Requirement: Separator

#### Scenario: Default separator
- **THEN** ">" character renders between items in `--sapContent_LabelColor`

### Requirement: Wrap Behavior

#### Scenario: Long breadcrumb trails
- **THEN** items wrap to the next line via `flex-wrap: wrap`

### Requirement: Compound Component API

The Breadcrumbs uses a compound pattern: `<Breadcrumbs>` (nav wrapper) + `<Breadcrumb>` (individual item/link).

### Requirement: TypeScript Types

- `BreadcrumbsProps = HtmlProps<"nav", { children }>`
- `BreadcrumbProps = HtmlProps<"a", { href, children }>`

### Requirement: CSS Styling

**SAP tokens used:** `--sapContent_LabelColor`, `--sapTextColor`, `--sapNeutralBackground`, `--sapContent_FocusColor`.

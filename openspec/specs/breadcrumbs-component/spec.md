# breadcrumbs-component Specification

## Purpose
TBD - created by archiving change design-package-v1. Update Purpose after archive.
## Requirements
### Requirement: Container Rendering

The Breadcrumbs component SHALL render a `<nav aria-label="Breadcrumb">` wrapping an `<ol>` list. Each Breadcrumb child is wrapped in an `<li>` with separators inserted between items.

#### Scenario: Semantic HTML structure
- **WHEN** Breadcrumbs is rendered with Breadcrumb children
- **THEN** output is `<nav aria-label="Breadcrumb">` containing `<ol>`
- **AND** each Breadcrumb is wrapped in an `<li>` element

#### Scenario: Default separator between items
- **WHEN** separator prop is not provided
- **THEN** a "/" character is rendered between each pair of items
- **AND** separator is wrapped in a `<li aria-hidden="true">` element

#### Scenario: Custom separator
- **WHEN** separator prop is provided (e.g. `<ChevronRight />`)
- **THEN** the custom ReactNode replaces the default "/" separator
- **AND** separator is still wrapped in `<li aria-hidden="true">`

### Requirement: Breadcrumb Link Item

The Breadcrumb component SHALL render as a link when `href` is provided.

#### Scenario: Breadcrumb with href renders anchor
- **WHEN** href prop is provided
- **THEN** Breadcrumb renders as an `<a>` element with the given href
- **AND** link uses `var(--reltio-color-primary)` color

#### Scenario: Breadcrumb hover state
- **WHEN** user hovers over a linked Breadcrumb
- **THEN** text-decoration changes to underline

### Requirement: Current Page Item

The last Breadcrumb (current page) SHALL render as a non-interactive element with `aria-current="page"`.

#### Scenario: Breadcrumb without href renders span
- **WHEN** href prop is not provided
- **THEN** Breadcrumb renders as a `<span>` element
- **AND** `aria-current="page"` is set on the span
- **AND** text uses `var(--reltio-color-text)` with no link styling

### Requirement: Rest Props Forwarding

The Breadcrumbs component SHALL forward all rest props to the `<nav>` element. The Breadcrumb component SHALL forward all rest props to the underlying `<a>` or `<span>` element.

#### Scenario: Nav receives rest props
- **WHEN** data attributes or className are provided to Breadcrumbs
- **THEN** the `<nav>` element receives those props

#### Scenario: Link receives rest props
- **WHEN** data attributes or target prop are provided to a Breadcrumb with href
- **THEN** the `<a>` element receives those props

### Requirement: CSS Styling

The Breadcrumbs component SHALL use CSS Modules with the classNames utility. Colors reference global `--reltio-color-*` tokens. No component-level CSS custom properties.

#### Scenario: Colors use global tokens
- **WHEN** Breadcrumbs is rendered
- **THEN** links use `var(--reltio-color-primary)`
- **AND** current page text uses `var(--reltio-color-text)`
- **AND** separator uses `var(--reltio-color-text-secondary)`
- **AND** no hardcoded hex values in CSS

#### Scenario: List resets
- **WHEN** the `<ol>` is rendered
- **THEN** list-style is none, margin and padding are reset
- **AND** items are displayed inline with flexbox and centered alignment

#### Scenario: Stable CSS classes for external customization
- **WHEN** Breadcrumbs is rendered
- **THEN** classNames utility provides stable prefixed classes (e.g. `reltio_Breadcrumbs_root`, `reltio_Breadcrumbs_separator`)

### Requirement: TypeScript Type Safety

All types SHALL be in `Breadcrumbs.types.ts` using the `type` keyword.

#### Scenario: Breadcrumbs props use HtmlProps
- **WHEN** developer uses Breadcrumbs
- **THEN** BreadcrumbsProps extends `HtmlProps<"nav", CustomBreadcrumbsProps>`
- **AND** custom props: `separator`, `children`, `className`, `style`
- **AND** rest props are forwarded to the `<nav>` element

#### Scenario: Breadcrumb props use HtmlProps
- **WHEN** developer uses Breadcrumb
- **THEN** BreadcrumbProps extends `HtmlProps<"a", CustomBreadcrumbProps>`
- **AND** custom props: `href` (optional), `children`, `className`, `style`
- **AND** rest props are forwarded to the `<a>` or `<span>` element

### Requirement: Storybook Documentation

The Breadcrumbs component SHALL have Storybook stories demonstrating all variants with interaction tests.

#### Scenario: Stories cover all variants
- **WHEN** viewing Storybook
- **THEN** a **Default** story shows 3 breadcrumb items where the last is current (no href)
- **AND** a **WithCustomSeparator** story shows breadcrumbs with `separator={<ChevronRight />}`
- **AND** a **ManyItems** story shows 5+ breadcrumb items

#### Scenario: Play function verifies accessibility
- **WHEN** the Default story play function runs
- **THEN** it verifies the `<nav>` has `aria-label="Breadcrumb"`
- **AND** it verifies link items are clickable `<a>` elements
- **AND** it verifies the last item has `aria-current="page"`


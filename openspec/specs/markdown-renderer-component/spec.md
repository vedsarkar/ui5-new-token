# markdown-renderer-component Specification

## Purpose

Provides a unified Markdown rendering component that safely renders Markdown-formatted text as styled HTML, with error handling via ErrorBoundary, sanitization, and tag-to-component overrides including design system components.

## Requirements

### Requirement: Markdown Rendering

The Markdown component SHALL render Markdown-formatted text content as properly formatted HTML using the `markdown-to-jsx` library, supporting common Markdown features and GitHub Flavored Markdown (GFM).

#### Scenario: Standard Markdown renders correctly
- **WHEN** Markdown content contains standard syntax (headers, paragraphs, lists, links, code blocks, emphasis, blockquotes)
- **THEN** content is rendered as properly formatted HTML
- **AND** semantic HTML elements are used (h1-h6, p, ul/ol/li, a, pre/code, em/strong, blockquote)

#### Scenario: GFM features render correctly
- **WHEN** Markdown content contains GFM syntax (tables, task lists, strikethrough, autolinks)
- **THEN** GFM features are rendered correctly

#### Scenario: Null/undefined children handled
- **WHEN** `children` is `null` or `undefined`
- **THEN** the component returns `null` (renders nothing)
- **AND** no errors are thrown

#### Scenario: Non-string children coerced
- **WHEN** `children` is not a string
- **THEN** it is coerced to string via `String(children)`

### Requirement: Error Handling via ErrorBoundary

The Markdown component SHALL wrap the `markdown-to-jsx` renderer in an ErrorBoundary, displaying the raw content in a `<pre>` element as fallback when parsing fails.

#### Scenario: Parsing error shows fallback
- **WHEN** Markdown content causes a rendering error
- **THEN** the ErrorBoundary catches the error
- **AND** the raw children content is displayed in a `<pre>` element with `styles.error` class

#### Scenario: Valid content renders normally
- **WHEN** Markdown content parses successfully
- **THEN** the rendered HTML is displayed normally
- **AND** no fallback is shown

### Requirement: HTML Sanitization

The Markdown component SHALL use `markdown-to-jsx`'s `sanitizer` and `tagfilter` options for safe HTML rendering.

#### Scenario: Sanitizer applied
- **WHEN** Markdown content contains HTML
- **THEN** the `sanitizer` from `markdown-to-jsx` is applied
- **AND** `tagfilter: true` is enabled
- **AND** potentially dangerous HTML is filtered

### Requirement: Tag-to-Component Overrides

The Markdown component SHALL override specific HTML tags with design system components via `baseOverrides` and `allowedOverrides`.

#### Scenario: Links with external detection
- **WHEN** Markdown renders a link (`<a>`)
- **THEN** links starting with "http" or "//" get `target="_blank"` and `rel="noopener noreferrer"`
- **AND** internal links render without target/rel attributes

#### Scenario: Tables wrapped for overflow
- **WHEN** Markdown renders a table
- **THEN** the `<table>` is wrapped in a `<div>` with `tableWrapper` class for overflow scrolling

#### Scenario: Button replaced with design system Button
- **WHEN** Markdown renders a `<button>` tag
- **THEN** the design system `Button` component is used instead

#### Scenario: Details replaced with design system Details
- **WHEN** Markdown renders a `<details>` tag
- **THEN** the design system `Details` component is used instead

#### Scenario: Allowed component overrides
- **WHEN** Markdown content references the `Button` component
- **THEN** `Button` is available via `allowedOverrides` for use within Markdown content

### Requirement: Single Markdown Rendering Solution

The design system SHALL use only one markdown rendering component (`Markdown`) for all markdown content. No separate MDXRenderer or second markdown renderer component exists.

#### Scenario: One component for all content
- **WHEN** a consumer needs to render markdown content
- **THEN** only the `Markdown` component is available
- **AND** it supports all tag-to-component overrides

#### Scenario: No separate MDX component
- **WHEN** the design system is used
- **THEN** there is no separate MDXRenderer component
- **AND** the `Markdown` component provides all required functionality

### Requirement: CSS Custom Properties Customization

The Markdown component SHALL define all design tokens as CSS custom properties on `.root` with the `--reltio-markdown-` prefix.

#### Scenario: All CSS variables defined on root
- **WHEN** Markdown component is rendered
- **THEN** CSS custom properties are defined on `.root` class
- **AND** variables cover typography (font-family, size, weight, line-height, letter-spacing), heading sizes (h1-h6), code styling, colors (text, link, blockquote, table), and spacing (paragraph, heading, list, blockquote margins/padding)

#### Scenario: External customization via inline styles
- **WHEN** developer provides `style` prop with CSS variables
- **THEN** Markdown applies custom values

### Requirement: className Utility Usage

The Markdown component SHALL use the `classNames` utility for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Markdown component is rendered
- **THEN** `classNames` utility combines `styles.root` with custom className

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element

### Requirement: TypeScript Type Safety

The Markdown component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `Markdown.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses Markdown component
- **THEN** `className` is typed as optional string
- **AND** `style` is typed as `React.CSSProperties & MarkdownCSSVariables`
- **AND** `children` is provided via `React.PropsWithChildren<MarkdownProps>`

#### Scenario: MarkdownCSSVariables type
- **WHEN** developer overrides styles
- **THEN** `MarkdownCSSVariables` type provides autocomplete for all `--reltio-markdown-*` CSS variables
- **AND** includes typography, heading sizes, code, color, and spacing variables

#### Scenario: Types exported alongside component
- **WHEN** developer imports Markdown
- **THEN** `MarkdownProps` and `MarkdownCSSVariables` types can be imported
- **AND** types are in `Markdown.types.ts`

### Requirement: Storybook Documentation

The Markdown component SHALL have comprehensive Storybook stories demonstrating Markdown features, with each story showing only ONE variant.

#### Scenario: Stories for Markdown features
- **WHEN** viewing Storybook
- **THEN** stories exist for headers, paragraphs, lists, code blocks, links, emphasis, blockquotes, tables
- **AND** each story demonstrates a specific Markdown feature

#### Scenario: Stories for error handling
- **WHEN** viewing Storybook
- **THEN** stories demonstrate ErrorBoundary fallback for invalid content

# Typography Foundation Specification

## Purpose

The Typography Foundation defines the default font for the entire Reltio Design Platform. It establishes SAP 72 as the system-wide typeface (text and monospace), self-hosted from the `public/fonts/` directory and loaded via `public/fonts.css`. The foundation is consumed implicitly by every component through CSS inheritance from the `:root` element. Components MUST NOT declare `font-family` — the only allowed declarations are `font-family: inherit` on form controls and the canonical 72 Mono stack in monospace contexts.

This capability aligns the platform with the SAP Fiori reference baseline declared in the `design-package-v1` change and removes the previous reliance on third-party CDN fonts (Google Fonts).

## ADDED Requirements

### Requirement: Default Font Family

The platform SHALL set SAP 72 as the default `font-family` on the `:root` element. All components SHALL inherit this default.

#### Scenario: Root font is SAP 72
- **WHEN** the design system stylesheet is loaded
- **THEN** `:root` declares `font-family: "72", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **AND** the declaration uses `!important` to defeat any user-agent or framework reset

#### Scenario: Components inherit the root font
- **WHEN** any Reltio component is rendered
- **THEN** its computed `font-family` resolves to the root stack
- **AND** no component CSS file declares `font-family` except as permitted by the "Form Control Inheritance" and "Monospace Contexts" requirements

### Requirement: Self-Hosted Font Assets

The platform SHALL self-host SAP 72 font files in `public/fonts/`. No third-party CDN SHALL be used to load the default font.

#### Scenario: Fonts are served from same origin
- **WHEN** a Storybook page loads
- **THEN** all font requests target the same origin as the application
- **AND** no requests are made to `fonts.googleapis.com`, `fonts.gstatic.com`, or any third-party font CDN

#### Scenario: Only `.woff2` is shipped
- **WHEN** inspecting `public/fonts/`
- **THEN** every font file uses the `.woff2` extension
- **AND** no `.woff`, `.ttf`, `.otf`, or `.eot` files are present

#### Scenario: Flat directory layout for consumer simplicity
- **WHEN** inspecting `public/fonts/`
- **THEN** all 16 font files live directly in that directory with no subdirectories
- **AND** the file set consists of 12 weights for the `"72"` family (six Latin-subset files such as `72-Regular.woff2` plus six extended `-full` counterparts such as `72-Regular-full.woff2`) and 4 weights for the `"72 Mono"` family (`72Mono-Regular.woff2`, `72Mono-Regular-full.woff2`, `72Mono-Bold.woff2`, `72Mono-Bold-full.woff2`)
- **AND** file names follow SAP's original convention so consumers can self-host by copying the entire directory in a single step

### Requirement: Font Face Declarations

The platform SHALL declare `@font-face` rules for SAP 72 (six weights) and 72 Mono (two weights) in `public/fonts.css`. Each weight SHALL be declared twice with different `unicode-range` values to enable per-subset on-demand downloads.

#### Scenario: Six text weights are available
- **WHEN** `public/fonts.css` is loaded
- **THEN** the family `"72"` provides Light (300), Regular (400), Italic (400 italic), Semibold (600), Bold (700), and BoldItalic (700 italic) weights

#### Scenario: Two monospace weights are available
- **WHEN** `public/fonts.css` is loaded
- **THEN** the family `"72 Mono"` provides Regular (400) and Bold (700) weights

#### Scenario: Hybrid `unicode-range` selects the correct subset
- **WHEN** a page contains only Latin characters
- **THEN** the browser downloads only the Latin-subset `.woff2` files (those without the `-full` suffix) for the weights in use
- **WHEN** a page contains characters outside Latin (Cyrillic, CJK, Arabic, Greek, etc.)
- **THEN** the browser additionally downloads the corresponding `-full` `.woff2` files for those characters only

#### Scenario: All declarations use `font-display: swap`
- **WHEN** a font asset is loading
- **THEN** the browser renders text immediately using the system fallback
- **AND** swaps to the SAP 72 face once it is available

### Requirement: Form Control Inheritance

Form control elements (`<input>`, `<textarea>`, `<select>`, `<button>`) SHALL explicitly inherit `font-family` from their ancestor. This is the only permitted `font-family` declaration in component CSS aside from the monospace stack.

#### Scenario: TextField input inherits the root font
- **WHEN** the TextField component is rendered
- **THEN** the underlying `<input>` element has `font-family: inherit`
- **AND** the input's computed `font-family` matches `:root`

#### Scenario: TextArea inherits in all states
- **WHEN** the TextArea component is rendered
- **THEN** every state-specific selector that targets the `<textarea>` element either declares `font-family: inherit` or omits `font-family` entirely

### Requirement: Monospace Contexts

Components that render monospaced content SHALL use the canonical 72 Mono stack. Bare `monospace` declarations SHALL NOT appear in component CSS.

#### Scenario: Markdown code blocks use 72 Mono
- **WHEN** the Markdown component renders `<code>` or `<pre>` elements
- **THEN** their `font-family` is `"72 Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`

#### Scenario: Details JSON viewer uses 72 Mono
- **WHEN** the Details component renders its JSON view
- **THEN** the JSON content uses the same 72 Mono stack

#### Scenario: Storybook Fetcher block uses 72 Mono
- **WHEN** the Storybook Fetcher block renders request or response payloads
- **THEN** the payload regions use the same 72 Mono stack

### Requirement: Component CSS Restrictions

Component CSS files SHALL NOT declare `font-family` except as permitted by the "Form Control Inheritance" and "Monospace Contexts" requirements.

#### Scenario: No font overrides in components
- **WHEN** a developer searches the `components/` and `charts/` trees for `font-family`
- **THEN** every result is either `font-family: inherit` (form controls) or the canonical 72 Mono stack
- **AND** no result references `"Inter"`, `"Libre Franklin"`, `"Roboto"`, `"Roboto Flex"`, `system-ui`, or any other font name

### Requirement: Storybook Preview Loads Typography Foundation

The Storybook preview SHALL load `public/fonts.css` before `public/global.css` so that `@font-face` declarations are registered before the `:root` selector references them.

#### Scenario: Stylesheet load order
- **WHEN** Storybook serves `preview-head.html`
- **THEN** `<link rel="stylesheet" href="/variables.css">` appears
- **AND** `<link rel="stylesheet" href="/fonts.css">` appears next
- **AND** `<link rel="stylesheet" href="/global.css">` appears last
- **AND** no Google Fonts `<link>` tags are present

### Requirement: Typography Guide

The platform SHALL provide a Storybook documentation page describing the typography foundation, available weights, the monospace stack, and the rule that components must not declare `font-family`.

#### Scenario: Guide is published in Storybook
- **WHEN** viewing Storybook
- **THEN** a `Guides / Typography` page is available
- **AND** the page documents the six text weights, the two monospace weights, the inheritance rule, and the consumer-side requirement to serve `public/fonts/` and load `public/fonts.css`

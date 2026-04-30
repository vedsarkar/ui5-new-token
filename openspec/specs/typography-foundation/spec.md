# Typography Foundation Specification

## Purpose

The Typography Foundation defines the default font for the entire Reltio Design Platform. It establishes SAP 72 as the system-wide typeface (text and monospace), self-hosted from the `public/fonts/` directory and loaded via `public/fonts.css`. The foundation is consumed implicitly by every component through CSS inheritance from the `:root` element. Components MUST NOT declare `font-family` — the only allowed declarations are `font-family: inherit` on form controls and the canonical 72 Mono stack in monospace contexts.

This capability aligns the platform with the SAP Fiori reference baseline declared in the `design-package-v1` change and removes the previous reliance on third-party CDN fonts (Google Fonts).
## Requirements
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

The platform SHALL self-host SAP 72 font files in `public/fonts/`. No third-party CDN SHALL be used to load the default font from a domain outside the platform's own deployment.

#### Scenario: Fonts are served from same origin
- **WHEN** a Storybook page loads
- **THEN** all font requests target either the same origin as the application or the platform's own deployment domain (`reltio.design`)
- **AND** no requests are made to `fonts.googleapis.com`, `fonts.gstatic.com`, or any third-party font CDN unrelated to the platform

#### Scenario: Only `.woff2` is shipped
- **WHEN** inspecting `public/fonts/`
- **THEN** every font file uses the `.woff2` extension
- **AND** no `.woff`, `.ttf`, `.otf`, or `.eot` files are present

#### Scenario: Flat directory layout for consumer simplicity
- **WHEN** inspecting `public/fonts/`
- **THEN** all 20 font files live directly in that directory with no subdirectories
- **AND** the file set consists of 16 weights for the `"72"` family (eight Latin-subset files: `72-Light.woff2`, `72-Regular.woff2`, `72-Italic.woff2`, `72-Semibold.woff2`, `72-SemiboldDuplex.woff2`, `72-Bold.woff2`, `72-BoldItalic.woff2`, `72-Black.woff2`, plus eight extended `-full` counterparts) and 4 weights for the `"72 Mono"` family (`72Mono-Regular.woff2`, `72Mono-Regular-full.woff2`, `72Mono-Bold.woff2`, `72Mono-Bold-full.woff2`)
- **AND** file names follow SAP's original convention so consumers can self-host by copying the entire directory in a single step

### Requirement: Font Face Declarations

The platform SHALL declare `@font-face` rules for SAP 72 (eight text weights) and 72 Mono (two weights) in the runtime-injected `<style>` produced by the `ThemeProvider` component as well as in the static `public/fonts.css` fallback file. Each weight SHALL be declared twice with different `unicode-range` values to enable per-subset on-demand downloads.

#### Scenario: Eight text weights are available
- **WHEN** any code path that registers SAP 72 `@font-face` rules has been activated (either via `ThemeProvider` mount or via `<link rel="stylesheet" href="/fonts.css">`)
- **THEN** the family `"72"` provides Light (300), Regular (400), Italic (400 italic), Semibold (600), SemiboldDuplex (600 with width-stable duplex), Bold (700), BoldItalic (700 italic), and Black (900) weights

#### Scenario: Two monospace weights are available
- **WHEN** SAP 72 `@font-face` rules are active
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

The Storybook preview SHALL register SAP 72 `@font-face` rules through the `ThemeProvider` decorator wrapping every story. The `preview-head.html` file SHALL load the platform's own non-design-system stylesheets (currently `/global.css`) only.

#### Scenario: ThemeProvider decorator activates fonts
- **WHEN** Storybook serves any story or docs page
- **THEN** the page is wrapped in `<ThemeProvider>` (via the global decorator in `.storybook/preview.tsx`)
- **AND** the provider injects a `<style>` element into `<head>` containing `@font-face` rules for all 10 SAP 72 face variants (eight text + two monospace), each in two unicode subsets (20 declarations total)

#### Scenario: preview-head.html no longer references design-system CSS
- **WHEN** Storybook serves `preview-head.html`
- **THEN** the file does NOT contain a `<link rel="stylesheet" href="/variables.css">` declaration
- **AND** the file does NOT contain a `<link rel="stylesheet" href="/fonts.css">` declaration
- **AND** the file MAY contain a `<link rel="stylesheet" href="/global.css">` declaration (or equivalent) for non-design-system Storybook setup
- **AND** no Google Fonts `<link>` tags are present

### Requirement: Typography Guide

The platform SHALL provide a Storybook documentation page describing the typography foundation, available weights, the monospace stack, and the rule that components must not declare `font-family`.

#### Scenario: Guide is published in Storybook
- **WHEN** viewing Storybook
- **THEN** a `Guides / Typography` page is available
- **AND** the page documents the six text weights, the two monospace weights, the inheritance rule, and the consumer-side requirement to serve `public/fonts/` and load `public/fonts.css`


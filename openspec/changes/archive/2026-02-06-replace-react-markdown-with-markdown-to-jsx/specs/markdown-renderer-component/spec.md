# Spec delta: markdown-renderer-component

## MODIFIED Requirements

### Requirement: Markdown Rendering

The MarkdownRenderer component SHALL render Markdown-formatted text content as properly formatted HTML, supporting common Markdown features including headers, paragraphs, lists, links, code blocks, emphasis, and blockquotes. The component SHALL support GitHub Flavored Markdown (GFM) extensions and raw HTML rendering.

#### Scenario: Headers render correctly
- **WHEN** Markdown content contains header syntax (# through ######)
- **THEN** headers are rendered with appropriate HTML heading elements (h1 through h6)
- **AND** headers have proper semantic structure

#### Scenario: Paragraphs render correctly
- **WHEN** Markdown content contains paragraph text
- **THEN** text is wrapped in paragraph elements
- **AND** multiple paragraphs are separated appropriately

#### Scenario: Lists render correctly
- **WHEN** Markdown content contains unordered list syntax (- or *)
- **THEN** unordered lists are rendered with proper ul/li structure
- **WHEN** Markdown content contains ordered list syntax (1. 2. 3.)
- **THEN** ordered lists are rendered with proper ol/li structure
- **AND** nested lists are supported

#### Scenario: Links render correctly
- **WHEN** Markdown content contains link syntax [text](url)
- **THEN** links are rendered as anchor elements with proper href attributes
- **AND** links open in new tab when appropriate (target="_blank" with rel="noopener noreferrer")

#### Scenario: Emphasis renders correctly
- **WHEN** Markdown content contains bold syntax (**text** or __text__)
- **THEN** text is rendered with strong elements
- **WHEN** Markdown content contains italic syntax (*text* or _text_)
- **THEN** text is rendered with em elements

#### Scenario: Code renders correctly
- **WHEN** Markdown content contains inline code syntax (`code`)
- **THEN** code is rendered with code elements
- **WHEN** Markdown content contains code block syntax (```code```)
- **THEN** code blocks are rendered with pre and code elements
- **AND** code blocks preserve formatting and whitespace

#### Scenario: Blockquotes render correctly
- **WHEN** Markdown content contains blockquote syntax (> text)
- **THEN** blockquotes are rendered with blockquote elements
- **AND** nested blockquotes are supported

#### Scenario: GitHub Flavored Markdown (GFM) tables render correctly
- **WHEN** Markdown content contains GFM table syntax (| column | column |)
- **THEN** tables are rendered with proper table, thead, tbody, tr, th, and td elements
- **AND** table headers are properly styled
- **AND** table cells have appropriate spacing and alignment

#### Scenario: GitHub Flavored Markdown (GFM) task lists render correctly
- **WHEN** Markdown content contains GFM task list syntax (- [ ] or - [x])
- **THEN** task lists are rendered with checkbox input elements
- **AND** checked items display as checked (checked attribute)
- **AND** unchecked items display as unchecked
- **AND** task lists maintain proper list structure

#### Scenario: GitHub Flavored Markdown (GFM) strikethrough renders correctly
- **WHEN** Markdown content contains GFM strikethrough syntax (~~text~~)
- **THEN** text is rendered with del elements or appropriate strikethrough styling
- **AND** strikethrough is visually distinct

#### Scenario: GitHub Flavored Markdown (GFM) autolinks render correctly
- **WHEN** Markdown content contains URLs or email addresses as plain text
- **THEN** URLs are automatically converted to anchor elements with proper href attributes
- **AND** email addresses are automatically converted to mailto: links
- **AND** autolinks open in new tab when appropriate (target="_blank" with rel="noopener noreferrer")

#### Scenario: Raw HTML embedded in Markdown renders correctly
- **WHEN** Markdown content contains raw HTML tags (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`, `<i>`, `<strong>`, `<em>`)
- **THEN** HTML tags are rendered as HTML elements
- **AND** HTML tags are properly sanitized for security
- **AND** HTML tags work correctly within Markdown context
- **AND** example: `Text with <br /> line break and <b>bold</b> and <sup>superscript</sup> and <sub>subscript</sub>`

#### Scenario: GitHub Flavored Markdown (GFM) details/summary renders correctly
- **WHEN** Markdown content contains GFM details/summary syntax (e.g., `<details><summary>Title</summary>Content</details>`)
- **THEN** details blocks are rendered using the MarkdownDetails component
- **AND** MarkdownDetails component is used in the tag-to-component mapping via markdown-to-jsx overrides
- **AND** details blocks display with enhanced UI including icon indicators
- **AND** details blocks support expand/collapse functionality
- **AND** summary content is extracted and displayed correctly

### Requirement: Error Handling

The MarkdownRenderer component SHALL handle invalid or malformed Markdown input gracefully without breaking the parent component or displaying error messages to end users.

#### Scenario: Invalid Markdown syntax handled gracefully
- **WHEN** Markdown content contains malformed syntax (e.g., unclosed brackets, invalid nesting)
- **THEN** component attempts to render what it can
- **AND** malformed portions are either rendered as plain text or safely ignored
- **AND** no error messages are displayed to the user
- **AND** parent component continues to function normally

#### Scenario: Empty content handled
- **WHEN** content prop is empty string, null, or undefined
- **THEN** component renders nothing (or empty container)
- **AND** no errors are thrown
- **AND** component remains stable

#### Scenario: Error boundary prevents crashes
- **WHEN** a descendant (e.g. markdown-to-jsx renderer or custom components) throws during render
- **THEN** the design system ErrorBoundary catches the error
- **AND** fallback (raw content in pre) is displayed
- **AND** parent component is not affected. Sync errors are caught by try-catch and show the same fallback.

### Requirement: Tag-to-Class Mapping (MANDATORY)

The MarkdownRenderer component SHALL implement all Markdown element styling through an explicit tag-to-class mapping approach using markdown-to-jsx's overrides option. Global styles, element selectors, and tag-based CSS rules are explicitly FORBIDDEN.

#### Scenario: All Markdown elements use CSS Modules classes or dedicated components
- **WHEN** MarkdownRenderer renders Markdown content
- **THEN** each Markdown/HTML tag (p, h1-h6, ul, ol, li, code, pre, blockquote, a, strong, em, table, thead, tbody, tr, th, td, del, br, b, sup, sub, i) is rendered using a React element with an assigned CSS Modules class
- **AND** details and summary tags are rendered using the MarkdownDetails component (not direct CSS Modules classes)
- **AND** tag-to-component mapping is configured via markdown-to-jsx overrides option
- **AND** example: `p` tag maps to React element with `className={styles.paragraph}`, `h1` maps to `className={styles.heading1}`, `details` maps to `<MarkdownDetails>`, etc.
- **AND** NO global CSS rules target these tags directly

#### Scenario: markdown-to-jsx overrides configuration
- **WHEN** MarkdownRenderer is implemented
- **THEN** markdown-to-jsx overrides option contains explicit mappings for all supported tags
- **AND** each mapping returns a React element with appropriate CSS Modules class (for standard elements) or a dedicated component (for complex elements like details)
- **AND** details tag maps to MarkdownDetails component (e.g. overrides.details renders `<MarkdownDetails>{children}</MarkdownDetails>`)
- **AND** example structure: overrides assign components or { component, props } so that p, h1, details, etc. receive the same CSS Modules classes or MarkdownDetails as today
- **AND** all styling is applied through CSS Modules classes or dedicated component styling

#### Scenario: Global styles are explicitly forbidden
- **WHEN** MarkdownRenderer is implemented
- **THEN** NO global CSS files contain element selectors for Markdown tags (e.g., no `p {}`, `h1 {}`, `ul {}`, `code {}` rules)
- **AND** NO global CSS rules target markdown-to-jsx output via tag selectors
- **AND** NO styling is applied through global stylesheets
- **AND** ALL styling is scoped to CSS Modules classes only
- **AND** this constraint is non-optional and enforceable

#### Scenario: CSS Modules classes for all elements
- **WHEN** MarkdownRenderer is implemented
- **THEN** CSS Modules file contains classes for all Markdown elements (e.g., `.heading1`, `.heading2`, `.paragraph`, `.list`, `.listItem`, `.code`, `.codeBlock`, `.blockquote`, `.link`, `.table`, `.tableRow`, `.tableCell`, etc.)
- **AND** each class uses CSS custom properties with `--reltio-markdown-renderer-` prefix
- **AND** classes are assigned via overrides mapping, not through global selectors

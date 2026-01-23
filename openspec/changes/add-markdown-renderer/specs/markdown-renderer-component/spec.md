# MarkdownRenderer Component Specification

## Purpose

The MarkdownRenderer component safely renders Markdown-formatted text content with robust error handling for invalid or malformed Markdown input. It serves as a foundational component for displaying user and assistant messages that support Markdown formatting.

## ADDED Requirements

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

### Requirement: Security and Sanitization

The MarkdownRenderer component SHALL sanitize all rendered content to prevent execution of malicious scripts and protect against XSS (Cross-Site Scripting) attacks. The component SHALL use a third-party HTML sanitizer library (e.g., DOMPurify, sanitize-html) to perform sanitization.

#### Scenario: Malicious scripts are prevented
- **WHEN** Markdown content contains script tags (e.g., `<script>alert('XSS')</script>`)
- **THEN** script tags are removed or sanitized
- **AND** no JavaScript code is executed
- **AND** malicious content is rendered as plain text or safely removed

#### Scenario: Event handlers are sanitized
- **WHEN** Markdown content contains HTML with event handlers (e.g., `<img onerror="alert('XSS')" src="x">`)
- **THEN** event handler attributes are removed
- **AND** no event handlers are executed
- **AND** HTML elements are rendered without dangerous attributes

#### Scenario: Dangerous HTML attributes are sanitized
- **WHEN** Markdown content contains HTML with dangerous attributes (e.g., `onclick`, `onerror`, `onload`, `javascript:` URLs)
- **THEN** dangerous attributes are removed or sanitized
- **AND** only safe HTML attributes are preserved
- **AND** safe formatting tags (br, b, sup, sub, i, strong, em) are allowed

#### Scenario: HTML sanitization preserves safe content
- **WHEN** Markdown content contains safe HTML tags (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **THEN** safe HTML tags are rendered correctly
- **AND** sanitization does not break legitimate formatting
- **AND** user experience is not degraded

#### Scenario: Links are sanitized for security
- **WHEN** Markdown content contains links with javascript: URLs or data: URLs
- **THEN** dangerous URL schemes are sanitized or removed
- **AND** only safe URL schemes (http, https, mailto) are allowed
- **AND** links open with appropriate security attributes (rel="noopener noreferrer")

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
- **WHEN** Markdown parsing throws an unexpected error
- **THEN** component catches the error
- **AND** displays content as plain text or a safe fallback
- **AND** parent component is not affected

### Requirement: CSS Custom Properties Customization

The MarkdownRenderer component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** MarkdownRenderer component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-markdown-renderer- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** MarkdownRenderer applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<MarkdownRenderer style={{ "--reltio-markdown-renderer-font-size": "18px" }}>`

#### Scenario: CSS variables for typography
- **WHEN** MarkdownRenderer is rendered
- **THEN** font-family, font-size, font-weight, line-height defined
- **AND** heading sizes (h1-h6) defined with appropriate scale
- **AND** code font-family and font-size defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for spacing
- **WHEN** MarkdownRenderer is rendered
- **THEN** paragraph margins defined
- **AND** list item spacing defined
- **AND** heading margins defined
- **AND** code block padding defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for colors
- **WHEN** MarkdownRenderer is rendered
- **THEN** text color defined
- **AND** link color defined
- **AND** code background color defined
- **AND** blockquote border color defined
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The MarkdownRenderer component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** MarkdownRenderer is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The MarkdownRenderer component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate MarkdownRenderer.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses MarkdownRenderer component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Content prop type
- **WHEN** content prop is provided
- **THEN** content accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: Types exported alongside component
- **WHEN** developer imports MarkdownRenderer
- **THEN** MarkdownRendererProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The MarkdownRenderer component SHALL have comprehensive Storybook stories demonstrating valid Markdown rendering, error handling, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for valid Markdown features
- **WHEN** viewing Storybook
- **THEN** separate stories exist for headers, paragraphs, lists, links, code, emphasis, blockquotes
- **AND** separate stories exist for GFM features (tables, task lists, strikethrough, autolinks)
- **AND** separate stories exist for raw HTML rendering (br, b, sup, sub, etc.)
- **AND** each story shows single feature or combination
- **AND** stories are interactive and functional

#### Scenario: Stories for error handling
- **WHEN** viewing Storybook
- **THEN** stories exist for invalid Markdown syntax
- **AND** stories exist for empty/null/undefined content
- **AND** error handling behavior is clearly demonstrated

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate semantic HTML structure
- **AND** a11y addon shows no violations
- **AND** keyboard navigation works correctly

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage

## Technical Implementation

### Component Structure
- `MarkdownRenderer.tsx` - Component implementation
- `MarkdownRenderer.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `MarkdownRenderer.module.css` - CSS Modules styles with all CSS variables on .root
- `MarkdownRenderer.stories.tsx` - Storybook stories (one variant per story)
- `index.ts` - Public exports

### Dependencies
- React 19
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts
- react-markdown (already in package.json dependencies)
- Third-party HTML sanitizer library (e.g., DOMPurify, sanitize-html) - to be selected during implementation

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- WCAG 2.1 Level AA compliant
- Semantic HTML structure (proper heading hierarchy, list structure)
- Screen reader compatible
- Proper link attributes (target, rel for security)

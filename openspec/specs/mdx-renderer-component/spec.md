# mdx-renderer-component Specification

## Purpose
TBD - created by archiving change add-mdx-renderer. Update Purpose after archive.
## Requirements
### Requirement: MDX Rendering

The MDXRenderer component SHALL render MDX-formatted content as properly formatted HTML with embedded React components, supporting all Markdown features (headers, paragraphs, lists, links, code blocks, emphasis, blockquotes) plus React component embedding. The component SHALL support GitHub Flavored Markdown (GFM) extensions and raw HTML rendering.

#### Scenario: Markdown features render correctly
- **WHEN** MDX content contains standard Markdown syntax
- **THEN** all Markdown features render correctly (same as MarkdownRenderer)
- **AND** headers, paragraphs, lists, links, code, emphasis, blockquotes work as expected

#### Scenario: GitHub Flavored Markdown (GFM) tables render correctly
- **WHEN** MDX content contains GFM table syntax (| column | column |)
- **THEN** tables are rendered with proper table, thead, tbody, tr, th, and td elements
- **AND** table headers are properly styled
- **AND** table cells have appropriate spacing and alignment
- **AND** React components can be embedded within table cells

#### Scenario: GitHub Flavored Markdown (GFM) task lists render correctly
- **WHEN** MDX content contains GFM task list syntax (- [ ] or - [x])
- **THEN** task lists are rendered with checkbox input elements
- **AND** checked items display as checked (checked attribute)
- **AND** unchecked items display as unchecked
- **AND** task lists maintain proper list structure
- **AND** React components can be embedded within task list items

#### Scenario: GitHub Flavored Markdown (GFM) strikethrough renders correctly
- **WHEN** MDX content contains GFM strikethrough syntax (~~text~~)
- **THEN** text is rendered with del elements or appropriate strikethrough styling
- **AND** strikethrough is visually distinct
- **AND** strikethrough works within React component contexts

#### Scenario: GitHub Flavored Markdown (GFM) autolinks render correctly
- **WHEN** MDX content contains URLs or email addresses as plain text
- **THEN** URLs are automatically converted to anchor elements with proper href attributes
- **AND** email addresses are automatically converted to mailto: links
- **AND** autolinks open in new tab when appropriate (target="_blank" with rel="noopener noreferrer")

#### Scenario: Raw HTML embedded in MDX renders correctly
- **WHEN** MDX content contains raw HTML tags (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`, `<i>`, `<strong>`, `<em>`)
- **THEN** HTML tags are rendered as HTML elements
- **AND** HTML tags are properly sanitized for security
- **AND** HTML tags work correctly within MDX context (alongside Markdown and React components)
- **AND** example: `Text with <br /> line break and <b>bold</b> and <sup>superscript</sup> and <sub>subscript</sub>`

### Requirement: Security and Sanitization

The MDXRenderer component SHALL sanitize all rendered content and restrict component usage to prevent execution of malicious scripts, protect against XSS (Cross-Site Scripting) attacks, and prevent arbitrary code execution. The component SHALL use a third-party HTML sanitizer library (e.g., DOMPurify, sanitize-html) to perform HTML sanitization.

#### Scenario: Malicious scripts in HTML are prevented
- **WHEN** MDX content contains script tags (e.g., `<script>alert('XSS')</script>`)
- **THEN** script tags are removed or sanitized
- **AND** no JavaScript code is executed
- **AND** malicious content is rendered as plain text or safely removed

#### Scenario: Event handlers in HTML are sanitized
- **WHEN** MDX content contains HTML with event handlers (e.g., `<img onerror="alert('XSS')" src="x">`)
- **THEN** event handler attributes are removed
- **AND** no event handlers are executed
- **AND** HTML elements are rendered without dangerous attributes

#### Scenario: Dangerous HTML attributes are sanitized
- **WHEN** MDX content contains HTML with dangerous attributes (e.g., `onclick`, `onerror`, `onload`, `javascript:` URLs)
- **THEN** dangerous attributes are removed or sanitized
- **AND** only safe HTML attributes are preserved
- **AND** safe formatting tags (br, b, sup, sub, i, strong, em) are allowed

#### Scenario: HTML sanitization preserves safe content
- **WHEN** MDX content contains safe HTML tags (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **THEN** safe HTML tags are rendered correctly
- **AND** sanitization does not break legitimate formatting
- **AND** user experience is not degraded

#### Scenario: Links are sanitized for security
- **WHEN** MDX content contains links with javascript: URLs or data: URLs
- **THEN** dangerous URL schemes are sanitized or removed
- **AND** only safe URL schemes (http, https, mailto) are allowed
- **AND** links open with appropriate security attributes (rel="noopener noreferrer")

#### Scenario: React components embedded in MDX
- **WHEN** MDX content contains JSX syntax for React components
- **THEN** React components are rendered and functional
- **AND** component props are passed correctly
- **AND** components can be nested within Markdown structure

#### Scenario: Mixed Markdown and React components
- **WHEN** MDX content contains both Markdown syntax and React components
- **THEN** Markdown and React components render together correctly
- **AND** components can appear within Markdown structures (e.g., inside lists, blockquotes)
- **AND** Markdown can appear within component structures

#### Scenario: Component props in MDX
- **WHEN** MDX content contains React components with props
- **THEN** props are parsed and passed to components correctly
- **AND** string, number, boolean, and object props are supported
- **AND** children props work correctly

### Requirement: Component Security

The MDXRenderer component SHALL restrict which React components can be used in MDX content to prevent arbitrary code execution and ensure security.

#### Scenario: Allowed components whitelist
- **WHEN** MDX content contains React component
- **THEN** component must be in allowed components list
- **AND** if component is not allowed, it is either ignored or replaced with error message
- **AND** default allowed components include design system components (Button, etc.)

#### Scenario: Disallowed components are blocked
- **WHEN** MDX content contains component not in whitelist
- **THEN** component is not rendered
- **AND** fallback content or error indicator is shown
- **AND** no arbitrary code execution occurs

#### Scenario: Component configuration prop
- **WHEN** developer provides components prop to MDXRenderer
- **THEN** custom component whitelist is used
- **AND** default whitelist is extended or replaced
- **AND** configuration is type-safe

#### Scenario: Component props are sanitized
- **WHEN** MDX content contains React components with potentially dangerous props
- **THEN** dangerous prop values (e.g., event handlers, script tags) are sanitized
- **AND** only safe prop values are passed to components
- **AND** component whitelist prevents arbitrary component execution

#### Scenario: Malicious scripts in HTML are prevented
- **WHEN** MDX content contains script tags (e.g., `<script>alert('XSS')</script>`)
- **THEN** script tags are removed or sanitized
- **AND** no JavaScript code is executed
- **AND** malicious content is rendered as plain text or safely removed

#### Scenario: Event handlers in HTML are sanitized
- **WHEN** MDX content contains HTML with event handlers (e.g., `<img onerror="alert('XSS')" src="x">`)
- **THEN** event handler attributes are removed
- **AND** no event handlers are executed
- **AND** HTML elements are rendered without dangerous attributes

#### Scenario: Dangerous HTML attributes are sanitized
- **WHEN** MDX content contains HTML with dangerous attributes (e.g., `onclick`, `onerror`, `onload`, `javascript:` URLs)
- **THEN** dangerous attributes are removed or sanitized
- **AND** only safe HTML attributes are preserved
- **AND** safe formatting tags (br, b, sup, sub, i, strong, em) are allowed

#### Scenario: HTML sanitization preserves safe content
- **WHEN** MDX content contains safe HTML tags (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **THEN** safe HTML tags are rendered correctly
- **AND** sanitization does not break legitimate formatting
- **AND** user experience is not degraded

#### Scenario: Links are sanitized for security
- **WHEN** MDX content contains links with javascript: URLs or data: URLs
- **THEN** dangerous URL schemes are sanitized or removed
- **AND** only safe URL schemes (http, https, mailto) are allowed
- **AND** links open with appropriate security attributes (rel="noopener noreferrer")

### Requirement: Error Handling

The MDXRenderer component SHALL handle invalid or malformed MDX input gracefully without breaking the parent component or displaying error messages to end users.

#### Scenario: Invalid MDX syntax handled gracefully
- **WHEN** MDX content contains malformed syntax (e.g., unclosed JSX tags, invalid nesting)
- **THEN** component attempts to render what it can
- **AND** malformed portions are either rendered as plain text or safely ignored
- **AND** no error messages are displayed to the user
- **AND** parent component continues to function normally

#### Scenario: Invalid React component errors handled
- **WHEN** MDX content contains React component that throws error during render
- **THEN** component error is caught
- **AND** error boundary prevents crash
- **AND** fallback content is displayed
- **AND** parent component is not affected

#### Scenario: Empty content handled
- **WHEN** content prop is empty string, null, or undefined
- **THEN** component renders nothing (or empty container)
- **AND** no errors are thrown
- **AND** component remains stable

#### Scenario: Error boundary prevents crashes
- **WHEN** MDX parsing throws an unexpected error
- **THEN** component catches the error
- **AND** displays content as plain text or a safe fallback
- **AND** parent component is not affected

#### Scenario: Fallback rendering strategy
- **WHEN** MDX parsing fails
- **THEN** component attempts to render as Markdown (fallback)
- **WHEN** Markdown parsing also fails
- **THEN** component renders as plain text
- **AND** no errors are displayed to user

### Requirement: CSS Custom Properties Customization

The MDXRenderer component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** MDXRenderer component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-mdx-renderer- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** MDXRenderer applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<MDXRenderer style={{ "--reltio-mdx-renderer-font-size": "18px" }}>`

#### Scenario: CSS variables for typography
- **WHEN** MDXRenderer is rendered
- **THEN** font-family, font-size, font-weight, line-height defined
- **AND** heading sizes (h1-h6) defined with appropriate scale
- **AND** code font-family and font-size defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for spacing
- **WHEN** MDXRenderer is rendered
- **THEN** paragraph margins defined
- **AND** list item spacing defined
- **AND** heading margins defined
- **AND** code block padding defined
- **AND** component spacing defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for colors
- **WHEN** MDXRenderer is rendered
- **THEN** text color defined
- **AND** link color defined
- **AND** code background color defined
- **AND** blockquote border color defined
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The MDXRenderer component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** MDXRenderer is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The MDXRenderer component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate MDXRenderer.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses MDXRenderer component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Content prop type
- **WHEN** content prop is provided
- **THEN** content accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: Components prop type
- **WHEN** components prop is provided
- **THEN** components accepts object mapping component names to React components
- **AND** type is properly constrained
- **AND** TypeScript provides autocomplete for component names

#### Scenario: Types exported alongside component
- **WHEN** developer imports MDXRenderer
- **THEN** MDXRendererProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The MDXRenderer component SHALL have comprehensive Storybook stories demonstrating valid MDX rendering, React component embedding, error handling, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for valid MDX features
- **WHEN** viewing Storybook
- **THEN** separate stories exist for Markdown features, embedded components, mixed content
- **AND** separate stories exist for GFM features (tables, task lists, strikethrough, autolinks)
- **AND** separate stories exist for raw HTML rendering (br, b, sup, sub, etc.)
- **AND** each story shows single feature or combination
- **AND** stories are interactive and functional

#### Scenario: Stories for embedded components
- **WHEN** viewing Storybook
- **THEN** stories exist for Button component in MDX
- **AND** stories exist for other design system components
- **AND** stories demonstrate component props usage

#### Scenario: Stories for error handling
- **WHEN** viewing Storybook
- **THEN** stories exist for invalid MDX syntax
- **AND** stories exist for invalid React components
- **AND** stories exist for empty/null/undefined content
- **AND** error handling behavior is clearly demonstrated

#### Scenario: Stories for security
- **WHEN** viewing Storybook
- **THEN** stories demonstrate component whitelist behavior
- **AND** stories show disallowed components being blocked

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate semantic HTML structure
- **AND** a11y addon shows no violations
- **AND** keyboard navigation works correctly

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage
- **AND** stories show custom components configuration


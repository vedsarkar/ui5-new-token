# user-message-component Specification

## Purpose
TBD - created by archiving change add-user-message. Update Purpose after archive.
## Requirements
### Requirement: Message Display

The UserMessage component SHALL display user message content with proper formatting and styling.

#### Scenario: Plain text message displays correctly
- **WHEN** message content contains plain text
- **THEN** text is displayed in user message container
- **AND** text is properly formatted and readable
- **AND** styling distinguishes message as user-authored

#### Scenario: Markdown content renders correctly
- **WHEN** message content contains Markdown syntax
- **THEN** Markdown is rendered using MarkdownRenderer component
- **AND** all Markdown features work correctly (headers, lists, links, code, etc.)
- **AND** GitHub Flavored Markdown (GFM) features work correctly (tables, task lists, strikethrough, autolinks)
- **AND** raw HTML embedded in Markdown renders correctly (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **AND** rendered content is properly styled within user message container

#### Scenario: Empty content handled
- **WHEN** message content is empty string, null, or undefined
- **THEN** component renders empty container or placeholder
- **AND** no errors are thrown
- **AND** component remains stable

### Requirement: MarkdownRenderer Integration

The UserMessage component SHALL use the MarkdownRenderer component to render message content, ensuring proper error handling and styling integration.

#### Scenario: Content passed to MarkdownRenderer
- **WHEN** UserMessage receives message content
- **THEN** content is passed to MarkdownRenderer component
- **AND** MarkdownRenderer handles Markdown parsing and rendering
- **AND** MarkdownRenderer error handling applies

#### Scenario: Styling integration
- **WHEN** MarkdownRenderer renders content
- **THEN** rendered content uses appropriate styling within user message context
- **AND** CSS variables cascade correctly
- **AND** visual consistency is maintained

#### Scenario: Invalid Markdown handled
- **WHEN** message content contains invalid Markdown
- **THEN** MarkdownRenderer handles error gracefully
- **AND** user message still displays (with fallback content if needed)
- **AND** parent component is not affected

### Requirement: Visual Design

The UserMessage component SHALL have distinct visual styling that clearly identifies messages as user-authored, with appropriate layout and spacing.

#### Scenario: User message styling
- **WHEN** UserMessage is rendered
- **THEN** message has distinct background color or styling
- **AND** message is visually distinct from assistant messages
- **AND** message has appropriate padding and border-radius
- **AND** message aligns appropriately (typically right-aligned or left-aligned based on design)

#### Scenario: Content area styling
- **WHEN** UserMessage is rendered
- **THEN** content area has proper spacing
- **AND** text is readable with appropriate contrast
- **AND** Markdown elements are properly styled

### Requirement: CSS Custom Properties Customization

The UserMessage component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** UserMessage component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-user-message- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** UserMessage applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<UserMessage style={{ "--reltio-user-message-background": "#e3f2fd" }}>`

#### Scenario: CSS variables for layout
- **WHEN** UserMessage is rendered
- **THEN** padding, margin, border-radius defined
- **AND** max-width defined for message container
- **AND** alignment properties defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for colors
- **WHEN** UserMessage is rendered
- **THEN** background color defined
- **AND** text color defined
- **AND** border color defined (if applicable)
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for spacing
- **WHEN** UserMessage is rendered
- **THEN** content padding defined
- **AND** all with appropriate fallback values

### Requirement: className Utility Usage

The UserMessage component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** UserMessage is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The UserMessage component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate UserMessage.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses UserMessage component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Content prop type
- **WHEN** content prop is provided
- **THEN** content accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: Metadata prop types
- **WHEN** optional metadata props are provided
- **THEN** all metadata props are properly typed
- **AND** optional props are clearly marked as optional

#### Scenario: Types exported alongside component
- **WHEN** developer imports UserMessage
- **THEN** UserMessageProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The UserMessage component SHALL have comprehensive Storybook stories demonstrating message display, Markdown rendering, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for message display
- **WHEN** viewing Storybook
- **THEN** separate stories exist for plain text, Markdown, various Markdown features
- **AND** each story shows single variant
- **AND** stories are interactive and functional

#### Scenario: Stories for Markdown features
- **WHEN** viewing Storybook
- **THEN** stories exist for headers, lists, code blocks, links, emphasis
- **AND** stories exist for GFM features (tables, task lists, strikethrough, autolinks)
- **AND** stories exist for raw HTML rendering (br, b, sup, sub, etc.)
- **AND** each story demonstrates specific Markdown feature
- **AND** Markdown rendering is clearly visible

#### Scenario: Stories for error handling
- **WHEN** viewing Storybook
- **THEN** stories exist for invalid Markdown
- **AND** stories exist for empty/null content
- **AND** error handling behavior is clearly demonstrated

#### Scenario: Stories for optional features
- **WHEN** viewing Storybook
- **THEN** stories exist for messages without optional features

#### Scenario: Stories for accessibility features
- **WHEN** viewing Storybook
- **THEN** stories demonstrate semantic HTML structure
- **AND** a11y addon shows no violations
- **AND** keyboard navigation works correctly

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage


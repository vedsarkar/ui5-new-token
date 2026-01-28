# AssistantMessage Component Specification

## Purpose

The AssistantMessage component displays assistant-authored messages in a chat interface with support for both Markdown and MDX formatting, along with error states. It provides consistent styling and layout for assistant messages, distinguishing them visually from user messages.

## ADDED Requirements

### Requirement: Message Display

The AssistantMessage component SHALL display assistant message content with proper formatting and styling, supporting both Markdown and MDX content types.

#### Scenario: Plain text message displays correctly
- **WHEN** message content contains plain text
- **THEN** text is displayed in assistant message container
- **AND** text is properly formatted and readable
- **AND** styling distinguishes message as assistant-authored

#### Scenario: Markdown content renders correctly
- **WHEN** message content contains Markdown syntax
- **THEN** Markdown is rendered using MarkdownRenderer component
- **AND** all Markdown features work correctly (headers, lists, links, code, etc.)
- **AND** GitHub Flavored Markdown (GFM) features work correctly (tables, task lists, strikethrough, autolinks)
- **AND** raw HTML embedded in Markdown renders correctly (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **AND** rendered content is properly styled within assistant message container

#### Scenario: MDX content renders correctly
- **WHEN** message content contains MDX syntax (Markdown with JSX)
- **THEN** MDX is rendered using MDXRenderer component
- **AND** React components embedded in MDX are rendered and functional
- **AND** all Markdown features work correctly within MDX
- **AND** GitHub Flavored Markdown (GFM) features work correctly within MDX (tables, task lists, strikethrough, autolinks)
- **AND** raw HTML embedded in MDX renders correctly (e.g., `<br />`, `<b>`, `<sup>`, `<sub>`)
- **AND** rendered content is properly styled within assistant message container

#### Scenario: Content type detection
- **WHEN** message content is provided
- **THEN** component detects whether content is MDX (contains JSX) or Markdown
- **AND** appropriate renderer (MDXRenderer or MarkdownRenderer) is used
- **AND** detection is automatic or configurable via prop

#### Scenario: Empty content handled
- **WHEN** message content is empty string, null, or undefined
- **THEN** component renders empty container or placeholder
- **AND** no errors are thrown
- **AND** component remains stable

### Requirement: Error State

The AssistantMessage component SHALL support an error state that displays an error message when content generation or fetching fails. The component SHALL use the ErrorMessage component for all error display and styling.

#### Scenario: Error state displays message using ErrorMessage
- **WHEN** error prop is true
- **THEN** ErrorMessage component is rendered
- **AND** error message is displayed via ErrorMessage component
- **AND** error message is visually distinct and clearly identifiable as an error
- **AND** ErrorMessage provides consistent styling and accessibility

#### Scenario: Custom error message via ErrorMessage
- **WHEN** error prop is true
- **AND** errorMessage prop is provided
- **THEN** ErrorMessage component is rendered with custom message prop
- **AND** custom error message is displayed
- **WHEN** error prop is true
- **AND** errorMessage prop is not provided
- **THEN** ErrorMessage component is rendered without message prop
- **AND** ErrorMessage displays default error message

#### Scenario: Error state accessibility via ErrorMessage
- **WHEN** error prop is true
- **THEN** ErrorMessage component provides role="alert" and aria-live attributes
- **AND** error message is announced to screen readers
- **AND** error state is keyboard accessible
- **AND** ErrorMessage handles all accessibility requirements

#### Scenario: Error state styling via ErrorMessage
- **WHEN** error prop is true
- **THEN** ErrorMessage component provides error styling (error colors, icons)
- **AND** error styling is consistent with ErrorMessage component
- **AND** error styling is customizable via ErrorMessage CSS variables
- **AND** error state does not interfere with message layout

#### Scenario: Error state with content
- **WHEN** error prop is true
- **AND** content is also provided
- **THEN** ErrorMessage component is displayed
- **AND** content may be hidden or displayed alongside error (implementation decision)

### Requirement: Renderer Integration

The AssistantMessage component SHALL use MarkdownRenderer and MDXRenderer components appropriately based on content type, ensuring proper error handling and styling integration.

#### Scenario: Markdown content uses MarkdownRenderer
- **WHEN** message content contains Markdown (no JSX)
- **THEN** content is passed to MarkdownRenderer component
- **AND** MarkdownRenderer handles Markdown parsing and rendering
- **AND** MarkdownRenderer error handling applies

#### Scenario: MDX content uses MDXRenderer
- **WHEN** message content contains MDX (with JSX)
- **THEN** content is passed to MDXRenderer component
- **AND** MDXRenderer handles MDX parsing and rendering
- **AND** MDXRenderer error handling applies
- **AND** embedded React components are rendered

#### Scenario: Styling integration
- **WHEN** MarkdownRenderer or MDXRenderer renders content
- **THEN** rendered content uses appropriate styling within assistant message context
- **AND** CSS variables cascade correctly
- **AND** visual consistency is maintained

#### Scenario: Invalid content handled
- **WHEN** message content contains invalid Markdown or MDX
- **THEN** appropriate renderer handles error gracefully
- **AND** assistant message still displays (with fallback content if needed)
- **AND** parent component is not affected

### Requirement: Visual Design

The AssistantMessage component SHALL have distinct visual styling that clearly identifies messages as assistant-authored, with appropriate layout and spacing.

#### Scenario: Assistant message styling
- **WHEN** AssistantMessage is rendered
- **THEN** message has distinct background color or styling
- **AND** message is visually distinct from user messages
- **AND** message has appropriate padding and border-radius
- **AND** message aligns appropriately (typically left-aligned or opposite of user messages)

#### Scenario: Content area styling
- **WHEN** AssistantMessage is rendered
- **THEN** content area has proper spacing
- **AND** text is readable with appropriate contrast
- **AND** Markdown and MDX elements are properly styled

### Requirement: CSS Custom Properties Customization

The AssistantMessage component SHALL define all design tokens as CSS custom properties on the root element, enabling external customization via inline styles or CSS overrides.

#### Scenario: All CSS variables defined on root
- **WHEN** AssistantMessage component is rendered
- **THEN** all CSS custom properties are defined on .root class
- **AND** variables use --reltio-assistant-message- prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** AssistantMessage applies custom values
- **AND** maintains all other styling and behavior
- **AND** example: `<AssistantMessage style={{ "--reltio-assistant-message-background": "#f5f5f5" }}>`

#### Scenario: CSS variables for layout
- **WHEN** AssistantMessage is rendered
- **THEN** padding, margin, border-radius defined
- **AND** max-width defined for message container
- **AND** alignment properties defined
- **AND** all with appropriate fallback values

#### Scenario: CSS variables for colors
- **WHEN** AssistantMessage is rendered
- **THEN** background color defined
- **AND** text color defined
- **AND** border color defined (if applicable)
- **AND** all with appropriate fallback values
- **NOTE:** Error message colors are provided by ErrorMessage component CSS variables

#### Scenario: CSS variables for spacing
- **WHEN** AssistantMessage is rendered
- **THEN** content padding defined
- **AND** all with appropriate fallback values
- **NOTE:** Error message spacing is provided by ErrorMessage component CSS variables

### Requirement: className Utility Usage

The AssistantMessage component SHALL use the classNames utility from utils/classNames.ts for all className composition, providing stable base classes for external customization.

#### Scenario: classNames utility composes CSS modules
- **WHEN** AssistantMessage is rendered
- **THEN** classNames utility combines all applicable CSS module classes
- **AND** automatically adds base classes for BEM-like naming
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are added to root element
- **AND** CSS modules classes are preserved
- **AND** no class name conflicts occur

### Requirement: TypeScript Type Safety

The AssistantMessage component SHALL be fully typed with TypeScript using strict mode, with all types defined in a separate AssistantMessage.types.ts file using the `type` keyword (not `interface`).

#### Scenario: Component props fully typed
- **WHEN** developer uses AssistantMessage component
- **THEN** all props have proper TypeScript types
- **AND** TypeScript provides autocomplete
- **AND** invalid prop combinations are caught at compile time

#### Scenario: Content prop type
- **WHEN** content prop is provided
- **THEN** content accepts string type
- **AND** null and undefined are handled appropriately
- **AND** type is clearly documented

#### Scenario: State prop types
- **WHEN** error prop is provided
- **THEN** error accepts boolean type
- **AND** errorMessage accepts string type (optional)
- **AND** types are clearly documented

#### Scenario: Metadata prop types
- **WHEN** optional metadata props are provided
- **THEN** all metadata props are properly typed
- **AND** optional props are clearly marked as optional

#### Scenario: Types exported alongside component
- **WHEN** developer imports AssistantMessage
- **THEN** AssistantMessageProps type can be imported
- **AND** all types are properly documented

### Requirement: Storybook Documentation

The AssistantMessage component SHALL have comprehensive Storybook stories demonstrating message display, Markdown/MDX rendering, error states, and edge cases, with each story showing only ONE variant.

#### Scenario: Stories for message display
- **WHEN** viewing Storybook
- **THEN** separate stories exist for plain text, Markdown, MDX content
- **AND** each story shows single variant
- **AND** stories are interactive and functional

#### Scenario: Stories for content types
- **WHEN** viewing Storybook
- **THEN** stories exist for Markdown features (headers, lists, code blocks, links)
- **AND** stories exist for GFM features (tables, task lists, strikethrough, autolinks)
- **AND** stories exist for raw HTML rendering in Markdown (br, b, sup, sub, etc.)
- **AND** stories exist for MDX with embedded React components
- **AND** each story demonstrates specific content type

#### Scenario: Stories for error state
- **WHEN** viewing Storybook
- **THEN** stories exist for error state with default message (using ErrorMessage component)
- **AND** stories exist for error state with custom message (using ErrorMessage component)
- **AND** error handling behavior is clearly demonstrated
- **AND** stories show ErrorMessage component integration

#### Scenario: Stories for error handling
- **WHEN** viewing Storybook
- **THEN** stories exist for invalid Markdown/MDX
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
- **AND** error states are accessible

#### Scenario: Stories for customization
- **WHEN** viewing Storybook
- **THEN** stories demonstrate CSS variable customization
- **AND** stories show className prop usage

## Technical Implementation

### Component Structure
- `AssistantMessage.tsx` - Component implementation
- `AssistantMessage.types.ts` - TypeScript type definitions (using `type`, not `interface`)
- `AssistantMessage.module.css` - CSS Modules styles with all CSS variables on .root
- `AssistantMessage.stories.tsx` - Storybook stories (one variant per story)
- `index.ts` - Public exports

### Dependencies
- React 19
- TypeScript (strict mode)
- CSS Modules
- classNames utility from utils/classNames.ts
- MarkdownRenderer component (from add-markdown-renderer proposal)
- MDXRenderer component (from add-mdx-renderer proposal)
- ErrorMessage component (from add-error-message proposal)

### Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features
- CSS custom properties required (no IE11)

### Accessibility Standards
- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- Screen reader compatible
- Proper ARIA attributes (aria-busy, aria-label, role="alert", aria-live)
- Keyboard navigation support
- Error states are accessible

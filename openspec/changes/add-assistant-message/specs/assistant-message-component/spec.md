# AssistantMessage Component Specification

## Purpose

The AssistantMessage component displays assistant-authored messages in a chat interface with support for both Markdown and MDX formatting, and error states. It provides consistent styling and layout for assistant messages and distinguishes them visually from user messages. Content type (mdx vs markdown) is determined by a dedicated helper; the component uses that result to choose MarkdownRenderer or MDXRenderer.

## ADDED Requirements

### Requirement: Content Type Helper

The project SHALL provide a helper that determines whether a given content string should be rendered as MDX or Markdown. The AssistantMessage component SHALL use this helper to select the correct renderer.

**Responsibility:** Decide content type only. The helper does not render content, parse JSX, or touch the DOM. It returns a single value: `"mdx"` or `"markdown"`.

**Input:**
- `content`: string (the raw message content, which may be empty)
- Optional override (e.g. prop from caller): when provided, the helper SHALL return the override and SHALL NOT infer from content

**Output:** One of `"mdx"` or `"markdown"`.

**Decision rules:**
- IF an explicit override is provided (e.g. "use markdown" or "use mdx"), THEN return that override.
- ELSE IF the content string indicates MDX (e.g. contains JSX-like patterns such as `<Identifier` or `</Identifier>` where the identifier suggests a component or tag), THEN return `"mdx"`.
- ELSE return `"markdown"`.

Edge cases:
- Empty, null, or whitespace-only content: helper MAY return `"markdown"` (or a value that causes the component to render nothing; exact behavior is an implementation choice).
- Malformed or ambiguous content: helper SHALL still return either `"mdx"` or `"markdown"` (no third state); implementation MAY default to `"markdown"` when uncertain.

#### Scenario: Helper returns mdx when content suggests JSX
- **WHEN** content contains JSX-like patterns (e.g. `<Button>`, `</div>`)
- **AND** no override is provided
- **THEN** helper returns `"mdx"`

#### Scenario: Helper returns markdown when content has no JSX
- **WHEN** content contains only Markdown and/or plain text (no JSX-like patterns)
- **AND** no override is provided
- **THEN** helper returns `"markdown"`

#### Scenario: Override takes precedence
- **WHEN** caller provides an explicit content type override
- **THEN** helper returns the override
- **AND** content string is not used to infer type

#### Scenario: AssistantMessage depends on helper
- **WHEN** AssistantMessage has content to render
- **THEN** component calls the content type helper (with content and any override prop)
- **AND** component uses the helper result to choose MarkdownRenderer (for `"markdown"`) or MDXRenderer (for `"mdx"`)
- **AND** component does not duplicate the helper’s decision logic

### Requirement: Message Display

The AssistantMessage component SHALL display assistant message content with proper formatting and styling, supporting both Markdown and MDX content types by delegating to the appropriate renderer based on the content type helper.

#### Scenario: Plain text message displays correctly
- **WHEN** message content contains plain text
- **THEN** text is displayed in the assistant message container
- **AND** text is properly formatted and readable
- **AND** styling distinguishes the message as assistant-authored

#### Scenario: Markdown content renders correctly
- **WHEN** content type helper returns `"markdown"` for the message content
- **THEN** MarkdownRenderer is used
- **AND** Markdown features work (headers, lists, links, code, etc.)
- **AND** GFM and raw HTML in Markdown are supported per MarkdownRenderer
- **AND** rendered content is styled within the assistant message container

#### Scenario: MDX content renders correctly
- **WHEN** content type helper returns `"mdx"` for the message content
- **THEN** MDXRenderer is used
- **AND** React components embedded in MDX are rendered and functional
- **AND** Markdown and GFM work within MDX per MDXRenderer
- **AND** rendered content is styled within the assistant message container

#### Scenario: Empty content handled
- **WHEN** message content is empty string, null, or undefined
- **THEN** component renders empty container or no content area
- **AND** no errors are thrown
- **AND** component remains stable

### Requirement: Error State

The AssistantMessage component SHALL support an error state that displays an error message when content generation or fetching fails. The component SHALL use the ErrorMessage component for all error display and styling.

#### Scenario: Error state displays message using ErrorMessage
- **WHEN** error prop is true
- **THEN** ErrorMessage component is rendered
- **AND** error message is displayed via ErrorMessage
- **AND** error is visually distinct and ErrorMessage provides consistent styling and accessibility

#### Scenario: Custom error message via ErrorMessage
- **WHEN** error prop is true and errorMessage prop is provided
- **THEN** ErrorMessage is rendered with that message
- **WHEN** error prop is true and errorMessage is not provided
- **THEN** ErrorMessage is rendered with its default message

#### Scenario: Error state with content
- **WHEN** error prop is true and content is also provided
- **THEN** ErrorMessage is displayed
- **AND** content may be hidden or shown alongside error (implementation decision)

### Requirement: Renderer Integration

The AssistantMessage component SHALL use MarkdownRenderer and MDXRenderer based on the content type helper result. It SHALL NOT implement its own content-type detection logic; that remains the helper’s responsibility.

#### Scenario: Markdown path uses MarkdownRenderer
- **WHEN** helper returns `"markdown"`
- **THEN** content is passed to MarkdownRenderer
- **AND** MarkdownRenderer handles parsing, rendering, and its own error handling

#### Scenario: MDX path uses MDXRenderer
- **WHEN** helper returns `"mdx"`
- **THEN** content is passed to MDXRenderer
- **AND** MDXRenderer handles parsing, rendering, and its own error handling
- **AND** embedded React components are rendered

#### Scenario: Invalid content handled by renderers
- **WHEN** message content is invalid Markdown or MDX
- **THEN** the chosen renderer handles the error gracefully (per its spec)
- **AND** AssistantMessage remains stable and parent is not affected

### Requirement: Visual Design

The AssistantMessage component SHALL have distinct visual styling that identifies messages as assistant-authored, with appropriate layout and spacing.

#### Scenario: Assistant message styling
- **WHEN** AssistantMessage is rendered
- **THEN** message has distinct background and/or styling
- **AND** message is visually distinct from user messages
- **AND** message has appropriate padding and border-radius

#### Scenario: Content area styling
- **WHEN** AssistantMessage is rendered with content
- **THEN** content area has proper spacing
- **AND** text is readable with appropriate contrast
- **AND** Markdown/MDX elements are styled (via renderers and cascade)

### Requirement: CSS Custom Properties

The AssistantMessage component SHALL define design tokens as CSS custom properties on the root element, with `--reltio-assistant-message-` prefix and fallback values. External customization via style prop or overrides SHALL be supported (e.g. `--reltio-assistant-message-background`). Error message colors and spacing are provided by the ErrorMessage component.

#### Scenario: CSS variables on root
- **WHEN** AssistantMessage is rendered
- **THEN** design tokens are defined on the root element with `--reltio-assistant-message-` prefix
- **AND** developer may override via style prop (e.g. `--reltio-assistant-message-background`)

### Requirement: className and TypeScript

The AssistantMessage component SHALL use the classNames utility for all className composition and SHALL be fully typed in TypeScript (strict mode). Types SHALL live in AssistantMessage.types.ts using the `type` keyword. AssistantMessageProps and any content-type-related types SHALL be exported. Props SHALL include content, error, errorMessage, optional content-type override, optional meta, className, style, and rest div props as appropriate.

#### Scenario: classNames and types
- **WHEN** developer uses AssistantMessage
- **THEN** root element classNames are composed via classNames utility
- **AND** AssistantMessageProps and content-type types are exported and usable

### Requirement: Storybook Documentation

The AssistantMessage component SHALL have Storybook stories that demonstrate one variant per story: plain text, Markdown content, MDX content, error state (default and custom message), empty content, and optional features (e.g. meta, content-type override, CSS variable customization). Stories SHALL be consistent with project conventions (e.g. one variant per story, a11y where applicable).

#### Scenario: One variant per story
- **WHEN** viewing AssistantMessage in Storybook
- **THEN** each story shows a single variant (plain text, Markdown, MDX, error, empty, override, meta, customization)
- **AND** stories follow project conventions

## Intended Structure (Design)

- **AssistantMessage:** `AssistantMessage.tsx`, `AssistantMessage.types.ts`, `AssistantMessage.module.css`, `AssistantMessage.stories.tsx`, `index.ts`.
- **Content type helper:** Implemented as a function (or small module) with defined input, output, and decision rules above. Location (e.g. utils, or next to the component) is an implementation choice.
- **Dependencies:** React, TypeScript, CSS Modules, classNames utility, MarkdownRenderer, MDXRenderer, ErrorMessage.

No implementation is implied beyond what is specified; the above describes the intended design and scope.

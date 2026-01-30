# Change: Add AssistantMessage Component

## Why

The chat system requires a component to display assistant messages with support for both Markdown and MDX content, along with error states. AssistantMessage will serve as a building block for the Chat component, providing consistent styling and behavior for assistant-authored content with rich formatting capabilities.

Content may be plain Markdown (no JSX) or MDX (Markdown with JSX). The correct renderer must be chosen per message: MarkdownRenderer for Markdown and MDXRenderer for MDX. Inferring content type from the raw string in the component would mix layout, rendering, and detection logic. A dedicated helper keeps the decision in one place, makes the rules testable, and allows the component to depend on a simple `"mdx"` or `"markdown"` result. The helper solves the problem of where and how content type is determined so that AssistantMessage stays focused on layout, error state, and delegating to the right renderer.

## What Changes

- **ADDED** `AssistantMessage` component for displaying assistant messages with Markdown and MDX rendering
- **ADDED** Content type helper that determines whether content is `mdx` or `markdown` (responsibility, input, output, and decision rules defined in spec)
- **ADDED** AssistantMessage integration with this helper to select MarkdownRenderer vs MDXRenderer
- **ADDED** Error state support using ErrorMessage component for consistent error display
- **ADDED** Integration with MarkdownRenderer component (depends on add-markdown-renderer)
- **ADDED** Integration with MDXRenderer component (depends on add-mdx-renderer)
- **ADDED** Integration with ErrorMessage component (depends on add-error-message)
- **ADDED** Assistant message styling and layout (CSS Modules, CSS custom properties)
- **ADDED** TypeScript types in AssistantMessage.types.ts (project conventions)
- **ADDED** Storybook stories for message display, content types, error state, and edge cases

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/AssistantMessage/` — new component folder
  - Content type helper (location and naming to be decided at implementation; e.g. utility or co-located with component)
  - Depends on MarkdownRenderer, MDXRenderer, and ErrorMessage components
- Breaking changes: None
- Migration: N/A (new component)

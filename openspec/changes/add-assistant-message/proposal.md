# Change: Add AssistantMessage Component

## Why

The chat system requires a component to display assistant messages with support for both Markdown and MDX content, along with error states. AssistantMessage will serve as a building block for the Chat component, providing consistent styling and behavior for assistant-authored content with rich formatting capabilities.

## What Changes

- **ADDED** `AssistantMessage` component for displaying assistant messages with Markdown and MDX rendering
- **ADDED** Error state support using ErrorMessage component for consistent error display
- **ADDED** Integration with MarkdownRenderer component (depends on add-markdown-renderer proposal)
- **ADDED** Integration with MDXRenderer component (depends on add-mdx-renderer proposal)
- **ADDED** Integration with ErrorMessage component (depends on add-error-message proposal)
- **ADDED** Assistant message styling and layout
- **ADDED** TypeScript types following project conventions (AssistantMessage.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating all states and content types

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/AssistantMessage/` - new component folder
  - Depends on `MarkdownRenderer` component (from add-markdown-renderer proposal)
  - Depends on `MDXRenderer` component (from add-mdx-renderer proposal)
  - Depends on `ErrorMessage` component (from add-error-message proposal)
- Breaking changes: None
- Migration: N/A (new component)

# Change: Add UserMessage Component

## Why

The chat system requires a component to display user messages with Markdown support. UserMessage will serve as a building block for the Chat component, providing consistent styling and behavior for user-authored content while distinguishing it visually from assistant messages.

## What Changes

- **ADDED** `UserMessage` component for displaying user messages with Markdown rendering
- **ADDED** Integration with MarkdownRenderer component (depends on add-markdown-renderer proposal)
- **ADDED** User message styling and layout
- **ADDED** TypeScript types following project conventions (UserMessage.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating user message display

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/UserMessage/` - new component folder
  - Depends on `MarkdownRenderer` component (from add-markdown-renderer proposal)
- Breaking changes: None
- Migration: N/A (new component)

# Change: Add AssistantMessage Component

## Why

The chat system requires a component to display assistant messages with support for both Markdown and MDX content, along with error states. AssistantMessage serves as a building block for the Chat component, providing consistent styling and behavior for assistant-authored content with rich formatting capabilities.

## What Changes

- **ADDED** AssistantMessage component for displaying assistant messages with Markdown and MDX rendering
- **ADDED** Support for rendering both Markdown and MDX content via a single unified renderer
- **ADDED** Error state support using ErrorMessage component for consistent error display
- **ADDED** Assistant message styling and layout (CSS Modules, CSS custom properties)
- **ADDED** TypeScript types and Storybook stories per project conventions

## Impact

- Affected specs: assistant-message-component
- Affected code: `components/AssistantMessage/`
- Depends on: unified markdown renderer component (markdown-renderer) and ErrorMessage component
- Breaking changes: None
- Migration: N/A (new component)

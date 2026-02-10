# Change: Add Chat Component

## Why

The chat system requires a container component that displays a list of messages of any type (user messages, assistant messages, or future message types). The Chat component must handle performance optimizations for very large numbers of messages through virtualization, memoization, and efficient rendering strategies.

## What Changes

- **ADDED** `Chat` component for displaying message lists with performance optimizations
- **ADDED** Support for messages of any type (user, assistant, extensible for future types)
- **ADDED** Virtual scrolling/windowing for large message lists
- **ADDED** Memoization and performance optimizations
- **ADDED** Integration with UserMessage component (depends on add-user-message proposal)
- **ADDED** Integration with AssistantMessage component (depends on add-assistant-message proposal)
- **ADDED** Two distinct loading states:
  - **Initial loading**: While chat data is initially loading, the Chat shows a skeleton placeholder (Skeleton component) so the user sees that content is being fetched. Once chat data is available, the message list is shown.
  - **Waiting for assistant**: When the chat is waiting for a response from the assistant, the Chat shows an assistant loading indicator (AssistantLoader component; size in pixels, default 16) at the end of the message list. The chat is considered "waiting for assistant" when the last message in the messages array is from the user; otherwise the assistant loader is not shown.
- **ADDED** TypeScript types following project conventions (Chat.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating various message lists and performance scenarios

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/Chat/` - new component folder
  - Depends on `UserMessage` component (from add-user-message proposal)
  - Depends on `AssistantMessage` component (from add-assistant-message proposal)
  - Depends on `Skeleton` component for initial loading placeholder
  - Depends on `AssistantLoader` component (size prop in pixels, default 16) for waiting-for-assistant indicator
  - May require virtualization library (e.g., react-window, react-virtualized, or custom implementation)
- Breaking changes: None
- Migration: N/A (new component)

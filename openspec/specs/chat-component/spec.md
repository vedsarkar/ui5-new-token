# chat-component Specification

## Purpose

Provides a scrollable chat window that renders a conversation between a user and an AI assistant, with support for loading states, auto-scroll behavior, and a scroll-to-bottom button.

## Requirements

### Requirement: Message List Display

The Chat component SHALL display a list of messages, rendering each message using the appropriate internal component based on message role.

#### Scenario: User messages render correctly
- **WHEN** messages array contains messages with `role: "user"`
- **THEN** each user message is rendered using the internal UserMessage component
- **AND** the message `content` is passed as children to UserMessage

#### Scenario: Assistant messages render correctly
- **WHEN** messages array contains messages with `role: "assistant"`
- **THEN** each assistant message is rendered using the internal AssistantMessage component
- **AND** the message `content` is passed as children to AssistantMessage

#### Scenario: Unknown role messages render content directly
- **WHEN** messages array contains messages with roles other than "user" or "assistant"
- **THEN** the message `content` is rendered as-is (or null if content is absent)
- **AND** no error is thrown

#### Scenario: Empty messages array handled
- **WHEN** messages array is empty
- **THEN** component renders an empty container
- **AND** no errors are thrown

#### Scenario: Message order preserved
- **WHEN** messages array is provided
- **THEN** messages are displayed in array order

### Requirement: Message Type System

The Chat component SHALL use a `Message` type with fields: `messageId` (optional string), `role` ("user" | "assistant" | "system"), `content` (string), `timestamp` (optional Date), and `createdAt` (optional string).

#### Scenario: Message keying strategy
- **WHEN** messages are rendered
- **THEN** each message uses `messageId` as the React key when available
- **AND** falls back to `${index}-${role}` when `messageId` is absent

#### Scenario: Types exported alongside component
- **WHEN** developer imports Chat
- **THEN** `ChatProps`, `Message`, `UserChatMessage`, `AssistantChatMessage`, and `ChatMessage` types can be imported
- **AND** all types use the `type` keyword in `Chat.types.ts`

### Requirement: Message Grouping (Last Message Pinning)

The Chat component SHALL split messages into two groups: all messages before the last user message ("top") and from the last user message onward ("last"), wrapping the last group in a sticky container.

#### Scenario: Messages split at last user message
- **WHEN** messages array has more than 2 messages
- **THEN** messages are split at the last user message index
- **AND** top messages render individually
- **AND** last messages (from last user message onward) render inside a `lastMessageWrapper` div

#### Scenario: Two or fewer messages
- **WHEN** messages array has 2 or fewer messages
- **THEN** all messages are treated as "top" messages
- **AND** no `lastMessageWrapper` is rendered

### Requirement: Thinking (Assistant Loading) State

The Chat component SHALL accept a `thinking` prop (boolean, default `false`) that shows an AssistantLoader below the last message group when true. This state is fully controlled from outside.

#### Scenario: Thinking indicator shown
- **WHEN** `thinking` prop is `true`
- **AND** there are messages with a last message wrapper
- **THEN** the AssistantLoader component is rendered inside the `lastMessageWrapper` after the last messages
- **AND** the chat automatically smooth-scrolls to the bottom

#### Scenario: Thinking indicator hidden
- **WHEN** `thinking` prop is `false` or not provided
- **THEN** no AssistantLoader is rendered

### Requirement: Initial Loading State

The Chat component SHALL accept an `initialLoading` prop (boolean, default `false`) that displays a Skeleton placeholder instead of the message list.

#### Scenario: Initial loading displays skeleton
- **WHEN** `initialLoading` prop is `true`
- **THEN** a `Skeleton` component with `rows={5}` is rendered instead of the message list
- **AND** no messages are displayed

#### Scenario: After initial load completes
- **WHEN** `initialLoading` transitions from `true` to `false`
- **THEN** the Skeleton is replaced by the message list
- **AND** messages are displayed normally

### Requirement: Auto-Scroll Behavior

The Chat component SHALL automatically scroll to the bottom on initial render and when `thinking` becomes true.

#### Scenario: Scroll to bottom on mount
- **WHEN** Chat component mounts
- **THEN** the container instantly scrolls to the bottom (`behavior: "instant"`)

#### Scenario: Scroll to bottom when thinking starts
- **WHEN** `thinking` prop changes to `true`
- **THEN** the container smooth-scrolls to the bottom (`behavior: "smooth"`)

### Requirement: Scroll-to-Bottom Button

The Chat component SHALL display a scroll-to-bottom button when the user has scrolled away from the bottom, using a configurable threshold.

#### Scenario: Button appears when scrolled up
- **WHEN** user scrolls up more than 100px from the bottom (SCROLL_THRESHOLD)
- **THEN** a button with `KeyboardArrowDown` icon is displayed
- **AND** the button has `aria-label="Scroll to bottom"`

#### Scenario: Button scrolls to bottom on click
- **WHEN** user clicks the scroll-to-bottom button
- **THEN** the chat container smooth-scrolls to the bottom

#### Scenario: Button hidden when at bottom
- **WHEN** user is within 100px of the bottom
- **THEN** the scroll-to-bottom button is not displayed

### Requirement: Performance Optimizations

The Chat component SHALL use React.memo for individual message rendering to prevent unnecessary re-renders.

#### Scenario: Memoized message component
- **WHEN** messages array is updated
- **THEN** only changed messages re-render via the memoized `ChatMessage` component
- **AND** unchanged messages do not re-render

### Requirement: Accessibility

The Chat component SHALL use semantic ARIA attributes to communicate the chat region to assistive technologies.

#### Scenario: Chat region announced
- **WHEN** Chat component is rendered
- **THEN** the root element has `role="log"`
- **AND** has `aria-live="polite"` for dynamic content updates
- **AND** has `aria-label="Chat messages"`

### Requirement: CSS Custom Properties Customization

The Chat component SHALL define design tokens as CSS custom properties on the root element with the `--reltio-chat-` prefix.

#### Scenario: All CSS variables defined on root
- **WHEN** Chat component is rendered
- **THEN** CSS custom properties are defined on `.root` class
- **AND** variables use `--reltio-chat-` prefix
- **AND** all variables include fallback values

#### Scenario: External customization via inline styles
- **WHEN** developer provides style prop with CSS variables
- **THEN** Chat applies custom values

### Requirement: className Utility Usage

The Chat component SHALL use the `classNames` utility from `utils/classNames.ts` for all className composition.

#### Scenario: classNames utility composes CSS modules
- **WHEN** Chat component is rendered
- **THEN** `classNames` utility combines `styles.root` with custom className
- **AND** filters out falsy values

#### Scenario: Custom className support
- **WHEN** developer provides className prop
- **THEN** custom classes are appended to the root element
- **AND** CSS module classes are preserved

### Requirement: TypeScript Type Safety

The Chat component SHALL be fully typed with TypeScript in strict mode, with all types in a separate `Chat.types.ts` file using the `type` keyword.

#### Scenario: Component props fully typed
- **WHEN** developer uses Chat component
- **THEN** `messages` is typed as `Message[]` (required)
- **AND** `thinking` is typed as optional boolean (default false)
- **AND** `initialLoading` is typed as optional boolean (default false)
- **AND** `className` is typed as optional string
- **AND** `style` is typed as optional `React.CSSProperties`
- **AND** additional div attributes are typed via `Omit<React.ComponentPropsWithoutRef<"div">, "children" | "className" | "style">`

### Requirement: Storybook Documentation

The Chat component SHALL have comprehensive Storybook stories demonstrating message lists, loading states, and interaction, with each story showing only ONE variant.

#### Scenario: Stories for message lists
- **WHEN** viewing Storybook
- **THEN** stories exist for user messages, assistant messages, and mixed conversations

#### Scenario: Stories for loading states
- **WHEN** viewing Storybook
- **THEN** story exists for `initialLoading` (skeleton placeholder)
- **AND** story exists for `thinking` (assistant loader indicator)

#### Scenario: Stories for edge cases
- **WHEN** viewing Storybook
- **THEN** stories exist for empty messages, Markdown content in messages

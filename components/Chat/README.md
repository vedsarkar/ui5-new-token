# Chat

`Chat` is a scrollable conversation surface that renders an ordered list of user / assistant messages. It handles auto-scroll, sticky-message anchoring, thinking-state UI, initial-loading skeleton, and a floating "scroll to bottom" button. The component is fully controlled — `messages`, `thinking`, `initialLoading` are driven by parent state; nothing is mutated internally.

### Message rendering

Each entry in `messages` is dispatched by `role`:

- `user` → `UserMessage` (right-aligned bubble)
- `assistant` → `AssistantMessage` (Markdown-rendered, left-aligned)
- `system` → plain text fallback (override at the call site for richer rendering)

### Sticky-message anchoring

When `messages` updates, the **last user message** is pinned to the top of the visible chat area; subsequent assistant messages flow below it. This keeps the user's prompt in view while the assistant streams its reply, instead of letting it scroll out of sight.

### Thinking state

Set `thinking={true}` while waiting for the assistant. The chat smooth-scrolls to the latest user message and shows a `BusyIndicator` directly beneath it. `thinking` is fully controlled — toggle it from your data layer; the component does not derive it from `messages`.

### Initial loading

Set `initialLoading={true}` while the first batch of messages is being fetched. The message list is replaced by a `Skeleton` placeholder until the prop flips back to `false`.

### Scroll-to-bottom button

A floating "scroll to bottom" button appears automatically when the user scrolls up by more than ~100px from the bottom. Clicking it scrolls back to the latest message smoothly.

### Accessibility

The container has `role="log"`, `aria-live="polite"`, and `aria-label="Chat messages"` so screen readers announce new messages without interrupting. The scroll region is keyboard-focusable (`tabIndex={0}`) per WCAG 2.1.1.

# Tasks: Add AssistantMessage Component

## 1. Content Type (obsolete)

- [x] 1.1–1.4 Content type helper and contentType prop were removed; AssistantMessage uses the unified markdown renderer for all content.

## 2. Component Structure

- [x] 2.1 Create `components/AssistantMessage/` folder structure.
- [x] 2.2 Create `AssistantMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`): props for content, error, errorMessage, className, style, and rest; export AssistantMessageProps.
- [x] 2.3 Create `AssistantMessage.tsx` component implementation.
- [x] 2.4 Create `AssistantMessage.module.css` with CSS custom properties on `.root` using `--reltio-assistant-message-` prefix and fallback values.
- [x] 2.5 Create `index.ts` for public exports.

## 3. Component Implementation

- [x] 3.1 Integrate the unified markdown renderer: when content is present and not in error state, pass content to the unified markdown renderer component for all Markdown and MDX content.
- [x] 3.2 Component uses unified renderer for all content.
- [x] 3.4 Implement assistant message layout: root container, content area (renderer output), and error area (ErrorMessage when error is true).
- [x] 3.5 Accept message content via a content prop; handle empty, null, or - [x] 6.8 Removed (contentType prop removed; no content-type override story). content without throwing.
- [x] 3.6 Layout per spec.
- [x] 3.7 Use unified markdown renderer for all content.

## 4. Error State

- [x] 4.1 Implement error prop and logic: when error is true, render ErrorMessage (content hidden or shown per spec).
- [x] 4.2 Pass errorMessage prop to ErrorMessage when provided; otherwise let ErrorMessage use its default.
- [x] 4.3 Ensure ErrorMessage styling fits within AssistantMessage layout (e.g. wrapper or spacing as needed).

## 5. Styling and Types

- [x] 5.1 Define CSS custom properties on `.root` with `--reltio-assistant-message-` prefix (e.g. background, padding, border-radius, content colors) and fallback values.
- [x] 5.2 Use `classNames` utility for all className composition; support className and style props on root.
- [x] 5.3 Ensure content area and renderer output are styled so that AssistantMessage design tokens (e.g. content color) apply to rendered Markdown/MDX where specified.
- [x] 5.4 Run `npm run format` and `npm run lint`; fix any issues in new or touched files.
- [x] 5.5 Verify TypeScript strict mode compliance and that all new code is properly typed.

## 6. Storybook and Documentation

- [x] 6.1 Create `AssistantMessage.stories.tsx` with one variant per story per project conventions.
- [x] 6.2 Add story: plain text (or Markdown-only) assistant message.
- [x] 6.3 Add story: assistant message with Markdown formatting.
- [x] 6.4 Add story: assistant message with MDX content.
- [x] 6.5 Add story: error state with default ErrorMessage.
- [x] 6.6 Add story: error state with custom error message.
- [x] 6.7 Add story: empty or null content.
- [x] 6.8 Removed (contentType prop removed; no content-type override story).
- [x] 6.9 Add story for CSS variable customization if applicable.
- [x] 6.10 Ensure stories are consistent with spec (e.g. a11y where required).

## 7. Testing and Validation

- [x] 7.1 N/A (content type helper removed).
- [x] 7.2 Verify AssistantMessage renders correctly for markdown and mdx content.
- [x] 7.3 Verify error state shows ErrorMessage and optional custom message.
- [x] 7.4 Verify empty/null content does not throw and layout remains stable.
- [x] 7.5 Verify invalid Markdown/MDX is handled by the unified renderer (no requirement to handle inside AssistantMessage).
- [x] 7.6 Run OpenSpec validation for add-assistant-message (e.g. `openspec validate add-assistant-message --strict`) and fix any doc or task mismatches.

# Tasks: Add AssistantMessage Component

## 1. Content Type Helper

- [x] 1.1 Create the content type helper (function or small module) with signature and location consistent with the spec (input: content string, optional override; output: `"mdx"` or `"markdown"`).
- [x] 1.2 Implement decision rules: explicit override wins; else infer from content (e.g. JSX-like patterns → `"mdx"`, else `"markdown"`); handle empty/ambiguous content per spec.
- [x] 1.3 Export the helper so AssistantMessage (or its module) can import and use it.
- [x] 1.4 Add unit tests for the helper: override takes precedence; content with JSX-like patterns returns `"mdx"`; content without JSX returns `"markdown"`; edge cases (empty, whitespace, malformed) as defined in spec.

## 2. Component Structure

- [x] 2.1 Create `components/AssistantMessage/` folder structure.
- [x] 2.2 Create `AssistantMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`): props for content, error, errorMessage, content-type override, meta, className, style, and rest; export AssistantMessageProps and any content-type-related types.
- [x] 2.3 Create `AssistantMessage.tsx` component implementation.
- [x] 2.4 Create `AssistantMessage.module.css` with CSS custom properties on `.root` using `--reltio-assistant-message-` prefix and fallback values.
- [x] 2.5 Create `index.ts` for public exports.

## 3. Component Implementation

- [x] 3.1 Integrate the content type helper: when content is present and not in error state, call the helper with content and any content-type override prop; use the result to choose MarkdownRenderer or MDXRenderer.
- [x] 3.2 Integrate MarkdownRenderer for content when helper returns `"markdown"`.
- [x] 3.3 Integrate MDXRenderer for content when helper returns `"mdx"`.
- [x] 3.4 Implement assistant message layout: root container, optional meta area, content area (renderer output), and error area (ErrorMessage when error is true).
- [x] 3.5 Accept message content via a content prop; handle empty, null, or undefined content without throwing.
- [x] 3.6 Support optional metadata (e.g. meta prop) rendered in the layout per spec.
- [x] 3.7 Ensure AssistantMessage does not duplicate the helper’s decision logic; all content-type decisions go through the helper.

## 4. Error State

- [x] 4.1 Implement error prop and logic: when error is true, render ErrorMessage (content hidden or shown per spec).
- [x] 4.2 Pass errorMessage prop to ErrorMessage when provided; otherwise let ErrorMessage use its default.
- [x] 4.3 Ensure ErrorMessage styling fits within AssistantMessage layout (e.g. wrapper or spacing as needed).

## 5. Styling and Types

- [x] 5.1 Define CSS custom properties on `.root` with `--reltio-assistant-message-` prefix (e.g. background, padding, border-radius, content/meta colors) and fallback values.
- [x] 5.2 Use `classNames` utility for all className composition; support className and style props on root.
- [x] 5.3 Ensure content area and renderer output are styled so that AssistantMessage design tokens (e.g. content color) apply to rendered Markdown/MDX where specified.
- [x] 5.4 Run `npm run format` and `npm run lint`; fix any issues in new or touched files.
- [x] 5.5 Verify TypeScript strict mode compliance and that all new code is properly typed.

## 6. Storybook and Documentation

- [x] 6.1 Create `AssistantMessage.stories.tsx` with one variant per story per project conventions.
- [x] 6.2 Add story: plain text (or Markdown-only) assistant message.
- [x] 6.3 Add story: assistant message with Markdown formatting (helper returns markdown or override is markdown).
- [x] 6.4 Add story: assistant message with MDX content (helper returns mdx or override is mdx).
- [x] 6.5 Add story: error state with default ErrorMessage.
- [x] 6.6 Add story: error state with custom error message.
- [x] 6.7 Add story: empty or null content.
- [x] 6.8 Add story that demonstrates content-type override (e.g. force markdown or mdx) so the helper’s behavior is visible when needed.
- [x] 6.9 Add story for optional meta and/or CSS variable customization if applicable.
- [x] 6.10 Ensure stories are consistent with spec (e.g. a11y where required).

## 7. Testing and Validation

- [x] 7.1 Verify content type helper behavior with unit tests (see 1.4).
- [x] 7.2 Verify AssistantMessage renders correctly for markdown and mdx content types (via helper or override).
- [x] 7.3 Verify error state shows ErrorMessage and optional custom message.
- [x] 7.4 Verify empty/null content does not throw and layout remains stable.
- [x] 7.5 Verify invalid Markdown/MDX is handled by the chosen renderer (no requirement to handle inside AssistantMessage beyond choosing the renderer).
- [x] 7.6 Run OpenSpec validation for add-assistant-message (e.g. `openspec validate add-assistant-message --strict`) and fix any doc or task mismatches.

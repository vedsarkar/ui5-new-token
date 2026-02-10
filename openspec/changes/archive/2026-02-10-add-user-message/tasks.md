# Tasks: Add UserMessage Component

## 1. Component Structure

- [x] 1.1 Create `components/UserMessage/` folder structure
- [x] 1.2 Create `UserMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `UserMessage.tsx` component implementation
- [x] 1.4 Create `UserMessage.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [x] 2.1 Integrate MarkdownRenderer component for content rendering
- [x] 2.2 Implement user message layout (content area)
- [x] 2.3 Ensure component accepts message content as prop
- [x] 2.4 Handle empty or null content gracefully
- [x] 2.5 Add support for optional metadata (user info, etc.)

## 3. Styling

- [x] 3.1 Define CSS custom properties on `.root` class with `--reltio-user-message-` prefix
- [x] 3.2 Style user message container (background, padding, border-radius)
- [x] 3.3 Style message content area
- [x] 3.4 Ensure all styles use CSS variables with fallback values
- [x] 3.5 Use `classNames` utility for all className composition
- [x] 3.6 Ensure responsive design and proper spacing
- [x] 3.7 Ensure visual distinction from assistant messages

## 4. MarkdownRenderer Integration

- [x] 4.1 Pass message content to MarkdownRenderer component
- [x] 4.2 Ensure MarkdownRenderer styling integrates with UserMessage styling
- [x] 4.3 Handle MarkdownRenderer error states appropriately

## 5. Storybook Documentation

- [x] 5.1 Create `UserMessage.stories.tsx` with comprehensive stories
- [x] 5.2 Story: Basic user message with plain text
- [x] 5.3 Story: User message with Markdown formatting
- [x] 5.4 Story: User message with headers and lists
- [x] 5.5 Story: User message with code blocks
- [x] 5.6 Story: User message with links
- [x] 5.7 Story: User message with invalid Markdown (error handling)
- [x] 5.8 Story: User message with empty content
- [x] 5.9 Ensure each story shows ONE variant (per project conventions)
- [x] 5.10 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [x] 6.1 Ensure all props are properly typed
- [x] 6.2 Export `UserMessageProps` type alongside component
- [x] 6.3 Type message content and metadata
- [x] 6.4 Run `npm run format` and fix formatting issues
- [x] 6.5 Run `npm run lint` and fix linting errors
- [x] 6.6 Verify TypeScript strict mode compliance

## 7. Testing

- [x] 7.1 Verify component renders user messages correctly
- [x] 7.2 Verify Markdown rendering works correctly
- [x] 7.3 Verify component handles empty/null content
- [x] 7.4 Verify component handles invalid Markdown gracefully
- [x] 7.5 Test accessibility with keyboard navigation
- [x] 7.6 Test with screen reader (a11y addon)

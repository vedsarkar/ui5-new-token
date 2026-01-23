# Tasks: Add UserMessage Component

## 1. Component Structure

- [ ] 1.1 Create `components/UserMessage/` folder structure
- [ ] 1.2 Create `UserMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `UserMessage.tsx` component implementation
- [ ] 1.4 Create `UserMessage.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [ ] 2.1 Integrate MarkdownRenderer component for content rendering
- [ ] 2.2 Implement user message layout (content area)
- [ ] 2.3 Ensure component accepts message content as prop
- [ ] 2.4 Handle empty or null content gracefully
- [ ] 2.5 Add support for optional metadata (user info, etc.)

## 3. Styling

- [ ] 3.1 Define CSS custom properties on `.root` class with `--reltio-user-message-` prefix
- [ ] 3.2 Style user message container (background, padding, border-radius)
- [ ] 3.3 Style message content area
- [ ] 3.4 Ensure all styles use CSS variables with fallback values
- [ ] 3.5 Use `classNames` utility for all className composition
- [ ] 3.6 Ensure responsive design and proper spacing
- [ ] 3.7 Ensure visual distinction from assistant messages

## 4. MarkdownRenderer Integration

- [ ] 4.1 Pass message content to MarkdownRenderer component
- [ ] 4.2 Ensure MarkdownRenderer styling integrates with UserMessage styling
- [ ] 4.3 Handle MarkdownRenderer error states appropriately

## 5. Storybook Documentation

- [ ] 5.1 Create `UserMessage.stories.tsx` with comprehensive stories
- [ ] 5.2 Story: Basic user message with plain text
- [ ] 5.3 Story: User message with Markdown formatting
- [ ] 5.4 Story: User message with headers and lists
- [ ] 5.5 Story: User message with code blocks
- [ ] 5.6 Story: User message with links
- [ ] 5.7 Story: User message with invalid Markdown (error handling)
- [ ] 5.8 Story: User message with empty content
- [ ] 5.9 Ensure each story shows ONE variant (per project conventions)
- [ ] 5.10 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [ ] 6.1 Ensure all props are properly typed
- [ ] 6.2 Export `UserMessageProps` type alongside component
- [ ] 6.3 Type message content and metadata
- [ ] 6.4 Run `npm run format` and fix formatting issues
- [ ] 6.5 Run `npm run lint` and fix linting errors
- [ ] 6.6 Verify TypeScript strict mode compliance

## 7. Testing

- [ ] 7.1 Verify component renders user messages correctly
- [ ] 7.2 Verify Markdown rendering works correctly
- [ ] 7.3 Verify component handles empty/null content
- [ ] 7.4 Verify component handles invalid Markdown gracefully
- [ ] 7.5 Test accessibility with keyboard navigation
- [ ] 7.6 Test with screen reader (a11y addon)

# Tasks: Add AssistantMessage Component

## 1. Component Structure

- [ ] 1.1 Create `components/AssistantMessage/` folder structure
- [ ] 1.2 Create `AssistantMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `AssistantMessage.tsx` component implementation
- [ ] 1.4 Create `AssistantMessage.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [ ] 2.1 Integrate MarkdownRenderer component for Markdown content
- [ ] 2.2 Integrate MDXRenderer component for MDX content
- [ ] 2.3 Implement content type detection (Markdown vs MDX)
- [ ] 2.4 Implement assistant message layout (content area)
- [ ] 2.5 Ensure component accepts message content as prop
- [ ] 2.6 Handle empty or null content gracefully
- [ ] 2.7 Add support for optional metadata (assistant info, etc.)

## 3. Error State

- [ ] 3.1 Implement error state prop and logic
- [ ] 3.2 Integrate ErrorMessage component for error display
- [ ] 3.3 Pass error message to ErrorMessage component (custom or default)
- [ ] 3.4 Ensure ErrorMessage is displayed when error prop is true
- [ ] 3.5 Handle error state transitions (content to error)
- [ ] 3.6 Ensure ErrorMessage styling integrates with AssistantMessage layout
- [ ] 3.7 Support optional error message customization via errorMessage prop

## 4. Content Rendering

- [ ] 4.1 Implement logic to determine content type (Markdown vs MDX)
- [ ] 4.2 Render Markdown content using MarkdownRenderer
- [ ] 4.3 Render MDX content using MDXRenderer
- [ ] 4.4 Handle content rendering errors gracefully
- [ ] 4.5 Ensure content rendering works in all states (error, success)

## 5. Styling

- [ ] 5.1 Define CSS custom properties on `.root` class with `--reltio-assistant-message-` prefix
- [ ] 5.2 Style assistant message container (background, padding, border-radius)
- [ ] 5.3 Style message content area
- [ ] 5.4 Ensure ErrorMessage component styling integrates with AssistantMessage layout
- [ ] 5.5 Ensure all styles use CSS variables with fallback values
- [ ] 5.6 Use `classNames` utility for all className composition
- [ ] 5.7 Ensure responsive design and proper spacing
- [ ] 5.8 Ensure visual distinction from user messages

## 6. Storybook Documentation

- [ ] 6.1 Create `AssistantMessage.stories.tsx` with comprehensive stories
- [ ] 6.2 Story: Basic assistant message with plain text
- [ ] 6.3 Story: Assistant message with Markdown formatting
- [ ] 6.4 Story: Assistant message with MDX content
- [ ] 6.5 Story: Error state (using ErrorMessage component)
- [ ] 6.6 Story: Error state with custom error message (using ErrorMessage component)
- [ ] 6.7 Story: Assistant message with empty content
- [ ] 6.8 Ensure each story shows ONE variant (per project conventions)
- [ ] 6.9 Add accessibility testing (a11y addon)

## 7. TypeScript and Validation

- [ ] 7.1 Ensure all props are properly typed
- [ ] 7.2 Export `AssistantMessageProps` type alongside component
- [ ] 7.3 Type message content and metadata
- [ ] 7.4 Type error states
- [ ] 7.5 Type content type (Markdown vs MDX)
- [ ] 7.6 Run `npm run format` and fix formatting issues
- [ ] 7.7 Run `npm run lint` and fix linting errors
- [ ] 7.8 Verify TypeScript strict mode compliance

## 8. Testing

- [ ] 8.1 Verify component renders assistant messages correctly
- [ ] 8.2 Verify Markdown rendering works correctly
- [ ] 8.3 Verify MDX rendering works correctly
- [ ] 8.4 Verify error state displays correctly using ErrorMessage component
- [ ] 8.5 Verify state transitions work correctly
- [ ] 8.6 Verify component handles empty/null content
- [ ] 8.7 Verify component handles invalid Markdown/MDX gracefully
- [ ] 8.8 Test accessibility with keyboard navigation
- [ ] 8.9 Test with screen reader (a11y addon)
- [ ] 8.10 Test error state accessibility

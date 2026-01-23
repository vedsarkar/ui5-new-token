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

## 3. Loading State

- [ ] 3.1 Implement loading state prop and logic
- [ ] 3.2 Create loading indicator component or use existing icon
- [ ] 3.3 Style loading indicator appropriately
- [ ] 3.4 Ensure loading state is visually distinct
- [ ] 3.5 Add loading state CSS custom properties
- [ ] 3.6 Add accessibility attributes for loading state (aria-busy, aria-label)

## 4. Error State

- [ ] 4.1 Implement error state prop and logic
- [ ] 4.2 Integrate ErrorMessage component for error display
- [ ] 4.3 Pass error message to ErrorMessage component (custom or default)
- [ ] 4.4 Ensure ErrorMessage is displayed when error prop is true
- [ ] 4.5 Handle error state transitions (loading to error, content to error)
- [ ] 4.6 Ensure ErrorMessage styling integrates with AssistantMessage layout
- [ ] 4.7 Support optional error message customization via errorMessage prop

## 5. Content Rendering

- [ ] 5.1 Implement logic to determine content type (Markdown vs MDX)
- [ ] 5.2 Render Markdown content using MarkdownRenderer
- [ ] 5.3 Render MDX content using MDXRenderer
- [ ] 5.4 Handle content rendering errors gracefully
- [ ] 5.5 Ensure content rendering works in all states (loading, error, success)

## 6. Styling

- [ ] 6.1 Define CSS custom properties on `.root` class with `--reltio-assistant-message-` prefix
- [ ] 6.2 Style assistant message container (background, padding, border-radius)
- [ ] 6.3 Style message content area
- [ ] 6.4 Style loading state indicator
- [ ] 6.5 Ensure ErrorMessage component styling integrates with AssistantMessage layout
- [ ] 6.6 Ensure all styles use CSS variables with fallback values
- [ ] 6.7 Use `classNames` utility for all className composition
- [ ] 6.8 Ensure responsive design and proper spacing
- [ ] 6.9 Ensure visual distinction from user messages

## 7. Storybook Documentation

- [ ] 7.1 Create `AssistantMessage.stories.tsx` with comprehensive stories
- [ ] 7.2 Story: Basic assistant message with plain text
- [ ] 7.3 Story: Assistant message with Markdown formatting
- [ ] 7.4 Story: Assistant message with MDX content
- [ ] 7.5 Story: Loading state
- [ ] 7.6 Story: Error state (using ErrorMessage component)
- [ ] 7.7 Story: Error state with custom error message (using ErrorMessage component)
- [ ] 7.8 Story: Transition from loading to content
- [ ] 7.9 Story: Transition from loading to error
- [ ] 7.10 Story: Assistant message with empty content
- [ ] 7.11 Ensure each story shows ONE variant (per project conventions)
- [ ] 7.12 Add accessibility testing (a11y addon)

## 8. TypeScript and Validation

- [ ] 8.1 Ensure all props are properly typed
- [ ] 8.2 Export `AssistantMessageProps` type alongside component
- [ ] 8.3 Type message content and metadata
- [ ] 8.4 Type loading and error states
- [ ] 8.5 Type content type (Markdown vs MDX)
- [ ] 8.6 Run `npm run format` and fix formatting issues
- [ ] 8.7 Run `npm run lint` and fix linting errors
- [ ] 8.8 Verify TypeScript strict mode compliance

## 9. Testing

- [ ] 9.1 Verify component renders assistant messages correctly
- [ ] 9.2 Verify Markdown rendering works correctly
- [ ] 9.3 Verify MDX rendering works correctly
- [ ] 9.4 Verify loading state displays correctly
- [ ] 9.5 Verify error state displays correctly using ErrorMessage component
- [ ] 9.6 Verify state transitions work correctly
- [ ] 9.7 Verify component handles empty/null content
- [ ] 9.8 Verify component handles invalid Markdown/MDX gracefully
- [ ] 9.9 Test accessibility with keyboard navigation
- [ ] 9.10 Test with screen reader (a11y addon)
- [ ] 9.11 Test loading state accessibility
- [ ] 9.12 Test error state accessibility

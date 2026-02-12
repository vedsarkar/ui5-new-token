# Tasks: Add ErrorMessage Component

## 1. Component Structure

- [x] 1.1 Create `components/ErrorMessage/` folder structure
- [x] 1.2 Create `ErrorMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `ErrorMessage.tsx` component implementation
- [x] 1.4 Create `ErrorMessage.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [x] 2.1 Implement error message display
- [x] 2.2 Support custom error message via message prop
- [x] 2.3 Support default error message when message prop not provided
- [x] 2.4 Handle empty or null message gracefully
- [x] 2.5 Add support for optional error icon (ErrorCircle)

## 3. Icon Integration

- [x] 3.1 Import ErrorCircle icon from icon library
- [x] 3.2 Add showIcon prop (default: true)
- [x] 3.3 Position icon appropriately relative to message text
- [x] 3.4 Style icon with error colors
- [x] 3.5 Ensure icon is accessible (aria-hidden when decorative)

## 4. Styling

- [x] 4.1 Define CSS custom properties on `.root` class with `--reltio-error-message-` prefix
- [x] 4.2 Style error message container (background, padding, border-radius, border)
- [x] 4.3 Style error message text
- [x] 4.4 Style error icon
- [x] 4.5 Ensure all styles use CSS variables with fallback values
- [x] 4.6 Use `classNames` utility for all className composition
- [x] 4.7 Ensure responsive design and proper spacing
- [x] 4.8 Ensure error styling is visually distinct and clearly identifiable

## 5. Accessibility

- [x] 5.1 Add role="alert" attribute for error messages
- [x] 5.2 Add aria-live="polite" or aria-live="assertive" attribute
- [x] 5.3 Ensure error message is announced to screen readers
- [x] 5.4 Add proper ARIA labels if needed
- [x] 5.5 Ensure keyboard navigation works correctly

## 6. Storybook Documentation

- [x] 6.1 Create `ErrorMessage.stories.tsx` with comprehensive stories
- [x] 6.2 Story: Error message with default message
- [x] 6.3 Story: Error message with custom message
- [x] 6.4 Story: Error message with icon
- [x] 6.5 Story: Error message without icon
- [x] 6.6 Story: Error message with long text
- [x] 6.7 Story: Error message with empty message
- [x] 6.8 Ensure each story shows ONE variant (per project conventions)
- [x] 6.9 Add accessibility testing (a11y addon)

## 7. TypeScript and Validation

- [x] 7.1 Ensure all props are properly typed
- [x] 7.2 Export `ErrorMessageProps` type alongside component
- [x] 7.3 Type message prop (string, optional)
- [x] 7.4 Type showIcon prop (boolean, optional)
- [x] 7.5 Run `npm run format` and fix formatting issues
- [x] 7.6 Run `npm run lint` and fix linting errors
- [x] 7.7 Verify TypeScript strict mode compliance

## 8. Testing

- [x] 8.1 Verify component renders error messages correctly
- [x] 8.2 Verify default error message displays when message prop not provided
- [x] 8.3 Verify custom error message displays when message prop provided
- [x] 8.4 Verify icon displays when showIcon is true
- [x] 8.5 Verify icon is hidden when showIcon is false
- [x] 8.6 Verify component handles empty/null message
- [x] 8.7 Test accessibility with keyboard navigation
- [x] 8.8 Test with screen reader (a11y addon)
- [x] 8.9 Verify error message is announced to screen readers

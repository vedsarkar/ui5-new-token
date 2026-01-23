# Tasks: Add ErrorMessage Component

## 1. Component Structure

- [ ] 1.1 Create `components/ErrorMessage/` folder structure
- [ ] 1.2 Create `ErrorMessage.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `ErrorMessage.tsx` component implementation
- [ ] 1.4 Create `ErrorMessage.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [ ] 2.1 Implement error message display
- [ ] 2.2 Support custom error message via message prop
- [ ] 2.3 Support default error message when message prop not provided
- [ ] 2.4 Handle empty or null message gracefully
- [ ] 2.5 Add support for optional error icon (ErrorCircle)

## 3. Icon Integration

- [ ] 3.1 Import ErrorCircle icon from icon library
- [ ] 3.2 Add showIcon prop (default: true)
- [ ] 3.3 Position icon appropriately relative to message text
- [ ] 3.4 Style icon with error colors
- [ ] 3.5 Ensure icon is accessible (aria-hidden when decorative)

## 4. Styling

- [ ] 4.1 Define CSS custom properties on `.root` class with `--reltio-error-message-` prefix
- [ ] 4.2 Style error message container (background, padding, border-radius, border)
- [ ] 4.3 Style error message text
- [ ] 4.4 Style error icon
- [ ] 4.5 Ensure all styles use CSS variables with fallback values
- [ ] 4.6 Use `classNames` utility for all className composition
- [ ] 4.7 Ensure responsive design and proper spacing
- [ ] 4.8 Ensure error styling is visually distinct and clearly identifiable

## 5. Accessibility

- [ ] 5.1 Add role="alert" attribute for error messages
- [ ] 5.2 Add aria-live="polite" or aria-live="assertive" attribute
- [ ] 5.3 Ensure error message is announced to screen readers
- [ ] 5.4 Add proper ARIA labels if needed
- [ ] 5.5 Ensure keyboard navigation works correctly

## 6. Storybook Documentation

- [ ] 6.1 Create `ErrorMessage.stories.tsx` with comprehensive stories
- [ ] 6.2 Story: Error message with default message
- [ ] 6.3 Story: Error message with custom message
- [ ] 6.4 Story: Error message with icon
- [ ] 6.5 Story: Error message without icon
- [ ] 6.6 Story: Error message with long text
- [ ] 6.7 Story: Error message with empty message
- [ ] 6.8 Ensure each story shows ONE variant (per project conventions)
- [ ] 6.9 Add accessibility testing (a11y addon)

## 7. TypeScript and Validation

- [ ] 7.1 Ensure all props are properly typed
- [ ] 7.2 Export `ErrorMessageProps` type alongside component
- [ ] 7.3 Type message prop (string, optional)
- [ ] 7.4 Type showIcon prop (boolean, optional)
- [ ] 7.5 Run `npm run format` and fix formatting issues
- [ ] 7.6 Run `npm run lint` and fix linting errors
- [ ] 7.7 Verify TypeScript strict mode compliance

## 8. Testing

- [ ] 8.1 Verify component renders error messages correctly
- [ ] 8.2 Verify default error message displays when message prop not provided
- [ ] 8.3 Verify custom error message displays when message prop provided
- [ ] 8.4 Verify icon displays when showIcon is true
- [ ] 8.5 Verify icon is hidden when showIcon is false
- [ ] 8.6 Verify component handles empty/null message
- [ ] 8.7 Test accessibility with keyboard navigation
- [ ] 8.8 Test with screen reader (a11y addon)
- [ ] 8.9 Verify error message is announced to screen readers

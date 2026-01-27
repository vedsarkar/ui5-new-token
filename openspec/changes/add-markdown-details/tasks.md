# Tasks: Add MarkdownDetails Component

## 1. Component Structure

- [ ] 1.1 Create `components/MarkdownDetails/` folder structure
- [ ] 1.2 Create `MarkdownDetails.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `MarkdownDetails.tsx` component implementation
- [ ] 1.4 Create `MarkdownDetails.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [ ] 2.1 Implement internal state management for open/closed state using React useState
- [ ] 2.2 Implement summary extraction logic:
  - [ ] 2.2.1 Detect if children contain a `<summary>` element
  - [ ] 2.2.2 Extract summary content when present
  - [ ] 2.2.3 Provide default fallback label when no summary is present
- [ ] 2.3 Implement content separation:
  - [ ] 2.3.1 Render summary content in summary element
  - [ ] 2.3.2 Render all non-summary children as expandable content
- [ ] 2.4 Add icon support:
  - [ ] 2.4.1 Import ExpandLess and ExpandMore icons from icon library
  - [ ] 2.4.2 Display appropriate icon based on open/closed state
  - [ ] 2.4.3 Animate icon rotation/transition on state change
- [ ] 2.5 Support native `<details>` HTML attributes (open, etc.) via props pass-through
- [ ] 2.6 Ensure component handles edge cases (no children, empty summary, etc.)

## 3. Styling

- [ ] 3.1 Define CSS custom properties on `.root` class with `--reltio-markdown-details-` prefix
- [ ] 3.2 Style details element with proper borders, padding, and spacing
- [ ] 3.3 Style summary element with hover states and focus-visible states
- [ ] 3.4 Style icon positioning and transitions
- [ ] 3.5 Ensure all styles use CSS variables with fallback values
- [ ] 3.6 Use `classNames` utility for all className composition
- [ ] 3.7 Verify NO global styles are used (no global CSS files, no element selectors)
- [ ] 3.8 Ensure responsive design and proper spacing

## 4. Accessibility

- [ ] 4.1 Ensure keyboard navigation works (Enter/Space to toggle)
- [ ] 4.2 Add proper ARIA attributes (aria-expanded, aria-controls if needed)
- [ ] 4.3 Ensure focus management is correct
- [ ] 4.4 Test with screen reader (a11y addon in Storybook)

## 5. Storybook Documentation

- [ ] 5.1 Create `MarkdownDetails.stories.tsx` with comprehensive stories
- [ ] 5.2 Story: Default summary fallback (no summary element provided)
- [ ] 5.3 Story: Custom summary (with summary element)
- [ ] 5.4 Story: Nested Markdown content inside details
- [ ] 5.5 Story: Open state (initially expanded)
- [ ] 5.6 Story: Closed state (initially collapsed)
- [ ] 5.7 Story: Open/close interaction demonstration
- [ ] 5.8 Story: Multiple details blocks
- [ ] 5.9 Ensure each story shows ONE variant (per project conventions)
- [ ] 5.10 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [ ] 6.1 Ensure all props are properly typed
- [ ] 6.2 Export `MarkdownDetailsProps` type alongside component
- [ ] 6.3 Run `npm run format` and fix formatting issues
- [ ] 6.4 Run `npm run lint` and fix linting errors
- [ ] 6.5 Verify TypeScript strict mode compliance

## 7. Integration with MarkdownRenderer

- [ ] 7.1 Update MarkdownRenderer to use MarkdownDetails component in tag-to-component mapping
- [ ] 7.2 Verify MarkdownRenderer passes appropriate props to MarkdownDetails
- [ ] 7.3 Test integration in MarkdownRenderer stories

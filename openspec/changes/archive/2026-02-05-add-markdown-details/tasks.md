# Tasks: Add MarkdownDetails Component

## 1. Component Structure

- [x] 1.1 Create `components/MarkdownDetails/` folder structure
- [x] 1.2 Create `MarkdownDetails.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `MarkdownDetails.tsx` component implementation
- [x] 1.4 Create `MarkdownDetails.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Component Implementation

- [x] 2.1 Implement internal state management for open/closed state using React useState
- [x] 2.2 Implement summary extraction logic:
  - [x] 2.2.1 Detect if children contain a `<summary>` element
  - [x] 2.2.2 Extract summary content when present
  - [x] 2.2.3 Provide default fallback label when no summary is present
- [x] 2.3 Implement content separation:
  - [x] 2.3.1 Render summary content in summary element
  - [x] 2.3.2 Render all non-summary children as expandable content
- [x] 2.4 Add icon support:
  - [x] 2.4.1 Display CodeBrackets icon to the left of the summary text
  - [x] 2.4.2 Import ExpandLess and ExpandMore icons from icon library
  - [x] 2.4.3 Display appropriate expand/collapse icon on the right based on open/closed state
  - [x] 2.4.4 Animate expand icon rotation/transition on state change
- [x] 2.5 Support native `<details>` HTML attributes (open, etc.) via props pass-through
- [x] 2.6 Ensure component handles edge cases (no children, empty summary, etc.)

## 3. Styling

- [x] 3.1 Define CSS custom properties on `.root` class with `--reltio-markdown-details-` prefix
- [x] 3.2 Style details element with proper borders, padding, and spacing
- [x] 3.3 Style summary element with hover states and focus-visible states
- [x] 3.4 Style leading icon (left of summary) and expand icon (right) positioning and transitions
- [x] 3.5 Ensure all styles use CSS variables with fallback values
- [x] 3.6 Use `classNames` utility for all className composition
- [x] 3.7 Verify NO global styles are used (no global CSS files, no element selectors)
- [x] 3.8 Ensure responsive design and proper spacing

## 4. Accessibility

- [x] 4.1 Ensure keyboard navigation works (Enter/Space to toggle)
- [x] 4.2 Add proper ARIA attributes (aria-expanded, aria-controls if needed)
- [x] 4.3 Ensure focus management is correct
- [x] 4.4 Test with screen reader (a11y addon in Storybook)

## 5. Storybook Documentation

- [x] 5.1 Create `MarkdownDetails.stories.tsx` with comprehensive stories
- [x] 5.2 Story: Default summary fallback (no summary element provided)
- [x] 5.3 Story: Custom summary (with summary element)
- [x] 5.4 Story: Nested Markdown content inside details
- [x] 5.5 Story: Open state (initially expanded)
- [x] 5.6 Story: Closed state (initially collapsed)
- [x] 5.7 Story: Open/close interaction demonstration
- [x] 5.8 Story: Multiple details blocks
- [x] 5.9 Ensure each story shows ONE variant (per project conventions)
- [x] 5.10 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [x] 6.1 Ensure all props are properly typed
- [x] 6.2 Export `MarkdownDetailsProps` type alongside component
- [x] 6.3 Run `npm run format` and fix formatting issues
- [x] 6.4 Run `npm run lint` and fix linting errors
- [x] 6.5 Verify TypeScript strict mode compliance

## 7. Integration with MarkdownRenderer

- [x] 7.1 MarkdownDetails is used in tag-to-component mapping via createBaseMarkdownComponents (MarkdownComponents); MarkdownRenderer uses createBaseMarkdownComponents
- [x] 7.2 MarkdownRenderer passes children and props to MarkdownDetails via react-markdown components (details → MarkdownDetails)
- [x] 7.3 Integration exercised via MarkdownRenderer stories (details/summary content)

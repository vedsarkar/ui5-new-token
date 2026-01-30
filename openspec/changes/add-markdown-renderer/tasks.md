# Tasks: Add MarkdownRenderer Component

## 1. Component Structure

- [x] 1.1 Create `components/MarkdownRenderer/` folder structure
- [x] 1.2 Create `MarkdownRenderer.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `MarkdownRenderer.tsx` component implementation
- [x] 1.4 Create `MarkdownRenderer.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. Markdown Rendering Implementation

- [x] 2.1 Integrate `react-markdown` library for Markdown parsing and rendering
- [x] 2.2 Implement try-catch for sync errors and ErrorBoundary (design system) for render-phase errors
- [x] 2.3 Implement fallback rendering when Markdown parsing fails (display raw text or error message)
- [x] 2.4 Ensure component handles edge cases (empty strings, null, undefined)
- [x] 2.5 Add support for common Markdown features (headers, lists, links, code blocks, emphasis)
- [x] 2.6 Enable GitHub Flavored Markdown (GFM) support (tables, task lists, strikethrough, autolinks)
- [x] 2.7 Enable raw HTML rendering support (br, b, sup, sub, i, strong, em, etc.)
- [x] 2.8 Use rehype-sanitize for HTML sanitization
- [x] 2.9 Configure rehype-sanitize (tagNames, attributes)
- [x] 2.10 Integrate rehype-sanitize via react-markdown rehypePlugins to prevent malicious script execution
- [x] 2.11 Configure sanitizer to remove script tags and dangerous attributes
- [x] 2.12 Configure sanitizer to allow only safe attributes (no event handlers)
- [x] 2.13 Configure sanitizer to preserve safe HTML tags and attributes
- [x] 2.14 Sanitizer preserves safe tags (br, b, strong, i, em, sup, sub, p, span, div, details, summary)

## 3. Styling

- [x] 3.1 Define CSS custom properties on `.root` class with `--reltio-markdown-renderer-` prefix
- [x] 3.2 Implement tag-to-class mapping via react-markdown components prop for all Markdown elements (h1-h6, p, ul, ol, li, code, pre, blockquote, a, strong, em)
- [x] 3.3 Implement tag-to-class mapping for GFM elements (table, thead, tbody, tr, th, td, input[type="checkbox"], del)
- [x] 3.4 Implement tag-to-class mapping for raw HTML elements (br, b, sup, sub, i, strong, em)
- [x] 3.5 Create CSS Modules classes for each Markdown element (e.g., `.heading1`, `.paragraph`, `.list`, `.listItem`, `.code`, `.codeBlock`, `.blockquote`, `.link`, etc.)
- [x] 3.6 Assign CSS Modules classes to React elements via react-markdown components prop mapping
- [x] 3.7 Ensure all styles use CSS variables with fallback values
- [x] 3.8 Use `classNames` utility for all className composition
- [x] 3.9 Verify NO global styles are used (no global CSS files, no element selectors like `p {}`, `h1 {}`, no tag-based styling rules)
- [x] 3.10 Verify all styling is applied ONLY through CSS Modules classes assigned via components prop
- [x] 3.11 Ensure responsive design and proper spacing

## 4. Error Handling

- [x] 4.1 Implement graceful error handling for malformed Markdown (try-catch and ErrorBoundary)
- [x] 4.2 Wrap ReactMarkdown in ErrorBoundary with fallback showing raw content in pre
- [x] 4.3 Ensure errors don't break the parent component
- [x] 4.4 Add error state styling (styles.error for fallback)

## 5. Storybook Documentation

- [x] 5.1 Create `MarkdownRenderer.stories.tsx` with comprehensive stories
- [x] 5.2 Story: Basic Markdown rendering (headers, paragraphs, lists)
- [x] 5.3 Story: Links and emphasis (bold, italic)
- [x] 5.4 Story: Code blocks and inline code
- [x] 5.5 Story: Blockquotes and nested lists
- [x] 5.6 Story: GFM tables
- [x] 5.7 Story: GFM task lists (checkboxes)
- [x] 5.8 Story: GFM strikethrough
- [x] 5.9 Story: GFM autolinks
- [x] 5.10 Story: Raw HTML rendering (br, b, sup, sub, etc.)
- [x] 5.11 Story: Invalid Markdown handling (malformed syntax)
- [x] 5.12 Story: Empty content handling
- [x] 5.13 Ensure each story shows ONE variant (per project conventions)
- [x] 5.14 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [x] 6.1 Ensure all props are properly typed
- [x] 6.2 Export `MarkdownRendererProps` type alongside component
- [x] 6.3 Run `npm run format` and fix formatting issues
- [x] 6.4 Run `npm run lint` and fix linting errors
- [x] 6.5 Verify TypeScript strict mode compliance
- [x] 6.6 Verify tag-to-class mapping is correctly typed in react-markdown components prop
- [x] 6.7 Verify no global styles exist in codebase (acceptance criterion: all styling via CSS Modules classes only)

## 7. Testing

- [x] 7.1 Verify component renders valid Markdown correctly
- [x] 7.2 Verify component renders GFM features correctly (tables, task lists, strikethrough, autolinks)
- [x] 7.3 Verify component renders raw HTML correctly (br, b, sup, sub, etc.)
- [x] 7.4 Verify HTML sanitization prevents script tag execution
- [x] 7.5 Verify HTML sanitization removes event handlers
- [x] 7.6 Verify HTML sanitization sanitizes dangerous URL schemes
- [x] 7.7 Verify HTML sanitization preserves safe HTML content
- [x] 7.8 Verify component handles invalid Markdown gracefully
- [x] 7.9 Verify component handles empty/null/undefined content
- [x] 7.10 Test accessibility with keyboard navigation
- [x] 7.11 Test with screen reader (a11y addon)

# Tasks: Add MarkdownRenderer Component

## 1. Component Structure

- [ ] 1.1 Create `components/MarkdownRenderer/` folder structure
- [ ] 1.2 Create `MarkdownRenderer.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [ ] 1.3 Create `MarkdownRenderer.tsx` component implementation
- [ ] 1.4 Create `MarkdownRenderer.module.css` with CSS Modules and CSS custom properties
- [ ] 1.5 Create `index.ts` for public exports

## 2. Markdown Rendering Implementation

- [ ] 2.1 Integrate `react-markdown` library for Markdown parsing and rendering
- [ ] 2.2 Implement error boundary or try-catch for invalid Markdown handling
- [ ] 2.3 Implement fallback rendering when Markdown parsing fails (display raw text or error message)
- [ ] 2.4 Ensure component handles edge cases (empty strings, null, undefined)
- [ ] 2.5 Add support for common Markdown features (headers, lists, links, code blocks, emphasis)
- [ ] 2.6 Enable GitHub Flavored Markdown (GFM) support (tables, task lists, strikethrough, autolinks)
- [ ] 2.7 Enable raw HTML rendering support (br, b, sup, sub, i, strong, em, etc.)
- [ ] 2.8 Research and select third-party HTML sanitizer library (e.g., DOMPurify, sanitize-html)
- [ ] 2.9 Add HTML sanitizer dependency to package.json
- [ ] 2.10 Integrate HTML sanitizer library to prevent malicious script execution
- [ ] 2.11 Configure sanitizer to remove script tags and dangerous attributes
- [ ] 2.12 Configure sanitizer to remove event handlers (onclick, onerror, onload, etc.)
- [ ] 2.13 Configure sanitizer to sanitize dangerous URL schemes (javascript:, data:)
- [ ] 2.14 Configure sanitizer to preserve safe HTML tags and attributes

## 3. Styling

- [ ] 3.1 Define CSS custom properties on `.root` class with `--reltio-markdown-renderer-` prefix
- [ ] 3.2 Style Markdown elements (h1-h6, p, ul, ol, li, code, pre, blockquote, a, strong, em)
- [ ] 3.3 Style GFM elements (table, thead, tbody, tr, th, td, input[type="checkbox"], del)
- [ ] 3.4 Style raw HTML elements (br, b, sup, sub, i, strong, em)
- [ ] 3.5 Ensure all styles use CSS variables with fallback values
- [ ] 3.6 Use `classNames` utility for all className composition
- [ ] 3.7 Ensure responsive design and proper spacing

## 4. Error Handling

- [ ] 4.1 Implement graceful error handling for malformed Markdown
- [ ] 4.2 Display user-friendly error message or fallback content
- [ ] 4.3 Ensure errors don't break the parent component
- [ ] 4.4 Add error state styling

## 5. Storybook Documentation

- [ ] 5.1 Create `MarkdownRenderer.stories.tsx` with comprehensive stories
- [ ] 5.2 Story: Basic Markdown rendering (headers, paragraphs, lists)
- [ ] 5.3 Story: Links and emphasis (bold, italic)
- [ ] 5.4 Story: Code blocks and inline code
- [ ] 5.5 Story: Blockquotes and nested lists
- [ ] 5.6 Story: GFM tables
- [ ] 5.7 Story: GFM task lists (checkboxes)
- [ ] 5.8 Story: GFM strikethrough
- [ ] 5.9 Story: GFM autolinks
- [ ] 5.10 Story: Raw HTML rendering (br, b, sup, sub, etc.)
- [ ] 5.11 Story: Invalid Markdown handling (malformed syntax)
- [ ] 5.12 Story: Empty content handling
- [ ] 5.13 Ensure each story shows ONE variant (per project conventions)
- [ ] 5.14 Add accessibility testing (a11y addon)

## 6. TypeScript and Validation

- [ ] 6.1 Ensure all props are properly typed
- [ ] 6.2 Export `MarkdownRendererProps` type alongside component
- [ ] 6.3 Run `npm run format` and fix formatting issues
- [ ] 6.4 Run `npm run lint` and fix linting errors
- [ ] 6.5 Verify TypeScript strict mode compliance

## 7. Testing

- [ ] 7.1 Verify component renders valid Markdown correctly
- [ ] 7.2 Verify component renders GFM features correctly (tables, task lists, strikethrough, autolinks)
- [ ] 7.3 Verify component renders raw HTML correctly (br, b, sup, sub, etc.)
- [ ] 7.4 Verify HTML sanitization prevents script tag execution
- [ ] 7.5 Verify HTML sanitization removes event handlers
- [ ] 7.6 Verify HTML sanitization sanitizes dangerous URL schemes
- [ ] 7.7 Verify HTML sanitization preserves safe HTML content
- [ ] 7.8 Verify component handles invalid Markdown gracefully
- [ ] 7.9 Verify component handles empty/null/undefined content
- [ ] 7.10 Test accessibility with keyboard navigation
- [ ] 7.11 Test with screen reader (a11y addon)

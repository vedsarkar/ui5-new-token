# Tasks: Add MDXRenderer Component

## 1. Component Structure

- [x] 1.1 Create `components/MDXRenderer/` folder structure
- [x] 1.2 Create `MDXRenderer.types.ts` with TypeScript type definitions (using `type`, not `interface`)
- [x] 1.3 Create `MDXRenderer.tsx` component implementation
- [x] 1.4 Create `MDXRenderer.module.css` with CSS Modules and CSS custom properties
- [x] 1.5 Create `index.ts` for public exports

## 2. MDX Processing Setup

- [x] 2.1 Research MDX processing libraries (@mdx-js/react, etc.)
- [x] 2.2 Add MDX dependency to package.json (e.g., @mdx-js/react)
- [x] 2.3 Implement MDX parsing and rendering logic
- [x] 2.4 Set up MDXProvider with component mapping
- [x] 2.5 Test basic MDX rendering

## 3. Component Whitelist System

- [x] 3.1 Define default component whitelist (design system components)
- [x] 3.2 Implement component mapping logic
- [x] 3.3 Handle unknown/blocked components gracefully
- [x] 3.4 Add support for custom component whitelist via props
- [x] 3.5 Document security model

## 4. Error Handling

- [x] 4.1 Implement error boundary for React component errors
- [x] 4.2 Implement graceful error handling for malformed MDX
- [x] 4.3 Implement fallback rendering (MDX → Markdown → plain text)
- [x] 4.4 Display user-friendly error message or fallback content
- [x] 4.5 Ensure errors don't break the parent component
- [x] 4.6 Add error state styling

## 5. Markdown Features Support

- [x] 5.1 Ensure all Markdown features work (inherited from MarkdownRenderer requirements)
- [x] 5.2 Enable GitHub Flavored Markdown (GFM) support (tables, task lists, strikethrough, autolinks)
- [x] 5.3 Enable raw HTML rendering support (br, b, sup, sub, i, strong, em, etc.)
- [x] 5.4 Research and select third-party HTML sanitizer library (e.g., DOMPurify, sanitize-html)
- [x] 5.5 Add HTML sanitizer dependency to package.json
- [x] 5.6 Integrate HTML sanitizer library to prevent malicious script execution
- [x] 5.7 Configure sanitizer to remove script tags and dangerous attributes
- [x] 5.8 Configure sanitizer to remove event handlers (onclick, onerror, onload, etc.)
- [x] 5.9 Configure sanitizer to sanitize dangerous URL schemes (javascript:, data:)
- [x] 5.10 Configure sanitizer to preserve safe HTML tags and attributes
- [x] 5.11 Implement component prop sanitization to prevent dangerous prop values
- [x] 5.12 Test Markdown features within MDX content
- [x] 5.13 Test GFM features within MDX content
- [x] 5.14 Test raw HTML within MDX content
- [x] 5.15 Test React components within Markdown structures

## 6. Styling

- [x] 6.1 Define CSS custom properties on `.root` class with `--reltio-mdx-renderer-` prefix
- [x] 6.2 Style Markdown elements (h1-h6, p, ul, ol, li, code, pre, blockquote, a, strong, em)
- [x] 6.3 Style GFM elements (table, thead, tbody, tr, th, td, input[type="checkbox"], del)
- [x] 6.4 Style raw HTML elements (br, b, sup, sub, i, strong, em)
- [x] 6.5 Style embedded React components appropriately
- [x] 6.6 Ensure all styles use CSS variables with fallback values
- [x] 6.7 Use `classNames` utility for all className composition
- [x] 6.8 Ensure responsive design and proper spacing

## 7. Storybook Documentation

- [x] 7.1 Create `MDXRenderer.stories.tsx` with comprehensive stories
- [x] 7.2 Story: Basic MDX rendering (Markdown + React components)
- [x] 7.3 Story: Embedded Button component in MDX
- [x] 7.4 Story: Embedded custom components
- [x] 7.5 Story: Complex MDX with multiple components
- [x] 7.6 Story: GFM tables in MDX
- [x] 7.7 Story: GFM task lists in MDX
- [x] 7.8 Story: GFM strikethrough in MDX
- [x] 7.9 Story: GFM autolinks in MDX
- [x] 7.10 Story: Raw HTML rendering in MDX (br, b, sup, sub, etc.)
- [x] 7.11 Story: Invalid MDX handling (malformed syntax)
- [x] 7.12 Story: Invalid React component in MDX
- [x] 7.13 Story: Component whitelist behavior
- [x] 7.14 Story: Empty content handling
- [x] 7.15 Ensure each story shows ONE variant (per project conventions)
- [x] 7.16 Add accessibility testing (a11y addon)

## 8. TypeScript and Validation

- [x] 8.1 Ensure all props are properly typed
- [x] 8.2 Export `MDXRendererProps` type alongside component
- [x] 8.3 Type allowed components configuration
- [x] 8.4 Run `npm run format` and fix formatting issues
- [x] 8.5 Run `npm run lint` and fix linting errors
- [x] 8.6 Verify TypeScript strict mode compliance

## 9. Testing

- [x] 9.1 Verify component renders valid MDX correctly
- [x] 9.2 Verify component renders GFM features correctly (tables, task lists, strikethrough, autolinks)
- [x] 9.3 Verify component renders raw HTML correctly (br, b, sup, sub, etc.)
- [x] 9.4 Verify HTML sanitization prevents script tag execution
- [x] 9.5 Verify HTML sanitization removes event handlers
- [x] 9.6 Verify HTML sanitization sanitizes dangerous URL schemes
- [x] 9.7 Verify HTML sanitization preserves safe HTML content
- [x] 9.8 Verify component prop sanitization prevents dangerous prop values
- [x] 9.9 Verify component handles invalid MDX gracefully
- [x] 9.10 Verify component handles empty/null/undefined content
- [x] 9.11 Test embedded React components render correctly
- [x] 9.12 Test security restrictions (disallowed components)
- [x] 9.13 Test error boundary behavior
- [x] 9.14 Test fallback rendering strategies
- [x] 9.15 Test accessibility with keyboard navigation
- [x] 9.16 Test with screen reader (a11y addon)

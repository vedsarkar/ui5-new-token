# Change: Add MarkdownRenderer Component

## Why

The chat system requires a robust Markdown rendering component that can safely handle user-provided Markdown content, including invalid or malformed Markdown. This component will serve as the foundation for rendering user messages and assistant messages that support Markdown formatting.

## What Changes

- **ADDED** `MarkdownRenderer` component for rendering Markdown content with error handling
- **ADDED** Support for graceful degradation when invalid Markdown is provided
- **ADDED** TypeScript types following project conventions (MarkdownRenderer.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Tag-to-class mapping for all Markdown elements (p, h1-h6, ul, ol, li, code, pre, blockquote, a, etc.) via react-markdown components prop
- **ADDED** Tag-to-component mapping for complex elements (details/summary via MarkdownDetails in createBaseMarkdownComponents)
- **ADDED** ErrorBoundary (from @/components/ErrorBoundary) wrapping ReactMarkdown for render-phase errors; try-catch for sync errors
- **ADDED** Explicit prohibition of global styles (no global CSS, element selectors, or tag-based styling rules)
- **ADDED** Comprehensive Storybook stories demonstrating valid and invalid Markdown scenarios
- **ADDED** Integration with react-markdown library (already in dependencies)

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/MarkdownRenderer/` - new component folder
  - Uses existing `react-markdown` dependency from package.json
  - Requires explicit tag-to-class mapping configuration in react-markdown components prop
  - Tag-to-component mapping for details/summary is in createBaseMarkdownComponents (MarkdownComponents); MarkdownRenderer uses it
  - All styling must be scoped to CSS Modules classes (no global styles allowed)
- Breaking changes: None
- Migration: N/A (new component)
- Styling constraints: All Markdown element styling MUST be implemented via CSS Modules classes assigned through react-markdown's components prop. Global styles, element selectors, and tag-based CSS rules are explicitly forbidden.

# Change: Add MDXRenderer Component

## Why

Assistant messages require support for MDX (Markdown with JSX), which allows embedding React components within Markdown content. This enables rich, interactive content in assistant responses beyond standard Markdown formatting. The component must handle invalid MDX gracefully, similar to MarkdownRenderer, while also managing security concerns around embedded React components.

## What Changes

- **ADDED** `MDXRenderer` component for rendering MDX content with error handling
- **ADDED** Support for React components embedded in Markdown content
- **ADDED** Component whitelist system for security
- **ADDED** Support for graceful degradation when invalid MDX is provided
- **ADDED** TypeScript types following project conventions (MDXRenderer.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating valid and invalid MDX scenarios
- **ADDED** Integration with MDX processing library (to be determined during implementation)

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/MDXRenderer/` - new component folder
  - May require new dependency for MDX processing (e.g., @mdx-js/react)
- Breaking changes: None
- Migration: N/A (new component)

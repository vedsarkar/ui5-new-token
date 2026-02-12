# Change: Add MarkdownDetails Component

## Why

The MarkdownRenderer component needs to render GitHub Flavored Markdown (GFM) `<details>` blocks with enhanced functionality beyond native HTML `<details>` elements. A dedicated MarkdownDetails component will provide:
- Enhanced visual design with icons indicating expand/collapse state
- Consistent styling aligned with the design system
- Better accessibility and keyboard navigation
- Separation of concerns, allowing MarkdownRenderer to focus on Markdown parsing while MarkdownDetails handles collapsible content presentation

## What Changes

- **ADDED** `MarkdownDetails` component for rendering Markdown `<details>` blocks with enhanced UI
- **ADDED** Internal state management for open/closed state
- **ADDED** Summary extraction logic (extracts `<summary>` node from children or uses fallback)
- **ADDED** Icon support: CodeBrackets icon to the left of the summary; ExpandLess/ExpandMore for expand/collapse on the right
- **ADDED** TypeScript types following project conventions (MarkdownDetails.types.ts)
- **ADDED** CSS Modules styling with CSS custom properties
- **ADDED** Comprehensive Storybook stories demonstrating all use cases
- **ADDED** Support for native `<details>` HTML attributes passed through

## Impact

- Affected specs: None (new capability)
- Affected code:
  - `components/MarkdownDetails/` - new component folder
  - `components/MarkdownRenderer/` - will use MarkdownDetails in tag-to-component mapping
- Breaking changes: None
- Migration: N/A (new component)
- Dependencies: Uses existing icon library (CodeBrackets, ExpandLess, ExpandMore)

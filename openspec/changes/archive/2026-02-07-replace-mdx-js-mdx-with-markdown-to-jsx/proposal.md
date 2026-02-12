# Change: Replace @mdx-js/mdx with markdown-to-jsx

## Why

The design system currently uses two markdown-related implementations. Using a single markdown rendering solution reduces dependencies, simplifies maintenance, and ensures consistent behavior across all content.

## What Changes

- **Single markdown solution:** One library is used to render markdown-formatted content. All content is rendered through one implementation path.
- **One unified component:** Only one public component remains for rendering markdown and content with React components. MarkdownRenderer and MDXRenderer are removed or replaced by this single component, which supports all expected tag-to-component mappings (headings, lists, code, links, tables, details/summary via MarkdownDetails, etc.) and rendering with React components (including an optional components prop). The same overrides and styling behavior apply to all content.
- **Dependencies:** Remove @mdx-js/mdx and any dependencies used only by the previous second implementation.

## Impact

- Affected specs: markdown-renderer-component (unified component), mdx-renderer-component (removed; behavior folded into unified component).
- Affected code: components/MDXRenderer (removed or replaced), components/MarkdownRenderer (replaced by or retained as the unified component), components/MarkdownComponents, package.json, and any exports or imports that referenced the removed component(s).

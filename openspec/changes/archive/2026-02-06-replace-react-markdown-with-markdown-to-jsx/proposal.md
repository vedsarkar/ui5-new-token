# Change: Replace react-markdown with markdown-to-jsx

## Why

The design system currently uses `react-markdown` (with remark-gfm, rehype-raw, rehype-sanitize) for the MarkdownRenderer component. Replacing it with `markdown-to-jsx` simplifies the stack: markdown-to-jsx is already a project dependency, provides built-in GFM and tagfilter/sanitization, has zero dependencies, and uses an overrides API that aligns with the existing tag-to-class mapping approach. This reduces bundle size, removes redundant plugins, and keeps a single markdown implementation for plain Markdown rendering.

## What Changes

- **MarkdownRenderer** uses `markdown-to-jsx` (default export or compiler) instead of `react-markdown` to render Markdown content.
- **Tag-to-class mapping** is implemented via markdown-to-jsx `options.overrides` (replacing react-markdown `components` prop). All existing CSS Modules classes and MarkdownDetails usage are preserved.
- **Security** is preserved via markdown-to-jsx built-in tagfilter (default on) and optional `options.sanitizer`; rehype-raw and rehype-sanitize are no longer used for MarkdownRenderer.
- **Shared MarkdownComponents** (`createBaseMarkdownComponents` / tag-to-class helpers) are adapted to produce markdown-to-jsx overrides; types and any MDXRenderer use of the same mapping are updated so both MarkdownRenderer and MDXRenderer remain consistent.
- **Dependencies**: Remove `react-markdown` (and optionally `remark-gfm`, `rehype-raw`, `rehype-sanitize` if only used by MarkdownRenderer). `markdown-to-jsx` remains (already in dependencies).

## Impact

- **Affected specs:** markdown-renderer-component
- **Affected code:** `components/MarkdownRenderer/MarkdownRenderer.tsx`, `components/MarkdownComponents/markdownComponents.tsx`, `components/MarkdownRenderer/MarkdownRenderer.types.ts`; possibly `components/MDXRenderer/MDXRenderer.tsx` if it consumes the same override/component map; `package.json` / `package-lock.json`
- **Behavior:** No intentional change to user-visible behavior; all existing Markdown and GFM scenarios (headers, lists, links, code, tables, task lists, strikethrough, autolinks, raw HTML, details/summary), security (XSS/sanitization), error handling, and styling (CSS Modules, custom properties) SHALL remain as specified.

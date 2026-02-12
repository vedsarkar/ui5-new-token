# Tasks: Replace react-markdown with markdown-to-jsx

## 1. Implementation

- [ ] 1.1 Add or adapt MarkdownComponents to produce markdown-to-jsx `options.overrides` (tag → component or { component, props }) preserving all current tags and CSS Modules classes; keep `details` mapped to MarkdownDetails.
- [ ] 1.2 Implement MarkdownRenderer using markdown-to-jsx (default export or compiler) with overrides, wrapper as needed, and options for tagfilter/sanitizer to meet Security and Sanitization requirements.
- [ ] 1.3 Ensure ErrorBoundary and null/empty content handling unchanged; update any references from "ReactMarkdown" to the new renderer in types or comments.
- [ ] 1.4 Update MarkdownRenderer.types.ts: remove or replace ReactMarkdownProps and react-markdown-specific types; add or reuse types for markdown-to-jsx overrides.
- [ ] 1.5 If MDXRenderer uses the same component map, ensure it receives overrides/components compatible with MDX runtime (no regression).
- [ ] 1.6 Remove `react-markdown` from package.json (dev or dependencies). Remove `remark-gfm`, `rehype-raw`, `rehype-sanitize` only if unused elsewhere (e.g. after confirming MDXRenderer does not depend on them for Markdown path).
- [ ] 1.7 Run `npm run format` and `npm run lint`; fix any issues.

## 2. Verification

- [ ] 2.1 Run MarkdownRenderer Storybook stories; confirm all variants (headers, lists, links, code, blockquotes, GFM tables, task lists, strikethrough, autolinks, raw HTML, details/summary) render correctly.
- [ ] 2.2 Confirm security stories/scenarios: script tags, event handlers, dangerous attributes, link sanitization, and safe HTML preservation.
- [ ] 2.3 Confirm error handling: invalid Markdown, empty/null content, ErrorBoundary fallback.
- [ ] 2.4 Run full test suite and Chromatic/deploy if applicable; fix regressions.

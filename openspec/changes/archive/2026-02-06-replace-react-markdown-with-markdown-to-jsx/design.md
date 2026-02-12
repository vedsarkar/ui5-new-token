# Design: Replace react-markdown with markdown-to-jsx

## Context

MarkdownRenderer currently uses react-markdown with remark-gfm, rehype-raw, and rehype-sanitize. The project already depends on markdown-to-jsx. Both libraries support GFM and custom component/tag mapping; markdown-to-jsx uses `options.overrides` (tag → component or { component, props }) and has built-in tagfilter and a sanitizer option, avoiding the rehype pipeline.

## Goals / Non-Goals

- **Goals:** Use markdown-to-jsx as the single Markdown parser/renderer for MarkdownRenderer; preserve all spec behavior (rendering, security, error handling, styling); remove react-markdown and plugins used only by MarkdownRenderer; keep MDXRenderer behavior unchanged (it may still use the same override/component map for consistency).
- **Non-Goals:** Changing MDX compilation (@mdx-js/mdx remains); changing public MarkdownRenderer or MDXRenderer APIs; adding new Markdown features.

## Decisions

- **Use markdown-to-jsx default export (or compiler) with `options.overrides`** for tag-to-class mapping. Overrides accept `React.ElementType` or `{ component, props }`; map each tag (p, h1–h6, ul, ol, li, code, pre, blockquote, a, strong, em, table, thead, tr, th, td, del, details, etc.) to a component that applies the same CSS Modules classes and MarkdownDetails for `<details>` as today.
- **Rely on markdown-to-jsx tagfilter (default true) and built-in/explicit sanitizer** for XSS protection instead of rehype-sanitize. Use the library’s exported `sanitizer` and/or custom sanitizer option if stricter link/attribute rules are required to match current behavior.
- **Remove react-markdown, and remove remark-gfm / rehype-raw / rehype-sanitize** if they are only used by MarkdownRenderer. If any are still used by MDXRenderer or elsewhere, keep them and only remove react-markdown.
- **Shared mapping:** Adapt `createBaseMarkdownComponents` (or equivalent) to return a structure suitable for markdown-to-jsx overrides. MDXRenderer uses the same design-system component map for MDX; ensure the override type/shape is compatible with both markdown-to-jsx and MDX (e.g. same component functions or a thin adapter).

## Risks / Trade-offs

- **Override prop shape:** markdown-to-jsx does not pass a `node` (mdast/hast) prop; override components receive standard DOM-like props. Any logic that relied on `node` must use the override’s props only. Current code mostly uses `node` to avoid spreading it onto the DOM; overrides can ignore it.
- **Raw HTML and sanitization:** rehype-sanitize allows fine-grained attribute allowlists. markdown-to-jsx tagfilter escapes dangerous tags; sanitizer option can restrict URLs/attributes. Verify safe HTML (br, b, sup, sub, i, strong, em) and link security match existing behavior; add tests if needed.
- **GFM parity:** markdown-to-jsx supports GFM (tables, task lists, strikethrough, autolinks). Confirm details/summary and any edge cases match; implement details via overrides mapping to MarkdownDetails.

## Migration Plan

1. Implement MarkdownRenderer using markdown-to-jsx and new overrides (from adapted MarkdownComponents).
2. Run existing MarkdownRenderer stories and tests; fix any regressions.
3. Remove react-markdown from dependencies; remove rehype/remark plugins used only by MarkdownRenderer.
4. Update types (remove ReactMarkdownProps or repurpose for overrides); ensure no remaining imports of react-markdown.
5. Archive this change after deployment and update spec if needed.

## Open Questions

- None at proposal time. Implementation will confirm whether rehype-sanitize attribute allowlist (e.g. `a: [href, target, rel]`) needs to be replicated via markdown-to-jsx sanitizer option.

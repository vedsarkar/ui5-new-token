# Markdown

```tsx
import { Markdown } from "@reltio/design/components";
```

`Markdown` is a safe Markdown renderer for content authored at runtime — AI assistant replies, user-supplied notes, audit-trail entries. Built on [`markdown-to-jsx`](https://github.com/quantizor/markdown-to-jsx) with sanitization on, GitHub Flavored Markdown enabled, and the entire render tree wrapped in an internal `ErrorBoundary` so a single malformed input cannot crash the surrounding UI.

### Safety

Raw HTML in the input is filtered through the bundled `sanitizer` from `markdown-to-jsx`. Disallowed tags are stripped (`<script>`, `<iframe>`, etc.), inline event handlers are removed. `tagfilter` is enabled to match GitHub's behavior on unsafe tags.

### Element overrides

The bundled `markdownOverrides.ts` defines two layers:

- `baseOverrides` — every standard tag (`h1`, `p`, `code`, `table`, `a`, ...) is mapped to a Reltio-themed element with consistent typography and colors
- `allowedOverrides` — a curated subset of tags that callers can extend without re-implementing the safety policy

To add a custom domain-specific renderer (e.g. an `<entity-link>` tag), extend `markdownOverrides.ts` rather than overriding from the call site — it keeps the safety policy centralized.

### Error fallback

If `markdown-to-jsx` throws (malformed input, unrenderable AST), the inner `ErrorBoundary` falls back to rendering the raw input inside a `<pre>` block. The surrounding UI stays alive, the user sees the unrendered text, and the operator can investigate via the original source.

### Null / undefined input

`children === null | undefined` returns `null` (no DOM output). Pass an empty string if you want the Markdown root element rendered with no content.

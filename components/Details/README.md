# Details

`Details` is a styled wrapper around the native HTML `<details>` element with a chevron toggle, hover state, and consistent typography aligned with the SAP Horizon design system. Drop-in replacement for `<details>` — accepts the same `open` prop and a `<summary>` child for the header.

### Summary slot

The first child element with tag `summary` is hoisted into the styled summary header. Anything else is rendered as collapsible content. If no `summary` child is provided, the header falls back to the literal text `"Details"`.

### Inline code & code blocks

Inline `<code>` is rendered with a subtle background and rounded corners. Block-level code (`<pre><code>...</code></pre>`) keeps its `<pre>`-level styling clean — inline-code styles are scoped to **not** apply when nested inside a `<pre>`. This makes it safe to embed Markdown content (including syntax-highlighted blocks) directly inside `<Details>` without double padding or background bleed.

### Controlled `open`

The `open` prop is treated as the **initial** state on mount and re-applied whenever it changes. Day-to-day toggling is delegated to the browser via the native `<details>` element — clicks on the summary toggle the state, and the component reflects the change via `onToggle`. Pass `open` only when you need to programmatically force-open / force-close from outside.

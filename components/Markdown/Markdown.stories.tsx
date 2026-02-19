import preview from "@/.storybook/preview";
import { Markdown } from "./Markdown";
import cssClasses from "./Markdown.module.css";

const meta = preview.meta({
	component: Markdown,
	parameters: {
		cssClasses,
	},
});

// Basic Markdown rendering
export const Headers = meta.story({
	args: {
		children: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
	},
});

export const Paragraphs = meta.story({
	args: {
		children: `This is a paragraph.

This is another paragraph with multiple sentences. It demonstrates how paragraphs are separated and rendered.

And here's a third paragraph to show spacing.`,
	},
});

export const Lists = meta.story({
	args: {
		children: `Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

Nested lists:
- Level 1
  - Level 2
    - Level 3
  - Level 2 again
- Level 1 again`,
	},
});

export const Links = meta.story({
	args: {
		children: `This is a [link to example.com](https://example.com).

This is an [internal link](/about).

External links open in a new tab with proper security attributes.`,
	},
});

export const Emphasis = meta.story({
	args: {
		children:
			"This is **bold text** and this is *italic text*.\n\nYou can also use __bold__ and _italic_ syntax.\n\n_**Bold**_ and __*italic*__ can be combined.",
	},
});

export const Code = meta.story({
	args: {
		children: `Inline code: \`const x = 5;\`

Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

Another code block:
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\``,
	},
});

export const Blockquotes = meta.story({
	args: {
		children: `> This is a blockquote.
> It can span multiple lines.
> And supports **formatting** inside.

> Nested blockquotes are also supported.
> > This is a nested quote.
> > It works correctly.`,
	},
});

// GFM Features
export const Tables = meta.story({
	args: {
		children: `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |`,
	},
});

export const TableWithMarkdownInCells = meta.story({
	args: {
		children: `| Feature | Description | Status |
|---------|-------------|--------|
| **Bold** | *Italic* text in cell | \`code\` |
| [Link](https://example.com) | ~~Strikethrough~~ | **Bold** and *italic* |
| Inline \`code\` | Multiple **formats** in one cell | Done ✅ |`,
	},
});

export const TaskLists = meta.story({
	args: {
		children: `Task list:
- [ ] Uncompleted task
- [x] Completed task
- [ ] Another uncompleted task
- [x] Another completed task`,
	},
});

export const Strikethrough = meta.story({
	args: {
		children: `This text has ~~strikethrough~~ formatting.

You can combine ~~strikethrough~~ with **bold** and *italic*.`,
	},
});

export const Autolinks = meta.story({
	args: {
		children: `Visit https://example.com for more information.

Email us at user@example.com for support.

Both URLs and emails are automatically converted to links.`,
	},
});

// Raw HTML
export const RawHtml = meta.story({
	args: {
		children: `Text with <br /> line break and <b>bold</b> and <sup>superscript</sup> and <sub>subscript</sub>.

You can also use <i>italic</i> and <strong>strong</strong> and <em>emphasis</em> tags.`,
	},
});

// Horizontal rule (hr / divider)
export const HorizontalRule = meta.story({
	args: {
		children: `Section above.

---

Section in the middle.

***

Section below.`,
	},
});

// Details/Summary (details → Details)
export const DetailsSummary = meta.story({
	args: {
		children:
			'<details>\n<summary>Summary of Tools Used</summary>\n\n- **`get_potential_matches_stats_tool`** — Retrieved tenant-wide potential match statistics\n  - **Inputs**: `min_matches=0`, `tenant_id="mlrianew"`\n</details>',
	},
});

// Complex example
export const ComplexMarkdown = meta.story({
	args: {
		children: `# Complex Markdown Example

This document demonstrates **multiple** Markdown features working together.

## Features

- [x] Headers
- [x] Lists
- [ ] Code blocks
- [x] Links

## Code Example

\`\`\`javascript
function example() {
  return "Hello, World!";
}
\`\`\`

## Table

| Feature | Status |
|---------|--------|
| GFM     | ✅     |
| HTML    | ✅     |

Visit [our website](https://example.com) for more info.

> This is a blockquote with ~~strikethrough~~ text.`,
	},
});

// Error handling
export const InvalidMarkdown = meta.story({
	args: {
		children: `This is valid markdown.

[Unclosed link
**Unclosed bold

The component should handle malformed markdown gracefully.`,
	},
});

export const EmptyContent = meta.story({
	args: {
		children: "",
	},
});

export const CustomOverrides = meta.story({
	args: {
		children: `# Heading with custom override\n\nParagraph text.`,
	},
});

// Button as React component (<Button> in content, not native <button>)
export const ButtonAsReactComponent = meta.story({
	args: {
		children: `Use the design system Button in MDX:

<Button variant="filled">Filled</Button> <Button variant="outlined">Outlined</Button>`,
	},
});

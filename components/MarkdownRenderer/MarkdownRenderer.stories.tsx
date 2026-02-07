import preview from "@/.storybook/preview";
import { Button } from "@/components/Button";
import { MarkdownRenderer } from "./MarkdownRenderer";

const meta = preview.meta({
	component: MarkdownRenderer,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
});

// Basic Markdown rendering
export const Headers = meta.story({
	args: {
		content: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`,
	},
});

export const Paragraphs = meta.story({
	args: {
		content: `This is a paragraph.

This is another paragraph with multiple sentences. It demonstrates how paragraphs are separated and rendered.

And here's a third paragraph to show spacing.`,
	},
});

export const Lists = meta.story({
	args: {
		content: `Unordered list:
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
		content: `This is a [link to example.com](https://example.com).

This is an [internal link](/about).

External links open in a new tab with proper security attributes.`,
	},
});

export const Emphasis = meta.story({
	args: {
		content:
			"This is **bold text** and this is *italic text*.\n\nYou can also use __bold__ and _italic_ syntax.\n\n_**Bold**_ and __*italic*__ can be combined.",
	},
});

export const Code = meta.story({
	args: {
		content: `Inline code: \`const x = 5;\`

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
		content: `> This is a blockquote.
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
		content: `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |`,
	},
});

export const TableWithMarkdownInCells = meta.story({
	args: {
		content: `| Feature | Description | Status |
|---------|-------------|--------|
| **Bold** | *Italic* text in cell | \`code\` |
| [Link](https://example.com) | ~~Strikethrough~~ | **Bold** and *italic* |
| Inline \`code\` | Multiple **formats** in one cell | Done ✅ |`,
	},
});

export const TaskLists = meta.story({
	args: {
		content: `Task list:
- [ ] Uncompleted task
- [x] Completed task
- [ ] Another uncompleted task
- [x] Another completed task`,
	},
});

export const Strikethrough = meta.story({
	args: {
		content: `This text has ~~strikethrough~~ formatting.

You can combine ~~strikethrough~~ with **bold** and *italic*.`,
	},
});

export const Autolinks = meta.story({
	args: {
		content: `Visit https://example.com for more information.

Email us at user@example.com for support.

Both URLs and emails are automatically converted to links.`,
	},
});

// Raw HTML
export const RawHtml = meta.story({
	args: {
		content: `Text with <br /> line break and <b>bold</b> and <sup>superscript</sup> and <sub>subscript</sub>.

You can also use <i>italic</i> and <strong>strong</strong> and <em>emphasis</em> tags.`,
	},
});

// Horizontal rule (hr / divider)
export const HorizontalRule = meta.story({
	args: {
		content: `Section above.

---

Section in the middle.

***

Section below.`,
	},
});

// Details/Summary (details → MarkdownDetails)
export const DetailsSummary = meta.story({
	args: {
		content:
			'<details>\n<summary>Summary of Tools Used</summary>\n\n- **`get_potential_matches_stats_tool`** — Retrieved tenant-wide potential match statistics\n  - **Inputs**: `min_matches=0`, `tenant_id="mlrianew"`\n</details>',
	},
});

// Complex example
export const ComplexMarkdown = meta.story({
	args: {
		content: `# Complex Markdown Example

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
		content: `This is valid markdown.

[Unclosed link
**Unclosed bold

The component should handle malformed markdown gracefully.`,
	},
});

export const EmptyContent = meta.story({
	args: {
		content: "",
	},
});

export const NullContent = meta.story({
	args: {
		content: null,
	},
});

export const UndefinedContent = meta.story({
	args: {
		content: undefined,
	},
});

// Optional components prop (tag/override overrides)
export const CustomOverrides = meta.story({
	args: {
		content: `# Heading with custom override\n\nParagraph text.`,
		components: {
			h1: ({ children, ...props }) => (
				<h1
					{...props}
					style={{ color: "green", borderBottom: "2px solid green" }}
				>
					{children}
				</h1>
			),
		},
	},
});

// Button as React component (<Button> in content, not native <button>)
export const ButtonAsReactComponent = meta.story({
	args: {
		content: `Use the design system Button in MDX:

<Button variant="filled">Filled</Button> <Button variant="outlined">Outlined</Button>`,
		components: {
			Button: ({ children, ...props }) => (
				<Button {...props}>{children}</Button>
			),
		},
	},
});

// Customization
export const CustomClassName = meta.story({
	args: {
		content: `This markdown has a custom className applied.`,
		className: "custom-markdown",
	},
	render: (args) => (
		<>
			<MarkdownRenderer {...args} />
			<style>{`
				.custom-markdown {
					background-color: #f0f0f0;
					padding: 16px;
					border-radius: 4px;
				}
			`}</style>
		</>
	),
});

export const CustomCssVariables = meta.story({
	args: {
		content: `# Custom Styling

This paragraph uses custom **font size**, line height, and text color.

- List item one
- List item two

A [link](https://example.com) and inline \`code\` to show their colors.

> Blockquote with custom border and text color.

| Table | Border |
|-------|--------|
| Cell  | Cell   |`,
		style: {
			"--reltio-markdown-components-font-size": "18px",
			"--reltio-markdown-components-font-weight": "600",
			"--reltio-markdown-components-line-height": "1.6",
			"--reltio-markdown-components-color-text": "#1a1a2e",
			"--reltio-markdown-components-color-link": "#e94560",
			"--reltio-markdown-components-color-code-background": "#f0e6fa",
			"--reltio-markdown-components-color-blockquote-border": "#e94560",
			"--reltio-markdown-components-color-blockquote-text": "#16213e",
			"--reltio-markdown-components-heading-margin": "1em 0 0.5em",
			"--reltio-markdown-components-paragraph-margin-bottom": "1rem",
			"--reltio-markdown-components-blockquote-padding-left": "1.25rem",
			"--reltio-markdown-components-blockquote-border-width": "4px",
			"--reltio-markdown-components-code-padding": "0.2em 0.4em",
			"--reltio-markdown-components-code-border-radius": "6px",
			"--reltio-markdown-components-color-table-cell-background": "lime",
		},
	},
});

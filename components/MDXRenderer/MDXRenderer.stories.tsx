import preview from "@/.storybook/preview";
import { MDXRenderer } from "./MDXRenderer";

const meta = preview.meta({
	component: MDXRenderer,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
});

// Props: content (required for output), components?, className?, style?
// When content is empty string, null, or undefined, the component returns null.
// Fallback: MDX → Markdown (MarkdownRenderer) → plain text.

// Basic MDX (Markdown + design system Button)
export const BasicMdx = meta.story({
	args: {
		content: `# Hello MDX

This is **Markdown** with an embedded component:

<Button>Click me</Button>

More text after the button.`,
	},
});

// Embedded Button in MDX
export const EmbeddedButton = meta.story({
	args: {
		content: `Use the design system Button in MDX:

<Button variant="filled">Filled</Button> <Button variant="outlined">Outlined</Button>`,
	},
});

// Mixed Markdown and components
export const MixedContent = meta.story({
	args: {
		content: `## Features

- [x] Markdown lists
- [x] **Bold** and *italic*
- [x] <Button size="small">Button in list</Button>

Paragraph with <Button>inline button</Button> and more text.`,
	},
});

// GFM tables in MDX (remarkGfm)
export const GfmTables = meta.story({
	args: {
		content: `| Header 1 | Header 2 |
|---------|----------|
| Cell 1  | Cell 2   |
| <Button>Action</Button> | Data |`,
	},
});

// GFM task lists in MDX
export const GfmTaskLists = meta.story({
	args: {
		content: `- [x] Completed task
- [ ] Uncompleted task
- [x] <Button>Task with button</Button>`,
	},
});

// GFM strikethrough in MDX
export const GfmStrikethrough = meta.story({
	args: {
		content: `This has ~~strikethrough~~ and **bold** and <Button>Button</Button>.`,
	},
});

// GFM autolinks in MDX
export const GfmAutolinks = meta.story({
	args: {
		content: `Visit https://example.com and email user@example.com. <Button>Contact</Button>`,
	},
});

// HTML-like tags in MDX (resolved via base markdown components)
export const HtmlLikeTags = meta.story({
	args: {
		content: `Text with <br /> line break and <b>bold</b> and <sup>superscript</sup>. <Button>Button</Button>`,
	},
});

// Invalid MDX (malformed JSX) – falls back to MarkdownRenderer
export const InvalidMdxFallback = meta.story({
	args: {
		content: `This is valid markdown but has unclosed JSX: <Button

Rest is rendered as Markdown.`,
	},
});

// Falsy content: component returns null (renders nothing)
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

// Optional components prop: overrides or extends default whitelist (e.g. Button)
export const CustomComponents = meta.story({
	args: {
		content: `Default Button is allowed: <Button>Default</Button>`,
		components: {
			Button: () => <span style={{ color: "green" }}>[Custom Button]</span>,
		},
	},
});

// Optional className prop
export const CustomClassName = meta.story({
	args: {
		content: `# Styled container\n\n<Button>Button</Button>`,
		className: "custom-mdx",
	},
	render: (args) => (
		<>
			<MDXRenderer {...args} />
			<style>{`
				.custom-mdx {
					background-color: #f0f0f0;
					padding: 16px;
					border-radius: 4px;
				}
			`}</style>
		</>
	),
});

// Optional style prop (CSS variables from MDXRendererProps)
export const CustomCssVariables = meta.story({
	args: {
		content: `# Custom Styling\n\n<Button>Button</Button>`,
		style: {
			"--reltio-mdx-renderer-font-size": "18px",
			"--reltio-mdx-renderer-color-link": "#c00",
		},
	},
});

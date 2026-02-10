import type React from "react";
import preview from "@/.storybook/preview";
import { UserMessage } from "@/components/UserMessage";

const meta = preview.meta({
	component: UserMessage,
	parameters: {
		layout: "centered",
	},
});

export const PlainText = meta.story({
	args: {
		children: "Here is a simple user message with no formatting.",
	},
});

export const Markdown = meta.story({
	args: {
		children: `## Hello

This message uses **Markdown**:

- List item one
- List item two

And a [link](https://example.com).`,
	},
});

export const HeadersAndLists = meta.story({
	args: {
		children: `### Section

- First item
- Second item
- Third item

### Another section

1. Ordered one
2. Ordered two`,
	},
});

export const CodeBlocks = meta.story({
	args: {
		children: `Inline code: \`const x = 5;\`
Block code:
\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\``,
	},
});

export const Links = meta.story({
	args: {
		children: `Check [example.com](https://example.com) and [internal](/about) for more.`,
	},
});

export const InvalidMarkdown = meta.story({
	args: {
		children: "Text with unclosed **bold and [broken link.",
	},
});

export const EmptyContent = meta.story({
	args: {
		children: "",
	},
});

export const WithCustomStyles = meta.story({
	args: {
		children: "User message with custom style overrides.",
		style: {
			backgroundColor: "#0d5c2e",
			color: "#f0fff4",
		} as React.CSSProperties,
	},
});

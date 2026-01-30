import type React from "react";
import preview from "@/.storybook/preview";
import { UserMessage } from "./UserMessage";

const meta = preview.meta({
	component: UserMessage,
	parameters: {
		layout: "centered",
	},
});

export const PlainText = meta.story({
	args: {
		content: "Here is a simple user message with no formatting.",
	},
});

export const Markdown = meta.story({
	args: {
		content: `## Hello

This message uses **Markdown**:

- List item one
- List item two

And a [link](https://example.com).`,
	},
});

export const HeadersAndLists = meta.story({
	args: {
		content: `### Section

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
		content: `Inline code: \`const x = 5;\`

\`\`\`javascript
function greet(name) {
  return "Hello, " + name;
}
\`\`\``,
	},
});

export const Links = meta.story({
	args: {
		content: `Check [example.com](https://example.com) and [internal](/about) for more.`,
	},
});

export const InvalidMarkdown = meta.story({
	args: {
		content: "Text with unclosed **bold and [broken link.",
	},
});

export const EmptyContent = meta.story({
	args: {
		content: "",
	},
});

export const WithMeta = meta.story({
	args: {
		content: "User message with metadata above.",
		meta: "You",
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		content: "Custom styled user message.",
		style: {
			"--reltio-user-message-background": "#e8eaf6",
			"--reltio-user-message-content-color": "#1a237e",
		} as React.CSSProperties,
	},
});

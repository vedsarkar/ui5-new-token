import type React from "react";
import preview from "@/.storybook/preview";
import { AssistantMessage } from "@/components/AssistantMessage";

const meta = preview.meta({
	component: AssistantMessage,
	parameters: {
		layout: "centered",
	},
});

export const PlainText = meta.story({
	args: {
		content: `Here is a simple assistant reply with no formatting.
It spans two or three lines so you can see how longer content is rendered in the message bubble.`,
	},
});

export const HeadingsAndLists = meta.story({
	args: {
		content: `## Hello

This message uses **Markdown**:

- List item one
- List item two

Inline code: \`const x = 42\` and \`npm run dev\`.

Block code:

\`\`\`ts
function greet(name: string) {
  return "Hello, " + name + "!";
}
\`\`\`

And a [link](https://example.com).`,
	},
});

export const WithButtonComponent = meta.story({
	args: {
		content: `Here is content with a button:

<Button variant="outlined">Click me</Button>

And **bold** text.`,
	},
});

export const EmptyContent = meta.story({
	args: {
		content: "",
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		content: "Custom styled assistant message.",
		style: {
			backgroundColor: "#e8eaf6",
			color: "#1a237e",
			padding: "12px 16px",
			borderRadius: "8px",
		} as React.CSSProperties,
	},
});

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
		children: `Here is a simple assistant reply with no formatting.
It spans two or three lines so you can see how longer content is rendered in the message bubble.`,
	},
});

export const HeadingsAndLists = meta.story({
	args: {
		children: `## Hello

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
		children: `Here is content with a button:

<Button variant="outlined">Click me</Button>

And **bold** text.`,
	},
});

export const EmptyContent = meta.story({
	args: {
		children: "",
	},
});

export const WithErrorMessage = meta.story({
	args: {
		children: "This content is hidden when error is shown.",
		errorMessage: "Something went wrong. Please try again.",
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		children: "Custom styled assistant message.",
		style: {
			backgroundColor: "#e8eaf6",
			color: "#1a237e",
			padding: "12px 16px",
			borderRadius: "8px",
		} as React.CSSProperties,
	},
});

import type React from "react";
import preview from "@/.storybook/preview";
import { AssistantMessage } from "./AssistantMessage";

const meta = preview.meta({
	component: AssistantMessage,
	parameters: {
		layout: "centered",
	},
});

export const PlainText = meta.story({
	args: {
		content: "Here is a simple assistant reply with no formatting.",
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

export const MDX = meta.story({
	args: {
		content: `Here is MDX with a button:

<Button>Click me</Button>

And **bold** text.`,
	},
});

export const ErrorState = meta.story({
	args: {
		error: true,
	},
});

export const ErrorStateCustomMessage = meta.story({
	args: {
		error: true,
		errorMessage: "Failed to load assistant response. Please try again.",
	},
});

export const EmptyContent = meta.story({
	args: {
		content: "",
	},
});

export const ContentTypeOverrideMarkdown = meta.story({
	args: {
		content:
			"<Button>Force markdown</Button> so this is rendered as Markdown, not MDX.",
		contentType: "markdown",
	},
});

export const ContentTypeOverrideMdx = meta.story({
	args: {
		content: "Plain text only but we force MDX renderer.",
		contentType: "mdx",
	},
});

export const WithMeta = meta.story({
	args: {
		content: "Response with metadata above.",
		meta: "Assistant",
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		content: "Custom styled assistant message.",
		style: {
			"--reltio-assistant-message-background": "#e8eaf6",
			"--reltio-assistant-message-content-color": "#1a237e",
		} as React.CSSProperties,
	},
});

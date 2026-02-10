import type React from "react";
import preview from "@/.storybook/preview";
import { Chat } from "@/components/Chat";
import type { Message } from "@/components/Chat";

const meta = preview.meta({
	component: Chat,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ minHeight: "420px", minWidth: "800px" }}>
				<Story />
			</div>
		),
	],
});

const singleUserMessage: Message[] = [
	{ role: "user", content: "Hello, I have a question about the API." },
];

export const SingleUserMessage = meta.story({
	args: {
		messages: singleUserMessage,
	},
});

const singleAssistantMessage: Message[] = [
	{
		role: "assistant",
		content: `I'd be happy to help. What would you like to know about the API?

You can ask about authentication, rate limits, endpoints, or any other topic. I'll do my best to provide clear and accurate answers.`,
	},
];

export const SingleAssistantMessage = meta.story({
	args: {
		messages: singleAssistantMessage,
	},
});

const conversation: Message[] = [
	{ role: "user", content: "What is the rate limit for the REST API?" },
	{
		role: "assistant",
		content: `The default rate limit is 100 requests per minute per API key.

You can request a higher limit by contacting support. Enterprise plans often include increased limits based on your use case.`,
	},
	{ role: "user", content: "How do I pass the API key in the request?" },
	{
		role: "assistant",
		content: `Include the API key in the \`Authorization\` header as a Bearer token: \`Authorization: Bearer YOUR_API_KEY\`.

Alternatively, some endpoints support passing the key as a query parameter, but the header method is recommended for security.`,
	},
];

export const Conversation = meta.story({
	args: {
		messages: conversation,
	},
});

const waitingForAssistant: Message[] = [
	{ role: "user", content: "What is the rate limit for the REST API?" },
	{
		role: "assistant",
		content: `The default rate limit is 100 requests per minute per API key.

You can request a higher limit by contacting support. Enterprise plans often include increased limits based on your use case.`,
	},
	{ role: "user", content: "How do I pass the API key in the request?" },
];

export const WaitingForAssistant = meta.story({
	args: {
		messages: waitingForAssistant,
	},
});

export const InitialLoading = meta.story({
	args: {
		messages: [],
		initialLoading: true,
	},
});

const manyMessages: Message[] = Array.from({ length: 100 }, (_, i) =>
	i % 2 === 0
		? { role: "user" as const, content: `User message ${i + 1}` }
		: {
				role: "assistant" as const,
				content: `Assistant reply ${i + 1}.\nThis is longer content so each assistant message spans at least two lines in the chat.`,
			},
);

export const ManyMessages = meta.story({
	args: {
		messages: manyMessages,
	},
});

export const EmptyMessages = meta.story({
	args: {
		messages: [],
	},
});

const withMarkdown: Message[] = [
	{
		role: "user",
		content: "Can you show me a list with **bold** and *italic*?",
	},
	{
		role: "assistant",
		content: `Here is Markdown:

- **Bold** and *italic* text
- [Link](https://example.com)
- \`inline code\`

And a code block:

\`\`\`js
const x = 1;
\`\`\``,
	},
	{
		role: "user",
		content: "Show me a table and something I can expand.",
	},
	{
		role: "assistant",
		content: `Here is a **table**:

| Feature   | Status   | Notes        |
| --------- | -------- | ------------ |
| Markdown  | Supported | Lists, code  |
| Tables    | Supported | GFM style    |
| Details   | Supported | Expandable   |

And a collapsible **details** block:

<details>
<summary>Click to expand: API rate limits</summary>

- Default: 100 requests/minute
- Enterprise: custom limits
- Contact support for increases

</details>`,
	},
];

export const MarkdownContent = meta.story({
	args: {
		messages: withMarkdown,
	},
});

const withMdx: Message[] = [
	{
		role: "user",
		content: "Show me something with a button.",
	},
	{
		role: "assistant",
		content: `Here is MDX with a button:

<Button>Click me</Button>

And **bold** text. You can mix interactive components with Markdown in longer responses like this one.`,
	},
];

export const MDXContent = meta.story({
	args: {
		messages: withMdx,
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		messages: conversation,
		style: {
			"--reltio-chat-height": "500px",
			"--reltio-chat-background": "#f8f9fa",
			"--reltio-chat-message-gap": "16px",
		} as React.CSSProperties,
	},
});

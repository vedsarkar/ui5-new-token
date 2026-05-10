import { faker } from "@faker-js/faker";
import preview from "@/.storybook/preview";
import type { Message } from "@/components/Chat";
import { Chat } from "@/components/Chat";

faker.seed(42);

const meta = preview.meta({
	component: Chat,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story) => (
			<div style={{ height: "100vh" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

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
		thinking: true,
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
		? { role: "user" as const, content: faker.lorem.sentence() }
		: {
				role: "assistant" as const,
				content: faker.lorem.paragraphs({ min: 1, max: 3 }, "\n\n"),
			},
);

const singleMessage: Message[] = [
	{ role: "user" as const, content: faker.lorem.sentence() },
];

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

export const SingleMessage = meta.story({
	args: {
		messages: singleMessage,
		thinking: true,
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

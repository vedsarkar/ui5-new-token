import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { Diagram } from "./Diagram";
import type { DiagramEdge, DiagramNode } from "./Diagram.types";

const workflowNodes: DiagramNode[] = [
	{ id: "start", label: "Start", icon: "▶️" },
	{
		id: "validate",
		label: "Validate Input",
		icon: "🔍",
		content: "- Check required fields\n- Sanitize strings\n- Validate types",
	},
	{
		id: "process",
		label: "Process Data",
		icon: "⚙️",
		content: "Transform and enrich\nthe incoming payload",
	},
	{
		id: "store",
		label: "Store",
		icon: "💾",
		content: "Persist to **PostgreSQL**\ndatabase",
	},
	{
		id: "notify",
		label: "Send Notification",
		icon: "📧",
		content: "Email + push notification",
	},
	{ id: "end", label: "Done", icon: "✅" },
];

const workflowEdges: DiagramEdge[] = [
	{ source: "start", target: "validate" },
	{ source: "validate", target: "process", label: "valid" },
	{ source: "process", target: "store" },
	{ source: "store", target: "notify" },
	{ source: "notify", target: "end" },
];

const erNodes: DiagramNode[] = [
	{
		id: "customer",
		label: "Customer",
		icon: "📋",
		content:
			"- id: `number`\n- name: `string`\n- email: `string`\n- phone: `string`",
	},
	{
		id: "order",
		label: "Order",
		icon: "🛒",
		content:
			"- id: `number`\n- total: `number`\n- status: `string`\n- createdAt: `Date`",
	},
	{
		id: "product",
		label: "Product",
		icon: "📦",
		content:
			"- id: `number`\n- name: `string`\n- price: `number`\n- sku: `string`",
	},
	{
		id: "payment",
		label: "Payment",
		icon: "💳",
		content: "- id: `number`\n- amount: `number`\n- method: `string`",
	},
];

const erEdges: DiagramEdge[] = [
	{ source: "customer", target: "order", label: "places" },
	{ source: "order", target: "product", label: "contains" },
	{ source: "order", target: "payment", label: "paid via" },
];

const simpleNodes: DiagramNode[] = [
	{ id: "a", label: "Decision" },
	{ id: "b", label: "Option A" },
	{ id: "c", label: "Option B" },
	{ id: "d", label: "Result" },
];

const simpleEdges: DiagramEdge[] = [
	{ source: "a", target: "b", label: "yes" },
	{ source: "a", target: "c", label: "no" },
	{ source: "b", target: "d" },
	{ source: "c", target: "d" },
];

const meta = preview.meta({
	title: "Charts/Diagram",
	component: Diagram,
	tags: ["test"],
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
	decorators: [FullscreenDecorator],
	args: {
		nodes: workflowNodes,
		edges: workflowEdges,
	},
});

export default meta;

export const Default = meta.story({
	args: {
		nodes: erNodes,
		edges: erEdges,
	},
});

export const WithMarkdownContent = meta.story({});

export const LeftToRight = meta.story({
	args: {
		layout: "left-to-right",
	},
});

export const LabelOnly = meta.story({
	args: {
		nodes: simpleNodes,
		edges: simpleEdges,
	},
});

export const Empty = meta.story({
	args: {
		nodes: [],
		edges: [],
	},
});

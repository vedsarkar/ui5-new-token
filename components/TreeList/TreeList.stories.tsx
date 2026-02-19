import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { TreeList } from "./TreeList";
import cssClasses from "./TreeList.module.css";
import type { TreeItem } from "./TreeList.types";

// -- Data Fixtures --

const singleRootData: TreeItem[] = [
	{
		id: "root",
		label: "Root",
		children: [
			{ id: "a", label: "Node A" },
			{
				id: "b",
				label: "Node B",
				children: [
					{ id: "b1", label: "Child B1" },
					{
						id: "b2",
						label: "Child B2",
						children: [
							{
								id: "b21",
								label: "Child B21",
								children: [
									{ id: "b211", label: "Child B211" },
									{ id: "b212", label: "Child B212" },
								],
							},
							{ id: "b22", label: "Child B22" },
						],
					},
				],
			},
		],
	},
];

const multiRootData: TreeItem[] = [
	{
		id: "root 1",
		label: "Root 1",
		children: [
			{
				id: "node 1a",
				label: "Node 1A",
				children: [
					{ id: "node 1a1", label: "Node 1A1" },
					{ id: "node 1a2", label: "Node 1A2" },
				],
			},
			{
				id: "node 1b",
				label: "Node 1B",
				children: [{ id: "node 1b1", label: "Node 1B1" }],
			},
			{ id: "node 1c", label: "Node 1C" },
			{
				id: "node 1d",
				label: "Node 1D",
				children: [
					{ id: "node 1d1", label: "Node 1D1" },
					{ id: "node 1d2", label: "Node 1D2" },
				],
			},
		],
	},
	{
		id: "root 2",
		label: "Root 2",
		children: [
			{
				id: "node 2a",
				label: "Node 2A",
				children: [
					{
						id: "node 2a1",
						label: "Node 2A1",
						children: [
							{ id: "node 2a11", label: "Node 2A11" },
							{
								id: "node 2a12",
								label: "Node 2A12",
								children: [
									{ id: "node 2a121", label: "Node 2A121" },
									{ id: "node 2a122", label: "Node 2A122" },
								],
							},
						],
					},
					{ id: "node 2a2", label: "Node 2A2" },
				],
			},
		],
	},
];

const flatData: TreeItem[] = [
	{ id: "item-1", label: "Item 1" },
	{ id: "item-2", label: "Item 2" },
	{ id: "item-3", label: "Item 3" },
	{ id: "item-4", label: "Item 4" },
	{ id: "item-5", label: "Item 5" },
];

const deepData: TreeItem[] = [
	{
		id: "l1",
		label: "Level 1",
		children: [
			{
				id: "l2",
				label: "Level 2",
				children: [
					{
						id: "l3",
						label: "Level 3",
						children: [
							{
								id: "l4",
								label: "Level 4",
								children: [
									{
										id: "l5",
										label: "Level 5",
										children: [
											{
												id: "l6",
												label: "Level 6",
												children: [{ id: "l7", label: "Level 7" }],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
];

const loadingData: TreeItem[] = [
	{
		id: "root",
		label: "Root",
		children: [
			{ id: "loaded", label: "Loaded Node" },
			{
				id: "loading-parent",
				label: "Loading Children...",
				isLoading: true,
				children: [],
			},
		],
	},
];

const longLabelsData: TreeItem[] = [
	{
		id: "root",
		label:
			"This is a very long root node label that might overflow the container",
		children: [
			{
				id: "child-1",
				label:
					"Another extremely long label for a child node to test text wrapping and overflow behavior",
			},
			{
				id: "child-2",
				label: "Short",
			},
		],
	},
];

// -- Custom Label Components --

const BoldLabel = ({ data }: { data: TreeItem }) => (
	<strong>{data.label}</strong>
);

const BadgeLabel = ({ data }: { data: TreeItem }) => (
	<span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
		{data.label}
		{data.children && data.children.length > 0 && (
			<span
				style={{
					background: "#e0e7ff",
					color: "#3730a3",
					borderRadius: 10,
					padding: "0 6px",
					fontSize: 11,
					fontWeight: 600,
				}}
			>
				{data.children.length}
			</span>
		)}
	</span>
);

// -- Meta --

const meta = preview.meta({
	component: TreeList,
	parameters: {
		cssClasses,
	},
	args: {
		data: singleRootData,
		onExpand: fn(),
	},
	argTypes: {
		LabelComponent: {
			control: { type: "select" },
			options: ["default", "bold", "badge"],
			mapping: {
				default: undefined,
				bold: BoldLabel,
				badge: BadgeLabel,
			},
		},
	},
});

// -- Data Variants --

export const Default = meta.story({});

export const MultipleRoots = meta.story({
	args: {
		data: multiRootData,
	},
});

export const SingleNode = meta.story({
	args: {
		data: [{ id: "only", label: "Only Node" }],
	},
});

export const FlatList = meta.story({
	args: {
		data: flatData,
	},
});

export const DeepNesting = meta.story({
	args: {
		data: deepData,
		expandedKeys: ["l1", "l2", "l3", "l4", "l5", "l6"],
	},
});

// -- Controlled Expand States --

export const AllCollapsed = meta.story({
	args: {
		expandedKeys: [],
	},
});

export const AllExpanded = meta.story({
	args: {
		expandedKeys: ["root", "b", "b2", "b21"],
	},
});

export const PartiallyExpanded = meta.story({
	args: {
		expandedKeys: ["root"],
	},
});

// -- Custom Label --

export const WithBoldLabel = meta.story({
	args: {
		LabelComponent: "bold" as never,
	},
});

export const WithBadgeLabel = meta.story({
	args: {
		LabelComponent: "badge" as never,
	},
});

// -- Edge Cases --

export const WithLoadingNode = meta.story({
	args: {
		data: loadingData,
		expandedKeys: ["root"],
	},
});

export const LongLabels = meta.story({
	args: {
		data: longLabelsData,
		expandedKeys: ["root"],
	},
});

export const EmptyData = meta.story({
	args: {
		data: [],
	},
});

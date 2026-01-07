import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { TreeList } from "./TreeList";
import type { TreeItem, TreeKey } from "./TreeList.types";

const componentDescription =
	"TreeList renders hierarchical data with expand/collapse controls, optional custom labels, and controlled expansion via onExpand.";

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

const meta: Meta<typeof TreeList> = {
	component: TreeList,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: componentDescription,
			},
		},
	},
	// argTypes: {
	// 	data: {
	// 		description:
	// 			"Array of top-level tree nodes. Provide stable TreeKey ids and nested children to form the hierarchy `type TreeItem = {id: TreeKey; label: string; children?: TreeItem[]}` `type TreeKey = string | number`",
	// 		control: { type: "object" },
	// 		table: {
	// 			type: {
	// 				summary: "TreeItem[]",
	// 			},
	// 		},
	// 	},
	// 	LabelComponent: {
	// 		description:
	// 			"React component to render node labels. Receives `{ data: TreeItem }` and should return ReactNode. Use for badges, icons, or metadata.",
	// 		control: false,
	// 		table: {
	// 			type: {
	// 				summary: "React.ComponentType<{ data: TreeItem }>",
	// 			},
	// 		},
	// 	},
	// 	expandedKeys: {
	// 		description:
	// 			"List of expanded node ids in controlled mode. Omit to allow uncontrolled expansion.",
	// 		table: {
	// 			type: {
	// 				summary: "TreeKey[]",
	// 			},
	// 		},
	// 		control: { type: "object" },
	// 	},
	// 	onExpand: {
	// 		description:
	// 			"Called when a node expands or collapses. Provides the toggled item and the resulting expanded keys list.",
	// 		action: "expand",
	// 		table: {
	// 			type: {
	// 				summary: "(change: TreeExpandChange) => void",
	// 			},
	// 		},
	// 	},
	// 	style: {
	// 		description:
	// 			"Inline styles including CSS variables to theme TreeList (e.g. `--reltio-tree-list-background`).",
	// 		control: { type: "object" },
	// 		table: { type: { summary: "TreeListCssVariables" } },
	// 	}
	// },
	args: {
		data: singleRootData,
	},
};

export default meta;

type Story = StoryObj<typeof TreeList>;
type CustomLabelArgs = ComponentProps<typeof TreeList> & {
	labelVariant: RenderLabelVariant;
};

export const Default: Story = {
	render: (args) => <TreeList {...args} />,
};

export const MultipleRoots: Story = {
	args: {
		data: multiRootData,
	},
	render: (args) => <TreeList {...args} />,
};

type RenderLabelVariant =
	| "default"
	| "tag"
	| "info"
	| "tag + info"
	| "info + tag";

export const CustomLabel: StoryObj<CustomLabelArgs> = {
	argTypes: {
		labelVariant: {
			control: { type: "inline-radio" },
			options: ["default", "tag", "info", "tag + info", "info + tag"],
		},
	},
	args: {
		data: singleRootData,
		labelVariant: "tag + info",
	},
	render: (rawArgs) => {
		const { labelVariant, ...treeListArgs } = rawArgs;

		const LabelMap: Record<
			RenderLabelVariant,
			React.ComponentType<{ data: TreeItem }>
		> = {
			default: ({ data }) => <span>{data.label}</span>,

			tag: ({ data }) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span
						style={{
							padding: "2px 6px",
							borderRadius: 12,
							background: "#d9e8f8",
							color: "#1f2937",
							fontSize: 12,
						}}
					>
						tag
					</span>
					<span>{data.label}</span>
				</span>
			),

			info: ({ data }) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span>{data.label}</span>
					<span
						style={{
							padding: "2px 8px",
							borderRadius: "100%",
							background: "#0000001a",
							fontSize: 10,
						}}
					>
						i
					</span>
				</span>
			),

			"tag + info": ({ data }) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span
						style={{
							padding: "2px 6px",
							borderRadius: 12,
							background: "#d9e8f8",
							color: "#1f2937",
							fontSize: 12,
						}}
					>
						tag
					</span>
					<span>{data.label}</span>
					<span
						style={{
							padding: "2px 8px",
							borderRadius: "100%",
							background: "#0000001a",
							fontSize: 10,
						}}
					>
						i
					</span>
				</span>
			),

			"info + tag": ({ data }) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span>{data.label}</span>
					<span
						style={{
							padding: "2px 8px",
							borderRadius: "100%",
							background: "#0000001a",
							fontSize: 10,
						}}
					>
						i
					</span>
					<span
						style={{
							padding: "2px 6px",
							borderRadius: 12,
							background: "#d9e8f8",
							color: "#1f2937",
							fontSize: 12,
						}}
					>
						tag
					</span>
				</span>
			),
		};

		const Label = LabelMap[labelVariant] ?? LabelMap.default;

		return <TreeList {...treeListArgs} LabelComponent={Label} />;
	},
};

export const WithCustomCssVariables: Story = {
	argTypes: {
		style: { control: { type: "object" } },
	},
	args: {
		data: singleRootData,
		style: {
			"--reltio-tree-list-background": "#f8fafc",
			"--reltio-tree-list-line-color": "rgba(15, 23, 42, 0.16)",
			"--reltio-tree-list-text-color": "#0f172a",
			"--reltio-tree-list-font-size": "12px",
			"--reltio-tree-list-toggle-color": "#0f172a",
			"--reltio-tree-list-toggle-size": "26px",
			"--reltio-tree-list-indent-size": "16px",
			"--reltio-tree-list-line-height": "1.5",
			"--reltio-tree-list-font-family": "monospace",
			"--reltio-tree-list-border-radius": "6px",
			"--reltio-tree-list-row-padding-block": "12px",
			"--reltio-tree-list-row-padding-inline": "12px",
		},
	},
	render: (args) => <TreeList {...args} />,
};

export const ControlledExpanded: Story = {
	argTypes: {
		expandedKeys: { control: { type: "object" } },
		onExpand: { action: "expand" },
	},
	args: {
		data: multiRootData,
		expandedKeys: ["root 1", "node 1a", "root 2", "node 2a"],
		onExpand: (keys) => {
			const expandedKeysElement = document.getElementById("expanded-keys");
			if (expandedKeysElement) {
				expandedKeysElement.innerHTML = JSON.stringify(keys);
			}
		},
	},
	render: (args) => {
		const [expanded, setExpanded] = useState<TreeKey[]>(
			(args.expandedKeys as TreeKey[]) ?? [],
		);

		useEffect(() => {
			setExpanded((args.expandedKeys as TreeKey[]) ?? []);
		}, [args.expandedKeys]);

		const handleExpand = (keys: TreeKey[]) => {
			setExpanded(keys);
			args.onExpand?.(keys);
		};

		return (
			<>
				<div
					style={{
						fontFamily: "monospace",
						background: "#f7f7f7",
						padding: "6px 10px",
						borderRadius: 6,
						marginBottom: 12,
						fontSize: 12,
						width: 400,
					}}
				>
					<strong>onExpand:</strong>
					<div id="expanded-keys"></div>
				</div>
				<div
					style={{
						width: "100%",
						height: 300,
						overflow: "auto",
						border: "1px solid #e0e0e0",
						borderRadius: 6,
					}}
				>
					<TreeList {...args} expandedKeys={expanded} onExpand={handleExpand} />
				</div>
			</>
		);
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, JSX } from "react";
import { useEffect, useState } from "react";
import { TreeList } from "./TreeList";
import type { TreeItem, TreeKey } from "./TreeList.types";

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
		layout: "centered",
	},
	argTypes: {
		data: { control: { type: "object" } },
		onItemClick: { action: "itemClick" },
	},
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
	render: (args) => (
		<div style={{ width: 400, height: 300 }}>
			<TreeList {...args} />
		</div>
	),
};

export const MultipleRoots: Story = {
	args: {
		data: multiRootData,
	},
	render: (args) => (
		<div style={{ width: 400, height: 300 }}>
			<TreeList {...args} />
		</div>
	),
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
		renderLabel: { control: false },
	},
	args: {
		data: singleRootData,
		labelVariant: "tag + info",
	},
	render: (rawArgs) => {
		const { labelVariant, ...treeListArgs } = rawArgs;

		const renderLabelMap: Record<
			RenderLabelVariant,
			(item: TreeItem) => JSX.Element
		> = {
			default: (item) => <span>{item.label}</span>,

			tag: (item) => (
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
					<span>{item.label}</span>
				</span>
			),

			info: (item) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span>{item.label}</span>
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

			"tag + info": (item) => (
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
					<span>{item.label}</span>
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

			"info + tag": (item) => (
				<span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
					<span>{item.label}</span>
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

		const renderLabel = renderLabelMap[labelVariant] ?? renderLabelMap.default;

		return (
			<div style={{ width: 400, height: 320 }}>
				<TreeList {...treeListArgs} renderLabel={renderLabel} />
			</div>
		);
	},
};

export const ControlledExpanded: Story = {
	argTypes: {
		expandedKeys: { control: { type: "object" } },
		onExpandedKeysChange: { action: "expandedKeysChange" },
	},
	args: {
		data: multiRootData,
		expandedKeys: ["root 1", "node 1a", "root 2", "node 2a"],
		onExpandedKeysChange: (keys) => {
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

		const handleExpandedKeysChange = (keys: TreeKey[]) => {
			setExpanded(keys);
			args.onExpandedKeysChange?.(keys);
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
					}}
				>
					<strong>onExpandedKeysChange:</strong>
					<div id="expanded-keys"></div>
				</div>
				<div style={{ width: 400, height: 320 }}>
					<TreeList
						{...args}
						expandedKeys={expanded}
						onExpandedKeysChange={handleExpandedKeysChange}
					/>
				</div>
			</>
		);
	},
};

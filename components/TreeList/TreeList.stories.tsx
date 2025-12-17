import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { TreeList } from "./TreeList";
import type { TreeItem, TreeKey } from "./TreeList.types";

const componentDescription = `

TreeList renders hierarchical data with expand/collapse behavior and customizable node labels.

### Data structure
- Accepts an array of top-level \`TreeItem[]\` nodes.
- Each \`TreeItem\` has \`id: TreeKey\`, \`label: string\`, and optional \`children\`.

\`\`\`tsx
const data: TreeItem[] = [
  { id: "root", label: "Root", children: [{ id: "child", label: "Child" }] },
];

<TreeList data={data} onItemClick={(item) => console.log(item.id)} />;
\`\`\`

### Controlled vs uncontrolled expanded state
- Uncontrolled: omit \`expandedKeys\` and \`onExpandedKeysChange\`; TreeList manages expansion internally.
- In uncontrolled mode, TreeList expands all top-level nodes by default.
- Controlled: pass both props and store expanded keys externally (state, store, URL).

\`\`\`tsx
const [expanded, setExpanded] = useState<TreeKey[]>(["root"]);

<TreeList
  data={data}
  expandedKeys={expanded}
  onExpandedKeysChange={setExpanded}
/>;
\`\`\`

### Props

#### data
- Array of top-level tree nodes. Children create nested levels.
- Requires stable \`TreeKey\` values for correct expansion control and actions.
- Use when you have a prepared hierarchy to render.

\`\`\`tsx
<TreeList data={data} />
\`\`\`

#### onItemClick
- Callback fired when a node is clicked; receives \`TreeItem\`.
- Use for navigation, loading details, or triggering actions per node.
- Pairs well with controlled expansion if clicks should toggle \`expandedKeys\`.

\`\`\`tsx
<TreeList data={data} onItemClick={(item) => openNode(item.id)} />
\`\`\`

#### LabelComponent
- React component that renders the node label; receives \`{ data: TreeItem }\`.
- Use for badges, icons, statuses, or extra metadata next to the label.
- Affects visuals only; does not change the data structure; does not affect expand/collapse behavior.

\`\`\`tsx
const Label = ({ data }: { data: TreeItem }) => (
  <span style={{ display: "inline-flex", gap: 4 }}>
    <span>{data.label}</span>
    <span style={{ fontSize: 12, color: "#6b7280" }}>({data.id})</span>
  </span>
);

<TreeList data={data} LabelComponent={Label} />
\`\`\`

#### expandedKeys
- List of expanded node keys in controlled mode.
- Use to sync expansion with external state, URL, or analytics.
- Works together with \`onExpandedKeysChange\`.

\`\`\`tsx
<TreeList data={data} expandedKeys={expanded} onExpandedKeysChange={setExpanded} />
\`\`\`

#### onExpandedKeysChange
- Callback fired when the expanded keys change.
- Required in controlled mode to update \`expandedKeys\`.
- Not needed in uncontrolled mode.

\`\`\`tsx
<TreeList
  data={data}
  expandedKeys={expanded}
  onExpandedKeysChange={(keys) => {
    setExpanded(keys);
    track("tree_expanded_keys", keys);
  }}
/>
\`\`\`
### Visual structure
TreeList draws vertical and horizontal connector lines between nodes,
providing a visual hierarchy similar to classic file explorers.
These guidelines are generated automatically based on tree depth and parent-child relationships.
`;

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
		docs: {
			description: {
				component: componentDescription,
			},
		},
	},
	argTypes: {
		data: {
			description:
				"Array of top-level tree nodes. Provide stable TreeKey ids and nested children to form the hierarchy `type TreeItem = {id: TreeKey; label: string; children?: TreeItem[]}` `type TreeKey = string | number`",
			control: { type: "object" },
			table: {
				type: {
					summary: "TreeItem[]",
				},
			},
		},
		onItemClick: {
			description:
				"Called when a node is clicked. Use for navigation, loading details, or triggering actions.",
			action: "itemClick",
			table: {
				type: {
					summary: "(item: TreeItem) => void",
				},
			},
		},
		LabelComponent: {
			description:
				"React component to render node labels. Receives `{ data: TreeItem }` and should return ReactNode. Use for badges, icons, or metadata.",
			control: false,
			table: {
				type: {
					summary: "React.ComponentType<{ data: TreeItem }>",
				},
			},
		},
		expandedKeys: {
			description:
				"List of expanded node keys in controlled mode. Omit to let TreeList manage expansion internally. `type TreeKey = string | number`",
			table: {
				type: {
					summary: "TreeKey[]",
				},
			},
		},
		onExpandedKeysChange: {
			description:
				"Callback fired when expanded node keys change. Required when using controlled expansion.",
			action: "expandedKeysChange",
			table: {
				type: {
					summary: "(keys: TreeKey[]) => void",
				},
			},
		},
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

		return (
			<div style={{ width: 400, height: 320 }}>
				<TreeList {...treeListArgs} LabelComponent={Label} />
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
						width: 400,
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

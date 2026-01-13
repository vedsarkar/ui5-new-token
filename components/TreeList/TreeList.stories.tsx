import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, CSSProperties } from "react";
import { useEffect, useState } from "react";
import { TreeList } from "./TreeList";
import type { TreeItem, TreeKey } from "./TreeList.types";

const componentDescription =
	"TreeList renders hierarchical data with expand/collapse controls, optional custom labels, and controlled expansion via onExpand.";

const cssVariables = [
	{
		name: "--reltio-tree-list-font-family",
		description: "Font family for all rows.",
		defaultValue: "inherit (fallback system-ui, sans-serif)",
	},
	{
		name: "--reltio-tree-list-font-size",
		description: "Base font size.",
		defaultValue: "inherit (fallback 14px)",
	},
	{
		name: "--reltio-tree-list-text-color",
		description: "Text color for labels.",
		defaultValue: "inherit (fallback #1a1a1a)",
	},
	{
		name: "--reltio-tree-list-background",
		description: "Background of the list container.",
		defaultValue: "inherit (fallback transparent)",
	},
	{
		name: "--reltio-tree-list-border-radius",
		description: "Border radius of the container.",
		defaultValue: "0",
	},
	{
		name: "--reltio-tree-list-indent-size",
		description: "Indent per depth level.",
		defaultValue: "16px",
	},
	{
		name: "--reltio-tree-list-toggle-size",
		description: "Hit area size of the toggle icon.",
		defaultValue: "26px",
	},
	{
		name: "--reltio-tree-list-toggle-color",
		description: "Color of the toggle caret.",
		defaultValue: "#5f6368",
	},
	{
		name: "--reltio-tree-list-line-color",
		description: "Guideline color connecting nodes.",
		defaultValue: "rgba(0, 0, 0, 0.08)",
	},
	{
		name: "--reltio-tree-list-row-padding-block",
		description: "Vertical padding for each row.",
		defaultValue: "2px",
	},
	{
		name: "--reltio-tree-list-row-padding-inline",
		description: "Horizontal padding for each row.",
		defaultValue: "4px",
	},
	{
		name: "--reltio-tree-list-line-height",
		description: "Line height for row content.",
		defaultValue: "inherit",
	},
];

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

const loadingData: TreeItem[] = [
	{
		id: "async-root",
		label: "Async root",
		children: [
			{
				id: "loading-branch",
				label: "Branch fetching children",
				children: [],
				isLoading: true,
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
	args: {
		data: singleRootData,
	},
};

export default meta;

type Story = StoryObj<typeof TreeList>;
type CustomLabelArgs = ComponentProps<typeof TreeList> & {
	labelVariant: RenderLabelVariant;
};
type WithCustomArgs = ComponentProps<typeof TreeList> & {
	style: CSSProperties;
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

export const WithCustomCssVariables: StoryObj<WithCustomArgs> = {
	argTypes: {
		style: {
			control: "object",
			description: "CSS variables applied to the parent wrapper",
		},
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
		} as CSSProperties,
	},
	render: ({ style, ...treeArgs }) => {
		return (
			<div style={{ display: "grid", gap: 16 }}>
				<div
					style={{
						background: "#0f172a",
						color: "#f8fafc",
						padding: "10px 12px",
						borderRadius: 8,
						fontSize: 12,
						display: "grid",
						gap: 6,
					}}
				>
					<div style={{ fontWeight: 600 }}>CSS variables</div>
					<div style={{ color: "#e2e8f0" }}>
						Override variables on any parent element (for example a theme
						wrapper). Below is the full list of supported variables with
						defaults.
					</div>
					<ul style={{ margin: 0, paddingLeft: 16, display: "grid", gap: 6 }}>
						{cssVariables.map((variable) => (
							<li key={variable.name} style={{ lineHeight: 1.4 }}>
								<code style={{ color: "#cbd5f5" }}>{variable.name}</code>
								<span style={{ marginLeft: 6, color: "#cbd5e1" }}>
									{variable.description}
								</span>
								<span style={{ marginLeft: 6, color: "#94a3b8" }}>
									default: <code>{variable.defaultValue}</code>
								</span>
							</li>
						))}
					</ul>
				</div>

				<div
					style={{
						width: "80%",
						height: 320,
						overflow: "auto",
						border: "2px dashed #94a3b8",
						borderRadius: 10,
						padding: 16,
						background: "#f8fafc",
						display: "flex",
						flexDirection: "column",
						gap: 12,
					}}
				>
					<div style={{ color: "#475569", fontSize: 13 }}>
						Parent wrapper (variables apply here)
					</div>
					<div style={style}>
						<TreeList {...treeArgs} />
					</div>
				</div>
			</div>
		);
	},
};

export const ControlledExpanded: Story = {
	argTypes: {
		expandedKeys: { control: { type: "object" } },
		onExpand: { action: "expand" },
	},
	args: {
		data: multiRootData,
		expandedKeys: ["root 1", "node 1a", "root 2", "node 2a"],
		onExpand: (keys, node) => {
			const expandedKeysElement = document.getElementById("expanded-keys");
			if (expandedKeysElement) {
				expandedKeysElement.innerHTML = JSON.stringify(keys);
			}
			const toggledNodeElement = document.getElementById("toggled-node");
			if (toggledNodeElement) {
				toggledNodeElement.innerHTML = node ? JSON.stringify(node) : "";
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

		const handleExpand = (keys: TreeKey[], node: TreeItem) => {
			setExpanded(keys);
			args.onExpand?.(keys, node);
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
						width: 480,
						display: "grid",
						gap: 6,
					}}
				>
					<div>
						<span>
							<strong>Expanded keys:</strong>{" "}
						</span>{" "}
						<span id="expanded-keys"></span>
					</div>
					<div>
						<span>
							<strong>Toggled node:</strong>{" "}
						</span>{" "}
						<span id="toggled-node"></span>
					</div>
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

export const LoadingState: Story = {
	args: {
		data: loadingData,
	},
	render: (args) => {
		const clearLoading = (items: TreeItem[]): TreeItem[] =>
			items.map((item) => ({
				...item,
				isLoading: false,
				children: item.children ? clearLoading(item.children) : item.children,
			}));

		const [data, setData] = useState<TreeItem[]>(() => clearLoading(args.data));
		const [isFetching, setIsFetching] = useState(false);

		const LoadingLabel = ({ data: node }: { data: TreeItem }) => (
			<span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
				<span>{node.label}</span>
				{node.isLoading ? (
					<span
						style={{
							fontSize: 12,
							color: "#0f172a",
							background: "#e2e8f0",
							borderRadius: 10,
							padding: "2px 8px",
						}}
					>
						Loading...
					</span>
				) : null}
			</span>
		);

		const markLoading = (items: TreeItem[], targetId: TreeKey): TreeItem[] =>
			items.map((item) => {
				if (item.id === targetId) {
					if (item.children && item.children.length > 0) {
						return item;
					}
					return {
						...item,
						isLoading: true,
					};
				}
				return {
					...item,
					children: item.children
						? markLoading(item.children, targetId)
						: item.children,
				};
			});

		const injectChildren = (items: TreeItem[], targetId: TreeKey): TreeItem[] =>
			items.map((item) => {
				if (item.id === targetId) {
					return {
						...item,
						isLoading: false,
						children: [
							{ id: `${item.id}-1`, label: "Loaded child 1" },
							{ id: `${item.id}-2`, label: "Loaded child 2" },
						],
					};
				}
				return {
					...item,
					children: item.children
						? injectChildren(item.children, targetId)
						: item.children,
				};
			});

		const handleExpand = (_keys: TreeKey[], node: TreeItem) => {
			if (isFetching || (node.children && node.children.length > 0)) {
				return;
			}
			setData((prev) => markLoading(prev, node.id));
			setIsFetching(true);
			setTimeout(() => {
				setData((prev) => injectChildren(prev, node.id));
				setIsFetching(false);
			}, 800);
		};

		return (
			<TreeList
				{...args}
				data={data}
				onExpand={handleExpand}
				LabelComponent={LoadingLabel}
			/>
		);
	},
};

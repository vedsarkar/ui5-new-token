import { Icon } from "@ui5/webcomponents-react/Icon";
import { useState } from "react";
import { fn } from "storybook/test";
import documentIcon from "@/icons/sap/document";
import folderIcon from "@/icons/sap/folder";
import preview from "../../.storybook/preview";
import { FileTree } from "./FileTree";
import type { FileTreeNode } from "./FileTree.types";

const meta = preview.meta({
	component: FileTree,
	parameters: {
		layout: "centered",
	},
	args: {
		onSelect: fn(),
		onExpandedChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "282px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

const items: FileTreeNode[] = [
	{
		id: "src",
		name: "src",
		children: [
			{
				id: "components",
				name: "components",
				children: [
					{ id: "chat", name: "Chat.tsx" },
					{ id: "details", name: "Details.tsx" },
				],
			},
			{
				id: "utils",
				name: "utils",
				children: [{ id: "classnames", name: "classNames.ts" }],
			},
			{ id: "index", name: "index.ts" },
		],
	},
	{
		id: "public",
		name: "public",
		children: [{ id: "variables", name: "variables.css" }],
	},
	{ id: "readme", name: "README.md" },
];

/** Folders get a folder glyph, leaves a document one — the component ships no icons of its own. */
const withFileIcons = (nodes: FileTreeNode[]): FileTreeNode[] =>
	nodes.map((node) => ({
		...node,
		icon: <Icon name={node.children ? folderIcon : documentIcon} />,
		children: node.children && withFileIcons(node.children),
	}));

export const Default = meta.story({
	args: {
		items,
		defaultExpandedIds: ["src", "components"],
	},
});

export const Selected = meta.story({
	args: {
		items,
		defaultExpandedIds: ["src", "components"],
		defaultSelectedId: "details",
	},
});

/** Selecting a row deep in the tree traces its ancestry back to the root. */
export const SelectedDeepBranch = meta.story({
	args: {
		items,
		defaultExpandedIds: ["src", "components", "utils"],
		defaultSelectedId: "classnames",
	},
});

export const Collapsed = meta.story({
	args: {
		items,
	},
});

export const WithIcons = meta.story({
	args: {
		items: withFileIcons(items),
		defaultExpandedIds: ["src", "components"],
		defaultSelectedId: "chat",
	},
});

/** Selection and expansion driven from outside, as a router or a store would. */
export const Controlled = meta.story({
	args: {
		items,
	},
	render: (args) => {
		const [selectedId, setSelectedId] = useState("index");
		const [expandedIds, setExpandedIds] = useState(["src"]);
		return (
			<FileTree
				{...args}
				expandedIds={expandedIds}
				onExpandedChange={setExpandedIds}
				onSelect={(node) => setSelectedId(node.id)}
				selectedId={selectedId}
			/>
		);
	},
});

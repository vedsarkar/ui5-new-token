import { useState } from "react";
import { fn } from "storybook/test";
import { Tree, TreeItem } from "@/components";
import documentIcon from "@/icons/sap/document";
import folderIcon from "@/icons/sap/folder";
import preview from "../../.storybook/preview";
import type { TreeProps } from "./Tree.types";

const meta = preview.meta({
	component: Tree,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onItemClick: fn(),
		onItemToggle: fn(),
		onSelectionChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	render: (args) => (
		<Tree {...args}>
			<TreeItem content="Organizations" icon={folderIcon} expanded>
				<TreeItem content="Acme Corp" icon={documentIcon} />
				<TreeItem content="Globex" icon={documentIcon} />
			</TreeItem>
			<TreeItem content="Individuals" icon={folderIcon}>
				<TreeItem content="Ada Lovelace" icon={documentIcon} />
				<TreeItem content="Alan Turing" icon={documentIcon} />
			</TreeItem>
		</Tree>
	),
});

export const SingleSelect = meta.story({
	args: {
		selectionMode: "Single",
	},
	render: (args) => (
		<Tree {...args}>
			<TreeItem content="Organizations" icon={folderIcon} expanded>
				<TreeItem content="Acme Corp" icon={documentIcon} selected />
				<TreeItem content="Globex" icon={documentIcon} />
			</TreeItem>
			<TreeItem content="Individuals" icon={folderIcon} />
		</Tree>
	),
});

export const MultiSelect = meta.story({
	args: {
		selectionMode: "Multiple",
	},
	render: (args) => (
		<Tree {...args}>
			<TreeItem
				content="Organizations"
				icon={folderIcon}
				expanded
				indeterminate
			>
				<TreeItem content="Acme Corp" icon={documentIcon} selected />
				<TreeItem content="Globex" icon={documentIcon} />
			</TreeItem>
			<TreeItem content="Individuals" icon={folderIcon} selected />
		</Tree>
	),
});

export const WithHeaderAndFooter = meta.story({
	args: {
		headerText: "Data domains",
		footerText: "4 records",
	},
	render: (args) => (
		<Tree {...args}>
			<TreeItem content="Organizations" icon={folderIcon} expanded>
				<TreeItem content="Acme Corp" icon={documentIcon} />
				<TreeItem content="Globex" icon={documentIcon} />
			</TreeItem>
			<TreeItem content="Individuals" icon={folderIcon}>
				<TreeItem content="Ada Lovelace" icon={documentIcon} />
			</TreeItem>
		</Tree>
	),
});

// Lazy loading via the `TreeItem` `loading` prop: expanding a `hasChildren` node
// fires a cancelable `onItemToggle`, where we `preventDefault()` to drive
// expansion ourselves and flip `loading` on that node while a simulated request
// runs. `loading` renders skeleton placeholder rows scoped to the expanded node;
// once data arrives we swap in the real children. Each node loads independently.
export const LazyLoading = meta.story({
	render: ({ onItemToggle, ...args }) => {
		const nodes = [
			{
				text: "Organizations",
				children: ["Acme Corp", "Globex", "SAP Reltio"],
			},
			{
				text: "Individuals",
				children: ["Ada Lovelace", "Alan Turing", "Isaac Newton"],
			},
			{
				text: "Products",
				children: ["Hyperdrive", "Flux Capacitor", "Time Machine"],
			},
		];
		const [expanded, setExpanded] = useState<string[]>([]);
		const [loaded, setLoaded] = useState<string[]>([]);
		const [loading, setLoading] = useState<string | null>(null);

		const handleItemToggle: NonNullable<TreeProps["onItemToggle"]> = (
			event,
		) => {
			onItemToggle?.(event);
			const { text } = event.detail.item as unknown as { text: string };
			// Drive expansion in React so the placeholder renders before the node opens.
			event.preventDefault();
			if (loaded.includes(text)) {
				setExpanded((prev) =>
					prev.includes(text)
						? prev.filter((node) => node !== text)
						: [...prev, text],
				);
				return;
			}
			if (loading) {
				return;
			}
			setLoading(text);
			setExpanded((prev) => [...prev, text]);
			window.setTimeout(() => {
				setLoaded((prev) => [...prev, text]);
				setLoading(null);
			}, 1200);
		};

		return (
			<Tree
				{...args}
				onItemToggle={handleItemToggle}
				style={{ width: "320px" }}
			>
				{nodes.map((node) => (
					<TreeItem
						key={node.text}
						content={node.text}
						icon={folderIcon}
						hasChildren
						expanded={expanded.includes(node.text)}
						loading={loading === node.text}
					>
						{loaded.includes(node.text)
							? node.children.map((child) => (
									<TreeItem key={child} content={child} icon={documentIcon} />
								))
							: null}
					</TreeItem>
				))}
			</Tree>
		);
	},
});

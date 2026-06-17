import { useState } from "react";
import { fn } from "storybook/test";
import { Tree, TreeItem } from "@/components";
import preview from "../../.storybook/preview";
import type { TreeProps } from "./Tree.types";
import "@ui5/webcomponents-icons/dist/folder.js";
import "@ui5/webcomponents-icons/dist/document.js";

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
			<TreeItem content="Organizations" icon="folder" expanded>
				<TreeItem content="Acme Corp" icon="document" />
				<TreeItem content="Globex" icon="document" />
			</TreeItem>
			<TreeItem content="Individuals" icon="folder">
				<TreeItem content="Ada Lovelace" icon="document" />
				<TreeItem content="Alan Turing" icon="document" />
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
			<TreeItem content="Organizations" icon="folder" expanded>
				<TreeItem content="Acme Corp" icon="document" selected />
				<TreeItem content="Globex" icon="document" />
			</TreeItem>
			<TreeItem content="Individuals" icon="folder" />
		</Tree>
	),
});

export const MultiSelect = meta.story({
	args: {
		selectionMode: "Multiple",
	},
	render: (args) => (
		<Tree {...args}>
			<TreeItem content="Organizations" icon="folder" expanded indeterminate>
				<TreeItem content="Acme Corp" icon="document" selected />
				<TreeItem content="Globex" icon="document" />
			</TreeItem>
			<TreeItem content="Individuals" icon="folder" selected />
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
			<TreeItem content="Organizations" icon="folder" expanded>
				<TreeItem content="Acme Corp" icon="document" />
				<TreeItem content="Globex" icon="document" />
			</TreeItem>
			<TreeItem content="Individuals" icon="folder">
				<TreeItem content="Ada Lovelace" icon="document" />
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
						icon="folder"
						hasChildren
						expanded={expanded.includes(node.text)}
						loading={loading === node.text}
					>
						{loaded.includes(node.text)
							? node.children.map((child) => (
									<TreeItem key={child} content={child} icon="document" />
								))
							: null}
					</TreeItem>
				))}
			</Tree>
		);
	},
});

import { useState } from "react";
import { fn } from "storybook/test";
import { Tree, TreeItem } from "@/components";
import preview from "../../.storybook/preview";
import type { TreeProps } from "../Tree/Tree.types";
import "@ui5/webcomponents-icons/dist/folder.js";
import "@ui5/webcomponents-icons/dist/document.js";

const meta = preview.meta({
	component: TreeItem,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		onDetailClick: fn(),
	},
	decorators: [
		// Most stories demonstrate a single node, so we wrap them in a `Tree`.
		// Stories needing their own `Tree` (e.g. to attach `onItemToggle`) opt
		// out via `parameters.standalone`.
		(Story, { parameters }) =>
			parameters.standalone ? (
				<Story />
			) : (
				<Tree style={{ width: "320px" }}>
					<Story />
				</Tree>
			),
	],
});

export default meta;

export const Default = meta.story({
	args: {
		content: "Organizations",
	},
});

export const WithIcon = meta.story({
	args: {
		content: "Organizations",
		icon: "folder",
	},
});

export const WithChildren = meta.story({
	render: (args) => (
		<TreeItem {...args} content="Organizations" icon="folder" expanded>
			<TreeItem content="Acme Corp" icon="document" />
			<TreeItem content="Globex" icon="document" />
		</TreeItem>
	),
});

export const WithAdditionalText = meta.story({
	args: {
		content: "Organizations",
		icon: "folder",
		additionalText: "128",
		additionalTextState: "Information",
	},
});

export const Selected = meta.story({
	args: {
		content: "Organizations",
		icon: "folder",
		selected: true,
	},
});

// A non-string `content` renders through the custom-content slot, so the row can
// hold arbitrary markup the typed props don't cover.
export const CustomContent = meta.story({
	render: (args) => (
		<TreeItem
			{...args}
			content={
				<span>
					<span style={{ fontWeight: 600 }}>Acme Corp</span>{" "}
					<span style={{ color: "var(--sapContent_LabelColor)" }}>
						— San Francisco
					</span>
				</span>
			}
		/>
	),
});

export const Loading = meta.story({
	parameters: {
		standalone: true,
	},
	render: () => (
		<Tree style={{ width: "320px" }}>
			<TreeItem content="Organizations" icon="folder" expanded loading />
		</Tree>
	),
});

// The `loading` prop renders skeleton placeholder rows while a node's children
// are fetched. The parent `Tree` intercepts the cancelable `onItemToggle`,
// `preventDefault()`s the empty toggle, expands the node, and flips `loading`
// during the simulated request — then swaps in the real children once resolved.
export const LazyLoading = meta.story({
	parameters: {
		standalone: true,
	},
	args: {
		icon: "folder",
	},
	render: (args) => {
		const [status, setStatus] = useState<"idle" | "loading" | "loaded">("idle");

		const handleItemToggle: NonNullable<TreeProps["onItemToggle"]> = (
			event,
		) => {
			if (status !== "idle") {
				return;
			}
			event.preventDefault();
			setStatus("loading");
			window.setTimeout(() => setStatus("loaded"), 1200);
		};

		return (
			<Tree onItemToggle={handleItemToggle} style={{ width: "320px" }}>
				<TreeItem
					icon={args.icon}
					content="Organizations"
					hasChildren
					expanded={status !== "idle"}
					loading={status === "loading"}
				>
					{status === "loaded" ? (
						<>
							<TreeItem content="Acme Corp" icon="document" />
							<TreeItem content="Globex" icon="document" />
							<TreeItem content="SAP Reltio" icon="document" />
						</>
					) : null}
				</TreeItem>
			</Tree>
		);
	},
});

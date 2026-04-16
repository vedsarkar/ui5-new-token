import type { NodeProps } from "@xyflow/react";
import type { ComponentType } from "react";
import type { HtmlProps } from "@/utils/types";

export type DiagramLayout = "top-to-bottom" | "left-to-right";

export type DiagramNode = {
	/** Unique node identifier. */
	id: string;

	/** Node type — determines which component renders this node. Defaults to `"markdown"`. */
	type?: string;

	/** Display label shown in the node header. */
	label?: string;

	/** Emoji or text icon shown before the label. */
	icon?: string;

	/** Markdown content rendered in the node body via the Markdown component. */
	content?: string;

	/** Arbitrary data passed to custom node types. */
	data?: Record<string, unknown>;
};

export type DiagramEdge = {
	/** Source node id. Must match a node's `id`. */
	source: string;

	/** Target node id. Must match a node's `id`. */
	target: string;

	/** Text label displayed on the edge. */
	label?: string;
};

export type DiagramProps = HtmlProps<
	"div",
	{
		/** Array of diagram nodes. */
		nodes?: DiagramNode[];

		/** Array of edges connecting nodes by id. */
		edges?: DiagramEdge[];

		/**
		 * Layout direction for the dagre algorithm.
		 * - `"top-to-bottom"` — parent nodes above children (default)
		 * - `"left-to-right"` — parent nodes to the left of children
		 * @default "top-to-bottom"
		 */
		layout?: DiagramLayout;

		/**
		 * Custom node type components merged with the built-in `markdown` type.
		 * Keys are type names, values are React components receiving `NodeProps`.
		 */
		nodeTypes?: Record<string, ComponentType<NodeProps>>;
	}
>;

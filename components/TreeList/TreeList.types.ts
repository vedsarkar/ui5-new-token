import type { ComponentType } from "react";

/**
 * Unique identifier that keeps tree nodes stable across renders.
 */
export type TreeKey = string | number;

/**
 * Tree node shape. Children create nested levels.
 */
export type TreeItem = {
	/** Stable id of the node. */
	id: TreeKey;
	/** Text label rendered by default `TreeList`. */
	label: string;
	/** Optional nested children. */
	children?: TreeItem[];
};

/**
 * Internal rc-tree node representation used for rendering.
 */
export type RcTreeNodeData<T> = {
	key: TreeKey;
	title: null;
	isLeaf?: boolean;
	data: { raw: T; depth: number; parentId?: TreeKey };
	children?: RcTreeNodeData<T>[];
};

/**
 * Props for the TreeList component.
 */
export type TreeListProps = {
	/** Hierarchical data to render.
	 * `type TreeItem = {id: TreeKey; label: string; children?: TreeItem[]}` `type TreeKey = string | number`
	 * @example
	 * [
	 *   { id: "1", label: "Node 1", children: [
	 *     { id: "1.1", label: "Node 1.1" },
	 *     { id: "1.2", label: "Node 1.2" }
	 *   ] },
	 *   { id: "2", label: "Node 2", children: [
	 *     { id: "2.1", label: "Node 2.1" }
	 *   ] }
	 * ]
	 */
	data: TreeItem[];
	/** Custom renderer for the node label. */
	LabelComponent?: ComponentType<{ data: TreeItem }>;
	/** Controlled list of expanded node ids. */
	expandedKeys?: TreeKey[];
	/**
	 * Called when the expanded state changes (controlled mode).
	 * Provides the resulting expanded keys list.
	 */
	onExpand?: (keys: TreeKey[]) => void;
};

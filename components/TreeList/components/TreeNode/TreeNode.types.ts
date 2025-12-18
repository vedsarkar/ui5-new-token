import type { ComponentType } from "react";
import type { TreeItem, TreeKey } from "../../TreeList.types";

export type TreeNodeProps = {
	id: TreeKey;
	node: TreeItem;
	depth: number;
	isLeaf: boolean;
	isExpanded: boolean;
	levelLines: boolean[];
	isLast: boolean;
	indentSize: number;
	onToggle: (id: TreeKey, expanded: boolean) => void;
	onItemClick: (item: TreeItem) => void;
	LabelComponent?: ComponentType<{ data: TreeItem }>;
};

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
	onToggle: (id: TreeKey, expanded: boolean, node: TreeItem) => void;
	LabelComponent?: ComponentType<{ data: TreeItem }>;
};

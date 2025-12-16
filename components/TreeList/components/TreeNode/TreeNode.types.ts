import type { ReactNode } from "react";
import type { FlattenRow, TreeItem } from "../../TreeList.types";

export type TreeNodeProps = {
	row: FlattenRow;
	levelLines: boolean[];
	isLast: boolean;
	indentSize: number;
	onToggle: () => void;
	onItemClick: (item: TreeItem) => void;
	renderLabel?: (item: TreeItem) => ReactNode;
};

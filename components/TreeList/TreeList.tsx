import Tree from "rc-tree";
import type { Key } from "rc-tree/lib/interface";
import { useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import { TreeNode } from "./components/TreeNode/TreeNode";
import { getLevelLinesData, transformTreeData } from "./helpers";
import styles from "./TreeList.module.css";
import type { RcTreeNodeData, TreeItem, TreeKey } from "./TreeList.types";

export type TreeListProps = {
	data: TreeItem[];
	onItemClick: (item: TreeItem) => void;
};

const INDENT_SIZE = 16;

export function TreeList({ data, onItemClick }: TreeListProps) {
	const [expandedKeys, setExpandedKeys] = useState<Set<TreeKey>>(new Set());

	const rcData = useMemo<RcTreeNodeData<TreeItem>[]>(
		() => transformTreeData(data),
		[data],
	);

	const levelLinesMap = useMemo(() => getLevelLinesData(rcData), [rcData]);

	const expandedArray = useMemo(() => Array.from(expandedKeys), [expandedKeys]);

	const handleExpand = (keys: Key[]) => {
		const next = new Set<TreeKey>();
		keys.forEach((key) => {
			if (typeof key === "string" || typeof key === "number") {
				next.add(key);
			}
		});
		setExpandedKeys(next);
	};

	const renderTitle = (node: RcTreeNodeData<TreeItem>) => {
		const raw = node.data.raw;
		const isLeafNode = !!node.isLeaf;
		const isExpanded = expandedKeys.has(node.key);
		const [levelLines, isLast] = levelLinesMap[node.key] ?? [[], false];

		return (
			<TreeNode
				row={{
					id: node.key,
					node: raw,
					depth: node.data.depth,
					isLeaf: isLeafNode,
					isExpanded,
					parentId: node.data.parentId,
				}}
				levelLines={levelLines}
				isLast={isLast}
				indentSize={INDENT_SIZE}
				onToggle={() => {
					setExpandedKeys((prev) => {
						const next = new Set(prev);
						isExpanded ? next.delete(node.key) : next.add(node.key);
						return next;
					});
				}}
				onItemClick={onItemClick}
			/>
		);
	};

	return (
		<div className={classNames(styles.root)} data-part="root">
			<Tree
				treeData={rcData}
				expandAction={false}
				virtual={true}
				selectable={false}
				expandedKeys={expandedArray}
				onExpand={handleExpand}
				showIcon={false}
				switcherIcon={() => <span style={{ display: "none" }} />}
				titleRender={renderTitle}
			/>
		</div>
	);
}

export default TreeList;

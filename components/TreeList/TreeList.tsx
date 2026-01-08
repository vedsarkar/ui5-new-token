import Tree from "rc-tree";
import { memo, useCallback, useMemo, useState } from "react";
import { TreeNode } from "./components/TreeNode/TreeNode";
import { getLevelLinesData, transformTreeData } from "./helpers";
import styles from "./TreeList.module.css";
import type {
	RcTreeNodeData,
	TreeItem,
	TreeKey,
	TreeListProps,
} from "./TreeList.types";

export const TreeList = memo(
	({
		data,
		LabelComponent,
		expandedKeys: expandedKeysProp,
		onExpand,
	}: TreeListProps) => {
		const topLevelKeys = useMemo(() => data.map((item) => item.id), [data]);
		const isControlled = expandedKeysProp !== undefined;
		const [expandedKeys, setExpandedKeys] = useState<Set<TreeKey>>(() =>
			isControlled ? new Set() : new Set(topLevelKeys),
		);

		const rcData = useMemo<RcTreeNodeData<TreeItem>[]>(
			() => transformTreeData(data),
			[data],
		);

		const levelLinesMap = useMemo(() => getLevelLinesData(rcData), [rcData]);

		const expandedSet = useMemo(
			() =>
				isControlled ? new Set<TreeKey>(expandedKeysProp ?? []) : expandedKeys,
			[expandedKeysProp, expandedKeys, isControlled],
		);

		const expandedArray = useMemo(() => Array.from(expandedSet), [expandedSet]);

		const updateExpandedKeys = useCallback(
			(keys: TreeKey[]) => {
				if (isControlled) {
					onExpand?.(keys);
					return;
				}
				setExpandedKeys(new Set(keys));
				onExpand?.(keys);
			},
			[isControlled, onExpand],
		);

		const handleToggle = useCallback(
			(id: TreeKey, isExpanded: boolean) => {
				const next = new Set(expandedSet);
				isExpanded ? next.delete(id) : next.add(id);
				updateExpandedKeys(Array.from(next));
			},
			[expandedSet, updateExpandedKeys],
		);

		const renderTitle = useCallback(
			(node: RcTreeNodeData<TreeItem>) => {
				const raw = node.data.raw;
				const isLeafNode = !!node.isLeaf;
				const isExpanded = expandedSet.has(node.key);
				const [levelLines, isLast] = levelLinesMap[node.key] ?? [[], false];

				return (
					<TreeNode
						id={node.key}
						node={raw}
						depth={node.data.depth}
						isLeaf={isLeafNode}
						isExpanded={isExpanded}
						levelLines={levelLines}
						isLast={isLast}
						onToggle={handleToggle}
						LabelComponent={LabelComponent}
					/>
				);
			},
			[expandedSet, levelLinesMap, LabelComponent, handleToggle],
		);

		return (
			<div className={styles.root}>
				<Tree
					treeData={rcData}
					expandAction={false}
					virtual={false}
					selectable={false}
					expandedKeys={expandedArray}
					onExpand={(keys) => updateExpandedKeys(keys as TreeKey[])}
					showIcon={false}
					titleRender={renderTitle}
				/>
			</div>
		);
	},
);

TreeList.displayName = "TreeList";

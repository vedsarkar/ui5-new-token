import Tree from "rc-tree";
import { useEffect, useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import { TreeNode } from "./components/TreeNode/TreeNode";
import {
	getLevelLinesData,
	transformTreeData,
	validateUniqueKeys,
} from "./helpers";
import styles from "./TreeList.module.css";
import type {
	RcTreeNodeData,
	TreeItem,
	TreeKey,
	TreeListProps,
} from "./TreeList.types";

const INDENT_SIZE = 16;

export function TreeList({
	data,
	onItemClick,
	renderLabel,
	expandedKeys: expandedKeysProp,
	onExpandedKeysChange,
}: TreeListProps) {
	if (process.env.NODE_ENV !== "production") {
		validateUniqueKeys(data);
	}

	const topLevelKeys = useMemo(() => data.map((item) => item.id), [data]);
	const isControlled = expandedKeysProp !== undefined;
	const [expandedKeys, setExpandedKeys] = useState<Set<TreeKey>>(new Set());

	useEffect(() => {
		if (isControlled) {
			return;
		}

		setExpandedKeys(new Set(topLevelKeys));
	}, [isControlled, topLevelKeys]);

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

	const updateExpandedKeys = (keys: TreeKey[]) => {
		if (isControlled) {
			onExpandedKeysChange?.(keys);
			return;
		}
		setExpandedKeys(new Set(keys));
		onExpandedKeysChange?.(keys);
	};

	const handleExpand = (keys: TreeKey[]) => {
		updateExpandedKeys(keys);
	};

	const renderTitle = (node: RcTreeNodeData<TreeItem>) => {
		const raw = node.data.raw;
		const isLeafNode = !!node.isLeaf;
		const isExpanded = expandedSet.has(node.key);
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
					const next = new Set(expandedSet);
					isExpanded ? next.delete(node.key) : next.add(node.key);
					updateExpandedKeys(Array.from(next));
				}}
				onItemClick={onItemClick}
				renderLabel={renderLabel}
			/>
		);
	};

	return (
		<div className={classNames(styles.root)} data-part="root">
			<Tree
				treeData={rcData}
				expandAction={false}
				virtual={false}
				selectable={false}
				expandedKeys={expandedArray}
				onExpand={(keys) => handleExpand(keys as TreeKey[])}
				showIcon={false}
				switcherIcon={() => <span style={{ display: "none" }} />}
				titleRender={renderTitle}
			/>
		</div>
	);
}

export default TreeList;

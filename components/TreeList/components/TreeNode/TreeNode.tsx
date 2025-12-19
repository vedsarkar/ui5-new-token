import { type CSSProperties, type MouseEvent, memo, useCallback } from "react";
import { classNames } from "@/utils/classNames";
import { ChevronIcon } from "../ChevronIcon";
import { TreeLevelLines } from "../TreeLevelLines/TreeLevelLines";
import styles from "./TreeNode.module.css";
import type { TreeNodeProps } from "./TreeNode.types";

export const TreeNode = memo(
	({
		id,
		node,
		depth,
		isLeaf,
		isExpanded,
		levelLines,
		isLast,
		indentSize,
		onToggle,
		onItemClick,
		LabelComponent,
	}: TreeNodeProps) => {
		const handleLabelClick = useCallback(
			(event: MouseEvent) => {
				event.stopPropagation();
				onItemClick(node);
			},
			[onItemClick, node],
		);

		const handleToggleClick = useCallback(
			(event: MouseEvent) => {
				event.stopPropagation();
				onToggle(id, isExpanded);
			},
			[onToggle, id, isExpanded],
		);

		return (
			<div
				className={classNames(styles.wrapper)}
				data-depth={depth}
				style={{
					["--reltio-tree-list-indent-size" as keyof CSSProperties]: `${indentSize}px`,
				}}
			>
				<TreeLevelLines levelLines={levelLines} isLast={isLast} />
				<span
					className={styles.indent}
					style={{ ["--depth" as keyof CSSProperties]: `${depth}` }}
				/>
				{isLeaf ? (
					<span className={styles.toggle} aria-hidden="true" />
				) : (
					<button
						type="button"
						className={styles.toggle}
						aria-label={isExpanded ? "Collapse" : "Expand"}
						onClick={handleToggleClick}
					>
						<ChevronIcon expanded={isExpanded} />
					</button>
				)}
				<button
					type="button"
					className={styles.label}
					onClick={handleLabelClick}
				>
					{LabelComponent ? <LabelComponent data={node} /> : node.label}
				</button>
			</div>
		);
	},
);

TreeNode.displayName = "TreeNode";

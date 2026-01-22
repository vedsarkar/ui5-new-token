import { type CSSProperties, type MouseEvent, memo, useCallback } from "react";
import { ArrowRight } from "@/icons/ArrowRight";
import { classNames } from "@/utils/classNames";
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
		onToggle,
		LabelComponent,
	}: TreeNodeProps) => {
		const handleToggleClick = useCallback(
			(event: MouseEvent) => {
				event.stopPropagation();
				onToggle(id, isExpanded, node);
			},
			[onToggle, id, isExpanded, node],
		);

		return (
			<div className={classNames(styles.wrapper)} data-depth={depth}>
				<TreeLevelLines levelLines={levelLines} isLast={isLast} />
				<span
					className={classNames(styles.indent)}
					style={{ ["--depth" as keyof CSSProperties]: `${depth}` }}
				/>
				{isLeaf ? (
					<span className={classNames(styles.toggle)} aria-hidden="true" />
				) : node.isLoading ? (
					<span className={classNames(styles.toggle)} aria-hidden="true">
						<span className={classNames(styles.spinner)} />
					</span>
				) : (
					<button
						type="button"
						className={classNames(styles.toggle)}
						aria-label={isExpanded ? "Collapse" : "Expand"}
						onClick={handleToggleClick}
					>
						<ArrowRight
							size="small"
							className={classNames(
								styles.chevron,
								isExpanded && styles.expanded,
							)}
						/>
					</button>
				)}
				{LabelComponent ? <LabelComponent data={node} /> : node.label}
			</div>
		);
	},
);

TreeNode.displayName = "TreeNode";

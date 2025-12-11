import type { CSSProperties } from "react";
import { classNames } from "@/utils/classNames";
import { ChevronIcon } from "../ChevronIcon";
import { TreeLevelLines } from "../TreeLevelLines/TreeLevelLines";
import styles from "./TreeNode.module.css";
import type { TreeNodeProps } from "./TreeNode.types";

export function TreeNode({
	row,
	levelLines,
	isLast,
	indentSize,
	onToggle,
	onItemClick,
}: TreeNodeProps) {
	const { node, depth, isLeaf, isExpanded } = row;

	return (
		<div
			className={classNames(styles.wrapper)}
			data-depth={depth}
			style={{
				["--reltio-tree-list-indent-size" as keyof CSSProperties]: `${indentSize}px`,
			}}
		>
			<TreeLevelLines levelLine={[levelLines, isLast]} />
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
					onClick={(event) => {
						event.stopPropagation();
						onToggle();
					}}
				>
					<ChevronIcon expanded={isExpanded} />
				</button>
			)}
			<button
				type="button"
				className={styles.label}
				onClick={(event) => {
					event.stopPropagation();
					onItemClick(node);
				}}
			>
				{node.label}
			</button>
		</div>
	);
}

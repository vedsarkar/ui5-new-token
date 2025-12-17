import { memo } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./TreeLevelLines.module.css";
import type { TreeLevelLinesProps } from "./TreeLevelLines.types";

const LevelLine = memo(
	({
		needDrawLine = false,
		isLastLevelLine = false,
		drawHorizontalLine = false,
	}: {
		needDrawLine?: boolean;
		isLastLevelLine?: boolean;
		drawHorizontalLine?: boolean;
	}) => (
		<div
			className={classNames(
				styles.levelLine,
				needDrawLine && styles.showLine,
				isLastLevelLine && styles.lastLevelLine,
				drawHorizontalLine && styles.horizontalLine,
			)}
		/>
	),
);

const TreeLevelLinesComponent = ({ levelLine }: TreeLevelLinesProps) => {
	const [needDrawLines = [], isLast = false] = levelLine || [];
	const isRoot = needDrawLines.length === 0;
	const level = needDrawLines.length + 2;

	if (isRoot) {
		return null;
	}

	return (
		<div className={classNames(styles.levelLines)}>
			{needDrawLines.map((needDrawLine, index) => (
				<LevelLine
					key={`${index}-${needDrawLine}`}
					needDrawLine={needDrawLine}
				/>
			))}
			<LevelLine
				key={level}
				needDrawLine
				drawHorizontalLine
				isLastLevelLine={isLast}
			/>
		</div>
	);
};

export const TreeLevelLines = memo(TreeLevelLinesComponent);

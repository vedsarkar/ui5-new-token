import { useMemo } from "react";
import { classNames } from "@/utils/classNames";
import { getMatrixData } from "./helpers";
import styles from "./IntersectionsMatrix.module.css";
import type { IntersectionsMatrixProps } from "./IntersectionsMatrix.types";

export const IntersectionsMatrix = ({
	xScale,
	yScale,
	intersections,
	sets,
	transform,
	hoveredIntersection,
}: IntersectionsMatrixProps) => {
	const { circles, lines } = useMemo(
		() => getMatrixData(xScale, yScale, intersections, sets),
		[xScale, yScale, intersections, sets],
	);
	const hoveredIndex = hoveredIntersection
		? intersections.indexOf(hoveredIntersection)
		: -1;
	const checkDimmed = (i: number) => hoveredIntersection && hoveredIndex !== i;

	return (
		<g transform={transform}>
			{circles.map(({ cx, cy, isPresent, intersectionIndex }) => (
				<circle
					key={`matrix-circle-${cx}-${cy}`}
					cx={cx}
					cy={cy}
					r={8}
					className={classNames(
						styles.circle,
						isPresent && styles.activeCircle,
						isPresent && checkDimmed(intersectionIndex) && styles.dimmedCircle,
					)}
				/>
			))}
			{lines.map(({ x, y1, y2, intersectionIndex }) => (
				<line
					key={`matrix-line-${intersectionIndex}`}
					x1={x}
					y1={y1}
					x2={x}
					y2={y2}
					className={classNames(
						styles.link,
						checkDimmed(intersectionIndex) && styles.dimmedLine,
					)}
				/>
			))}
		</g>
	);
};

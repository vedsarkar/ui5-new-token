import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import { classNames } from "@/utils/classNames";
import { GAP_BETWEEN_TABLE_AND_CHART } from "../../constants";
import { IntersectionsChartAxis } from "../IntersectionsChartAxis";
import { getBarHeight, getBarY } from "./helpers";
import styles from "./IntersectionsChart.module.css";
import type { IntersectionsChartProps } from "./IntersectionsChart.types";

export const IntersectionsChart = ({
	mode,
	xScale,
	width,
	height,
	transform,
	matrixHeight,
	intersections,
	hoveredSet,
	hoveredIntersection,
	axisLabel,
	onIntersectionHover,
}: IntersectionsChartProps) => {
	const yScale = useMemo(() => {
		const intersectionsSizes = intersections.map(
			(intersection) => intersection.size,
		);
		const domain = [0, Math.max(0, ...intersectionsSizes)];
		return scaleLinear([height, 0]).domain(domain);
	}, [intersections, height]);

	const hoveredElementsSet = useMemo(() => {
		const elements = hoveredIntersection?.elements || hoveredSet?.elements;
		return elements ? new Set(elements) : null;
	}, [hoveredIntersection, hoveredSet]);

	return (
		<g transform={transform} role="listbox" aria-label="Intersection bars">
			<IntersectionsChartAxis
				xScale={xScale}
				yScale={yScale}
				width={width}
				height={height}
				axisLabel={axisLabel}
			/>
			{intersections.map((intersection, i) => {
				const { elements, size } = intersection;
				const isHoveredColumn = hoveredIntersection === intersection;
				const x = xScale(String(i)) ?? 0;
				const y = yScale(size);
				const barWidth = xScale.bandwidth();
				let barY = hoveredElementsSet
					? yScale(elements.filter((el) => hoveredElementsSet.has(el)).length)
					: y;

				if (
					mode === "distinctIntersection" &&
					hoveredSet &&
					intersection.sets.includes(hoveredSet.name)
				) {
					barY = y;
				}

				const hoverLabel = `Intersection: ${intersection.sets.join(" ∩ ")}, size: ${size}`;

				return (
					<g key={intersection.sets.join(",")}>
						<title>{intersection.sets.join(" ∩ ")}</title>
						<rect
							className={classNames(styles.barBackground)}
							x={x}
							y={y}
							width={barWidth}
							height={height - y}
						/>
						<text
							className={classNames(styles.barLabel)}
							x={x + barWidth / 2}
							y={y - 4}
						>
							{size}
						</text>
						<rect
							className={classNames(styles.bar)}
							x={x}
							y={getBarY(mode, barY, y, isHoveredColumn)}
							width={barWidth}
							height={getBarHeight(mode, height, barY, y, isHoveredColumn)}
						/>
						<rect
							className={classNames(styles.hoverBar)}
							data-reltio-id="intersection-hover-area"
							role="option"
							aria-selected={isHoveredColumn}
							x={x}
							y={y}
							width={barWidth}
							height={
								height - y + matrixHeight + GAP_BETWEEN_TABLE_AND_CHART - 1
							}
							tabIndex={0}
							aria-label={hoverLabel}
							onMouseEnter={() => onIntersectionHover(intersection)}
							onMouseLeave={() => onIntersectionHover(null)}
							onFocus={() => onIntersectionHover(intersection)}
							onBlur={() => onIntersectionHover(null)}
						/>
					</g>
				);
			})}
		</g>
	);
};

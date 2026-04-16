import { useEffect, useMemo, useRef, useState } from "react";
import { classNames } from "@/utils/classNames";
import { IntersectionsChart } from "./components/IntersectionsChart";
import { IntersectionsChartAxis } from "./components/IntersectionsChartAxis";
import { IntersectionsMatrix } from "./components/IntersectionsMatrix";
import { SetsChart } from "./components/SetsChart";
import { GAP_BEFORE_LEFT_BAR, TOP_GAP } from "./constants";
import {
	createEmptyGridXScale,
	createEmptyGridYScale,
	createMatrixXScale,
	createMatrixYScale,
	getEmptyGridDimensions,
} from "./helpers";
import styles from "./SetOverlapChart.module.css";
import type {
	DataSet,
	Intersection,
	SetOverlapChartProps,
} from "./SetOverlapChart.types";
import { useSetOverlapChartSizes } from "./useSetOverlapChartSizes";

/**
 * UpSet-style set overlap chart built with custom SVG and d3-scale.
 *
 * Visualizes how records overlap across multiple sets (source systems)
 * using three coordinated sub-charts: vertical intersection bars at the
 * top, a dot matrix in the middle, and horizontal set bars on the left.
 *
 * Supports two combination modes — `"intersection"` (overlapping counts,
 * element-level hover) and `"distinctIntersection"` (mutually exclusive
 * counts, structural hover). Each mode requires differently shaped data
 * despite sharing the same TypeScript types.
 *
 * @example
 * ```tsx
 * const sets = [
 *   { name: "SAP", size: 6, elements: ["r1", "r2"] },
 *   { name: "Oracle", size: 4, elements: ["r1", "r3"] },
 * ];
 * const intersections = [
 *   { sets: ["SAP"], size: 6, elements: ["r1", "r2"] },
 *   { sets: ["SAP", "Oracle"], size: 2, elements: ["r1"] },
 * ];
 *
 * <SetOverlapChart
 *   sets={sets}
 *   intersections={intersections}
 *   mode="intersection"
 *   style={{ width: 900, height: 500 }}
 * />
 * ```
 */
export const SetOverlapChart = ({
	intersections = [],
	sets = [],
	mode = "intersection",
	intersectionChartAxisLabel,
	setsChartAxisLabel,
	className,
	style,
	...rest
}: SetOverlapChartProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [hoveredSet, setHoveredSet] = useState<DataSet | null>(null);
	const [hoveredIntersection, setHoveredIntersection] =
		useState<Intersection | null>(null);

	const [[availableWidth, availableHeight], setAvailableSize] = useState([
		0, 0,
	]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const updateSize = () => {
			setAvailableSize([container.clientWidth, container.clientHeight]);
		};
		updateSize();

		const resizeObserver = new ResizeObserver(updateSize);
		resizeObserver.observe(container);
		return () => resizeObserver.disconnect();
	}, []);

	const hasValidData = intersections.length > 0 && sets.length > 0;

	const {
		labels,
		svgWidth,
		svgHeight,
		intersectionsChartWidth,
		intersectionsChartHeight,
		matrixY,
		matrixHeight,
		setsChartWidth,
		leftPadding,
	} = useSetOverlapChartSizes({
		width: availableWidth,
		height: availableHeight,
		intersections,
		sets,
	});

	const matrixXScale = useMemo(
		() => createMatrixXScale(intersections.length, intersectionsChartWidth),
		[intersections.length, intersectionsChartWidth],
	);

	const matrixYScale = useMemo(
		() =>
			createMatrixYScale(
				sets.map((set) => set.name),
				matrixHeight,
			),
		[sets, matrixHeight],
	);

	const emptyGrid = getEmptyGridDimensions(availableWidth, availableHeight);

	const emptyXScale = useMemo(
		() => createEmptyGridXScale(emptyGrid.width),
		[emptyGrid.width],
	);
	const emptyYScale = useMemo(
		() => createEmptyGridYScale(emptyGrid.height),
		[emptyGrid.height],
	);

	const chartDescription = hasValidData
		? `Set overlap chart showing overlaps across ${sets.length} sets and ${intersections.length} intersections`
		: "Empty set overlap chart";

	const overlay = !hasValidData ? (
		<div className={classNames(styles.overlay)}>No data</div>
	) : null;

	return (
		<div
			ref={containerRef}
			className={classNames(styles.root, className)}
			style={style}
			{...rest}
		>
			{overlay}
			{hasValidData ? (
				<svg
					className={classNames(styles.svg)}
					width={svgWidth}
					height={svgHeight}
					role="img"
					aria-label={chartDescription}
				>
					<IntersectionsMatrix
						xScale={matrixXScale}
						yScale={matrixYScale}
						intersections={intersections}
						sets={sets}
						transform={`translate(${leftPadding},${matrixY})`}
						hoveredIntersection={hoveredIntersection}
					/>
					<SetsChart
						mode={mode}
						yScale={matrixYScale}
						width={setsChartWidth}
						sets={sets}
						labels={labels}
						intersections={intersections}
						hoveredSet={hoveredSet}
						hoveredIntersection={hoveredIntersection}
						hoverAreaWidth={svgWidth}
						transform={`translate(${GAP_BEFORE_LEFT_BAR},${matrixY})`}
						onSetHover={setHoveredSet}
						axisLabel={setsChartAxisLabel}
					/>
					<IntersectionsChart
						mode={mode}
						xScale={matrixXScale}
						width={intersectionsChartWidth}
						height={intersectionsChartHeight}
						intersections={intersections}
						transform={`translate(${leftPadding},${TOP_GAP})`}
						matrixHeight={matrixHeight}
						hoveredSet={hoveredSet}
						hoveredIntersection={hoveredIntersection}
						onIntersectionHover={setHoveredIntersection}
						axisLabel={intersectionChartAxisLabel}
					/>
				</svg>
			) : (
				<svg
					className={classNames(styles.svg)}
					width={availableWidth}
					height={availableHeight}
					role="img"
					aria-label={chartDescription}
				>
					<g transform={`translate(${emptyGrid.left},${TOP_GAP})`}>
						<IntersectionsChartAxis
							xScale={emptyXScale}
							yScale={emptyYScale}
							width={emptyGrid.width}
							height={emptyGrid.height}
						/>
					</g>
				</svg>
			)}
		</div>
	);
};

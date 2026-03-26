import { scaleLinear } from "d3-scale";
import type React from "react";
import { useMemo } from "react";
import { classNames } from "@/utils/classNames";
import {
	GAP_BEFORE_LEFT_BAR,
	SET_BAR_HEIGHT,
	SET_LABEL_SIZE,
	TEXT_GAP,
} from "../../constants";
import type { Intersection } from "../../SetOverlapChart.types";
import { SetsChartAxis } from "../SetsChartAxis";
import styles from "./SetsChart.module.css";
import type { SetsChartProps } from "./SetsChart.types";

export const SetsChart = ({
	mode,
	sets,
	intersections,
	width,
	yScale,
	transform,
	labels,
	hoveredSet,
	hoveredIntersection,
	hoverAreaWidth,
	axisLabel,
	onSetHover,
}: SetsChartProps) => {
	const hoveredElementsSet = useMemo(() => {
		const elements = hoveredIntersection?.elements || hoveredSet?.elements;
		return elements ? new Set(elements) : null;
	}, [hoveredIntersection, hoveredSet]);

	const setOverlappingColumns = useMemo(() => {
		const result: Record<string, Intersection[]> = {};
		sets.forEach((set) => {
			result[set.name] = intersections.filter((intersection) =>
				intersection.sets.includes(set.name),
			);
		});
		return result;
	}, [sets, intersections]);

	const xScale = useMemo(() => {
		const maxSetSize =
			sets.length > 0 ? Math.max(...sets.map((set) => set.size)) : 0;
		return scaleLinear().domain([0, maxSetSize]).range([0, width]);
	}, [width, sets]);

	const rootStyle = {
		"--set-label-size": SET_LABEL_SIZE,
	} as React.CSSProperties;

	return (
		<g
			transform={transform}
			style={rootStyle}
			role="listbox"
			aria-label="Set bars"
		>
			<SetsChartAxis width={width} label={axisLabel} />
			{sets.map((set, i) => {
				const { name, size, elements } = set;

				const label = labels[i];
				const height = yScale.bandwidth();
				const y = (yScale(name) ?? 0) + height / 2 - SET_BAR_HEIGHT / 2;
				const lineY = (yScale(name) ?? 0) + height;
				let barSize = size;

				if (
					mode === "distinctIntersection" &&
					(hoveredIntersection || hoveredSet)
				) {
					if (hoveredIntersection) {
						const containsSet = hoveredIntersection?.sets.includes(name);
						barSize = containsSet ? hoveredIntersection?.size : 0;
					} else if (hoveredSet && setOverlappingColumns[hoveredSet.name]) {
						const hoveredSetOverlappingColumns = new Set(
							setOverlappingColumns[hoveredSet.name],
						);
						barSize = setOverlappingColumns[set.name]
							.filter((item) => hoveredSetOverlappingColumns.has(item))
							.reduce((acc, item) => acc + item.size, 0);
					}
				} else {
					barSize = hoveredElementsSet
						? elements.filter((el) => hoveredElementsSet.has(el)).length
						: size;
				}

				return (
					<g key={`set-group-${name}`}>
						<rect
							className={classNames(styles.setsBarBackground)}
							x={0}
							y={y}
							width={width}
							height={SET_BAR_HEIGHT}
						/>
						<rect
							className={classNames(styles.setsBarDimmed)}
							x={width - xScale(size)}
							y={y}
							width={xScale(size)}
							height={SET_BAR_HEIGHT}
						/>
						<rect
							className={classNames(styles.setsBar)}
							x={width - xScale(barSize)}
							y={y}
							width={xScale(barSize)}
							height={SET_BAR_HEIGHT}
						/>
						{i !== sets.length - 1 && (
							<line
								className={classNames(styles.gridLine)}
								x1={0}
								x2={hoverAreaWidth}
								y1={lineY}
								y2={lineY}
							/>
						)}
						<text
							className={classNames(styles.setsLabel)}
							x={width + TEXT_GAP}
							y={(yScale(name) ?? 0) + height / 2}
						>
							{label}
						</text>
						<rect
							className={classNames(styles.hoverBar)}
							data-reltio-id="set-hover-area"
							role="option"
							aria-selected={hoveredSet === set}
							x={-GAP_BEFORE_LEFT_BAR + 1}
							y={yScale(name)}
							width={hoverAreaWidth - 2}
							height={height}
							tabIndex={0}
							aria-label={`Set: ${name}, size: ${size}`}
							onMouseEnter={() => onSetHover(set)}
							onMouseLeave={() => onSetHover(null)}
							onFocus={() => onSetHover(set)}
							onBlur={() => onSetHover(null)}
						/>
					</g>
				);
			})}
		</g>
	);
};

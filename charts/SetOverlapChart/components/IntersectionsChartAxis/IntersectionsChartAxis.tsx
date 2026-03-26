import type React from "react";
import { useMemo } from "react";
import { classNames } from "@/utils/classNames";
import { AXIS_TICK_LABEL_SIZE } from "../../constants";
import { calculateTicksWidth } from "./helpers";
import styles from "./IntersectionsChartAxis.module.css";
import type { IntersectionsChartAxisProps } from "./IntersectionsChartAxis.types";

export const IntersectionsChartAxis = ({
	xScale,
	yScale,
	width,
	height,
	axisLabel,
}: IntersectionsChartAxisProps) => {
	const ticks = useMemo(() => {
		const maxValue = yScale.domain()[1];
		return yScale
			.copy()
			.nice()
			.ticks()
			.filter((tick) => Number.isInteger(tick) && tick <= maxValue);
	}, [yScale]);
	const ticksWidth = useMemo(() => calculateTicksWidth(ticks), [ticks]);

	const rootStyle = {
		"--axis-tick-label-size": AXIS_TICK_LABEL_SIZE,
	} as React.CSSProperties;

	return (
		<g style={rootStyle}>
			{xScale.domain().map((d) => {
				const x = (xScale(d) ?? 0) + xScale.bandwidth() / 2;
				return (
					<line
						key={`v-grid-${d}`}
						className={classNames(styles.verticalGrid)}
						x1={x}
						x2={x}
						y1={0}
						y2={height}
					/>
				);
			})}
			{ticks.map((tick) => {
				const y = yScale(tick);
				return (
					<line
						key={`h-grid-${tick}`}
						className={classNames(styles.horizontalGrid)}
						x1={0}
						x2={width}
						y1={y}
						y2={y}
					/>
				);
			})}
			<g>
				{ticks.map((tick) => {
					const y = yScale(tick);
					return (
						<g key={`x-tick-${tick}`} transform={`translate(0,${y})`}>
							<line
								className={classNames(styles.axis)}
								x1={-4}
								x2={0}
								y1={0}
								y2={0}
							/>
							<text className={classNames(styles.axisTickLabel)} x={-8} y={4}>
								{tick}
							</text>
						</g>
					);
				})}
			</g>
			<line
				className={classNames(styles.axis)}
				x1={0}
				x2={0}
				y1={0}
				y2={height}
			/>
			<line
				className={classNames(styles.axis)}
				x1={0}
				x2={width}
				y1={height}
				y2={height}
			/>
			{axisLabel && (
				<text
					className={classNames(styles.axisLabel)}
					transform={`translate(${-ticksWidth - 12},${height / 2}) rotate(-90)`}
				>
					{axisLabel}
				</text>
			)}
		</g>
	);
};

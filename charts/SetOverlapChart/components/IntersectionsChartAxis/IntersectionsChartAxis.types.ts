import type { ScaleBand, ScaleLinear } from "d3-scale";

export type IntersectionsChartAxisProps = {
	xScale: ScaleBand<string>;
	yScale: ScaleLinear<number, number>;
	width: number;
	height: number;
	axisLabel?: string;
};

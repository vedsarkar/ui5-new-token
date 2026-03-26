import type { ScaleBand } from "d3-scale";
import type { DataSet, Intersection } from "../../SetOverlapChart.types";

export type IntersectionsMatrixProps = {
	xScale: ScaleBand<string>;
	yScale: ScaleBand<string>;
	intersections: Intersection[];
	sets: DataSet[];
	transform: string;
	hoveredIntersection: Intersection | null;
};

export type IntersectionCircle = {
	cx: number;
	cy: number;
	isPresent: boolean;
	intersectionIndex: number;
};

export type IntersectionLine = {
	x: number;
	y1: number;
	y2: number;
	intersectionIndex: number;
};

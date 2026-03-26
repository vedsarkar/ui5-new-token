import type { ScaleBand } from "d3-scale";
import type {
	DataSet,
	Intersection,
	SetOverlapChartMode,
} from "../../SetOverlapChart.types";

export type IntersectionsChartProps = {
	mode: SetOverlapChartMode;
	xScale: ScaleBand<string>;
	width: number;
	height: number;
	transform?: string;
	matrixHeight: number;
	intersections: Intersection[];
	hoveredSet?: DataSet | null;
	hoveredIntersection?: Intersection | null;
	axisLabel?: string;
	onIntersectionHover: (intersection: Intersection | null) => void;
};

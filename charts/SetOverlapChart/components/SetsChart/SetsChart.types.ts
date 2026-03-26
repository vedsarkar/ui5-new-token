import type { ScaleBand } from "d3-scale";
import type {
	DataSet,
	Intersection,
	SetOverlapChartMode,
} from "../../SetOverlapChart.types";

export type SetsChartProps = {
	mode: SetOverlapChartMode;
	sets: DataSet[];
	intersections: Intersection[];
	width: number;
	yScale: ScaleBand<string>;
	labels: string[];
	transform?: string;
	hoverAreaWidth: number;
	hoveredSet?: DataSet | null;
	hoveredIntersection?: Intersection | null;
	axisLabel?: string;
	onSetHover: (set: DataSet | null) => void;
};

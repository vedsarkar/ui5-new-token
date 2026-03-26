import type { ScaleBand } from "d3-scale";
import type { DataSet, Intersection } from "../../SetOverlapChart.types";
import type {
	IntersectionCircle,
	IntersectionLine,
} from "./IntersectionsMatrix.types";

export const getMatrixData = (
	xScale: ScaleBand<string>,
	yScale: ScaleBand<string>,
	intersections: Intersection[],
	sets: DataSet[],
) => {
	const circles: IntersectionCircle[] = intersections.flatMap(
		(intersection, i) =>
			sets.map((set) => ({
				cx: (xScale(String(i)) ?? 0) + xScale.bandwidth() / 2,
				cy: (yScale(set.name) ?? 0) + yScale.bandwidth() / 2,
				isPresent: intersection.sets.includes(set.name),
				intersectionIndex: i,
			})),
	);

	const lines: IntersectionLine[] = intersections.reduce(
		(acc, intersection, i) => {
			const activeSetIndices = intersection.sets
				.map((name) => sets.findIndex((set) => set.name === name))
				.filter((i) => i >= 0)
				.sort((a, b) => a - b);
			if (activeSetIndices.length > 1) {
				const firstIdx = activeSetIndices[0];
				const lastIdx = activeSetIndices[activeSetIndices.length - 1];
				const x = (xScale(String(i)) ?? 0) + xScale.bandwidth() / 2;
				const y1 = (yScale(sets[firstIdx].name) ?? 0) + yScale.bandwidth() / 2;
				const y2 = (yScale(sets[lastIdx].name) ?? 0) + yScale.bandwidth() / 2;
				acc.push({ x, y1, y2, intersectionIndex: i });
				return acc;
			}
			return acc;
		},
		[] as IntersectionLine[],
	);

	return { circles, lines };
};

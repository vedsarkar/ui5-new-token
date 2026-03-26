import type { SetOverlapChartMode } from "../../SetOverlapChart.types";

const shouldShowFixedBar = (
	mode: SetOverlapChartMode,
	isHoveredColumn: boolean,
) => mode === "distinctIntersection" && isHoveredColumn;

const getBarHeight = (
	mode: SetOverlapChartMode,
	height: number,
	barY: number,
	y: number,
	isHoveredColumn: boolean,
) => height - (shouldShowFixedBar(mode, isHoveredColumn) ? y : barY);

const getBarY = (
	mode: SetOverlapChartMode,
	barY: number,
	y: number,
	isHoveredColumn: boolean,
) => (shouldShowFixedBar(mode, isHoveredColumn) ? y : barY);

export { getBarHeight, getBarY };

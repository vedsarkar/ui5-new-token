import { useMemo } from "react";
import {
	GAP_BEFORE_LEFT_BAR,
	GAP_BETWEEN_TABLE_AND_CHART,
	MATRIX_ROW_HEIGHT,
	MAX_SETS_CHART_WIDTH,
	MIN_INTERSECTION_CHART_HEIGHT,
	MIN_MATRIX_COLUMN_WIDTH,
	MIN_SETS_CHART_WIDTH,
	TEXT_GAP,
	TOP_GAP,
} from "./constants";
import { truncateLabels } from "./helpers";
import type { DataSet, Intersection } from "./SetOverlapChart.types";

type Props = {
	width: number;
	height: number;
	intersections: Intersection[];
	sets: DataSet[];
};

export const useSetOverlapChartSizes = ({
	width,
	height,
	intersections,
	sets,
}: Props) =>
	useMemo(() => {
		const minMatrixWidth = intersections.length * MIN_MATRIX_COLUMN_WIDTH * 1.2;
		const matrixHeight = sets.length * MATRIX_ROW_HEIGHT;

		const availableLabelsWidth =
			width -
			minMatrixWidth -
			TEXT_GAP * 2 -
			GAP_BEFORE_LEFT_BAR -
			MIN_SETS_CHART_WIDTH;
		const { labels, maxWidth: labelsWidth } = truncateLabels(
			sets,
			availableLabelsWidth,
		);

		const availableSetsChartWidth =
			width - minMatrixWidth - TEXT_GAP * 2 - GAP_BEFORE_LEFT_BAR - labelsWidth;
		const setsChartWidth = Math.min(
			Math.max(availableSetsChartWidth, MIN_SETS_CHART_WIDTH),
			MAX_SETS_CHART_WIDTH,
		);
		const leftPadding =
			setsChartWidth + labelsWidth + TEXT_GAP * 2 + GAP_BEFORE_LEFT_BAR;

		const intersectionsChartWidth = Math.max(
			minMatrixWidth,
			width - leftPadding,
		);
		const intersectionsChartHeight = Math.max(
			MIN_INTERSECTION_CHART_HEIGHT,
			height - TOP_GAP - matrixHeight - GAP_BETWEEN_TABLE_AND_CHART,
		);

		const svgWidth = leftPadding + intersectionsChartWidth;
		const svgHeight =
			intersectionsChartHeight +
			matrixHeight +
			TOP_GAP +
			GAP_BETWEEN_TABLE_AND_CHART;
		const matrixY = svgHeight - matrixHeight - 1;

		return {
			labels,
			svgWidth,
			svgHeight,
			intersectionsChartWidth,
			intersectionsChartHeight,
			matrixY,
			matrixHeight,
			leftPadding,
			setsChartWidth,
		};
	}, [width, height, intersections, sets]);

import { scaleBand, scaleLinear } from "d3-scale";
import {
	MAX_CHARACTERS,
	MIN_CHARACTERS,
	SET_LABEL_SIZE,
	TOP_GAP,
} from "./constants";
import type { DataSet } from "./SetOverlapChart.types";

const ctxCache = new Map<string, OffscreenCanvasRenderingContext2D>();

const getContext = (
	fontSize: string,
): OffscreenCanvasRenderingContext2D | null => {
	const cached = ctxCache.get(fontSize);
	if (cached) return cached;

	if (typeof OffscreenCanvas !== "undefined") {
		const ctx = new OffscreenCanvas(0, 0).getContext("2d");
		if (ctx) {
			ctx.font = `${fontSize} "Inter", sans-serif`;
			ctxCache.set(fontSize, ctx);
			return ctx;
		}
	}
	return null;
};

export const measureText = (text: string, fontSize: string): number => {
	const ctx = getContext(fontSize);
	if (ctx) return ctx.measureText(text).width;
	return text.length * Number.parseFloat(fontSize) * 0.6;
};

export const truncateLabels = (sets: DataSet[], maxLabelsWidth: number) => {
	const newTruncatedLabels: string[] = [];
	let maxWidth = 0;
	sets.forEach(({ name }) => {
		let truncatedText =
			name.length > MAX_CHARACTERS
				? `${name.slice(0, MAX_CHARACTERS)}...`
				: name;

		let textWidth = measureText(truncatedText, SET_LABEL_SIZE);
		while (
			textWidth > maxLabelsWidth &&
			truncatedText.length > MIN_CHARACTERS
		) {
			truncatedText = `${truncatedText.slice(0, -4)}...`;
			textWidth = measureText(truncatedText, SET_LABEL_SIZE);
		}

		newTruncatedLabels.push(truncatedText);
		maxWidth = Math.max(maxWidth, textWidth);
	});

	return { labels: newTruncatedLabels, maxWidth };
};

export const createMatrixXScale = (intersectionCount: number, width: number) =>
	scaleBand([0, width])
		.domain(Array.from({ length: intersectionCount }, (_, i) => String(i)))
		.paddingInner(0.2);

export const createMatrixYScale = (setNames: string[], height: number) =>
	scaleBand([0, height]).domain(setNames);

export const getEmptyGridDimensions = (width: number, height: number) => ({
	width: width * 0.9,
	height: height - TOP_GAP * 2,
	left: (width - width * 0.9) / 2,
});

export const createEmptyGridXScale = (width: number) =>
	scaleBand<string>().domain([]).range([0, width]);

export const createEmptyGridYScale = (height: number) =>
	scaleLinear().domain([0, 1000]).range([height, 0]);

import preview from "@/.storybook/preview";
import { RadarChart } from "./RadarChart";
import cssClasses from "./RadarChart.module.css";

const indicators = [
	{ name: "Completeness", max: 100 },
	{ name: "Accuracy", max: 100 },
	{ name: "Timeliness", max: 100 },
	{ name: "Uniqueness", max: 100 },
	{ name: "Consistency", max: 100 },
];

const meta = preview.meta({
	title: "Charts/RadarChart",
	component: RadarChart,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		indicators,
		series: [{ name: "Source A", values: [90, 75, 85, 60, 70] }],
	},
});

export const Default = meta.story({});

export const MultipleSeries = meta.story({
	args: {
		series: [
			{ name: "Source A", values: [90, 75, 85, 60, 70] },
			{ name: "Source B", values: [65, 90, 55, 85, 80] },
			{ name: "Source C", values: [70, 60, 90, 75, 95] },
		],
	},
});

export const Loading = meta.story({
	args: {
		series: [],
		loading: true,
	},
});

export const BackgroundRefresh = meta.story({
	args: {
		loading: true,
	},
});

export const Empty = meta.story({
	args: {
		series: [],
	},
});

export const ErrorState = meta.story({
	name: "Error",
	args: {
		error: "Failed to load chart data. Please try again later.",
	},
});

export const CustomHeight = meta.story({
	args: {
		height: 500,
	},
});

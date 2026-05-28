import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { RadarChart } from "./RadarChart";

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
	tags: ["test"],
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
	decorators: [FullscreenDecorator],
	args: {
		indicators,
		series: [{ name: "Source A", values: [90, 75, 85, 60, 70] }],
	},
});

export default meta;

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

export const WithUnits = meta.story({
	args: {
		units: "%",
	},
});

export const Empty = meta.story({
	args: {
		series: [],
	},
});

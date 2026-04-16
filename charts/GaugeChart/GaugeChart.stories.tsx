import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { GaugeChart } from "./GaugeChart";
import cssClasses from "./GaugeChart.module.css";

const meta = preview.meta({
	title: "Charts/GaugeChart",
	component: GaugeChart,
	parameters: {
		layout: "fullscreen",
		cssClasses,
	},
	decorators: [FullscreenDecorator],
	args: {
		value: 72,
	},
});

export const Default = meta.story({});

export const WithLabel = meta.story({
	args: {
		value: 85,
		label: "Quality Score",
	},
});

export const CustomMax = meta.story({
	args: {
		value: 750,
		max: 1000,
		label: "Records",
	},
});

export const WithUnits = meta.story({
	args: {
		value: 85,
		label: "Quality",
		units: "%",
	},
});

export const Empty = meta.story({
	args: {
		value: undefined,
	},
});

import preview from "@/.storybook/preview";
import { GaugeChart } from "./GaugeChart";
import cssClasses from "./GaugeChart.module.css";

const meta = preview.meta({
	title: "Charts/GaugeChart",
	component: GaugeChart,
	parameters: {
		layout: "padded",
		cssClasses,
	},
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

export const Loading = meta.story({
	args: {
		value: undefined,
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
		value: undefined,
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
		height: 200,
		label: "Compact",
	},
});

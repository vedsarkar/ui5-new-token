import preview from "@/.storybook/preview";
import { DonutChart } from "./DonutChart";
import cssClasses from "./DonutChart.module.css";

const sampleData = [
	{ name: "Matched", value: 680 },
	{ name: "Unmatched", value: 210 },
	{ name: "Pending", value: 110 },
];

const meta = preview.meta({
	title: "Charts/DonutChart",
	component: DonutChart,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		data: sampleData,
	},
});

export const Default = meta.story({});

export const ManySegments = meta.story({
	args: {
		data: [
			{ name: "CRM", value: 450 },
			{ name: "ERP", value: 320 },
			{ name: "MDM", value: 280 },
			{ name: "Web", value: 150 },
			{ name: "Mobile", value: 90 },
			{ name: "Partner API", value: 60 },
			{ name: "Manual Entry", value: 35 },
			{ name: "Other", value: 15 },
		],
	},
});

export const Loading = meta.story({
	args: {
		data: [],
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
		data: [],
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

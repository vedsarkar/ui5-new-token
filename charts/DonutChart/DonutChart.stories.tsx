import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { DonutChart } from "./DonutChart";

const sampleData = [
	{ name: "Matched", value: 680 },
	{ name: "Unmatched", value: 210 },
	{ name: "Pending", value: 110 },
];

const meta = preview.meta({
	title: "Charts/DonutChart",
	component: DonutChart,
	tags: ["test"],
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
	decorators: [FullscreenDecorator],
	args: {
		data: sampleData,
	},
});

export default meta;

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

export const WithUnits = meta.story({
	args: {
		units: "records",
	},
});

export const Empty = meta.story({
	args: {
		data: [],
	},
});

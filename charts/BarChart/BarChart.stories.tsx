import { faker } from "@faker-js/faker";
import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { BarChart } from "./BarChart";
import cssClasses from "./BarChart.module.css";

faker.seed(42);

const sampleData = [
	{ month: "Jan", sales: 820, returns: 120, profit: 700 },
	{ month: "Feb", sales: 932, returns: 154, profit: 778 },
	{ month: "Mar", sales: 901, returns: 131, profit: 770 },
	{ month: "Apr", sales: 1034, returns: 190, profit: 844 },
	{ month: "May", sales: 1290, returns: 230, profit: 1060 },
	{ month: "Jun", sales: 1330, returns: 220, profit: 1110 },
];

const timestampData = [
	{ ts: 1706745600000, queueSize: 42 },
	{ ts: 1706832000000, queueSize: 58 },
	{ ts: 1706918400000, queueSize: 35 },
	{ ts: 1707004800000, queueSize: 71 },
	{ ts: 1707091200000, queueSize: 63 },
	{ ts: 1707177600000, queueSize: 49 },
	{ ts: 1707264000000, queueSize: 55 },
];

const meta = preview.meta({
	title: "Charts/BarChart",
	component: BarChart,
	parameters: {
		layout: "fullscreen",
		cssClasses,
	},
	decorators: [FullscreenDecorator],
	args: {
		data: sampleData,
		xKey: "month",
		series: [{ key: "sales", name: "Sales" }],
	},
});

export const Default = meta.story({});

export const MultipleSeries = meta.story({
	args: {
		series: [
			{ key: "sales", name: "Sales" },
			{ key: "returns", name: "Returns" },
			{ key: "profit", name: "Profit" },
		],
	},
});

export const WithUnits = meta.story({
	args: {
		data: [
			{ month: "Jan", latency: 145 },
			{ month: "Feb", latency: 132 },
			{ month: "Mar", latency: 178 },
			{ month: "Apr", latency: 156 },
			{ month: "May", latency: 121 },
			{ month: "Jun", latency: 139 },
		],
		series: [{ key: "latency", name: "Avg Latency" }],
		units: "ms",
	},
});

export const FormattedXAxis = meta.story({
	args: {
		data: timestampData,
		xKey: (item: Record<string, unknown>) =>
			new Date(item.ts as number).toLocaleDateString("en-US", {
				weekday: "short",
				day: "numeric",
				month: "short",
			}),
		series: [{ key: "queueSize", name: "Queue Size" }],
	},
});

export const Empty = meta.story({
	args: {
		data: [],
	},
});

const DAY_MS = 86_400_000;
const denseData = Array.from({ length: 120 }, (_, i) => ({
	date: new Date(Date.UTC(2025, 0, 1) + i * DAY_MS).toLocaleDateString(
		"en-US",
		{ month: "short", day: "numeric" },
	),
	requests: faker.number.int({ min: 800, max: 5000 }),
	errors: faker.number.int({ min: 10, max: 300 }),
}));

export const DenseData = meta.story({
	args: {
		data: denseData,
		xKey: "date",
		series: [
			{ key: "requests", name: "Requests" },
			{ key: "errors", name: "Errors" },
		],
	},
});

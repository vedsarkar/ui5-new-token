import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { SankeyChart } from "./SankeyChart";

const sampleNodes = [
	{ name: "CRM" },
	{ name: "ERP" },
	{ name: "Web" },
	{ name: "Ingestion" },
	{ name: "Matching" },
	{ name: "Golden Records" },
];

const sampleLinks = [
	{ source: "CRM", target: "Ingestion", value: 500 },
	{ source: "ERP", target: "Ingestion", value: 300 },
	{ source: "Web", target: "Ingestion", value: 200 },
	{ source: "Ingestion", target: "Matching", value: 900 },
	{ source: "Matching", target: "Golden Records", value: 650 },
];

const meta = preview.meta({
	title: "Charts/SankeyChart",
	component: SankeyChart,
	tags: ["vitest"],
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
	decorators: [FullscreenDecorator],
	args: {
		nodes: sampleNodes,
		links: sampleLinks,
	},
});

export default meta;

export const Default = meta.story({});

export const MultiLevel = meta.story({
	args: {
		nodes: [
			{ name: "Raw Data" },
			{ name: "Cleansing" },
			{ name: "Dedup" },
			{ name: "Enrichment" },
			{ name: "Matched" },
			{ name: "Unmatched" },
			{ name: "Review Queue" },
			{ name: "Golden Record" },
		],
		links: [
			{ source: "Raw Data", target: "Cleansing", value: 1000 },
			{ source: "Cleansing", target: "Dedup", value: 950 },
			{ source: "Dedup", target: "Enrichment", value: 800 },
			{ source: "Dedup", target: "Review Queue", value: 150 },
			{ source: "Enrichment", target: "Matched", value: 650 },
			{ source: "Enrichment", target: "Unmatched", value: 150 },
			{ source: "Matched", target: "Golden Record", value: 650 },
			{ source: "Review Queue", target: "Golden Record", value: 100 },
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
		nodes: [],
		links: [],
	},
});

import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import { SetOverlapChart } from "./SetOverlapChart";
import type { DataSet, Intersection } from "./SetOverlapChart.types";

const defaultSets: DataSet[] = [
	{
		name: "SAP",
		size: 6,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_6",
		],
	},
	{
		name: "Oracle",
		size: 4,
		elements: ["record_1", "record_5", "record_7", "record_8"],
	},
	{
		name: "LegacyMDM",
		size: 5,
		elements: ["record_2", "record_3", "record_7", "record_9", "record_10"],
	},
	{
		name: "ServiceNow",
		size: 4,
		elements: ["record_4", "record_9", "record_11", "record_12"],
	},
];

const defaultIntersections: Intersection[] = [
	{
		sets: ["SAP"],
		size: 6,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_6",
		],
	},
	{
		sets: ["LegacyMDM"],
		size: 5,
		elements: ["record_2", "record_3", "record_7", "record_9", "record_10"],
	},
	{
		sets: ["Oracle"],
		size: 4,
		elements: ["record_1", "record_5", "record_7", "record_8"],
	},
	{
		sets: ["ServiceNow"],
		size: 4,
		elements: ["record_4", "record_9", "record_11", "record_12"],
	},
	{
		sets: ["SAP", "Oracle"],
		size: 2,
		elements: ["record_1", "record_5"],
	},
	{
		sets: ["SAP", "LegacyMDM"],
		size: 2,
		elements: ["record_2", "record_3"],
	},
	{
		sets: ["SAP", "LegacyMDM", "ServiceNow"],
		size: 1,
		elements: ["record_9"],
	},
];

const meta = preview.meta({
	title: "Charts/SetOverlapChart",
	component: SetOverlapChart,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [FullscreenDecorator],
	args: {
		sets: defaultSets,
		intersections: defaultIntersections,
		mode: "intersection",
	},
});

export default meta;

export const Default = meta.story({
	args: {
		sets: defaultSets,
		intersections: defaultIntersections,
	},
});

const setsMinimal: DataSet[] = [
	{
		name: "SAP",
		size: 7,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_6",
			"record_7",
		],
	},
	{
		name: "Oracle",
		size: 5,
		elements: ["record_1", "record_5", "record_8", "record_9", "record_10"],
	},
	{
		name: "LegacyMDM",
		size: 6,
		elements: [
			"record_2",
			"record_3",
			"record_8",
			"record_11",
			"record_12",
			"record_13",
		],
	},
	{
		name: "ServiceNow",
		size: 5,
		elements: ["record_4", "record_6", "record_11", "record_14", "record_15"],
	},
	{
		name: "SFDC",
		size: 4,
		elements: ["record_7", "record_10", "record_13", "record_16"],
	},
];

const intersectionsMininal: Intersection[] = [
	{
		sets: ["SAP"],
		size: 7,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_6",
			"record_7",
		],
	},
	{
		sets: ["LegacyMDM"],
		size: 6,
		elements: [
			"record_2",
			"record_3",
			"record_8",
			"record_11",
			"record_12",
			"record_13",
		],
	},
	{
		sets: ["Oracle"],
		size: 5,
		elements: ["record_1", "record_5", "record_8", "record_9", "record_10"],
	},
	{
		sets: ["ServiceNow"],
		size: 5,
		elements: ["record_4", "record_6", "record_11", "record_14", "record_15"],
	},
	{
		sets: ["SFDC"],
		size: 4,
		elements: ["record_7", "record_10", "record_13", "record_16"],
	},
	{
		sets: ["SAP", "Oracle"],
		size: 2,
		elements: ["record_1", "record_5"],
	},
	{
		sets: ["SAP", "LegacyMDM"],
		size: 2,
		elements: ["record_2", "record_3"],
	},
	{
		sets: ["SAP", "ServiceNow"],
		size: 2,
		elements: ["record_4", "record_6"],
	},
	{
		sets: ["Oracle", "LegacyMDM"],
		size: 1,
		elements: ["record_8"],
	},
	{
		sets: ["Oracle", "SFDC"],
		size: 1,
		elements: ["record_10"],
	},
];

export const IntersectionMode = meta.story({
	args: {
		sets: setsMinimal,
		intersections: intersectionsMininal,
		mode: "intersection",
	},
});

const setsDistinct: DataSet[] = [
	{ name: "SAP", size: 355300, elements: [] },
	{ name: "Oracle", size: 255200, elements: [] },
	{ name: "LegacyMDM", size: 209100, elements: [] },
	{ name: "ServiceNow", size: 205500, elements: [] },
	{ name: "SFDC", size: 205500, elements: [] },
];

const intersectionsDistinct: Intersection[] = [
	{ sets: ["SAP"], size: 86300, elements: [] },
	{ sets: ["Oracle"], size: 52900, elements: [] },
	{ sets: ["SAP", "Oracle"], size: 34200, elements: [] },
	{ sets: ["SAP", "LegacyMDM"], size: 57400, elements: [] },
	{ sets: ["Oracle", "LegacyMDM"], size: 34100, elements: [] },
	{ sets: ["ServiceNow", "SFDC", "SAP"], size: 57900, elements: [] },
	{ sets: ["ServiceNow", "SFDC", "Oracle"], size: 33800, elements: [] },
	{ sets: ["ServiceNow", "SFDC", "SAP", "Oracle"], size: 25600, elements: [] },
	{
		sets: ["ServiceNow", "SFDC", "SAP", "LegacyMDM"],
		size: 43000,
		elements: [],
	},
	{
		sets: ["ServiceNow", "SFDC", "SAP", "Oracle", "LegacyMDM"],
		size: 21500,
		elements: [],
	},
];

export const DistinctIntersectionMode = meta.story({
	args: {
		sets: setsDistinct,
		intersections: intersectionsDistinct,
		mode: "distinctIntersection",
	},
});

const setsComplex: DataSet[] = [
	{
		name: "SAP",
		size: 17,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_5",
			"record_6",
			"record_7",
			"record_8",
			"record_9",
			"record_10",
			"record_11",
			"record_12",
			"record_13",
			"record_14",
			"record_15",
			"record_16",
			"record_18",
			"record_19",
		],
	},
	{
		name: "Oracle",
		size: 9,
		elements: [
			"record_1",
			"record_6",
			"record_8",
			"record_10",
			"record_11",
			"record_13",
			"record_17",
			"record_18",
			"record_19",
		],
	},
	{
		name: "LegacyMDM",
		size: 15,
		elements: [
			"record_1",
			"record_2",
			"record_4",
			"record_7",
			"record_8",
			"record_9",
			"record_10",
			"record_11",
			"record_13",
			"record_14",
			"record_15",
			"record_16",
			"record_17",
			"record_18",
			"record_19",
		],
	},
	{
		name: "ServiceNow",
		size: 12,
		elements: [
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_7",
			"record_9",
			"record_12",
			"record_14",
			"record_15",
			"record_16",
			"record_20",
			"record_21",
		],
	},
	{
		name: "SFDC",
		size: 5,
		elements: ["record_5", "record_6", "record_12", "record_20", "record_21"],
	},
	{
		name: "CRM",
		size: 5,
		elements: ["record_4", "record_6", "record_9", "record_16", "record_21"],
	},
];

const intersectionsComplex: Intersection[] = [
	{
		sets: ["SAP"],
		size: 17,
		elements: [
			"record_1",
			"record_2",
			"record_3",
			"record_5",
			"record_6",
			"record_7",
			"record_8",
			"record_9",
			"record_10",
			"record_11",
			"record_12",
			"record_13",
			"record_14",
			"record_15",
			"record_16",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["LegacyMDM"],
		size: 15,
		elements: [
			"record_1",
			"record_2",
			"record_4",
			"record_7",
			"record_8",
			"record_9",
			"record_10",
			"record_11",
			"record_13",
			"record_14",
			"record_15",
			"record_16",
			"record_17",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["LegacyMDM", "SAP"],
		size: 13,
		elements: [
			"record_1",
			"record_2",
			"record_7",
			"record_8",
			"record_9",
			"record_10",
			"record_11",
			"record_13",
			"record_14",
			"record_15",
			"record_16",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["ServiceNow"],
		size: 12,
		elements: [
			"record_2",
			"record_3",
			"record_4",
			"record_5",
			"record_7",
			"record_9",
			"record_12",
			"record_14",
			"record_15",
			"record_16",
			"record_20",
			"record_21",
		],
	},
	{
		sets: ["Oracle"],
		size: 9,
		elements: [
			"record_1",
			"record_6",
			"record_8",
			"record_10",
			"record_11",
			"record_13",
			"record_17",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["ServiceNow", "SAP"],
		size: 9,
		elements: [
			"record_2",
			"record_3",
			"record_5",
			"record_7",
			"record_9",
			"record_12",
			"record_14",
			"record_15",
			"record_16",
		],
	},
	{
		sets: ["Oracle", "LegacyMDM"],
		size: 8,
		elements: [
			"record_1",
			"record_8",
			"record_10",
			"record_11",
			"record_13",
			"record_17",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["Oracle", "SAP"],
		size: 8,
		elements: [
			"record_1",
			"record_6",
			"record_8",
			"record_10",
			"record_11",
			"record_13",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["Oracle", "LegacyMDM", "SAP"],
		size: 7,
		elements: [
			"record_1",
			"record_8",
			"record_10",
			"record_11",
			"record_13",
			"record_18",
			"record_19",
		],
	},
	{
		sets: ["ServiceNow", "LegacyMDM"],
		size: 7,
		elements: [
			"record_2",
			"record_4",
			"record_7",
			"record_9",
			"record_14",
			"record_15",
			"record_16",
		],
	},
	{
		sets: ["ServiceNow", "LegacyMDM", "SAP"],
		size: 6,
		elements: [
			"record_2",
			"record_7",
			"record_9",
			"record_14",
			"record_15",
			"record_16",
		],
	},
	{
		sets: ["SFDC"],
		size: 5,
		elements: ["record_5", "record_6", "record_12", "record_20", "record_21"],
	},
	{
		sets: ["CRM"],
		size: 5,
		elements: ["record_4", "record_6", "record_9", "record_16", "record_21"],
	},
	{
		sets: ["ServiceNow", "SFDC"],
		size: 4,
		elements: ["record_5", "record_12", "record_20", "record_21"],
	},
	{
		sets: ["ServiceNow", "CRM"],
		size: 4,
		elements: ["record_4", "record_9", "record_16", "record_21"],
	},
	{
		sets: ["LegacyMDM", "CRM"],
		size: 3,
		elements: ["record_4", "record_9", "record_16"],
	},
	{
		sets: ["ServiceNow", "LegacyMDM", "CRM"],
		size: 3,
		elements: ["record_4", "record_9", "record_16"],
	},
	{
		sets: ["SFDC", "SAP"],
		size: 3,
		elements: ["record_5", "record_6", "record_12"],
	},
	{
		sets: ["CRM", "SAP"],
		size: 3,
		elements: ["record_6", "record_9", "record_16"],
	},
	{
		sets: ["ServiceNow", "SFDC", "SAP"],
		size: 2,
		elements: ["record_5", "record_12"],
	},
	{
		sets: ["SFDC", "CRM"],
		size: 2,
		elements: ["record_6", "record_21"],
	},
	{
		sets: ["LegacyMDM", "CRM", "SAP"],
		size: 2,
		elements: ["record_9", "record_16"],
	},
	{
		sets: ["ServiceNow", "CRM", "SAP"],
		size: 2,
		elements: ["record_9", "record_16"],
	},
	{
		sets: ["ServiceNow", "LegacyMDM", "CRM", "SAP"],
		size: 2,
		elements: ["record_9", "record_16"],
	},
	{
		sets: ["Oracle", "SFDC"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["Oracle", "SFDC", "SAP"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["Oracle", "CRM"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["Oracle", "SFDC", "CRM"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["SFDC", "CRM", "SAP"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["Oracle", "CRM", "SAP"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["Oracle", "SFDC", "CRM", "SAP"],
		size: 1,
		elements: ["record_6"],
	},
	{
		sets: ["ServiceNow", "SFDC", "CRM"],
		size: 1,
		elements: ["record_21"],
	},
];

export const HorizontalScrolling = meta.story({
	args: {
		sets: setsComplex,
		intersections: intersectionsComplex,
	},
});

export const WithAxisLabels = meta.story({
	args: {
		sets: defaultSets,
		intersections: defaultIntersections,
		intersectionChartAxisLabel: "Profile count",
		setsChartAxisLabel: "Set Size",
	},
});

export const Empty = meta.story({
	args: {
		sets: [],
		intersections: [],
	},
});

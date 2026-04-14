import preview from "@/.storybook/preview";
import usaGeoJSON from "./data/usa-states.geo.json";
import { GeoChart } from "./GeoChart";
import cssClasses from "./GeoChart.module.css";

const sampleData = [
	{ name: "California", value: 39 },
	{ name: "Texas", value: 29 },
	{ name: "Florida", value: 22 },
	{ name: "New York", value: 20 },
	{ name: "Pennsylvania", value: 13 },
	{ name: "Illinois", value: 12 },
	{ name: "Ohio", value: 11 },
	{ name: "Georgia", value: 10 },
	{ name: "North Carolina", value: 10 },
	{ name: "Michigan", value: 10 },
	{ name: "New Jersey", value: 9 },
	{ name: "Virginia", value: 8 },
	{ name: "Washington", value: 7 },
	{ name: "Arizona", value: 7 },
	{ name: "Tennessee", value: 7 },
	{ name: "Massachusetts", value: 7 },
	{ name: "Indiana", value: 6 },
	{ name: "Missouri", value: 6 },
	{ name: "Maryland", value: 6 },
	{ name: "Colorado", value: 5 },
	{ name: "Minnesota", value: 5 },
	{ name: "Wisconsin", value: 5 },
	{ name: "Alabama", value: 5 },
	{ name: "South Carolina", value: 5 },
	{ name: "Louisiana", value: 4 },
	{ name: "Kentucky", value: 4 },
	{ name: "Oregon", value: 4 },
	{ name: "Oklahoma", value: 3 },
	{ name: "Connecticut", value: 3 },
	{ name: "Iowa", value: 3 },
	{ name: "Mississippi", value: 2 },
	{ name: "Arkansas", value: 3 },
	{ name: "Utah", value: 3 },
	{ name: "Nevada", value: 3 },
	{ name: "Kansas", value: 2 },
	{ name: "New Mexico", value: 2 },
	{ name: "Nebraska", value: 1 },
	{ name: "West Virginia", value: 1 },
	{ name: "Idaho", value: 1 },
	{ name: "Maine", value: 1 },
	{ name: "New Hampshire", value: 1 },
	{ name: "Montana", value: 1 },
	{ name: "Delaware", value: 1 },
	{ name: "South Dakota", value: 0 },
	{ name: "North Dakota", value: 0 },
	{ name: "Wyoming", value: 0 },
	{ name: "Vermont", value: 0 },
];

const meta = preview.meta({
	title: "Charts/GeoChart",
	component: GeoChart,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		map: usaGeoJSON,
		data: sampleData,
		style: { aspectRatio: "3 / 2" },
	},
});

export const Default = meta.story({});

export const WithRoam = meta.story({
	args: {
		roam: true,
	},
});

export const CustomRanges = meta.story({
	args: {
		ranges: [
			{ min: 0, max: 2, label: "0 - 2M" },
			{ min: 3, max: 6, label: "3 - 6M" },
			{ min: 7, max: 12, label: "7 - 12M" },
			{ min: 13, max: 25, label: "13 - 25M" },
			{ min: 26, max: 40, label: "26 - 40M" },
		],
	},
});

export const WithUnits = meta.story({
	args: {
		units: "M",
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
		error: "Failed to load map data. Please try again later.",
	},
});

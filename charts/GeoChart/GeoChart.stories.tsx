import { FullscreenDecorator } from "@/.storybook/blocks/FullscreenDecorator";
import preview from "@/.storybook/preview";
import europeGeoJSON from "./data/europe.geo.json";
import usaGeoJSON from "./data/usa-states.geo.json";
import { GeoChart } from "./GeoChart";

const usaData = [
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

const europeData = [
	{ name: "Germany", value: 83 },
	{ name: "France", value: 67 },
	{ name: "United Kingdom", value: 66 },
	{ name: "Italy", value: 60 },
	{ name: "Spain", value: 47 },
	{ name: "Ukraine", value: 44 },
	{ name: "Poland", value: 38 },
	{ name: "Romania", value: 19 },
	{ name: "Netherlands", value: 17 },
	{ name: "Belgium", value: 11 },
	{ name: "Czechia", value: 10 },
	{ name: "Greece", value: 10 },
	{ name: "Portugal", value: 10 },
	{ name: "Sweden", value: 10 },
	{ name: "Hungary", value: 9 },
	{ name: "Belarus", value: 9 },
	{ name: "Austria", value: 8 },
	{ name: "Switzerland", value: 8 },
	{ name: "Serbia", value: 7 },
	{ name: "Bulgaria", value: 7 },
	{ name: "Denmark", value: 5 },
	{ name: "Finland", value: 5 },
	{ name: "Slovakia", value: 5 },
	{ name: "Norway", value: 5 },
	{ name: "Ireland", value: 4 },
	{ name: "Croatia", value: 4 },
	{ name: "Moldova", value: 3 },
	{ name: "Bosnia and Herzegovina", value: 3 },
	{ name: "Albania", value: 2 },
	{ name: "Lithuania", value: 2 },
	{ name: "North Macedonia", value: 2 },
	{ name: "Slovenia", value: 2 },
	{ name: "Latvia", value: 1 },
	{ name: "Estonia", value: 1 },
	{ name: "Montenegro", value: 0 },
	{ name: "Luxembourg", value: 0 },
	{ name: "Kosovo", value: 1 },
	{ name: "Iceland", value: 0 },
];

const meta = preview.meta({
	title: "Charts/GeoChart",
	component: GeoChart,
	tags: ["test"],
	parameters: {
		layout: "fullscreen",
		dualTheme: { split: "vertical" },
	},
	decorators: [FullscreenDecorator],
	args: {
		map: usaGeoJSON,
		data: usaData,
	},
});

export default meta;

export const Default = meta.story({
	parameters: {
		docs: {
			source: {
				code: `<GeoChart map={usaGeoJSON} data={data} />`,
			},
		},
	},
});

export const Europe = meta.story({
	args: {
		map: europeGeoJSON,
		data: europeData,
		units: "M",
	},
	parameters: {
		docs: {
			source: {
				code: `<GeoChart map={europeGeoJSON} data={data} units="M" />`,
			},
		},
	},
});

export const WithUnits = meta.story({
	args: {
		units: "M",
	},
	parameters: {
		docs: {
			source: {
				code: `<GeoChart map={usaGeoJSON} data={data} units="M" />`,
			},
		},
	},
});

export const Empty = meta.story({
	args: {
		data: [],
	},
	parameters: {
		docs: {
			source: {
				code: `<GeoChart map={usaGeoJSON} />`,
			},
		},
	},
});

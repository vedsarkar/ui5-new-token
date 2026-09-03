/** Sample content for the Data Quality screen. Illustrative only — not real data. */

export const user = {
	username: "Sam Dover",
	email: "sam.dover@reltio.com",
};

export const kpis: { label: string; value: string; accent?: boolean }[] = [
	{ label: "Active profiles", value: "428.1K", accent: true },
	{ label: "Inactive profiles", value: "0" },
	{ label: "Attributes", value: "158" },
	{ label: "Source systems", value: "6" },
];

/**
 * The consolidation chart: source profiles collapsing into Reltio profiles.
 *
 * Plotted in thousands so the axis reads 0 / 400 K / 800 K / 1200 K, matching
 * the design. `BarChart` appends a unit suffix but does not abbreviate, so
 * passing raw counts would label the axis 1,500,000.
 */
export const consolidationSeries = [
	{ stage: "Source profiles", profiles: 1300 },
	{ stage: "Reltio profiles", profiles: 428 },
];

/** Swatches use the SAP chart palette so the legend re-themes with everything else. */
export const sourceSystems: { name: string; color: string }[] = [
	{ name: "Marketo", color: "var(--sapChart_OrderedColor_5)" },
	{ name: "Salesforce", color: "var(--sapChart_OrderedColor_3)" },
	{ name: "Skilljar", color: "var(--sapChart_OrderedColor_7)" },
	{ name: "oAuth", color: "var(--sapChart_OrderedColor_4)" },
	{ name: "Platform Control Center", color: "var(--sapChart_OrderedColor_11)" },
	{ name: "Reltio", color: "var(--sapChart_OrderedColor_1)" },
];

/** Share is the bar's width against the 746.2K scale at the top of the column. */
export const sourceProfiles: { label: string; share: number }[] = [
	{ label: "746.2K", share: 100 },
	{ label: "493.7K", share: 66.2 },
	{ label: "15.8K", share: 2.1 },
	{ label: "10.7K", share: 1.4 },
	{ label: "3.1K", share: 0.4 },
	{ label: "4", share: 0.2 },
];

type Attribute = {
	type: string;
	name: string;
	badges: number;
	filled: number;
};

export const attributes: Attribute[] = [
	{ type: "ABC", name: "Name", badges: 2, filled: 62 },
	{ type: "ABC", name: "Surname", badges: 1, filled: 58 },
	{ type: "ABC", name: "SF Contact ID", badges: 1, filled: 54 },
];

export const attributeGroups: { name: string; children: Attribute[] }[] = [
	{
		name: "Job History Affiliation",
		children: [
			{ type: "ABC", name: "Name", badges: 2, filled: 4 },
			{ type: "ABC", name: "Company Logo", badges: 1, filled: 2 },
			{ type: "ABC", name: "LinkedIn URL", badges: 1, filled: 3 },
			{ type: "ABC", name: "Job Title", badges: 1, filled: 2 },
			{ type: "⏱", name: "Start Job", badges: 1, filled: 3 },
		],
	},
];

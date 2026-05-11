import { DynamicDateRange } from "@ui5/webcomponents-react/DynamicDateRange";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastOptions.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextOptions.js";

const meta = preview.meta({
	component: DynamicDateRange,
	parameters: {
		layout: "centered",
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "320px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({
	args: {
		options: "TODAY, YESTERDAY, TOMORROW, DATE, DATERANGE",
	},
});

export const RelativeOnly = meta.story({
	args: {
		options: "TODAY, YESTERDAY, LASTDAYS, LASTWEEKS, LASTMONTHS",
	},
});

export const FullSet = meta.story({
	args: {
		options:
			"TODAY, YESTERDAY, TOMORROW, DATE, DATERANGE, LASTDAYS, LASTWEEKS, LASTMONTHS, NEXTDAYS, NEXTWEEKS",
	},
});

export const Preselected = meta.story({
	args: {
		options: "TODAY, YESTERDAY, DATERANGE",
		value: { operator: "TODAY" },
	},
});

export const PreselectedRelative = meta.story({
	args: {
		options: "TODAY, LASTDAYS, LASTWEEKS",
		value: { operator: "LASTDAYS", values: [7] },
	},
});

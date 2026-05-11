import { Calendar } from "@ui5/webcomponents-react/Calendar";
import { CalendarDate } from "@ui5/webcomponents-react/CalendarDate";
import { CalendarDateRange } from "@ui5/webcomponents-react/CalendarDateRange";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Calendar,
	parameters: {
		layout: "centered",
	},
	args: {
		onSelectionChange: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const PreselectedDate = meta.story({
	render: (args) => (
		<Calendar {...args}>
			<CalendarDate value="2026-05-11" />
		</Calendar>
	),
});

export const RangeSelection = meta.story({
	args: {
		selectionMode: "Range",
	},
	render: (args) => (
		<Calendar {...args}>
			<CalendarDateRange startValue="2026-05-04" endValue="2026-05-15" />
		</Calendar>
	),
});

export const MultipleSelection = meta.story({
	args: {
		selectionMode: "Multiple",
	},
	render: (args) => (
		<Calendar {...args}>
			<CalendarDate value="2026-05-06" />
			<CalendarDate value="2026-05-13" />
			<CalendarDate value="2026-05-20" />
		</Calendar>
	),
});

export const WithMinMax = meta.story({
	args: {
		minDate: "2026-05-01",
		maxDate: "2026-05-31",
	},
	render: (args) => (
		<Calendar {...args}>
			<CalendarDate value="2026-05-15" />
		</Calendar>
	),
});

export const HideWeekNumbers = meta.story({
	args: {
		hideWeekNumbers: true,
	},
});

export const IslamicSecondary = meta.story({
	args: {
		secondaryCalendarType: "Islamic",
	},
});

export const NonWorkingDaysVisible = meta.story({
	args: {
		calendarWeekNumbering: "ISO_8601",
	},
});

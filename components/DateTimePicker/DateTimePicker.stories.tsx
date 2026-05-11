import { DateTimePicker } from "@ui5/webcomponents-react/DateTimePicker";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: DateTimePicker,
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Schedule run at",
		onChange: fn(),
		onInput: fn(),
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

export const Default = meta.story({});

export const Preselected = meta.story({
	args: {
		formatPattern: "yyyy-MM-dd HH:mm:ss",
		value: "2026-05-11 14:30:00",
	},
});

export const TwelveHourFormat = meta.story({
	args: {
		formatPattern: "MMM d, yyyy h:mm a",
		value: "May 11, 2026 2:30 PM",
	},
});

export const MinMaxConstraints = meta.story({
	args: {
		formatPattern: "yyyy-MM-dd HH:mm",
		minDate: "2026-05-01 00:00",
		maxDate: "2026-05-31 23:59",
		placeholder: "Time in May 2026",
	},
});

export const Required = meta.story({
	args: {
		required: true,
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
		formatPattern: "yyyy-MM-dd HH:mm",
		value: "2026-05-11 14:30",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		formatPattern: "yyyy-MM-dd HH:mm",
		value: "2026-05-11 14:30",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "Invalid datetime",
	},
});

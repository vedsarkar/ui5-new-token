import { TimePicker } from "@ui5/webcomponents-react/TimePicker";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: TimePicker,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Cutoff time",
		onChange: fn(),
		onInput: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "240px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const Preselected = meta.story({
	args: {
		formatPattern: "HH:mm:ss",
		value: "14:30:00",
	},
});

export const TwelveHourFormat = meta.story({
	args: {
		formatPattern: "h:mm a",
		value: "2:30 PM",
	},
});

export const HoursMinutesOnly = meta.story({
	args: {
		formatPattern: "HH:mm",
		value: "09:15",
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
		formatPattern: "HH:mm",
		value: "09:15",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		formatPattern: "HH:mm",
		value: "09:15",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "Invalid",
	},
});

import { DateRangePicker } from "@ui5/webcomponents-react/DateRangePicker";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: DateRangePicker,
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Validity window",
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
		formatPattern: "yyyy-MM-dd",
		value: "2026-05-01 - 2026-05-31",
	},
});

export const CustomDelimiter = meta.story({
	args: {
		formatPattern: "yyyy-MM-dd",
		delimiter: "→",
		value: "2026-05-01 → 2026-05-31",
	},
});

export const MinMaxConstraints = meta.story({
	args: {
		formatPattern: "yyyy-MM-dd",
		minDate: "2026-01-01",
		maxDate: "2026-12-31",
		placeholder: "Window inside 2026",
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
		formatPattern: "yyyy-MM-dd",
		value: "2026-05-01 - 2026-05-31",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		formatPattern: "yyyy-MM-dd",
		value: "2026-05-01 - 2026-05-31",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "Invalid range",
	},
});

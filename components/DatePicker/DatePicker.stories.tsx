import { DatePicker } from "@ui5/webcomponents-react/DatePicker";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: DatePicker,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		placeholder: "Effective date",
		onChange: fn(),
		onInput: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "260px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const Preselected = meta.story({
	args: {
		value: "May 11, 2026",
	},
});

export const CustomFormat = meta.story({
	args: {
		formatPattern: "yyyy-MM-dd",
		value: "2026-05-11",
	},
});

export const MinMaxConstraints = meta.story({
	args: {
		minDate: "2026-01-01",
		maxDate: "2026-12-31",
		formatPattern: "yyyy-MM-dd",
		placeholder: "Date in 2026 only",
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
		value: "May 11, 2026",
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		value: "May 11, 2026",
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: "Not a date",
	},
});

export const WithLabel = meta.story({
	args: {
		accessibleName: "Validity start",
		placeholder: "Validity start",
	},
});

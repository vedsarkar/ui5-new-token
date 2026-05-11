import { StepInput } from "@ui5/webcomponents-react/StepInput";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: StepInput,
	parameters: {
		layout: "centered",
	},
	args: {
		value: 1,
		onChange: fn(),
		onInput: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "200px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const PageSize = meta.story({
	args: {
		min: 1,
		max: 999,
		step: 1,
		value: 25,
		accessibleName: "Rows per page",
	},
});

export const Percentage = meta.story({
	args: {
		min: 0,
		max: 100,
		step: 5,
		value: 50,
		accessibleName: "Match threshold percent",
	},
});

export const DecimalPrecision = meta.story({
	args: {
		min: 0,
		max: 10,
		step: 0.25,
		value: 1.5,
		valuePrecision: 2,
		accessibleName: "Weight",
	},
});

export const NegativeAllowed = meta.story({
	args: {
		min: -10,
		max: 10,
		step: 1,
		value: 0,
		accessibleName: "Offset",
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
		value: 5,
	},
});

export const ReadOnly = meta.story({
	args: {
		readonly: true,
		value: 5,
	},
});

export const ErrorState = meta.story({
	args: {
		valueState: "Negative",
		value: 999,
		min: 0,
		max: 100,
	},
});

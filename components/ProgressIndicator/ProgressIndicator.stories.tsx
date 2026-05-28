import { ProgressIndicator } from "@ui5/webcomponents-react/ProgressIndicator";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ProgressIndicator,
	tags: ["doc-only"],
	parameters: { layout: "centered" },
	args: {
		value: 42,
	},
	decorators: [
		(Story) => (
			<div style={{ width: 320 }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const WithDisplayValue = meta.story({
	args: {
		value: 60,
		displayValue: "60 of 100 records imported",
	},
});

export const HiddenValue = meta.story({
	args: {
		value: 75,
		hideValue: true,
	},
});

export const Information = meta.story({
	args: {
		value: 50,
		valueState: "Information",
	},
});

export const Positive = meta.story({
	args: {
		value: 100,
		valueState: "Positive",
		displayValue: "Complete",
	},
});

export const Critical = meta.story({
	args: {
		value: 80,
		valueState: "Critical",
		displayValue: "Approaching quota",
	},
});

export const Negative = meta.story({
	args: {
		value: 33,
		valueState: "Negative",
		displayValue: "Failed",
	},
});

export const Empty = meta.story({
	args: {
		value: 0,
	},
});

export const Full = meta.story({
	args: {
		value: 100,
	},
});

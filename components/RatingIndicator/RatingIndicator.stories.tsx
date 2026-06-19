import { RatingIndicator } from "@ui5/webcomponents-react/RatingIndicator";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: RatingIndicator,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		value: 3,
		accessibleName: "Data quality score",
		onChange: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const ReadOnly = meta.story({
	args: {
		value: 4,
		readonly: true,
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
});

export const Large = meta.story({
	args: {
		size: "L",
	},
});

export const CustomMax = meta.story({
	args: {
		value: 7,
		max: 10,
	},
});

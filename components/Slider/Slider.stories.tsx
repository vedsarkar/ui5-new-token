import { Slider } from "@ui5/webcomponents-react/Slider";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: Slider,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		min: 0,
		max: 100,
		value: 50,
		onChange: fn(),
		onInput: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: "360px" }}>
				<Story />
			</div>
		),
	],
});

export default meta;

export const Default = meta.story({});

export const AutoMergeThreshold = meta.story({
	args: {
		min: 0,
		max: 100,
		value: 85,
		step: 5,
		showTooltip: true,
	},
});

export const WithTickmarks = meta.story({
	args: {
		step: 10,
		showTickmarks: true,
	},
});

export const WithLabels = meta.story({
	args: {
		step: 25,
		showTickmarks: true,
		labelInterval: 1,
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
});

export const Custom = meta.story({
	args: {
		min: -100,
		max: 100,
		step: 10,
		value: 0,
		showTooltip: true,
		showTickmarks: true,
		labelInterval: 2,
	},
});

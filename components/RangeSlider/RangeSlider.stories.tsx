import { RangeSlider } from "@ui5/webcomponents-react/RangeSlider";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: RangeSlider,
	parameters: {
		layout: "centered",
	},
	args: {
		min: 0,
		max: 100,
		startValue: 25,
		endValue: 75,
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

export const MatchScoreRange = meta.story({
	args: {
		min: 0,
		max: 100,
		startValue: 60,
		endValue: 95,
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
		step: 20,
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
		min: -50,
		max: 50,
		step: 5,
		startValue: -10,
		endValue: 20,
		showTooltip: true,
		showTickmarks: true,
		labelInterval: 2,
	},
});

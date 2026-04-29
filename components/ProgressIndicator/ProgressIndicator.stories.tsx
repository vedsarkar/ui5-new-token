import { expect, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { ProgressIndicator } from "./ProgressIndicator";
import cssClasses from "./ProgressIndicator.module.css";

const meta = preview.meta({
	component: ProgressIndicator,
	parameters: {
		cssClasses,
	},
	decorators: [
		(Story) => (
			<div style={{ width: 400 }}>
				<Story />
			</div>
		),
	],
});

export const Default = meta.story({
	args: {
		value: 50,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const bar = canvas.getByRole("progressbar");
		expect(bar).toHaveAttribute("aria-valuenow", "50");
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

export const ValueStateError = meta.story({
	name: "Error",
	args: {
		value: 25,
		valueState: "Error",
	},
});

export const ValueStateWarning = meta.story({
	name: "Warning",
	args: {
		value: 50,
		valueState: "Warning",
	},
});

export const ValueStateSuccess = meta.story({
	name: "Success",
	args: {
		value: 75,
		valueState: "Success",
	},
});

export const ValueStateInformation = meta.story({
	name: "Information",
	args: {
		value: 60,
		valueState: "Information",
	},
});

export const CustomDisplayValue = meta.story({
	args: {
		value: 30,
		displayValue: "3 of 10",
	},
});

export const HiddenValue = meta.story({
	args: {
		value: 65,
		hideValue: true,
	},
});

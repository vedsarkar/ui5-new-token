import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { Chip } from "./Chip";

const meta = preview.meta({
	component: Chip,
	parameters: {
		layout: "centered",
	},
});

export const Default = meta.story({
	args: {
		children: "Full name",
	},
});

export const Removable = meta.story({
	args: {
		children: "Full name",
		onRemove: fn(),
	},
});

export const Disabled = meta.story({
	args: {
		children: "Full name",
		onRemove: fn(),
		disabled: true,
	},
});

export const CustomStyled = meta.story({
	args: {
		children: "Custom Chip",
		onRemove: fn(),
		style: {
			"--reltio-chip-background": "#d1ecf1",
			"--reltio-chip-color": "#0c5460",
		},
	},
});

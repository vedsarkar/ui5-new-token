import { ToggleButton } from "@ui5/webcomponents-react/ToggleButton";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";
import "@ui5/webcomponents-icons/dist/filter.js";

const meta = preview.meta({
	component: ToggleButton,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Filter",
		onClick: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const Pressed = meta.story({
	args: {
		pressed: true,
	},
});

export const Emphasized = meta.story({
	args: {
		design: "Emphasized",
		pressed: true,
	},
});

export const WithIcon = meta.story({
	args: {
		icon: "filter",
		children: "Filters",
	},
});

export const Disabled = meta.story({
	args: {
		disabled: true,
	},
});

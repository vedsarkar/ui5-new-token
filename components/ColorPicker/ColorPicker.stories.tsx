import { ColorPicker } from "@ui5/webcomponents-react/ColorPicker";
import { fn } from "storybook/test";
import preview from "../../.storybook/preview";

const meta = preview.meta({
	component: ColorPicker,
	tags: ["doc-only"],
	parameters: {
		layout: "centered",
	},
	args: {
		accessibleName: "Pick a color",
		onChange: fn(),
	},
});

export default meta;

export const Default = meta.story({});

export const PresetValue = meta.story({
	args: {
		value: "#1873b4",
	},
});

export const Simplified = meta.story({
	args: {
		simplified: true,
		value: "#107e3e",
	},
});

import preview from "@/.storybook/preview";
import { Divider } from "./Divider";
import cssClasses from "./Divider.module.css";

const meta = preview.meta({
	component: Divider,
	parameters: {
		layout: "padded",
		cssClasses,
	},
});

export const Default = meta.story({});

export const Labeled = meta.story({
	args: {
		children: "Section",
	},
});

export const CenterAligned = meta.story({
	args: {
		children: "Section",
		align: "center",
	},
});

export const EndAligned = meta.story({
	args: {
		children: "Section",
		align: "end",
	},
});

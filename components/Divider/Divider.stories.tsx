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

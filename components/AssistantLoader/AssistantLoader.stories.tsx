import preview from "@/.storybook/preview";
import { AssistantLoader } from "./AssistantLoader";
import cssClasses from "./AssistantLoader.module.css";

const meta = preview.meta({
	component: AssistantLoader,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({});

export const CustomSize = meta.story({
	args: {
		size: "64px",
	},
});

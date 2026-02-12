import preview from "@/.storybook/preview";
import { AssistantLoader } from "./AssistantLoader";

const meta = preview.meta({
	component: AssistantLoader,
	parameters: {
		layout: "centered",
	},
});

export const Default = meta.story({});

export const CustomSize = meta.story({
	args: {
		style: { "--reltio-assistant-loader-size": "48px" },
	},
});

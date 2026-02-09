import preview from "@/.storybook/preview";
import { AssistantLoader } from "./AssistantLoader";

const meta = preview.meta({
	component: AssistantLoader,
	parameters: {
		layout: "centered",
	},
});

export const Small = meta.story({
	args: {
		size: 20,
	},
});

export const Medium = meta.story({
	args: {
		size: 32,
	},
});

export const Large = meta.story({
	args: {
		size: 48,
	},
});

export const WithCustomLabel = meta.story({
	args: {
		label: "Fetching data…",
	},
});

export const WithoutLabel = meta.story({
	args: {
		label: undefined,
	},
});

export const CustomSize = meta.story({
	args: {
		size: 64,
	},
});

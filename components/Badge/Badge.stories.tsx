import { expect, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Notifications } from "@/icons/Notifications";
import { Badge } from "./Badge";
import cssClasses from "./Badge.module.css";

const meta = preview.meta({
	component: Badge,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	args: {
		content: 3,
		children: <Notifications />,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const indicator = canvas.getByText("3");
		expect(indicator).toBeInTheDocument();
	},
});

export const Dot = meta.story({
	args: {
		children: <Notifications />,
	},
});

export const MaxCount = meta.story({
	args: {
		content: 150,
		children: <Notifications />,
	},
});

export const Primary = meta.story({
	args: {
		content: 5,
		color: "primary",
		children: <Notifications />,
	},
});

export const Standalone = meta.story({
	args: {
		content: 3,
	},
});

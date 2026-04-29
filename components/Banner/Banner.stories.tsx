import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Star } from "@/icons/Star";
import { Banner } from "./Banner";
import cssClasses from "./Banner.module.css";

const meta = preview.meta({
	component: Banner,
	parameters: {
		layout: "padded",
		cssClasses,
	},
	args: {
		onDismiss: fn(),
	},
});

export const Information = meta.story({
	args: {
		title: "Information",
		children:
			"This is an informational banner with important details for the user.",
	},
});

export const Positive = meta.story({
	args: {
		design: "positive",
		title: "Success",
		children: "The operation completed successfully.",
	},
});

export const Critical = meta.story({
	args: {
		design: "critical",
		title: "Warning",
		children: "Please review the changes before proceeding.",
	},
});

export const Negative = meta.story({
	args: {
		design: "negative",
		title: "Error",
		children: "Something went wrong. Please try again later.",
	},
});

export const Dismissible = meta.story({
	args: {
		title: "Dismissible banner",
		children: "Click the close button to dismiss this banner.",
		dismissible: true,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const closeButton = canvas.getByRole("button", { name: "Dismiss" });

		await userEvent.click(closeButton);
		expect(args.onDismiss).toHaveBeenCalled();
	},
});

export const CustomIcon = meta.story({
	args: {
		title: "Featured",
		children: "This banner uses a custom icon instead of the default.",
		icon: <Star />,
	},
});

export const NoIcon = meta.story({
	args: {
		title: "No icon",
		children: "This banner has the icon hidden by setting icon to null.",
		icon: null,
	},
});

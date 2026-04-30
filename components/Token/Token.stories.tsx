import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Token } from "./Token";
import cssClasses from "./Token.module.css";

const meta = preview.meta({
	component: Token,
	parameters: {
		layout: "centered",
		cssClasses,
	},
	args: {
		onSelect: fn(),
		onDelete: fn(),
	},
});

export const Default = meta.story({
	args: {
		text: "Token",
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const token = canvas.getByRole("option");

		await userEvent.click(token);
		expect(args.onSelect).toHaveBeenCalled();
	},
});

export const Selected = meta.story({
	args: {
		text: "Selected Token",
		selected: true,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const token = canvas.getByRole("option");
		expect(token).toHaveAttribute("aria-selected", "true");
	},
});

export const ReadOnly = meta.story({
	args: {
		text: "Read-only Token",
		readOnly: true,
	},
	play: async ({ canvasElement }) => {
		const buttons = canvasElement.querySelectorAll("button");
		expect(buttons.length).toBe(0);
	},
});

export const ReadOnlySelected = meta.story({
	args: {
		text: "Read-only Selected",
		readOnly: true,
		selected: true,
	},
});

export const WithDeleteButton = meta.story({
	args: {
		text: "Deletable Token",
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const deleteButton = canvas.getByRole("button", { name: "Delete" });

		await userEvent.click(deleteButton);
		expect(args.onDelete).toHaveBeenCalled();
	},
});

export const Disabled = meta.story({
	args: {
		text: "Disabled Token",
		disabled: true,
	},
});

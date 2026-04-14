import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Checkbox } from "./Checkbox";
import cssClasses from "./Checkbox.module.css";

const meta = preview.meta({
	component: Checkbox,
	parameters: {
		layout: "centered",
		cssClasses,
	},
	args: {
		onChange: fn(),
	},
});

export const Default = meta.story({
	render: (args) => {
		const [values, setValues] = useState({ a: true, b: false, c: false });
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<Checkbox
					checked={values.a}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, a: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option A
				</Checkbox>
				<Checkbox
					checked={values.b}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, b: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option B
				</Checkbox>
				<Checkbox
					checked={values.c}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, c: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option C
				</Checkbox>
			</div>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const checkboxes = canvas.getAllByRole("checkbox");

		expect(checkboxes[0]).toBeChecked();
		expect(checkboxes[1]).not.toBeChecked();

		await userEvent.click(checkboxes[1]);
		expect(checkboxes[1]).toBeChecked();
		expect(args.onChange).toHaveBeenCalled();

		await userEvent.click(checkboxes[0]);
		expect(checkboxes[0]).not.toBeChecked();
	},
});

export const Indeterminate = meta.story({
	args: {
		indeterminate: true,
		children: "Select all",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole("checkbox");

		expect(checkbox).toHaveAttribute("aria-checked", "mixed");
	},
});

export const ErrorState = meta.story({
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Checkbox error onChange={args?.onChange}>
				Accept terms
			</Checkbox>
			<Checkbox error checked onChange={args?.onChange}>
				Privacy policy
			</Checkbox>
		</div>
	),
});

export const Disabled = meta.story({
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Checkbox disabled checked onChange={args?.onChange}>
				Checked disabled
			</Checkbox>
			<Checkbox disabled onChange={args?.onChange}>
				Unchecked disabled
			</Checkbox>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkboxes = canvas.getAllByRole("checkbox");

		expect(checkboxes[0]).toBeDisabled();
		expect(checkboxes[1]).toBeDisabled();
	},
});

export const Horizontal = meta.story({
	render: (args) => {
		const [values, setValues] = useState({ a: true, b: false, c: false });
		return (
			<div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
				<Checkbox
					checked={values.a}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, a: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option A
				</Checkbox>
				<Checkbox
					checked={values.b}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, b: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option B
				</Checkbox>
				<Checkbox
					checked={values.c}
					onChange={(e, checked) => {
						setValues((v) => ({ ...v, c: checked }));
						args?.onChange?.(e, checked);
					}}
				>
					Option C
				</Checkbox>
			</div>
		);
	},
});

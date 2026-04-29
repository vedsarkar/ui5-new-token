import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Radio } from "./Radio";
import cssClasses from "./Radio.module.css";

const meta = preview.meta({
	component: Radio,
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
		const [value, setValue] = useState("option1");
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<Radio
					name="default-group"
					checked={value === "option1"}
					onChange={(e, checked) => {
						if (checked) setValue("option1");
						args?.onChange?.(e, checked);
					}}
				>
					Option 1
				</Radio>
				<Radio
					name="default-group"
					checked={value === "option2"}
					onChange={(e, checked) => {
						if (checked) setValue("option2");
						args?.onChange?.(e, checked);
					}}
				>
					Option 2
				</Radio>
				<Radio
					name="default-group"
					checked={value === "option3"}
					onChange={(e, checked) => {
						if (checked) setValue("option3");
						args?.onChange?.(e, checked);
					}}
				>
					Option 3
				</Radio>
			</div>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole("radio");

		expect(radios[0]).toBeChecked();
		expect(radios[1]).not.toBeChecked();

		await userEvent.click(radios[1]);
		expect(radios[1]).toBeChecked();
		expect(radios[0]).not.toBeChecked();
		expect(args.onChange).toHaveBeenCalled();
	},
});

export const ErrorState = meta.story({
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Radio
				name="error-group"
				valueState="Error"
				checked
				onChange={args?.onChange}
			>
				Selected option
			</Radio>
			<Radio name="error-group" valueState="Error" onChange={args?.onChange}>
				Another option
			</Radio>
		</div>
	),
});

export const Disabled = meta.story({
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Radio name="disabled-group" disabled checked onChange={args?.onChange}>
				Checked disabled
			</Radio>
			<Radio name="disabled-group" disabled onChange={args?.onChange}>
				Unchecked disabled
			</Radio>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const radios = canvas.getAllByRole("radio");

		expect(radios[0]).toBeDisabled();
		expect(radios[1]).toBeDisabled();
	},
});

export const Horizontal = meta.story({
	render: (args) => {
		const [value, setValue] = useState("option1");
		return (
			<div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
				<Radio
					name="horizontal-group"
					checked={value === "option1"}
					onChange={(e, checked) => {
						if (checked) setValue("option1");
						args?.onChange?.(e, checked);
					}}
				>
					Option 1
				</Radio>
				<Radio
					name="horizontal-group"
					checked={value === "option2"}
					onChange={(e, checked) => {
						if (checked) setValue("option2");
						args?.onChange?.(e, checked);
					}}
				>
					Option 2
				</Radio>
				<Radio
					name="horizontal-group"
					checked={value === "option3"}
					onChange={(e, checked) => {
						if (checked) setValue("option3");
						args?.onChange?.(e, checked);
					}}
				>
					Option 3
				</Radio>
			</div>
		);
	},
});

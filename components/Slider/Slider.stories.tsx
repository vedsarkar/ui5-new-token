import { useState } from "react";
import { expect, fn, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Slider } from "./Slider";
import cssClasses from "./Slider.module.css";

const meta = preview.meta({
	component: Slider,
	parameters: {
		layout: "centered",
		cssClasses,
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: 300 }}>
				<Story />
			</div>
		),
	],
});

export const Default = meta.story({
	render: (args) => {
		const [value, setValue] = useState(50);
		return (
			<div>
				<Slider
					value={value}
					onChange={(e, val) => {
						setValue(val);
						args?.onChange?.(e, val);
					}}
					aria-label="Default slider"
				/>
				<span style={{ fontSize: 14, color: "var(--sapTextColor)" }}>
					Value: {value}
				</span>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("slider");

		expect(input).toBeInTheDocument();
	},
});

export const CustomRange = meta.story({
	render: (args) => {
		const [value, setValue] = useState(5);
		return (
			<div>
				<Slider
					value={value}
					onChange={(e, val) => {
						setValue(val);
						args?.onChange?.(e, val);
					}}
					min={0}
					max={10}
					step={1}
					aria-label="Custom range slider"
				/>
				<span style={{ fontSize: 14, color: "var(--sapTextColor)" }}>
					Value: {value}
				</span>
			</div>
		);
	},
});

export const Disabled = meta.story({
	render: () => <Slider value={30} disabled aria-label="Disabled slider" />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("slider");

		expect(input).toBeDisabled();
	},
});

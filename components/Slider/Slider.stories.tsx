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
			<div style={{ width: 400 }}>
				<Story />
			</div>
		),
	],
});

export const Default = meta.story({
	render: (args) => {
		const [value, setValue] = useState(50);
		return (
			<Slider
				{...args}
				value={value}
				onChange={(e, val) => {
					setValue(val);
					args?.onChange?.(e, val);
				}}
				aria-label="Default slider"
			/>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("slider");
		expect(input).toBeInTheDocument();
	},
});

export const WithTooltip = meta.story({
	render: (args) => {
		const [value, setValue] = useState(50);
		return (
			<Slider
				{...args}
				value={value}
				showTooltip
				onChange={(e, val) => {
					setValue(val);
					args?.onChange?.(e, val);
				}}
				aria-label="Slider with tooltip"
			/>
		);
	},
});

export const WithTickmarks = meta.story({
	render: (args) => {
		const [value, setValue] = useState(50);
		return (
			<Slider
				{...args}
				value={value}
				min={0}
				max={100}
				step={10}
				showTickmarks
				onChange={(e, val) => {
					setValue(val);
					args?.onChange?.(e, val);
				}}
				aria-label="Slider with tickmarks"
			/>
		);
	},
});

export const WithTickmarksAndLabels = meta.story({
	render: (args) => {
		const [value, setValue] = useState(40);
		return (
			<Slider
				{...args}
				value={value}
				min={0}
				max={100}
				step={10}
				showTickmarks
				labelInterval={2}
				showTooltip
				onChange={(e, val) => {
					setValue(val);
					args?.onChange?.(e, val);
				}}
				aria-label="Slider with labels"
			/>
		);
	},
});

export const CustomRange = meta.story({
	render: (args) => {
		const [value, setValue] = useState(5);
		return (
			<Slider
				{...args}
				value={value}
				min={0}
				max={10}
				step={1}
				showTooltip
				showTickmarks
				labelInterval={1}
				onChange={(e, val) => {
					setValue(val);
					args?.onChange?.(e, val);
				}}
				aria-label="Custom range slider"
			/>
		);
	},
});

export const Disabled = meta.story({
	args: {
		value: 30,
		disabled: true,
		"aria-label": "Disabled slider",
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByRole("slider");
		expect(input).toBeDisabled();
	},
});

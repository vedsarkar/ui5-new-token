import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import preview from "@/.storybook/preview";
import { Switch } from "./Switch";
import cssClasses from "./Switch.module.css";

const meta = preview.meta({
	component: Switch,
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
		const [checked, setChecked] = useState(false);
		return (
			<Switch
				checked={checked}
				onChange={(e, val) => {
					setChecked(val);
					args?.onChange?.(e, val);
				}}
			>
				Enable notifications
			</Switch>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const toggle = canvas.getByRole("switch");

		expect(toggle).not.toBeChecked();

		await userEvent.click(toggle);
		expect(toggle).toBeChecked();
		expect(args.onChange).toHaveBeenCalled();

		await userEvent.click(toggle);
		expect(toggle).not.toBeChecked();
	},
});

export const Multiple = meta.story({
	render: (args) => {
		const [values, setValues] = useState({
			wifi: true,
			bluetooth: false,
			airplane: false,
		});
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
				<Switch
					checked={values.wifi}
					onChange={(e, val) => {
						setValues((v) => ({ ...v, wifi: val }));
						args?.onChange?.(e, val);
					}}
				>
					Wi-Fi
				</Switch>
				<Switch
					checked={values.bluetooth}
					onChange={(e, val) => {
						setValues((v) => ({ ...v, bluetooth: val }));
						args?.onChange?.(e, val);
					}}
				>
					Bluetooth
				</Switch>
				<Switch
					checked={values.airplane}
					onChange={(e, val) => {
						setValues((v) => ({ ...v, airplane: val }));
						args?.onChange?.(e, val);
					}}
				>
					Airplane mode
				</Switch>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const switches = canvas.getAllByRole("switch");

		expect(switches[0]).toBeChecked();
		expect(switches[1]).not.toBeChecked();
		expect(switches[2]).not.toBeChecked();

		await userEvent.click(switches[1]);
		expect(switches[1]).toBeChecked();
	},
});

export const Disabled = meta.story({
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			<Switch checked disabled onChange={args?.onChange}>
				Enabled (disabled)
			</Switch>
			<Switch disabled onChange={args?.onChange}>
				Disabled (disabled)
			</Switch>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const switches = canvas.getAllByRole("switch");

		expect(switches[0]).toBeDisabled();
		expect(switches[1]).toBeDisabled();
	},
});

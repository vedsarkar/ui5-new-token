import preview from "@/.storybook/preview";
import { Divider } from "./Divider";

const meta = preview.meta({
	component: Divider,
	parameters: {
		layout: "padded",
	},
});

export const Default = meta.story({});

export const CustomColor = meta.story({
	args: {
		style: {
			"--reltio-divider-color": "#0000cc",
		},
	},
});

export const CustomSpacing = meta.story({
	args: {
		style: {
			"--reltio-divider-spacing": "24px",
		},
	},
	render: (args) => (
		<div>
			<p>Content above</p>
			<Divider {...args} />
			<p>Content below</p>
		</div>
	),
});

export const CustomThickness = meta.story({
	args: {
		style: {
			"--reltio-divider-thickness": "4px",
		},
	},
});

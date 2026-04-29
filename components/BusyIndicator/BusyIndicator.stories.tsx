import preview from "@/.storybook/preview";
import { BusyIndicator } from "./BusyIndicator";
import cssClasses from "./BusyIndicator.module.css";

const meta = preview.meta({
	component: BusyIndicator,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	args: {
		active: true,
		delay: 0,
	},
});

export const SizeSmall = meta.story({
	args: {
		active: true,
		size: "S",
		delay: 0,
	},
});

export const SizeLarge = meta.story({
	args: {
		active: true,
		size: "L",
		delay: 0,
	},
});

export const WithText = meta.story({
	args: {
		active: true,
		text: "Loading data...",
		delay: 0,
	},
});

export const OverlayMode = meta.story({
	args: {
		active: true,
		delay: 0,
	},
	render: (args) => (
		<BusyIndicator {...args}>
			<div
				style={{
					width: 300,
					padding: 24,
					border: "1px solid var(--sapField_BorderColor)",
					borderRadius: 12,
				}}
			>
				<h3 style={{ margin: "0 0 8px" }}>Card Title</h3>
				<p style={{ margin: 0, color: "var(--sapContent_LabelColor)" }}>
					This content is overlaid by the busy indicator when active.
				</p>
			</div>
		</BusyIndicator>
	),
});

export const WithDelay = meta.story({
	args: {
		active: true,
		delay: 2000,
		text: "Appears after 2s delay",
	},
});

export const Inactive = meta.story({
	args: {
		active: false,
	},
});

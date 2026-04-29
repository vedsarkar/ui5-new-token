import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { ArrowDropDown } from "@/icons/ArrowDropDown";
import { StarSelected } from "@/icons/StarSelected";
import { Button } from "./Button";
import cssClasses from "./Button.module.css";

const meta = preview.meta({
	component: Button,
	parameters: {
		layout: "centered",
		cssClasses,
	},
	args: {
		onClick: fn(),
	},
});

// Design variants
export const Default = meta.story({
	args: {
		children: "Default",
	},
});

export const Emphasized = meta.story({
	args: {
		design: "emphasized",
		children: "Emphasized",
	},
});

export const Ghost = meta.story({
	args: {
		design: "ghost",
		children: "Ghost",
	},
});

export const Transparent = meta.story({
	args: {
		design: "transparent",
		children: "Transparent",
	},
});

export const Positive = meta.story({
	args: {
		design: "positive",
		children: "Positive",
	},
});

export const Negative = meta.story({
	args: {
		design: "negative",
		children: "Negative",
	},
});

export const Attention = meta.story({
	args: {
		design: "attention",
		children: "Attention",
	},
});

// Disabled states
export const Disabled = meta.story({
	args: {
		disabled: true,
		children: "Disabled",
	},
});

export const DisabledEmphasized = meta.story({
	args: {
		design: "emphasized",
		disabled: true,
		children: "Disabled Emphasized",
	},
});

// Full width
export const FullWidth = meta.story({
	args: {
		fullWidth: true,
		children: "Full Width",
	},
	render: (args) => (
		<div style={{ width: "400px" }}>
			<Button {...args} />
		</div>
	),
});

// Anchor rendering
export const AsLink = meta.story({
	args: {
		href: "/about",
		children: "Go to About",
	},
});

export const AsExternalLink = meta.story({
	args: {
		href: "https://example.com",
		target: "_blank",
		rel: "noopener noreferrer",
		children: "External Link",
	},
});

// Icon variants
export const WithIcons = meta.story({
	args: {
		design: "emphasized",
		children: (
			<>
				<StarSelected />
				Label
				<ArrowDropDown />
			</>
		),
	},
});

export const IconOnly = meta.story({
	args: {
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

export const IconOnlyEmphasized = meta.story({
	args: {
		design: "emphasized",
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

export const IconOnlyTransparent = meta.story({
	args: {
		design: "transparent",
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

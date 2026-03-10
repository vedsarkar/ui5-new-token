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

export const Default = meta.story({
	args: {
		children: "Button",
	},
});

// Variants
export const Filled = meta.story({
	args: {
		variant: "filled",
		children: "Filled Button",
	},
});

export const Outlined = meta.story({
	args: {
		variant: "outlined",
		children: "Outlined Button",
	},
});

export const Text = meta.story({
	args: {
		variant: "text",
		children: "Text Button",
	},
});

// Color Variants - Filled
export const FilledPrimary = meta.story({
	args: {
		variant: "filled",
		color: "primary",
		children: "Filled Primary",
	},
});

// Color Variants - Outlined
export const OutlinedPrimary = meta.story({
	args: {
		variant: "outlined",
		color: "primary",
		children: "Outlined Primary",
	},
});

// Color Variants - Text
export const TextPrimary = meta.story({
	args: {
		variant: "text",
		color: "primary",
		children: "Text Primary",
	},
});

export const Small = meta.story({
	args: {
		size: "small",
		children: "Small Button",
	},
});

export const Medium = meta.story({
	args: {
		size: "medium",
		children: "Medium Button",
	},
});

export const Large = meta.story({
	args: {
		size: "large",
		children: "Large Button",
	},
});

// User Story 3: Disabled State
export const Disabled = meta.story({
	args: {
		disabled: true,
		children: "Disabled Button",
	},
});

export const DisabledFilledPrimary = meta.story({
	args: {
		variant: "filled",
		color: "primary",
		disabled: true,
		children: "Disabled Filled Primary",
	},
});

export const DisabledOutlinedPrimary = meta.story({
	args: {
		variant: "outlined",
		color: "primary",
		disabled: true,
		children: "Disabled Outlined Primary",
	},
});

export const DisabledTextPrimary = meta.story({
	args: {
		variant: "text",
		color: "primary",
		disabled: true,
		children: "Disabled Text Primary",
	},
});

export const AccessibleDisabled = meta.story({
	args: {
		disabled: true,
		"aria-label": "Save changes (disabled)",
		children: "Save",
	},
});

export const FullWidth = meta.story({
	args: {
		fullWidth: true,
		children: "Full Width Button",
	},
	render: (args) => (
		<div style={{ width: "400px" }}>
			<Button {...args} />
		</div>
	),
});

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

export const DisabledLink = meta.story({
	args: {
		href: "/disabled",
		disabled: true,
		children: "Disabled Link",
	},
});

export const WithIcons = meta.story({
	args: {
		variant: "filled",
		color: "primary",
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

export const IconOnlyFilledPrimary = meta.story({
	args: {
		variant: "filled",
		color: "primary",
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

export const IconOnlyOutlinedPrimary = meta.story({
	args: {
		variant: "outlined",
		color: "primary",
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

export const IconOnlyTextPrimary = meta.story({
	args: {
		variant: "text",
		color: "primary",
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

export const IconOnlyDisabled = meta.story({
	args: {
		disabled: true,
		children: <StarSelected />,
		"aria-label": "Favorite",
	},
});

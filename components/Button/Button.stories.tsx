import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		onClick: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default = {
	args: {
		children: "Button",
	},
};

// Variants
export const Filled: Story = {
	args: {
		variant: "filled",
		children: "Filled Button",
	},
};

export const Outlined: Story = {
	args: {
		variant: "outlined",
		children: "Outlined Button",
	},
};

export const Text: Story = {
	args: {
		variant: "text",
		children: "Text Button",
	},
};

// Color Variants - Filled
export const FilledPrimary: Story = {
	args: {
		variant: "filled",
		color: "primary",
		children: "Filled Primary",
	},
};

// Color Variants - Outlined
export const OutlinedPrimary: Story = {
	args: {
		variant: "outlined",
		color: "primary",
		children: "Outlined Primary",
	},
};

// Color Variants - Text
export const TextPrimary: Story = {
	args: {
		variant: "text",
		color: "primary",
		children: "Text Primary",
	},
};

export const Small: Story = {
	args: {
		size: "small",
		children: "Small Button",
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
		children: "Medium Button",
	},
};

export const Large: Story = {
	args: {
		size: "large",
		children: "Large Button",
	},
};

// User Story 3: Disabled State
export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled Button",
	},
};

export const DisabledFilledPrimary: Story = {
	args: {
		variant: "filled",
		color: "primary",
		disabled: true,
		children: "Disabled Filled Primary",
	},
};

export const DisabledOutlinedPrimary: Story = {
	args: {
		variant: "outlined",
		color: "primary",
		disabled: true,
		children: "Disabled Outlined Primary",
	},
};

export const DisabledTextPrimary: Story = {
	args: {
		variant: "text",
		color: "primary",
		disabled: true,
		children: "Disabled Text Primary",
	},
};

export const AccessibleDisabled: Story = {
	args: {
		disabled: true,
		"aria-label": "Save changes (disabled)",
		children: "Save",
	},
};

// User Story 5: Custom Styling and Content
export const WithCustomClassName: Story = {
	args: {
		className: "custom-button-class",
		children: "Custom Styled",
	},
	render: (args) => (
		<>
			<Button {...args} />
			<style>{`
				.custom-button-class {
					background-color: #ff0000 !important;
					color: #ffffff !important;
				}
			`}</style>
		</>
	),
};

export const WithCustomCssVariables: Story = {
	args: {
		style: {
			"--reltio-button-color-background": "red",
			"--reltio-button-color-text": "white",
		},
		children: "Custom CSS Variables",
	},
	render: (args) => (
		<>
			<Button {...args} />
		</>
	),
};

export const FullWidth: Story = {
	args: {
		fullWidth: true,
		children: "Full Width Button",
	},
	render: (args) => (
		<div style={{ width: "400px" }}>
			<Button {...args} />
		</div>
	),
};

export const AsLink: Story = {
	args: {
		href: "/about",
		children: "Go to About",
	},
};

export const AsExternalLink: Story = {
	args: {
		href: "https://example.com",
		target: "_blank",
		rel: "noopener noreferrer",
		children: "External Link",
	},
};

export const DisabledLink: Story = {
	args: {
		href: "/disabled",
		disabled: true,
		children: "Disabled Link",
	},
};

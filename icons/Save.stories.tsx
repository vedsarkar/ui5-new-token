import type { Meta, StoryObj } from "@storybook/react";
import { Save } from "./Save";

const meta: Meta<typeof Save> = {
	component: Save,
	title: "Icons/Save",
	parameters: {
		layout: "centered",
	},
};

export default meta;
type Story = StoryObj<typeof Save>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "small",
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
	},
};

export const Large: Story = {
	args: {
		size: "large",
	},
};

export const XLarge: Story = {
	args: {
		size: "xlarge",
	},
};

export const Primary: Story = {
	args: {
		color: "primary",
	},
};

export const Success: Story = {
	args: {
		color: "success",
	},
};

export const WarningColor: Story = {
	args: {
		color: "warning",
	},
};

export const ErrorColor: Story = {
	args: {
		color: "error",
	},
};

export const WithAriaLabel: Story = {
	args: {
		"aria-label": "Save icon",
	},
};

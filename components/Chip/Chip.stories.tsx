import { fn } from "storybook/test";
import preview from "@/.storybook/preview";
import { Check } from "@/icons/Check";
import { ErrorCircle } from "@/icons/ErrorCircle";
import { Person } from "@/icons/Person";
import { Warning } from "@/icons/Warning";
import { Chip } from "./Chip";
import cssClasses from "./Chip.module.css";

const meta = preview.meta({
	component: Chip,
	parameters: {
		layout: "centered",
		cssClasses,
	},
});

export const Default = meta.story({
	args: {
		children: "Label",
	},
});

export const Removable = meta.story({
	args: {
		children: "Label",
		onRemove: fn(),
	},
});

export const Clickable = meta.story({
	args: {
		children: "Clickable",
		onClick: fn(),
	},
});

export const WithIcon = meta.story({
	args: {
		children: "John Doe",
		icon: <Person size="small" />,
		onRemove: fn(),
	},
});

export const Small = meta.story({
	args: {
		children: "Small",
		size: "small",
		onRemove: fn(),
	},
});

export const Disabled = meta.story({
	args: {
		children: "Disabled",
		onRemove: fn(),
		disabled: true,
	},
});

export const FilledPrimary = meta.story({
	args: {
		children: "Primary",
		color: "primary",
	},
});

export const FilledSuccess = meta.story({
	args: {
		children: "Approved",
		color: "success",
		icon: <Check size="small" />,
	},
});

export const FilledWarning = meta.story({
	args: {
		children: "Pending",
		color: "warning",
		icon: <Warning size="small" />,
	},
});

export const FilledError = meta.story({
	args: {
		children: "Rejected",
		color: "error",
		icon: <ErrorCircle size="small" />,
	},
});

export const OutlinedDefault = meta.story({
	args: {
		children: "Outlined",
		variant: "outlined",
	},
});

export const OutlinedPrimary = meta.story({
	args: {
		children: "Primary",
		variant: "outlined",
		color: "primary",
	},
});

export const OutlinedSuccess = meta.story({
	args: {
		children: "Approved",
		variant: "outlined",
		color: "success",
		icon: <Check size="small" />,
	},
});

export const OutlinedWarning = meta.story({
	args: {
		children: "Pending",
		variant: "outlined",
		color: "warning",
		icon: <Warning size="small" />,
	},
});

export const OutlinedError = meta.story({
	args: {
		children: "Rejected",
		variant: "outlined",
		color: "error",
		icon: <ErrorCircle size="small" />,
	},
});

export const CustomStyled = meta.story({
	args: {
		children: "Custom",
		onRemove: fn(),
		style: {
			"--reltio-chip-background": "#1a1a2e",
			"--reltio-chip-color": "#ffffff",
			"--reltio-chip-border-radius": "9999px",
		},
	},
});

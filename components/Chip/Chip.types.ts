import type React from "react";

export type ChipVariant = "filled" | "outlined";

export type ChipColor = "default" | "primary" | "success" | "warning" | "error";

export type ChipSize = "small" | "medium";

export type ChipProps = {
	/** Chip label content */
	children: React.ReactNode;
	/** Visual style of the chip */
	variant?: ChipVariant;
	/** Color scheme */
	color?: ChipColor;
	/** Size of the chip */
	size?: ChipSize;
	/** Icon displayed before the label */
	icon?: React.ReactNode;
	/** Callback when the remove button is clicked; shows the remove button when provided */
	onRemove?: () => void;
	/** Callback when the chip is clicked; renders the chip as an interactive button when provided */
	onClick?: () => void;
	/** Disables the chip and its interactive elements */
	disabled?: boolean;
	/** Additional CSS class name */
	className?: string;
	/** Inline styles with optional CSS custom property overrides */
	style?: React.CSSProperties & {
		"--reltio-chip-background"?: string;
		"--reltio-chip-color"?: string;
		"--reltio-chip-border-color"?: string;
		"--reltio-chip-font-size"?: string;
		"--reltio-chip-padding-x"?: string;
		"--reltio-chip-padding-y"?: string;
		"--reltio-chip-gap"?: string;
		"--reltio-chip-border-radius"?: string;
		"--reltio-chip-icon-size"?: string;
		"--reltio-chip-height"?: string;
	};
};

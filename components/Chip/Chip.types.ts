import type React from "react";

export type ChipVariant = "filled" | "outlined";

export type ChipColor = "default" | "primary" | "success" | "warning" | "error";

export type ChipSize = "small" | "medium";

export type ChipProps = {
	children: React.ReactNode;
	variant?: ChipVariant;
	color?: ChipColor;
	size?: ChipSize;
	icon?: React.ReactNode;
	onRemove?: () => void;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
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

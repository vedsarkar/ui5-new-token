import type React from "react";

export type ChipProps = {
	children: React.ReactNode;
	onRemove?: () => void;
	disabled?: boolean;
	className?: string;
	style?: React.CSSProperties & {
		"--reltio-chip-background"?: string;
		"--reltio-chip-color"?: string;
		"--reltio-chip-font-size"?: string;
		"--reltio-chip-padding-x"?: string;
		"--reltio-chip-padding-y"?: string;
		"--reltio-chip-gap"?: string;
		"--reltio-chip-border-radius"?: string;
		"--reltio-chip-icon-size"?: string;
	};
};

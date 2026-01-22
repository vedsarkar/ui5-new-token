import type React from "react";

export type IconSize = "small" | "medium" | "large" | "xlarge";

export type IconColor =
	| "inherited"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "error";

export type IconProps = {
	size?: IconSize;
	color?: IconColor;
	className?: string;
	style?: React.CSSProperties & {
		"--reltio-icon-size"?: string;
		"--reltio-icon-color"?: string;
	};
	"aria-label"?: string;
};

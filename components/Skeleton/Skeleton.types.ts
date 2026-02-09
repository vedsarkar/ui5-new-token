import type React from "react";

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = {
	/**
	 * Number of rectangular placeholder bars to display
	 * @default 3
	 */
	rows?: number;

	/**
	 * Size (number) passed to styles; affects line height and line gap of placeholder bars (e.g. pixels).
	 * @default 16
	 */
	size?: number;

	/**
	 * Accessible label for screen readers. When not provided, a default label is used.
	 */
	label?: string;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Inline styles (e.g. for CSS variable overrides)
	 */
	style?: React.CSSProperties & {
		"--reltio-skeleton-row-height"?: string;
		"--reltio-skeleton-row-gap"?: string;
	};

	/**
	 * Additional attributes passed to the root element
	 */
} & Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children" | "className" | "style"
>;

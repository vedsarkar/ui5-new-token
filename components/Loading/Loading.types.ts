import type React from "react";

/**
 * Size variant for the loading indicator
 */
export type LoadingSize = "small" | "medium" | "large";

/**
 * Props for the Loading component
 */
export type LoadingProps = {
	/**
	 * Size of the loading indicator
	 * @default "medium"
	 */
	size?: LoadingSize;

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
		"--reltio-loading-size"?: string;
	};

	/**
	 * Additional attributes passed to the root element
	 */
} & Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children" | "className" | "style"
>;

import type React from "react";

/**
 * Props for the AssistantLoader component
 */
export type AssistantLoaderProps = {
	/**
	 * Size of the loading indicator in pixels
	 * @default 32
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
		"--reltio-assistant-loader-size"?: string;
	};

	/**
	 * Additional attributes passed to the root element
	 */
} & Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children" | "className" | "style"
>;

import type React from "react";

/**
 * Props for the AssistantLoader component
 */
export type AssistantLoaderProps = {
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

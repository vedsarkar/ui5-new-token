import type React from "react";

/**
 * Props for the ErrorMessage component
 */
export type ErrorMessageProps = {
	/**
	 * Custom error message text. When not provided or empty, a default message is shown.
	 */
	message?: React.ReactNode | null;

	/**
	 * Whether to show the error icon (ErrorCircle).
	 * @default true
	 */
	showIcon?: boolean;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Inline styles (e.g. for CSS variable overrides)
	 */
	style?: React.CSSProperties;

	/**
	 * Additional attributes passed to the root element
	 */
} & Omit<
	React.ComponentPropsWithoutRef<"div">,
	"children" | "className" | "style"
>;

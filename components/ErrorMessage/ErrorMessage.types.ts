import type React from "react";

/**
 * Props for the ErrorMessage component
 */
export type ErrorMessageProps = {
	/**
	 * Custom error message text. When not provided or empty, a default message is shown.
	 */
	children?: React.ReactNode | null;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional attributes passed to the root element
	 */
} & Omit<React.ComponentPropsWithoutRef<"div">, "children" | "className">;

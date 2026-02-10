import type React from "react";

/**
 * Props for the AssistantMessage component
 */
export type AssistantMessageProps = {
	/**
	 * Error content: string is passed to ErrorMessage; custom ReactNode is rendered as is.
	 */
	errorMessage?: React.ReactNode | null;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Inline styles (e.g. for CSS variable overrides)
	 */
	style?: React.CSSProperties;

	 /** We expect assistant message source as a string */
	 children: string;
};

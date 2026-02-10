import type React from "react";

/**
 * Props for the UserMessage component
 */
export type UserMessageProps = {
	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Inline styles (e.g. for CSS variable overrides)
	 */
	style?: React.CSSProperties;

	 /** We expect user message source as a string */
	 children: string;
};

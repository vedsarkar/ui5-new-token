import type React from "react";

/**
 * Props for the UserMessage component
 */
export type UserMessageProps = {
	/**
	 * Message content (Markdown string). When empty/null, no content area is rendered.
	 */
	content?: string | null;

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

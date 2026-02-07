import type React from "react";

/**
 * Props for the AssistantMessage component
 */
export type AssistantMessageProps = {
	/**
	 * Message content (Markdown or MDX string). When empty/null and not in error state, no content area is rendered.
	 */
	content?: string | null;

	/**
	 * When true, display error state using ErrorMessage (content is hidden).
	 * @default false
	 */
	error?: boolean;

	/**
	 * Custom error message passed to ErrorMessage when error is true. When not provided, ErrorMessage uses its default.
	 */
	errorMessage?: string | null;

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

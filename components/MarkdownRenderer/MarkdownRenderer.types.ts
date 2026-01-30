import type React from "react";

/**
 * Props for the MarkdownRenderer component
 */
export type MarkdownRendererProps = {
	/**
	 * Markdown content to render
	 */
	content: string | null | undefined;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional CSS variables
	 */
	style?: React.CSSProperties & {
		"--reltio-markdown-renderer-font-size"?: string;
		"--reltio-markdown-renderer-font-family"?: string;
		"--reltio-markdown-renderer-color-text"?: string;
		"--reltio-markdown-renderer-color-link"?: string;
	};
};

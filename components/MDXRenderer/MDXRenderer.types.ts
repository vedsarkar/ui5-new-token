import type React from "react";
import type { ComponentWhitelist } from "@/components/MarkdownComponents/markdownComponents.types";

/**
 * Props for the MDXRenderer component
 */
export type MDXRendererProps = {
	/**
	 * MDX content to render (Markdown with optional JSX/React components)
	 */
	content: string | null | undefined;

	/**
	 * Optional mapping of component names to React components allowed in MDX.
	 * Only these components (plus default markdown elements) are rendered.
	 * Extends or replaces the default whitelist.
	 */
	components?: ComponentWhitelist;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional CSS variables or inline styles
	 */
	style?: React.CSSProperties & {
		"--reltio-mdx-renderer-font-family"?: string;
		"--reltio-mdx-renderer-font-size"?: string;
		"--reltio-mdx-renderer-font-weight"?: string;
		"--reltio-mdx-renderer-line-height"?: string;
		"--reltio-mdx-renderer-color-text"?: string;
	};
};

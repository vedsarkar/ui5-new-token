import type React from "react";

/**
 * Props for the MarkdownDetails component
 */
export type MarkdownDetailsProps = {
	/**
	 * Whether the details element is initially open
	 * @default false
	 */
	open?: boolean;

	/**
	 * Content of the details element (can include summary and other content)
	 */
	children: React.ReactNode;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional CSS variables
	 */
	style?: React.CSSProperties & {
		"--reltio-markdown-details-border-color"?: string;
		"--reltio-markdown-details-background-color"?: string;
		"--reltio-markdown-details-padding"?: string;
	};

	/**
	 * Additional HTML attributes for the details element
	 */
} & Omit<
	React.DetailsHTMLAttributes<HTMLDetailsElement>,
	"open" | "className" | "style" | "children"
>;

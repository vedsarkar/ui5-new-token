import type React from "react";

/**
 * CSS custom properties supported by MarkdownDetails (for style overrides).
 * Values are CSS strings (e.g. colors, lengths, var(...)).
 */
/** Order matches MarkdownDetails.module.css (.root → .summary → .chevron → .content). */
export type MarkdownDetailsStyleVars = {
	/* .root */
	"--reltio-markdown-details-background-color"?: string;
	"--reltio-markdown-details-border-color"?: string;
	"--reltio-markdown-details-border-radius"?: string;
	"--reltio-markdown-details-border-width"?: string;
	"--reltio-markdown-details-font-family"?: string;
	"--reltio-markdown-details-font-size"?: string;
	/* .summary */
	"--reltio-markdown-details-summary-text-color"?: string;
	"--reltio-markdown-details-summary-hover-bg"?: string;
	"--reltio-markdown-details-summary-padding"?: string;
	"--reltio-markdown-details-summary-gap"?: string;
	"--reltio-markdown-details-summary-line-height"?: string;
	/* .summaryText */
	"--reltio-markdown-details-title-font-weight"?: string;
	"--reltio-markdown-details-title-letter-spacing"?: string;
	/* .chevron */
	"--reltio-markdown-details-chevron-size"?: string;
	"--reltio-markdown-details-chevron-color"?: string;
	"--reltio-markdown-details-transition-duration"?: string;
	"--reltio-markdown-details-transition-ease"?: string;
	/* .content */
	"--reltio-markdown-details-content-text-color"?: string;
	"--reltio-markdown-details-content-line-height"?: string;
	"--reltio-markdown-details-content-padding"?: string;
	"--reltio-markdown-details-content-code-color"?: string;
	"--reltio-markdown-details-content-pre-padding"?: string;
	"--reltio-markdown-details-content-pre-radius"?: string;
	"--reltio-markdown-details-content-p-margin"?: string;
	"--reltio-markdown-details-code-background-color"?: string;
};

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
	 * Additional CSS variables (and standard style props)
	 */
	style?: React.CSSProperties & MarkdownDetailsStyleVars;

	/**
	 * Additional HTML attributes for the details element
	 */
} & Omit<
	React.DetailsHTMLAttributes<HTMLDetailsElement>,
	"open" | "className" | "style" | "children"
>;

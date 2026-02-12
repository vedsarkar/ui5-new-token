import type React from "react";

/**
 * CSS custom properties for the Markdown component.
 */
export type MarkdownCSSVariables = {
	/** Base typography */
	"--reltio-markdown-font-family"?: string;
	"--reltio-markdown-font-size"?: string;
	"--reltio-markdown-font-weight"?: string;
	"--reltio-markdown-line-height"?: string;
	"--reltio-markdown-letter-spacing"?: string;
	"--reltio-markdown-base-font"?: string;

	/** Heading sizes */
	"--reltio-markdown-heading1-size"?: string;
	"--reltio-markdown-heading2-size"?: string;
	"--reltio-markdown-heading3-size"?: string;
	"--reltio-markdown-heading4-size"?: string;
	"--reltio-markdown-heading5-size"?: string;
	"--reltio-markdown-heading6-size"?: string;

	/** Code */
	"--reltio-markdown-code-font-family"?: string;
	"--reltio-markdown-code-font-size"?: string;
	"--reltio-markdown-color-code-background"?: string;
	"--reltio-markdown-code-padding"?: string;
	"--reltio-markdown-code-border-radius"?: string;

	/** Colors */
	"--reltio-markdown-color-text"?: string;
	"--reltio-markdown-color-link"?: string;
	"--reltio-markdown-color-blockquote-border"?: string;
	"--reltio-markdown-color-blockquote-text"?: string;
	"--reltio-markdown-color-table-cell-background"?: string;

	/** Spacing */
	"--reltio-markdown-paragraph-margin-bottom"?: string;
	"--reltio-markdown-heading-margin"?: string;
	"--reltio-markdown-list-margin"?: string;
	"--reltio-markdown-list-padding-left"?: string;
	"--reltio-markdown-list-item-margin"?: string;
	"--reltio-markdown-blockquote-margin"?: string;
	"--reltio-markdown-blockquote-padding-left"?: string;
	"--reltio-markdown-blockquote-border-width"?: string;
};

/**
 * Props for the Markdown component
 */
export type MarkdownProps = {
	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Additional inline styles and CSS variable overrides
	 */
	style?: React.CSSProperties & MarkdownCSSVariables;
};

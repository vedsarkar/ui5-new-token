import type React from "react";

/**
 * CSS custom properties for markdown components.
 */ export type MarkdownComponentsCSSVariables = {
	/** Base typography (root / MarkdownRenderer) */
	"--reltio-markdown-components-font-family"?: string;
	"--reltio-markdown-components-font-size"?: string;
	"--reltio-markdown-components-font-weight"?: string;
	"--reltio-markdown-components-line-height"?: string;
	"--reltio-markdown-components-letter-spacing"?: string;
	"--reltio-markdown-components-base-font"?: string;

	/** Heading sizes */
	"--reltio-markdown-components-heading1-size"?: string;
	"--reltio-markdown-components-heading2-size"?: string;
	"--reltio-markdown-components-heading3-size"?: string;
	"--reltio-markdown-components-heading4-size"?: string;
	"--reltio-markdown-components-heading5-size"?: string;
	"--reltio-markdown-components-heading6-size"?: string;

	/** Code */
	"--reltio-markdown-components-code-font-family"?: string;
	"--reltio-markdown-components-code-font-size"?: string;
	"--reltio-markdown-components-color-code-background"?: string;
	"--reltio-markdown-components-code-padding"?: string;
	"--reltio-markdown-components-code-border-radius"?: string;

	/** Colors */
	"--reltio-markdown-components-color-text"?: string;
	"--reltio-markdown-components-color-link"?: string;
	"--reltio-markdown-components-color-blockquote-border"?: string;
	"--reltio-markdown-components-color-blockquote-text"?: string;

	/** Spacing */
	"--reltio-markdown-components-paragraph-margin-bottom"?: string;
	"--reltio-markdown-components-heading-margin"?: string;
	"--reltio-markdown-components-list-margin"?: string;
	"--reltio-markdown-components-list-padding-left"?: string;
	"--reltio-markdown-components-list-item-margin"?: string;
	"--reltio-markdown-components-blockquote-margin"?: string;
	"--reltio-markdown-components-blockquote-padding-left"?: string;
	"--reltio-markdown-components-blockquote-border-width"?: string;
};

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
	 * Additional inline styles and CSS variable overrides
	 */
	style?: React.CSSProperties & MarkdownComponentsCSSVariables;
};

export type ReactMarkdownProps<T extends React.ElementType> =
	React.ComponentPropsWithoutRef<T> & { node?: unknown };

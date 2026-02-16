import type React from "react";

/**
 * CSS custom properties supported by Details (for style overrides).
 * Values are CSS strings (e.g. colors, lengths, var(...)).
 */
/** Order matches Details.module.css (.root → .summary → .chevron → .content). */
export type DetailsStyleVars = {
	/* .root */
	"--reltio-details-background-color"?: string;
	"--reltio-details-border-color"?: string;
	"--reltio-details-border-radius"?: string;
	"--reltio-details-border-width"?: string;
	"--reltio-details-font-family"?: string;
	"--reltio-details-font-size"?: string;
	"--reltio-details-text-color"?: string;
	"--reltio-details-hover-bg"?: string;
	"--reltio-details-code-bg"?: string;
	/* .summary */
	"--reltio-details-summary-padding"?: string;
	"--reltio-details-summary-gap"?: string;
	"--reltio-details-summary-line-height"?: string;
	/* .summaryText */
	"--reltio-details-title-font-weight"?: string;
	"--reltio-details-title-letter-spacing"?: string;
	/* .chevron */
	"--reltio-details-chevron-size"?: string;
	"--reltio-details-transition-duration"?: string;
	"--reltio-details-transition-ease"?: string;
	/* .content */
	"--reltio-details-content-line-height"?: string;
	"--reltio-details-content-padding"?: string;
	"--reltio-details-content-pre-padding"?: string;
	"--reltio-details-content-pre-radius"?: string;
	"--reltio-details-content-p-margin"?: string;
};

/**
 * Props for the Details component
 */
export type DetailsProps = {
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
	style?: React.CSSProperties & DetailsStyleVars;

	/**
	 * Additional HTML attributes for the details element
	 */
} & Omit<
	React.DetailsHTMLAttributes<HTMLDetailsElement>,
	"open" | "className" | "style" | "children"
>;

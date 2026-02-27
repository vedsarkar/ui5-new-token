import type React from "react";

/**
 * Combines custom component props with native HTML element props.
 * Automatically omits native props that overlap with custom ones,
 * so custom declarations always take precedence.
 *
 * @example
 * type DetailsProps = HtmlProps<"details", { open?: boolean }>;
 * type ChipProps = HtmlProps<"button", { onClick?: () => void }>;
 */
export type HtmlProps<
	Tag extends keyof React.JSX.IntrinsicElements,
	CustomProps extends Record<string, unknown>,
> = CustomProps & Omit<React.ComponentPropsWithoutRef<Tag>, keyof CustomProps>;

import type React from "react";
import type { HtmlProps } from "@/utils/types";

/**
 * SAP Fiori Avatar sizes.
 * XS=2rem, S=3rem, M=4rem, L=5rem, XL=7rem
 */
export type AvatarSize = "xs" | "s" | "m" | "l" | "xl";

/**
 * SAP Fiori Avatar shapes.
 */
export type AvatarShape = "circle" | "square";

/**
 * SAP Fiori accent color schemes (1–10).
 * Each maps to --sapAvatar_{N}_Background/TextColor/BorderColor tokens.
 */
export type AvatarColorScheme = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type AvatarProps = HtmlProps<
	"span",
	{
		/** Image source URL */
		src?: string;
		/** Alt text for the image */
		alt?: string;
		/** Content to display (initials or custom icon) */
		children?: React.ReactNode;
		/** Size variant
		 * @default "m"
		 */
		size?: AvatarSize;
		/** Shape variant
		 * @default "circle"
		 */
		shape?: AvatarShape;
		/** Accent color scheme (1–10). When omitted, uses neutral background */
		colorScheme?: AvatarColorScheme;
	}
>;

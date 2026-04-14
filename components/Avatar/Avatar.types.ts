import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square";

export type AvatarProps = HtmlProps<
	"span",
	{
		/** Image source URL */
		src?: string;
		/** Alt text for the image */
		alt?: string;
		/** Content to display (initials or custom icon) */
		children?: React.ReactNode;
		/** Size variant */
		size?: AvatarSize;
		/** Shape variant */
		shape?: AvatarShape;
	}
>;

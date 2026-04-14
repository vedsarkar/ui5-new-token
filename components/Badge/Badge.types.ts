import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type BadgeColor = "error" | "primary";

export type BadgeProps = HtmlProps<
	"span",
	{
		/** Content displayed inside the badge indicator (number or text). When omitted, renders as a dot. */
		content?: React.ReactNode;
		/** Color variant of the badge indicator */
		color?: BadgeColor;
		/** Maximum count to display before showing "{max}+" */
		max?: number;
		/** The element the badge is attached to */
		children?: React.ReactNode;
	}
>;

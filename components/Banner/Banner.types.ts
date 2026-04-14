import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type BannerColor = "info" | "success" | "warning" | "error";

export type BannerProps = HtmlProps<
	"div",
	{
		/** Primary heading text */
		title?: string;
		/** Description content rendered below the title */
		children?: React.ReactNode;
		/** Color variant that determines background, border, icon, and title color */
		color?: BannerColor;
		/** Whether a close button is shown */
		dismissible?: boolean;
		/** Callback fired when the close button is clicked */
		onDismiss?: () => void;
		/** Custom icon override; pass `null` to hide the icon entirely */
		icon?: React.ReactNode | null;
	}
>;

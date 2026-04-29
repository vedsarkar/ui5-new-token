import type React from "react";
import type { HtmlProps } from "@/utils/types";

/**
 * SAP Fiori MessageStrip design variants.
 * Maps to SAP semantic color tokens.
 */
export type BannerDesign = "information" | "positive" | "critical" | "negative";

export type BannerProps = HtmlProps<
	"div",
	{
		/** Primary heading text */
		title?: string;
		/** Description content rendered below the title */
		children?: React.ReactNode;
		/** Design variant that determines background, border, icon, and title color
		 * @default "information"
		 */
		design?: BannerDesign;
		/** Whether a close button is shown */
		dismissible?: boolean;
		/** Callback fired when the close button is clicked */
		onDismiss?: () => void;
		/** Custom icon override; pass `null` to hide the icon entirely */
		icon?: React.ReactNode | null;
	}
>;

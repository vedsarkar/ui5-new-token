import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type BusyIndicatorSize = "S" | "M" | "L";

export type BusyIndicatorProps = HtmlProps<
	"div",
	{
		/** Whether the busy indicator is visible
		 * @default false
		 */
		active?: boolean;

		/** Delay in milliseconds before the indicator appears (prevents flash-of-loading)
		 * @default 1000
		 */
		delay?: number;

		/** Size variant controlling dot dimensions
		 * @default "M"
		 */
		size?: BusyIndicatorSize;

		/** Text label displayed below the dots */
		text?: string;

		/** Content to overlay with the busy indicator when active */
		children?: React.ReactNode;
	}
>;

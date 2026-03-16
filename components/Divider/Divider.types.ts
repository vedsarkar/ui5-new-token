import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type DividerAlign = "start" | "center" | "end";

export type DividerProps = HtmlProps<
	"div",
	{
		/** Position of the label text relative to the line.
		 * @default "start"
		 */
		align?: DividerAlign;
		/** Optional label text displayed alongside the divider line. */
		children?: React.ReactNode;
	}
>;

import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type TabItem = {
	/** Unique identifier for this tab */
	value: string;
	/** Tab label content (text, or text + icon/badge) */
	label: React.ReactNode;
	/** Whether this tab is disabled */
	disabled?: boolean;
};

export type TabsProps = HtmlProps<
	"div",
	{
		/** Tab items to render */
		items: TabItem[];
		/** Currently selected tab value */
		value?: string;
		/** Callback when a tab is selected */
		onValueChange?: (value: string) => void;
	}
>;

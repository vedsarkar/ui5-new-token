import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type TabItem = {
	value: string;
	label: React.ReactNode;
	disabled?: boolean;
};

export type TabsProps = HtmlProps<
	"div",
	{
		items: TabItem[];
		value?: string;
		onValueChange?: (value: string) => void;
	}
>;

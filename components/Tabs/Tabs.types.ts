import type React from "react";

export type TabItem = {
	value: string;
	label: React.ReactNode;
	disabled?: boolean;
};

export type TabsProps = React.ComponentProps<"div"> & {
	items: TabItem[];
	value?: string;
	onValueChange?: (value: string) => void;
};

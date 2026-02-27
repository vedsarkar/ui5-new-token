import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type ChipVariant = "filled" | "outlined";

export type ChipColor = "default" | "primary" | "success" | "warning" | "error";

export type ChipSize = "small" | "medium";

export type ChipProps = HtmlProps<
	"button",
	{
		/** Visual style of the chip */
		variant?: ChipVariant;
		/** Color scheme */
		color?: ChipColor;
		/** Size of the chip */
		size?: ChipSize;
		/** Icon displayed before the label */
		icon?: React.ReactNode;
		/** Callback when the remove button is clicked; shows the remove button when provided */
		onRemove?: () => void;
		/** Callback when the chip is clicked; renders the chip as an interactive button when provided */
		onClick?: () => void;
		/** Disables the chip and its interactive elements */
		disabled?: boolean;
	}
>;

import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type SwitchProps = HtmlProps<
	"input",
	{
		/** Whether the switch is in the "on" position */
		checked?: boolean;
		/** Callback fired when the switch value changes — receives event and the new checked state */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			checked: boolean,
		) => void;
		/** Label content rendered next to the switch */
		children?: React.ReactNode;
		/** Whether the switch is disabled */
		disabled?: boolean;
	}
>;

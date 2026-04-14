import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type RadioProps = HtmlProps<
	"input",
	{
		/** Whether the radio is selected */
		checked?: boolean;
		/** Callback fired when the radio is selected — receives event and the new checked state */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			checked: boolean,
		) => void;
		/** Label content rendered next to the radio circle */
		children?: React.ReactNode;
		/** Whether the radio displays error styling */
		error?: boolean;
		/** Prevents interaction and reduces opacity */
		disabled?: boolean;
	}
>;

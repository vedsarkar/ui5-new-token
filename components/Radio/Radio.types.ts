import type React from "react";
import type { HtmlProps } from "@/utils/types";
import type { ValueState } from "@/utils/valueState";

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
		/** Validation state affecting visual appearance */
		valueState?: ValueState;
		/** Prevents interaction and reduces opacity */
		disabled?: boolean;
	}
>;

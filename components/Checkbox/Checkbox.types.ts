import type React from "react";
import type { HtmlProps } from "@/utils/types";
import type { ValueState } from "@/utils/valueState";

export type CheckboxProps = HtmlProps<
	"input",
	{
		/** Whether the checkbox is checked */
		checked?: boolean;
		/** Callback fired when the checkbox value changes — receives event and the new checked state */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			checked: boolean,
		) => void;
		/** Label content rendered next to the checkbox */
		children?: React.ReactNode;
		/** Whether the checkbox is in an indeterminate state */
		indeterminate?: boolean;
		/** Validation state affecting visual appearance */
		valueState?: ValueState;
		/** Whether the checkbox is disabled */
		disabled?: boolean;
	}
>;

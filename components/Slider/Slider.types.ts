import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type SliderProps = HtmlProps<
	"input",
	{
		/** Current value of the slider */
		value?: number;
		/** Callback fired when the slider value changes — receives event and the new numeric value */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			value: number,
		) => void;
		/** Minimum value of the slider */
		min?: number;
		/** Maximum value of the slider */
		max?: number;
		/** Step increment between values */
		step?: number;
		/** Whether the slider is disabled */
		disabled?: boolean;
	}
>;

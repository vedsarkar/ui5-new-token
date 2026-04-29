import type { HtmlProps } from "@/utils/types";
import type { ValueState } from "@/utils/valueState";

export type ProgressIndicatorProps = HtmlProps<
	"div",
	{
		/** Percentage value (0–100). Clamped to range.
		 * @default 0
		 */
		value?: number;

		/** Validation state affecting bar/track colors and icon
		 * @default "None"
		 */
		valueState?: ValueState;

		/** Custom text displayed instead of the percentage (e.g., "3 of 10") */
		displayValue?: string;

		/** Whether to hide the value text entirely
		 * @default false
		 */
		hideValue?: boolean;
	}
>;

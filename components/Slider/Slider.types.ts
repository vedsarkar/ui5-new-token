import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type SliderProps = HtmlProps<
	"div",
	{
		/** Current value of the slider */
		value?: number;
		/** Callback fired when the slider value changes — receives event and the new numeric value */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			value: number,
		) => void;
		/** Minimum value
		 * @default 0
		 */
		min?: number;
		/** Maximum value
		 * @default 100
		 */
		max?: number;
		/** Step increment between values
		 * @default 1
		 */
		step?: number;
		/** Whether the slider is disabled */
		disabled?: boolean;
		/** Show value tooltip above the handle
		 * @default false
		 */
		showTooltip?: boolean;
		/** Show tickmarks along the track
		 * @default false
		 */
		showTickmarks?: boolean;
		/** Interval for displaying labels on tickmarks (e.g., 10 shows every 10th value).
		 * Only effective when showTickmarks is true.
		 * @default 0 (no labels)
		 */
		labelInterval?: number;
		/** Accessible name for the slider input */
		"aria-label"?: string;
	}
>;

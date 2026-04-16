import type { HtmlProps } from "@/utils/types";

export type GaugeChartProps = HtmlProps<
	"div",
	{
		/** Current metric value. */
		value?: number;

		/** Label displayed below the value in the center of the gauge. */
		label?: string;

		/**
		 * Upper bound of the gauge scale. Fill percentage is `value / max`.
		 * @default 100
		 */
		max?: number;

		/**
		 * Unit suffix appended to the center value display.
		 * Examples: "%", "ms", " pts"
		 */
		units?: string;
	}
>;

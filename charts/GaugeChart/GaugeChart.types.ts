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
		 * Height of the chart container. Number values are treated as pixels.
		 * @default 300
		 */
		height?: number | string;

		/**
		 * Shows the ECharts built-in loading overlay.
		 * @default false
		 */
		loading?: boolean;

		/** Error message. When set, replaces the chart with centered error text. */
		error?: string;
	}
>;

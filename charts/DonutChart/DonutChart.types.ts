import type { HtmlProps } from "@/utils/types";

export type DonutChartItem = {
	/** Segment label. */
	name: string;

	/** Segment value determining its proportion of the ring. */
	value: number;
};

export type DonutChartProps = HtmlProps<
	"div",
	{
		/** Array of segments. Each entry renders one donut slice. */
		data?: DonutChartItem[];

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

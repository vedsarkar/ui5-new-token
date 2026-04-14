import type { HtmlProps } from "@/utils/types";

export type RadarChartIndicator = {
	/** Axis label. */
	name: string;

	/** Maximum value for this axis. */
	max: number;
};

export type RadarChartSeries = {
	/** Legend label for this data polygon. */
	name: string;

	/** Values for each indicator axis, in the same order as `indicators`. */
	values: number[];
};

export type RadarChartProps = HtmlProps<
	"div",
	{
		/** Radar axes definition. Each entry adds one spoke to the chart. */
		indicators?: RadarChartIndicator[];

		/** Data polygons to plot. Each entry renders one filled area. */
		series?: RadarChartSeries[];

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

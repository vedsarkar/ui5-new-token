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
		 * Unit suffix appended to tooltip values.
		 * Examples: "ms", "%", " pts"
		 */
		units?: string;
	}
>;

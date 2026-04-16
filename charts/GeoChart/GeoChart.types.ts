import type { HtmlProps } from "@/utils/types";

/**
 * Minimal GeoJSON FeatureCollection type.
 * Covers the fields ECharts needs for map registration.
 */
export type GeoJSON = {
	type: string;
	features: Record<string, unknown>[];
};

export type GeoChartItem = {
	/** Region name. Must match a feature name in the GeoJSON. */
	name: string;

	/** Numeric value determining which range bucket the region falls into. */
	value: number;
};

export type GeoChartRange = {
	min: number;
	max: number;
	label?: string;
};

export type GeoChartProps = HtmlProps<
	"div",
	{
		/** GeoJSON FeatureCollection defining the map geography. */
		map: GeoJSON;

		/** Region data. Each entry colors one region based on its value range. */
		data?: GeoChartItem[];

		/**
		 * Unit suffix for tooltip values and auto-generated range labels.
		 * Examples: "%", "customers", "M$"
		 */
		units?: string;
	}
>;

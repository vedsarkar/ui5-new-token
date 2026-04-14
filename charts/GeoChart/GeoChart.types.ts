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
	/** Lower bound (inclusive). */
	min: number;

	/** Upper bound (inclusive). */
	max: number;

	/** Legend label. Auto-generated as "{min} - {max}" if omitted. */
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
		 * Value ranges for the discrete legend.
		 * Each range gets a color from the sequential shade palette.
		 * @default auto-splits data min/max into 5 equal ranges
		 */
		ranges?: GeoChartRange[];

		/**
		 * Enable zoom/pan interaction.
		 * `true` enables both, `"scale"` enables zoom only, `"move"` enables pan only.
		 * @default false
		 */
		roam?: boolean | "scale" | "move";

		/**
		 * Unit suffix for tooltip values and auto-generated range labels.
		 * Examples: "%", "customers", "M$"
		 */
		units?: string;

		/**
		 * Shows the ECharts built-in loading overlay.
		 * @default false
		 */
		loading?: boolean;

		/** Error message. When set, replaces the chart with centered error text. */
		error?: string;
	}
>;

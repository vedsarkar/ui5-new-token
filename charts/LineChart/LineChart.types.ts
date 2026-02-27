import type { HtmlProps } from "@/utils/types";

export type LineChartSeries = {
	/** Data object key to plot as Y values */
	key: string;

	/** Legend label. Defaults to `key` if not provided. */
	name?: string;
};

export type LineChartProps = HtmlProps<
	"div",
	{
		/** Array of data objects. Each object represents one data point. */
		data?: Record<string, unknown>[];

		/**
		 * Determines X-axis labels.
		 * - **string**: property name for direct value lookup
		 * - **function**: custom extraction and formatting in one step
		 */
		xKey: string | ((item: Record<string, unknown>) => string);

		/** Data series to plot. Each entry renders one line. */
		series: LineChartSeries[];

		/**
		 * Height of the chart container. Number values are treated as pixels.
		 * @default 300
		 */
		height?: number | string;

		/**
		 * Shows the ECharts built-in loading overlay.
		 * - When `data` is empty: loading overlay on empty grid
		 * - When `data` is present: loading overlay on rendered chart
		 * @default false
		 */
		loading?: boolean;

		/**
		 * Unit suffix appended to Y-axis labels and tooltip values.
		 * Examples: "ms", "%", " records"
		 */
		units?: string;

		/** Error message. When set, replaces the chart with centered error text. */
		error?: string;
	}
>;

import type { HtmlProps } from "@/utils/types";

export type SankeyChartNode = {
	/** Node label. Must be unique across all nodes. */
	name: string;
};

export type SankeyChartLink = {
	/** Source node name. Must match a `name` in `nodes`. */
	source: string;

	/** Target node name. Must match a `name` in `nodes`. */
	target: string;

	/** Flow value determining the ribbon width. */
	value: number;
};

export type SankeyChartProps = HtmlProps<
	"div",
	{
		/** Array of nodes. Each node appears as a labeled block in the diagram. */
		nodes?: SankeyChartNode[];

		/** Array of links. Each link renders a colored ribbon between two nodes. */
		links?: SankeyChartLink[];

		/**
		 * Height of the chart container. Number values are treated as pixels.
		 * @default 300
		 */
		height?: number | string;

		/**
		 * Unit suffix appended to tooltip values.
		 * Examples: "records", "users", "MB"
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

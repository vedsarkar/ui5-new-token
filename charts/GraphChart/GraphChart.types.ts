import type { HtmlProps } from "@/utils/types";

export type GraphChartLayout = "force" | "circular";

export type GraphChartNode = {
	/** Unique node identifier. Used by links to reference this node. */
	id: string;

	/** Display name shown in labels and tooltips. */
	name: string;

	/** Optional numeric value. Affects node size (auto-normalized to 20–60px range). */
	value?: number;

	/** Optional category for color grouping. Nodes with the same category share a color and appear in the legend. */
	category?: string;
};

export type GraphChartLink = {
	/** Source node id. Must match a node's `id`. */
	source: string;

	/** Target node id. Must match a node's `id`. */
	target: string;

	/** Relationship label shown in tooltip (e.g., "lives at", "works for"). */
	label?: string;

	/** Optional numeric value. Affects line thickness. */
	value?: number;
};

export type GraphChartProps = HtmlProps<
	"div",
	{
		/** Array of graph nodes. */
		nodes?: GraphChartNode[];

		/** Array of links connecting nodes by id. */
		links?: GraphChartLink[];

		/**
		 * Graph layout algorithm.
		 * - `"force"` — physics simulation (default)
		 * - `"circular"` — nodes arranged on a circle
		 * @default "force"
		 */
		layout?: GraphChartLayout;

		/**
		 * Unit suffix appended to tooltip values.
		 * Examples: "connections", "score", "records"
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

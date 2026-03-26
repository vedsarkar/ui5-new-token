import type { HtmlProps } from "@/utils/types";

/**
 * Props for the SetOverlapChart component.
 *
 * Renders an UpSet-style set overlap visualization as a custom SVG
 * (no ECharts). The chart is composed of three coordinated sub-charts:
 * vertical intersection bars, a dot matrix, and horizontal set bars.
 *
 * The two supported modes (`"intersection"` and `"distinctIntersection"`)
 * require **different data shapes** despite sharing the same TypeScript
 * types — see `SetOverlapChartMode` and individual prop docs for details.
 */
export type SetOverlapChartProps = HtmlProps<
	"div",
	{
		/**
		 * Intersection columns to visualize. Each entry becomes a vertical bar
		 * in the intersection chart and a column of dots in the matrix.
		 *
		 * **Data requirements vary by mode:**
		 * - `"intersection"` — `elements` must be populated with record identifiers
		 * - `"distinctIntersection"` — `elements` should be empty (`[]`)
		 */
		intersections: Intersection[];

		/**
		 * Sets to be visualized. Each entry becomes a horizontal
		 * bar in the set chart and a row of dots in the matrix.
		 *
		 * **Data requirements vary by mode:**
		 * - `"intersection"` — `elements` must be populated with record identifiers
		 * - `"distinctIntersection"` — `elements` should be empty (`[]`)
		 */
		sets: DataSet[];

		/**
		 * Combination semantics for intersection columns.
		 * Controls how hover highlighting is computed and what data fields are used.
		 *
		 * - `"intersection"` — overlapping counts; hover uses element-level filtering
		 * - `"distinctIntersection"` — mutually exclusive counts; hover uses structural matching
		 *
		 * The two modes are **not interchangeable** with the same data.
		 * @default "intersection"
		 */
		mode?: SetOverlapChartMode;

		/**
		 * Label text rendered alongside the intersection chart Y-axis.
		 * Examples: `"Profile count"`, `"Record count"`
		 */
		intersectionChartAxisLabel?: string;

		/**
		 * Label text rendered alongside the set chart X-axis.
		 * Examples: `"Set Size"`, `"Source system"`
		 */
		setsChartAxisLabel?: string;

		/**
		 * Shows a loading overlay on the chart.
		 * - When data is empty: loading overlay on blank area
		 * - When data is present: loading overlay on rendered chart
		 * @default false
		 */
		loading?: boolean;

		/** Error message. When set, replaces the chart with centered error text. */
		error?: string;
	}
>;

/**
 * A single intersection column in the chart plot.
 *
 * Represents a combination of one or more sets. In `INTERSECTION` mode
 * the `elements` array drives hover highlighting; in `DISTINCT_INTERSECTION`
 * mode only `sets` property is used. Identity is derived from array position.
 */
export type Intersection = {
	/** Names of the sets that participate in this intersection (e.g. `["SAP", "Oracle"]`). */
	sets: string[];

	/** Number of records in this intersection. Determines bar height. */
	size: number;

	/**
	 * Record identifiers belonging to this intersection.
	 * - **`"intersection"` mode** — must be populated; used for element-level hover filtering
	 * - **`"distinctIntersection"` mode** — should be `[]`; hover uses structural matching instead
	 */
	elements: string[];
};

/**
 * A single set in the chart plot.
 *
 * Each set appears as a row in the matrix and a horizontal bar in the
 * set chart. The `name` must match the strings used in `Intersection.sets`.
 */
export type DataSet = {
	/** Display name and join key — must match values in `Intersection.sets`. */
	name: string;

	/** Total number of records in this set. Determines bar width. */
	size: number;

	/**
	 * Record identifiers belonging to this set.
	 * - **`"intersection"` mode** — must be populated; used for element-level hover filtering
	 * - **`"distinctIntersection"` mode** — should be `[]`; hover uses structural matching instead
	 */
	elements: string[];
};

/**
 * Combination semantics for the UpSet plot.
 *
 * Given a combination mask over sets [A, B, C] that selects A and B:
 *
 * - **`"intersection"`** — Inclusive intersection semantics.
 *   `⋂ selectedSets` — counts elements in A ∩ B, regardless of C.
 *   An element in A ∩ B ∩ C is counted in the A+B column AND the A+B+C
 *   column (overlapping). Hover computation is O(E_i × E_h) per bar —
 *   may cause lag with large data.
 *
 * - **`"distinctIntersection"`** — Exact-region semantics.
 *   `(⋂ selectedSets) \ (⋃ nonSelectedSets)` — counts elements in
 *   A ∩ B ∩ ¬C. An element is counted only in the column that matches
 *   its precise set membership. Hover computation is O(S) per bar,
 *   independent of dataset size.
 */
export type SetOverlapChartMode = "distinctIntersection" | "intersection";

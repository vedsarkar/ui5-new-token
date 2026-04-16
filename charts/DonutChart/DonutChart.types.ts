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
		 * Unit suffix appended to tooltip values.
		 * Examples: "records", "%", "users"
		 */
		units?: string;
	}
>;

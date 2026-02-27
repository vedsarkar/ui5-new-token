import type { EChartsOption } from "echarts";
import type { HtmlProps } from "@/utils/types";

export type ChartProps = HtmlProps<
	"div",
	{
		/**
		 * ECharts option object defining the chart content.
		 * Passed directly to chart.setOption().
		 */
		option: EChartsOption;

		/**
		 * Rendering engine. Read once at mount — changes after mount are ignored.
		 * @default "canvas"
		 */
		renderer?: "canvas" | "svg";

		/**
		 * Height of the chart container. Number values are treated as pixels.
		 * @default 300
		 */
		height?: number | string;

		/**
		 * When true, shows the ECharts built-in loading indicator.
		 * @default false
		 */
		loading?: boolean;
	}
>;

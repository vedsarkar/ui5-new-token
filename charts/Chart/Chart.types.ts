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
	}
>;

import type { EChartsOption } from "echarts";
import { PieChart as EChartsPie } from "echarts/charts";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./DonutChart.module.css";
import type { DonutChartItem, DonutChartProps } from "./DonutChart.types";

echarts.use([EChartsPie]);

const EMPTY_OPTION: EChartsOption = {};

function buildDonutOption(
	data: DonutChartItem[],
	units?: string,
): EChartsOption {
	return {
		tooltip: {
			trigger: "item",
			...(units && {
				valueFormatter: (value) => formatWithUnits(value as number, units),
			}),
		},
		legend: {
			bottom: 0,
		},
		series: [
			{
				type: "pie",
				radius: ["40%", "70%"],
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: "center",
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 14,
						fontWeight: "normal",
						formatter: "{b}\n{d}%",
					},
				},
				labelLine: {
					show: false,
				},
				data,
			},
		],
	};
}

export const DonutChart = ({
	data,
	units,
	className,
	...rest
}: DonutChartProps) => {
	const hasData = Array.isArray(data) && data.length > 0;
	const option = hasData ? buildDonutOption(data, units) : EMPTY_OPTION;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

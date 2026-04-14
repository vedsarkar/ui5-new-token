import type { EChartsOption } from "echarts";
import { PieChart as EChartsPie } from "echarts/charts";
import { Chart, echarts } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./DonutChart.module.css";
import type { DonutChartItem, DonutChartProps } from "./DonutChart.types";

echarts.use([EChartsPie]);

const DEFAULT_HEIGHT = 300;

const EMPTY_OPTION: EChartsOption = {};

function buildDonutOption(data: DonutChartItem[]): EChartsOption {
	return {
		tooltip: {
			trigger: "item",
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
	height = DEFAULT_HEIGHT,
	loading = false,
	error,
	className,
	...rest
}: DonutChartProps) => {
	const hasData = Array.isArray(data) && data.length > 0;
	const option = hasData && !error ? buildDonutOption(data) : EMPTY_OPTION;

	const overlay = error ? (
		<div className={classNames(styles.overlay, styles.errorOverlay)}>
			{error}
		</div>
	) : !hasData && !loading ? (
		<div className={classNames(styles.overlay)}>No data</div>
	) : null;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{overlay}
			<Chart option={option} height={height} loading={loading} />
		</div>
	);
};

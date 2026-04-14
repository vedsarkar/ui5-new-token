import type { EChartsOption } from "echarts";
import { GaugeChart as EChartsGauge } from "echarts/charts";
import { Chart, echarts } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./GaugeChart.module.css";
import type { GaugeChartProps } from "./GaugeChart.types";

echarts.use([EChartsGauge]);

const DEFAULT_HEIGHT = 300;

const EMPTY_OPTION: EChartsOption = {};

function buildGaugeOption(
	value: number,
	max: number,
	label?: string,
): EChartsOption {
	return {
		series: [
			{
				type: "gauge",
				max,
				progress: {
					show: true,
					width: 18,
					roundCap: true,
				},
				axisLine: {
					lineStyle: {
						width: 18,
						opacity: 0.15,
					},
				},
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				pointer: { show: false },
				anchor: { show: false },
				title: {
					show: !!label,
					offsetCenter: [0, "30%"],
					fontSize: 14,
				},
				detail: {
					valueAnimation: true,
					offsetCenter: [0, "0%"],
					fontSize: 28,
					fontWeight: 700,
				},
				data: [{ value, name: label ?? "" }],
			},
		],
	};
}

export const GaugeChart = ({
	value,
	label,
	max = 100,
	height = DEFAULT_HEIGHT,
	loading = false,
	error,
	className,
	...rest
}: GaugeChartProps) => {
	const hasData = value != null && !error;
	const option = hasData ? buildGaugeOption(value, max, label) : EMPTY_OPTION;

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

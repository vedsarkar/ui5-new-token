import type { EChartsOption } from "echarts";
import { GaugeChart as EChartsGauge } from "echarts/charts";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./GaugeChart.module.css";
import type { GaugeChartProps } from "./GaugeChart.types";

echarts.use([EChartsGauge]);

const EMPTY_OPTION: EChartsOption = {};

function buildGaugeOption(
	value: number,
	max: number,
	label?: string,
	units?: string,
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
					...(units && {
						formatter: (v: number) => formatWithUnits(v, units),
					}),
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
	units,
	className,
	...rest
}: GaugeChartProps) => {
	const hasData = value != null;
	const option = hasData
		? buildGaugeOption(value, max, label, units)
		: EMPTY_OPTION;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

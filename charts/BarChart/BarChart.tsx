import type { EChartsOption } from "echarts";
import { BarChart as EChartsBar } from "echarts/charts";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./BarChart.module.css";
import type { BarChartProps, BarChartSeries } from "./BarChart.types";

echarts.use([EChartsBar]);

const EMPTY_GRID_OPTION: EChartsOption = {
	xAxis: { type: "category" },
	yAxis: {
		type: "value",
		min: 0,
		max: 1000,
		splitLine: { show: true },
	},
	series: [],
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true,
	},
};

function buildBarOption(
	data: Record<string, unknown>[],
	xKey: string | ((item: Record<string, unknown>) => string),
	series: BarChartSeries[],
	units?: string,
): EChartsOption {
	const xLabels =
		typeof xKey === "function"
			? data.map(xKey)
			: data.map((d) => d[xKey] as string);

	return {
		xAxis: {
			type: "category",
			data: xLabels,
		},
		yAxis: {
			type: "value",
			...(units && {
				axisLabel: {
					formatter: (value: number) => formatWithUnits(value, units),
				},
			}),
		},
		series: series.map((s) => ({
			type: "bar" as const,
			name: s.name ?? s.key,
			data: data.map((d) => d[s.key]),
		})),
		tooltip: {
			trigger: "axis",
			...(units && {
				valueFormatter: (value) => formatWithUnits(value as number, units),
			}),
		},
		legend: {
			show: series.length > 1,
			bottom: 0,
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: series.length > 1 ? "10%" : "3%",
			containLabel: true,
		},
	};
}

export const BarChart = ({
	data,
	xKey,
	series,
	units,
	className,
	...rest
}: BarChartProps) => {
	const hasData = Array.isArray(data) && data.length > 0;
	const option = hasData
		? buildBarOption(data, xKey, series, units)
		: EMPTY_GRID_OPTION;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

import type { EChartsOption } from "echarts";
import { RadarChart as EChartsRadar } from "echarts/charts";
import { RadarComponent } from "echarts/components";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./RadarChart.module.css";
import type {
	RadarChartIndicator,
	RadarChartProps,
	RadarChartSeries,
} from "./RadarChart.types";

echarts.use([EChartsRadar, RadarComponent]);

const EMPTY_OPTION: EChartsOption = {};

function buildRadarOption(
	indicators: RadarChartIndicator[],
	series: RadarChartSeries[],
	units?: string,
): EChartsOption {
	return {
		radar: {
			indicator: indicators,
		},
		tooltip: {
			trigger: "item",
			...(units && {
				valueFormatter: (value) => formatWithUnits(value as number, units),
			}),
		},
		legend: {
			show: series.length > 1,
			bottom: 0,
		},
		series: [
			{
				type: "radar",
				data: series.map((s) => ({
					name: s.name,
					value: s.values,
				})),
				areaStyle: {
					opacity: 0.2,
				},
			},
		],
	};
}

export const RadarChart = ({
	indicators,
	series,
	units,
	className,
	...rest
}: RadarChartProps) => {
	const hasData =
		Array.isArray(series) &&
		series.length > 0 &&
		Array.isArray(indicators) &&
		indicators.length > 0;
	const option = hasData
		? buildRadarOption(indicators, series, units)
		: EMPTY_OPTION;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

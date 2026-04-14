import type { EChartsOption } from "echarts";
import { RadarChart as EChartsRadar } from "echarts/charts";
import { RadarComponent } from "echarts/components";
import { Chart, echarts } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./RadarChart.module.css";
import type {
	RadarChartIndicator,
	RadarChartProps,
	RadarChartSeries,
} from "./RadarChart.types";

echarts.use([EChartsRadar, RadarComponent]);

const DEFAULT_HEIGHT = 300;

const EMPTY_OPTION: EChartsOption = {};

function buildRadarOption(
	indicators: RadarChartIndicator[],
	series: RadarChartSeries[],
): EChartsOption {
	return {
		radar: {
			indicator: indicators,
		},
		tooltip: {
			trigger: "item",
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
	height = DEFAULT_HEIGHT,
	loading = false,
	error,
	className,
	...rest
}: RadarChartProps) => {
	const hasData =
		Array.isArray(series) &&
		series.length > 0 &&
		Array.isArray(indicators) &&
		indicators.length > 0;
	const option =
		hasData && !error ? buildRadarOption(indicators, series) : EMPTY_OPTION;

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

import type { EChartsOption } from "echarts";
import { SankeyChart as EChartsSankey } from "echarts/charts";
import { Chart, echarts } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./SankeyChart.module.css";
import type {
	SankeyChartLink,
	SankeyChartNode,
	SankeyChartProps,
} from "./SankeyChart.types";

echarts.use([EChartsSankey]);

const DEFAULT_HEIGHT = 300;

const EMPTY_OPTION: EChartsOption = {};

function formatWithUnits(value: number | string, units?: string): string {
	if (!units) return `${value}`;
	return `${value} ${units}`;
}

function buildSankeyOption(
	nodes: SankeyChartNode[],
	links: SankeyChartLink[],
	units?: string,
): EChartsOption {
	return {
		tooltip: {
			trigger: "item",
			triggerOn: "mousemove",
			...(units && {
				valueFormatter: (value) => formatWithUnits(value as number, units),
			}),
		},
		series: [
			{
				type: "sankey",
				emphasis: {
					focus: "adjacency",
				},
				nodeAlign: "left",
				data: nodes,
				links,
				lineStyle: {
					color: "gradient",
					curveness: 0.5,
				},
			},
		],
	};
}

export const SankeyChart = ({
	nodes,
	links,
	height = DEFAULT_HEIGHT,
	units,
	loading = false,
	error,
	className,
	...rest
}: SankeyChartProps) => {
	const hasData =
		Array.isArray(nodes) &&
		nodes.length > 0 &&
		Array.isArray(links) &&
		links.length > 0;
	const option =
		hasData && !error ? buildSankeyOption(nodes, links, units) : EMPTY_OPTION;

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

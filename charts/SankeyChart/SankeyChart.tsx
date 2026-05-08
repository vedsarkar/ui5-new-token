import type { EChartsOption } from "echarts";
import { SankeyChart as EChartsSankey } from "echarts/charts";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./SankeyChart.module.css";
import type {
	SankeyChartLink,
	SankeyChartNode,
	SankeyChartProps,
} from "./SankeyChart.types";

echarts.use([EChartsSankey]);

const EMPTY_OPTION: EChartsOption = {};

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

/** Flow diagram with labeled nodes connected by ribbons whose width is proportional to the flow value. */
export const SankeyChart = ({
	nodes,
	links,
	units,
	className,
	...rest
}: SankeyChartProps) => {
	const hasData =
		Array.isArray(nodes) &&
		nodes.length > 0 &&
		Array.isArray(links) &&
		links.length > 0;
	const option = hasData
		? buildSankeyOption(nodes, links, units)
		: EMPTY_OPTION;

	return (
		<div className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

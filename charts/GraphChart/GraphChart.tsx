import type { EChartsOption } from "echarts";
import { GraphChart as EChartsGraph } from "echarts/charts";
import { useEffect, useRef, useState } from "react";

import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./GraphChart.module.css";
import type {
	GraphChartLayout,
	GraphChartLink,
	GraphChartNode,
	GraphChartProps,
} from "./GraphChart.types";

echarts.use([EChartsGraph]);

const DEFAULT_SIZE = 30;
const MIN_SIZE = 20;
const MAX_SIZE = 60;
const BASELINE_NODE_COUNT = 15;
const PALETTE_TOKENS = [
	"--sapBrandColor",
	"--sapPositiveElementColor",
	"--sapCriticalColor",
	"--sapCriticalElementColor",
	"--sapAccentColor3",
	"--sapAccentColor4",
	"--sapAccentColor7",
	"--sapAccentColor8",
	"--sapNegativeElementColor",
];

const EMPTY_OPTION: EChartsOption = {};

function readPalette(element: HTMLElement): string[] {
	const computed = getComputedStyle(element);
	return PALETTE_TOKENS.map((token) => computed.getPropertyValue(token).trim());
}

function normalizeSize(
	value: number | undefined,
	min: number,
	max: number,
): number {
	if (value === undefined) return DEFAULT_SIZE;
	if (min === max) return DEFAULT_SIZE;
	return MIN_SIZE + ((value - min) / (max - min)) * (MAX_SIZE - MIN_SIZE);
}

function buildGraphOption(
	nodes: GraphChartNode[],
	links: GraphChartLink[],
	palette: string[],
	layout: GraphChartLayout,
	units?: string,
): EChartsOption {
	const scale = Math.sqrt(BASELINE_NODE_COUNT / Math.max(nodes.length, 1));

	const values = nodes
		.map((n) => n.value)
		.filter((v): v is number => v !== undefined);
	const min = values.length > 0 ? Math.min(...values) : 0;
	const max = values.length > 0 ? Math.max(...values) : 0;

	const nodeMap = new Map(nodes.map((n) => [n.id, n]));

	const categoryNames = [
		...new Set(nodes.map((n) => n.category).filter(Boolean)),
	] as string[];
	const categoryColors = new Map(
		categoryNames.map((name, i) => [name, palette[i % palette.length]]),
	);
	const categories = categoryNames.map((name, i) => ({
		name,
		itemStyle: { color: palette[i % palette.length] },
	}));
	const hasCategories = categoryNames.length > 0;

	return {
		...(hasCategories && {
			legend: {
				bottom: 0,
				selectedMode: false,
			},
		}),
		tooltip: {
			trigger: "item",
			formatter: (raw: unknown) => {
				const params = raw as {
					dataType?: string;
					name: string;
					value: unknown;
					data: Record<string, unknown>;
				};
				if (params.dataType === "node") {
					const node = nodes.find((n) => n.name === params.name);
					if (node?.value !== undefined) {
						return `${node.name}: ${formatWithUnits(node.value, units)}`;
					}
					return params.name;
				}
				if (params.dataType === "edge") {
					const sourceName =
						nodeMap.get(params.data.source as string)?.name ??
						(params.data.source as string);
					const targetName =
						nodeMap.get(params.data.target as string)?.name ??
						(params.data.target as string);
					let text = `${sourceName} → ${targetName}`;
					if (params.data.relLabel) {
						text += ` (${params.data.relLabel})`;
					}
					if (params.value !== undefined && params.value !== null) {
						text += `: ${formatWithUnits(params.value as number, units)}`;
					}
					return text;
				}
				return params.name;
			},
		},
		series: [
			{
				type: "graph",
				layout: layout,
				roam: true,
				draggable: false,
				legendHoverLink: false,
				edgeSymbol: ["none", "none"],
				label: {
					show: false,
				},
				emphasis: {
					focus: "adjacency",
					label: {
						show: false,
					},
				},
				...(hasCategories && { categories }),
				...(layout === "force" && {
					force: {
						repulsion: Math.round(200 * scale),
						gravity: 0.1 / scale,
						edgeLength: [Math.round(80 * scale), Math.round(200 * scale)],
						layoutAnimation: false,
						friction: 1,
					},
				}),
				...(layout === "circular" && {
					circular: { rotateLabel: false },
				}),
				data: nodes.map((node) => ({
					id: node.id,
					name: node.name,
					symbolSize: Math.round(
						normalizeSize(node.value, min, max) * Math.min(scale, 1),
					),
					...(node.value !== undefined && { value: node.value }),
					...(node.category && {
						itemStyle: { color: categoryColors.get(node.category) },
					}),
				})),
				links: links.map((link) => ({
					source: link.source,
					target: link.target,
					...(link.value !== undefined && { value: link.value }),
					...(link.label !== undefined && { relLabel: link.label }),
				})),
				lineStyle: {
					color: "source",
					curveness: 0,
					width: 2,
				},
			},
		],
	};
}

export const GraphChart = ({
	nodes,
	links,
	layout = "force",
	units,
	className,
	...rest
}: GraphChartProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [palette, setPalette] = useState<string[]>([]);

	useEffect(() => {
		const el = rootRef.current;
		if (!el) return;

		setPalette(readPalette(el));

		// Watch data-theme attribute changes on nearest themed ancestor
		let node: HTMLElement | null = el;
		while (node && !node.dataset.theme) node = node.parentElement;
		if (!node) return;

		const observer = new MutationObserver(() => {
			setPalette(readPalette(el));
		});
		observer.observe(node, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => observer.disconnect();
	}, []);

	const hasData =
		Array.isArray(nodes) &&
		nodes.length > 0 &&
		Array.isArray(links) &&
		links.length > 0;
	const option =
		hasData && palette.length > 0
			? buildGraphOption(nodes, links, palette, layout, units)
			: EMPTY_OPTION;

	return (
		<div ref={rootRef} className={classNames(styles.root, className)} {...rest}>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

import {
	GridComponent,
	LegendComponent,
	TooltipComponent,
} from "echarts/components";
import * as echartsCore from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Chart.module.css";
import type { ChartProps } from "./Chart.types";
import { buildTheme } from "./theme";

export { echartsCore as echarts };

echartsCore.use([
	CanvasRenderer,
	SVGRenderer,
	TooltipComponent,
	GridComponent,
	LegendComponent,
]);

function findThemeAncestor(el: HTMLElement): HTMLElement | null {
	let node: HTMLElement | null = el;
	while (node) {
		if (node.dataset.theme) return node;
		node = node.parentElement;
	}
	return null;
}

/**
 * In automated environments (Storybook preview, Chromatic snapshots,
 * addon-vitest browser tests) the preview module sets a window-level flag to
 * disable ECharts animations — entrance, layout, and transitions on data
 * change. Without this, snapshots can land on an intermediate frame and flip
 * to "Unstable" between runs. Production apps consuming `@reltio/design`
 * never set the flag, so animations stay enabled by default for end users.
 * The check is scoped to runtime to avoid coupling the chart module to any
 * test infrastructure.
 */
function chartAnimationsDisabled(): boolean {
	return (
		typeof window !== "undefined" &&
		(window as Window & { __reltioChartAnimationsDisabled__?: boolean })
			.__reltioChartAnimationsDisabled__ === true
	);
}

function withAnimationsOverride(
	raw: ChartProps["option"],
): ChartProps["option"] {
	return chartAnimationsDisabled() ? { animation: false, ...raw } : raw;
}

export const Chart = ({
	option,
	renderer = "canvas",
	className,
	style,
	...rest
}: ChartProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<echartsCore.ECharts | null>(null);
	const rendererRef = useRef(renderer);
	const optionRef = useRef(option);
	optionRef.current = option;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const initChart = () => {
			if (chartRef.current) {
				chartRef.current.dispose();
				chartRef.current = null;
			}

			const theme = buildTheme(container);
			const chart = echartsCore.init(container, theme, {
				renderer: rendererRef.current,
			});
			chartRef.current = chart;
			chart.setOption(withAnimationsOverride(optionRef.current));
		};

		initChart();

		const resizeObserver = new ResizeObserver(() => {
			chartRef.current?.resize();
		});
		resizeObserver.observe(container);

		// Watch data-theme attribute changes on nearest themed ancestor
		let mutationObserver: MutationObserver | null = null;
		const themeAncestor = findThemeAncestor(container);
		if (themeAncestor) {
			mutationObserver = new MutationObserver(() => {
				initChart();
			});
			mutationObserver.observe(themeAncestor, {
				attributes: true,
				attributeFilter: ["data-theme"],
			});
		}

		return () => {
			mutationObserver?.disconnect();
			resizeObserver.disconnect();
			if (chartRef.current) {
				chartRef.current.dispose();
				chartRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		chartRef.current?.setOption(withAnimationsOverride(option));
	}, [option]);

	return (
		<div
			ref={containerRef}
			className={classNames(styles.root, className)}
			style={style}
			{...rest}
		/>
	);
};

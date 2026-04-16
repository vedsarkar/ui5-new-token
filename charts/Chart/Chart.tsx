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

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const theme = buildTheme(container);
		const chart = echartsCore.init(container, theme, {
			renderer: rendererRef.current,
		});
		chartRef.current = chart;

		const resizeObserver = new ResizeObserver(() => {
			chart.resize();
		});
		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
			chart.dispose();
			chartRef.current = null;
		};
	}, []);

	useEffect(() => {
		chartRef.current?.setOption(option);
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

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
	const optionRef = useRef(option);
	optionRef.current = option;

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let disposed = false;
		let resizeObserver: ResizeObserver | null = null;
		let rafId: number | undefined;

		const init = () => {
			if (disposed) return;

			// Theme CSS is loaded async by ThemeProvider — if tokens are
			// not yet available, defer until the next frame.
			const probe = getComputedStyle(container)
				.getPropertyValue("--sapBrandColor")
				.trim();
			if (!probe) {
				rafId = requestAnimationFrame(init);
				return;
			}

			const theme = buildTheme(container);
			const chart = echartsCore.init(container, theme, {
				renderer: rendererRef.current,
			});
			chartRef.current = chart;
			chart.setOption(optionRef.current);

			resizeObserver = new ResizeObserver(() => {
				chart.resize();
			});
			resizeObserver.observe(container);
		};

		init();

		return () => {
			disposed = true;
			if (rafId !== undefined) cancelAnimationFrame(rafId);
			resizeObserver?.disconnect();
			if (chartRef.current) {
				chartRef.current.dispose();
				chartRef.current = null;
			}
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

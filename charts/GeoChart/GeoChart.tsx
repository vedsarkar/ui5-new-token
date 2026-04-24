import type { EChartsOption } from "echarts";
import { MapChart as EChartsMap } from "echarts/charts";
import { VisualMapPiecewiseComponent } from "echarts/components";
import { useLayoutEffect, useRef, useState } from "react";
import { Chart, echarts, formatWithUnits } from "@/charts/Chart";
import { classNames } from "@/utils/classNames";
import styles from "./GeoChart.module.css";
import type {
	GeoChartItem,
	GeoChartProps,
	GeoChartRange,
	GeoJSON,
} from "./GeoChart.types";

echarts.use([EChartsMap, VisualMapPiecewiseComponent]);

const SHADE_COUNT = 5;

const EMPTY_OPTION: EChartsOption = {};

const mapRegistry = new WeakMap<object, string>();
let mapCounter = 0;

function ensureMapRegistered(geoJSON: GeoJSON): string {
	let name = mapRegistry.get(geoJSON);
	if (!name) {
		name = `__geo_${mapCounter++}`;
		echarts.registerMap(name, geoJSON as never);
		mapRegistry.set(geoJSON, name);
	}
	return name;
}

function readShades(element: HTMLElement): string[] {
	const computed = getComputedStyle(element);
	return Array.from({ length: SHADE_COUNT }, (_, i) =>
		computed.getPropertyValue(`--geo-shade-${i + 1}`).trim(),
	);
}

function niceFloor(value: number, step: number): number {
	return Math.floor(value / step) * step;
}

function niceCeil(value: number, step: number): number {
	return Math.ceil(value / step) * step;
}

function computeAutoRanges(
	data: GeoChartItem[],
	units?: string,
): GeoChartRange[] {
	if (data.length === 0) return [];

	const values = data.map((d) => d.value);
	const dataMin = Math.min(...values);
	const dataMax = Math.max(...values);

	const rawStep = (dataMax - dataMin) / SHADE_COUNT;
	const magnitude = 10 ** Math.floor(Math.log10(rawStep || 1));
	const step = Math.max(Math.ceil(rawStep / magnitude) * magnitude, 1);

	const rangeMin = niceFloor(dataMin, step);
	const rangeMax = niceCeil(dataMax, step);
	const actualStep = Math.max(
		Math.ceil((rangeMax - rangeMin) / SHADE_COUNT),
		1,
	);

	const ranges: GeoChartRange[] = [];
	for (let i = 0; i < SHADE_COUNT; i++) {
		const min = rangeMin + i * actualStep;
		const max = i < SHADE_COUNT - 1 ? min + actualStep - 1 : rangeMax;
		const suffix = units ? ` ${units}` : "";
		ranges.push({ min, max, label: `${min} - ${max}${suffix}` });
	}

	return ranges;
}

function buildGeoOption(
	mapName: string,
	data: GeoChartItem[],
	ranges: GeoChartRange[],
	shades: string[],
	units?: string,
): EChartsOption {
	return {
		tooltip: {
			trigger: "item",
			formatter: (params: { marker: string; name: string; value: number }) => {
				const val = formatWithUnits(params.value, units);
				return `${params.marker} ${params.name}: ${val}`;
			},
		},
		visualMap: {
			type: "piecewise",
			pieces: ranges.map((r, i) => ({
				min: r.min,
				max: r.max,
				label: r.label ?? `${r.min} - ${r.max}`,
				color: shades[i % shades.length],
			})),
			selectedMode: "multiple" as const,
			hoverLink: true,
			orient: "horizontal",
			bottom: 0,
			left: "center",
			itemWidth: 14,
			itemHeight: 14,
		},
		series: [
			{
				type: "map",
				map: mapName,
				roam: true,
				label: {
					show: false,
				},
				emphasis: {
					label: {
						show: true,
					},
				},
				data,
			},
		],
	};
}

export const GeoChart = ({
	map,
	data,
	units,
	className,
	style,
	...rest
}: GeoChartProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [shades, setShades] = useState<string[]>([]);

	useLayoutEffect(() => {
		const el = rootRef.current;
		if (!el) return;

		let rafId: number | undefined;
		const read = () => {
			const probe = getComputedStyle(el)
				.getPropertyValue("--geo-shade-5")
				.trim();
			if (!probe) {
				rafId = requestAnimationFrame(read);
				return;
			}
			setShades(readShades(el));
		};
		read();

		return () => {
			if (rafId !== undefined) cancelAnimationFrame(rafId);
		};
	}, []);

	const hasData = Array.isArray(data) && data.length > 0;
	const ranges = hasData ? computeAutoRanges(data, units) : [];

	const mapName = ensureMapRegistered(map);

	const option =
		hasData && shades.length > 0
			? buildGeoOption(mapName, data, ranges, shades, units)
			: EMPTY_OPTION;

	return (
		<div
			ref={rootRef}
			className={classNames(styles.root, className)}
			style={style}
			{...rest}
		>
			{!hasData && <div className={classNames(styles.overlay)}>No data</div>}
			<Chart option={option} />
		</div>
	);
};

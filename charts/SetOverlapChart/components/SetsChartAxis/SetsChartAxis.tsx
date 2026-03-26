import { classNames } from "@/utils/classNames";
import styles from "./SetsChartAxis.module.css";
import type { SetsChartAxisProps } from "./SetsChartAxis.types";

const AXIS_LABEL_OFFSET = 12;
const AXIS_TICK_LABEL_OFFSET = 9;
const LABEL_OFFSET = AXIS_LABEL_OFFSET + AXIS_TICK_LABEL_OFFSET;

export const SetsChartAxis = ({ width, label }: SetsChartAxisProps) => {
	return (
		<g>
			<g transform="translate(0,0)">
				<line y2={-6} className={classNames(styles.axisTick)} />
				<text
					x={0}
					y={-AXIS_TICK_LABEL_OFFSET}
					className={classNames(styles.axisTickLabel)}
				>
					100%
				</text>
			</g>
			<g transform={`translate(${width},0)`}>
				<line y2={-6} className={classNames(styles.axisTick)} />
				<text
					x={0}
					y={-AXIS_TICK_LABEL_OFFSET}
					className={classNames(styles.axisTickLabel)}
				>
					0%
				</text>
			</g>
			{label && (
				<text
					className={classNames(styles.axisLabel)}
					transform={`translate(${width / 2},${-LABEL_OFFSET})`}
				>
					{label}
				</text>
			)}
		</g>
	);
};

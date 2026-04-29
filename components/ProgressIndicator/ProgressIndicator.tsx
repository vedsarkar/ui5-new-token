import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "@/icons/CheckCircle";
import { ErrorCircle } from "@/icons/ErrorCircle";
import { Info } from "@/icons/Info";
import { Warning } from "@/icons/Warning";
import { classNames } from "@/utils/classNames";
import type { ValueState } from "@/utils/valueState";
import styles from "./ProgressIndicator.module.css";
import type { ProgressIndicatorProps } from "./ProgressIndicator.types";

const stateClassMap: Record<ValueState, string | undefined> = {
	None: undefined,
	Error: styles.error,
	Warning: styles.warning,
	Success: styles.success,
	Information: styles.information,
};

const stateIcons: Record<ValueState, React.ReactNode> = {
	None: null,
	Error: <ErrorCircle size="small" />,
	Warning: <Warning size="small" />,
	Success: <CheckCircle size="small" />,
	Information: <Info size="small" />,
};

const stateLabels: Record<ValueState, string> = {
	None: "",
	Error: "Error",
	Warning: "Warning",
	Success: "Success",
	Information: "Information",
};

function clamp(value: number): number {
	if (value < 0) return 0;
	if (value > 100) return 100;
	return value;
}

/**
 * SAP Fiori ProgressIndicator
 *
 * A horizontal determinate progress bar with the SAP Horizon "pill on rail" visual,
 * value state coloring, animated transitions, and optional custom display text.
 *
 * @see https://experience.sap.com/fiori-design-web/progress-indicator/
 */
export const ProgressIndicator = ({
	value = 0,
	valueState = "None",
	displayValue,
	hideValue = false,
	className,
	style,
	...rest
}: ProgressIndicatorProps) => {
	const clamped = clamp(value);
	const prevValueRef = useRef(clamped);
	const [transitionDuration, setTransitionDuration] = useState(0);

	useEffect(() => {
		const delta = Math.abs(prevValueRef.current - clamped);
		setTransitionDuration(delta * 20);
		prevValueRef.current = clamped;
	}, [clamped]);

	const text = displayValue ?? `${clamped}%`;
	const showIcon = valueState !== "None";
	const stateLabel = stateLabels[valueState];
	const ariaValueText = stateLabel
		? `${clamped}% ${stateLabel}`
		: `${clamped}%`;

	return (
		<div
			className={classNames(
				styles.root,
				stateClassMap[valueState],
				hideValue && styles.hideValue,
				className,
			)}
			style={style}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={clamped}
			aria-valuetext={ariaValueText}
			{...rest}
		>
			<div className={classNames(styles.track)}>
				<div
					className={classNames(styles.bar)}
					style={{
						width: `${clamped}%`,
						transitionDuration: `${transitionDuration}ms`,
					}}
				/>

				{!hideValue && (
					<span className={classNames(styles.valueText)}>{text}</span>
				)}

				{showIcon && (
					<span className={classNames(styles.icon)}>
						{stateIcons[valueState]}
					</span>
				)}
			</div>
		</div>
	);
};

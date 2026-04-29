import type React from "react";
import { useMemo, useState } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Slider.module.css";
import type { SliderProps } from "./Slider.types";

/**
 * SAP Fiori Slider
 *
 * A single-value range input with SAP Fiori handle (rounded rectangle with direction arrows),
 * end dots, optional tooltip, tickmarks with labels.
 *
 * @see https://www.sap.com/design-system/fiori-design-web/ui-elements/slider-web-component/
 */
export const Slider = ({
	value = 0,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	disabled,
	showTooltip = false,
	showTickmarks = false,
	labelInterval = 0,
	className,
	style,
	"aria-label": ariaLabel,
	...rest
}: SliderProps) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, Number(e.target.value));
	};

	const progress = max !== min ? ((value - min) / (max - min)) * 100 : 0;

	const tickmarks = useMemo(() => {
		if (!showTickmarks || step <= 0) return [];
		const count = Math.floor((max - min) / step);
		if (count > 200) return [];
		return Array.from({ length: count + 1 }, (_, i) => {
			const tickValue = min + i * step;
			const position = ((tickValue - min) / (max - min)) * 100;
			const isActive = position <= progress;
			const showLabel = labelInterval > 0 && i % labelInterval === 0;
			return { value: tickValue, position, isActive, showLabel };
		});
	}, [showTickmarks, min, max, step, labelInterval, progress]);

	return (
		<div
			className={classNames(
				styles.root,
				disabled && styles.disabled,
				className,
			)}
			style={style}
			{...rest}
		>
			<div className={classNames(styles.trackContainer)}>
				{/* Inactive track row: left dot + bar + right dot */}
				<div className={classNames(styles.inactiveTrack)}>
					<span className={classNames(styles.endDot, styles.endDotLeft)} />
					<div className={classNames(styles.bar)}>
						{/* Tickmarks inside the bar */}
						{showTickmarks && tickmarks.length > 0 && (
							<div className={classNames(styles.tickmarksRow)}>
								{tickmarks.map((tick) => (
									<span
										key={tick.value}
										className={classNames(
											styles.tick,
											tick.isActive ? styles.tickActive : styles.tickInactive,
										)}
									/>
								))}
							</div>
						)}
					</div>
					<span className={classNames(styles.endDot, styles.endDotRight)} />
				</div>

				{/* Active track + handle overlay */}
				<div className={classNames(styles.activeContainer)}>
					<div
						className={classNames(styles.activeTrack)}
						style={{ width: `${progress}%` }}
					>
						<div className={classNames(styles.activeLine)} />
						{/* Handle at the end of active track */}
						<div className={classNames(styles.handleArea)}>
							{showTooltip && (
								<div
									className={classNames(
										styles.tooltip,
										isDragging && styles.tooltipVisible,
									)}
								>
									{value}
								</div>
							)}
							<div className={classNames(styles.handle)}>
								<svg
									className={classNames(styles.handleIcon)}
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									aria-hidden="true"
								>
									<path
										d="M5 4L2.5 7L5 10"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M9 4L11.5 7L9 10"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Native input — invisible overlay for interaction */}
				<input
					type="range"
					value={value}
					onChange={handleChange}
					onPointerDown={() => setIsDragging(true)}
					onPointerUp={() => setIsDragging(false)}
					onFocus={() => setIsDragging(true)}
					onBlur={() => setIsDragging(false)}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					aria-label={ariaLabel}
					className={classNames(styles.input)}
				/>
			</div>

			{/* Labels row below track */}
			{showTickmarks && labelInterval > 0 && (
				<div className={classNames(styles.labelsRow)}>
					{tickmarks
						.filter((t) => t.showLabel)
						.map((tick) => (
							<span
								key={tick.value}
								className={classNames(styles.label)}
								style={{ left: `${tick.position}%` }}
							>
								{tick.value}
							</span>
						))}
				</div>
			)}
		</div>
	);
};

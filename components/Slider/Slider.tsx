import type React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Slider.module.css";
import type { SliderProps } from "./Slider.types";

export const Slider = ({
	value = 0,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	disabled,
	className,
	style,
	...rest
}: SliderProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, Number(e.target.value));
	};

	const progress = max !== min ? ((value - min) / (max - min)) * 100 : 0;

	return (
		<input
			type="range"
			value={value}
			onChange={handleChange}
			min={min}
			max={max}
			step={step}
			disabled={disabled}
			className={classNames(
				styles.root,
				disabled && styles.disabled,
				className,
			)}
			style={
				{
					"--slider-progress": `${progress}%`,
					...style,
				} as React.CSSProperties
			}
			{...rest}
		/>
	);
};

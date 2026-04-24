import type React from "react";
import { useEffect, useRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Checkbox.module.css";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
	checked = false,
	onChange,
	children,
	indeterminate = false,
	error = false,
	disabled = false,
	className,
	...rest
}: CheckboxProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = indeterminate;
		}
	}, [indeterminate]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, e.target.checked);
	};

	return (
		<label
			className={classNames(
				styles.root,
				checked && styles.checked,
				indeterminate && styles.indeterminate,
				error && styles.error,
				disabled && styles.disabled,
				className,
			)}
		>
			<input
				ref={inputRef}
				type="checkbox"
				className={classNames(styles.input)}
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				aria-checked={indeterminate ? "mixed" : checked}
				{...rest}
			/>
			<span className={classNames(styles.indicator)}>
				<svg
					className={classNames(styles.checkIcon)}
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						d="M2 6L5 9L10 3"
						stroke="var(--sapField_Background)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<span className={classNames(styles.dashIcon)} aria-hidden="true" />
			</span>
			{children && <span className={classNames(styles.label)}>{children}</span>}
		</label>
	);
};

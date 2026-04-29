import type React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Radio.module.css";
import type { RadioProps } from "./Radio.types";

export const Radio = ({
	checked = false,
	onChange,
	children,
	valueState = "None",
	disabled = false,
	className,
	...rest
}: RadioProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, e.target.checked);
	};

	return (
		<label
			className={classNames(
				styles.root,
				checked && styles.checked,
				valueState === "Error" && styles.error,
				valueState === "Warning" && styles.warning,
				disabled && styles.disabled,
				className,
			)}
		>
			<input
				type="radio"
				className={classNames(styles.input)}
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				{...rest}
			/>
			<span className={classNames(styles.circle)} />
			{children && <span className={classNames(styles.label)}>{children}</span>}
		</label>
	);
};

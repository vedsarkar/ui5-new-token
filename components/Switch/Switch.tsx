import type React from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Switch.module.css";
import type { SwitchProps } from "./Switch.types";

export const Switch = ({
	checked,
	onChange,
	children,
	disabled,
	className,
	style,
	...rest
}: SwitchProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, e.target.checked);
	};

	return (
		<label
			className={classNames(
				styles.root,
				checked && styles.checked,
				disabled && styles.disabled,
				className,
			)}
			style={style}
		>
			<input
				type="checkbox"
				role="switch"
				aria-checked={checked}
				checked={checked}
				onChange={handleChange}
				disabled={disabled}
				className={classNames(styles.input)}
				{...rest}
			/>
			<span className={classNames(styles.track)}>
				<span className={classNames(styles.handle)} />
			</span>
			{children && <span className={classNames(styles.label)}>{children}</span>}
		</label>
	);
};

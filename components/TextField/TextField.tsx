import type React from "react";
import { useRef } from "react";
import { Close } from "@/icons/Close";
import { classNames } from "@/utils/classNames";
import styles from "./TextField.module.css";
import type { TextFieldProps } from "./TextField.types";

export const TextField = ({
	value,
	onChange,
	label,
	placeholder,
	helperText,
	error,
	disabled,
	readOnly,
	required,
	startContent,
	endContent,
	clearable,
	className,
	style,
	...rest
}: TextFieldProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e, e.target.value);
	};

	const handleClear = () => {
		const input = inputRef.current;
		if (input && onChange) {
			const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
				HTMLInputElement.prototype,
				"value",
			)?.set;
			nativeInputValueSetter?.call(input, "");
			const event = new Event("input", { bubbles: true });
			input.dispatchEvent(event);
			onChange(event as unknown as React.ChangeEvent<HTMLInputElement>, "");
		}
		input?.focus();
	};

	const showClear = clearable && !!value && !disabled && !readOnly;

	return (
		<label
			className={classNames(
				styles.root,
				error && styles.error,
				disabled && styles.disabled,
				readOnly && styles.readOnly,
				required && styles.required,
				className,
			)}
			style={style}
		>
			{label && <span className={classNames(styles.label)}>{label}</span>}
			<div className={classNames(styles.inputContainer)}>
				{startContent && (
					<span className={classNames(styles.startContent)}>
						{startContent}
					</span>
				)}
				<input
					ref={inputRef}
					className={classNames(styles.input)}
					value={value}
					onChange={handleChange}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					required={required}
					aria-invalid={error || undefined}
					aria-required={required || undefined}
					{...rest}
				/>
				{showClear && (
					<button
						type="button"
						className={classNames(styles.clearButton)}
						onClick={handleClear}
						aria-label="Clear"
						tabIndex={0}
					>
						<Close size="small" />
					</button>
				)}
				{endContent && (
					<span className={classNames(styles.endContent)}>{endContent}</span>
				)}
			</div>
			{helperText && (
				<span className={classNames(styles.helperText)}>{helperText}</span>
			)}
		</label>
	);
};

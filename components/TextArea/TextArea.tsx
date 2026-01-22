"use client";

import { forwardRef, useId } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./TextArea.module.css";
import type { TextAreaProps } from "@/components";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			label,
			error,
			supportingText,
			toolbar,
			className,
			id: providedId,
			...rest
		},
		ref,
	) => {
		const generatedId = useId();
		const textareaId = providedId || generatedId;
		const supportingTextId = `${textareaId}-supporting`;

		const hasValue =
			rest.value !== undefined
				? String(rest.value).length > 0
				: rest.defaultValue !== undefined
					? String(rest.defaultValue).length > 0
					: false;

		return (
			<div
				data-error={error || undefined}
				data-disabled={rest.disabled || undefined}
				data-has-value={hasValue || undefined}
				className={classNames(styles.root, className)}
			>
				<label
					htmlFor={textareaId}
					className={classNames(styles.inputContainer)}
				>
					<textarea
						ref={ref}
						id={textareaId}
						className={classNames(styles.textarea)}
						placeholder={label || rest.placeholder}
						aria-invalid={error || undefined}
						aria-describedby={supportingText ? supportingTextId : undefined}
						{...rest}
					/>
					{label && <span className={classNames(styles.label)}>{label}</span>}
					{toolbar && (
						<div className={classNames(styles.toolbar)}>{toolbar}</div>
					)}
				</label>
				{supportingText && (
					<div
						id={supportingTextId}
						className={classNames(styles.supportingText)}
					>
						{supportingText}
					</div>
				)}
			</div>
		);
	},
);

TextArea.displayName = "TextArea";

"use client";

import type React from "react";
import { forwardRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./TextArea.module.css";
import type { TextAreaProps } from "./TextArea.types";

export const TextArea: React.ForwardRefExoticComponent<
	TextAreaProps & React.RefAttributes<HTMLTextAreaElement>
> = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ label, error, supportingText, toolbar, className, ...rest }, ref) => {
		const hasValue = String(rest.value ?? rest.defaultValue ?? "").length > 0;

		return (
			<div
				data-error={error || undefined}
				data-disabled={rest.disabled || undefined}
				data-has-value={hasValue || undefined}
				className={classNames(styles.root, className)}
			>
				<label className={classNames(styles.inputContainer)}>
					<textarea
						ref={ref}
						className={classNames(styles.textarea)}
						placeholder={label || rest.placeholder}
						aria-invalid={error || undefined}
						{...rest}
					/>
					{label && <span className={classNames(styles.label)}>{label}</span>}
					{toolbar && (
						<div className={classNames(styles.toolbar)}>{toolbar}</div>
					)}
				</label>
				{supportingText && (
					<div className={classNames(styles.supportingText)}>
						{supportingText}
					</div>
				)}
			</div>
		);
	},
);

TextArea.displayName = "TextArea";

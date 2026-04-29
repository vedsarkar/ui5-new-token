"use client";

import type React from "react";
import { forwardRef } from "react";
import { classNames } from "@/utils/classNames";
import { getValueStateConfig } from "@/utils/valueState";
import styles from "./TextArea.module.css";
import type { TextAreaProps } from "./TextArea.types";

/**
 * SAP Fiori TextArea
 *
 * Multi-line text input with label, value state, and toolbar support.
 * Uses native field-sizing for auto-grow behavior.
 *
 * @see https://experience.sap.com/fiori-design-web/text-area/
 */
export const TextArea: React.ForwardRefExoticComponent<
	TextAreaProps & React.RefAttributes<HTMLTextAreaElement>
> = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			label,
			valueState = "None",
			valueStateMessage,
			disabled,
			readOnly,
			required,
			name,
			toolbar,
			className,
			...rest
		},
		ref,
	) => {
		const vsConfig = getValueStateConfig(valueState);

		return (
			<label
				className={classNames(
					styles.root,
					valueState !== "None" && styles[vsConfig.className],
					disabled && styles.disabled,
					readOnly && styles.readOnly,
					required && styles.required,
					className,
				)}
			>
				{label && <span className={classNames(styles.label)}>{label}</span>}
				<div className={classNames(styles.inputContainer)}>
					<textarea
						ref={ref}
						className={classNames(styles.textarea)}
						placeholder={rest.placeholder}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						name={name}
						{...vsConfig.aria}
						{...rest}
					/>
					{toolbar && (
						<div className={classNames(styles.toolbar)}>{toolbar}</div>
					)}
				</div>
				{valueState !== "None" && valueStateMessage && (
					<div className={classNames(styles.valueStateMessage)}>
						{valueStateMessage}
					</div>
				)}
			</label>
		);
	},
);

TextArea.displayName = "TextArea";

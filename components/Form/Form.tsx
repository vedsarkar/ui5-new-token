"use client";

import { Form as Ui5Form } from "@ui5/webcomponents-react/Form";
import type React from "react";
import { type FormEvent, forwardRef } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./Form.module.css";
import type { FormProps, FormValues } from "./Form.types";

// Flatten the native FormData into a JSON object: a `name` seen once maps to a
// single value, a `name` seen multiple times (checkbox group, multi-select) to
// an array — what JSON backends expect.
function formDataToObject(formData: FormData): FormValues {
	const values: FormValues = {};
	for (const key of new Set(formData.keys())) {
		const entries = formData.getAll(key);
		values[key] = entries.length > 1 ? entries : entries[0];
	}
	return values;
}

/** SAP Fiori Form floorplan wrapped in a native `<form>` so its UI5 fields serialize into a JSON object on submit via the `onSubmit` callback. */
export const Form: React.ForwardRefExoticComponent<
	FormProps & React.RefAttributes<HTMLFormElement>
> = forwardRef<HTMLFormElement, FormProps>(
	(
		{
			onSubmit,
			children,
			// Reltio defaults diverge from UI5's responsive multi-column grid
			// (`S1 M1 L2 XL3` / `S12 M4 L4 XL4`): a single column with labels on
			// top on every breakpoint is the predictable, scannable default for
			// product forms. Consumers opt into denser layouts explicitly.
			layout = "S1 M1 L1 XL1",
			labelSpan = "S12 M12 L12 XL12",
			...rest
		},
		ref,
	) => {
		const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
			// Stop the native full-page submit; consumers own the network call.
			event.preventDefault();
			onSubmit?.(formDataToObject(new FormData(event.currentTarget)), event);
		};

		return (
			<form
				ref={ref}
				className={classNames(styles.root)}
				onSubmit={handleSubmit}
			>
				<Ui5Form layout={layout} labelSpan={labelSpan} {...rest}>
					{children}
				</Ui5Form>
			</form>
		);
	},
);

Form.displayName = "Form";

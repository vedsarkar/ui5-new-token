import type React from "react";
import type { ValueState } from "./valueState";

/**
 * Shared base props for all SAP Fiori form controls.
 *
 * Reused by TextField, TextArea, Select, ComboBox, DatePicker,
 * TimePicker, StepInput, and other form components.
 */
export type FormControlBase = {
	/** Validation state affecting visual appearance and ARIA attributes */
	valueState?: ValueState;

	/** Message displayed below the control when valueState is not "None" */
	valueStateMessage?: React.ReactNode;

	/** Whether the control is disabled */
	disabled?: boolean;

	/** Whether the control is read-only */
	readOnly?: boolean;

	/** Whether the control is required */
	required?: boolean;

	/** Form field name for native form submission */
	name?: string;
};

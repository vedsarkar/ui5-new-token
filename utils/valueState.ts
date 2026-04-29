/**
 * SAP Fiori ValueState — shared validation state for all form controls.
 *
 * Maps each state to the corresponding SAP Horizon CSS tokens and ARIA attributes.
 * Used by TextField, TextArea, Select, ComboBox, DatePicker, TimePicker, StepInput, etc.
 */

export type ValueState =
	| "None"
	| "Error"
	| "Warning"
	| "Success"
	| "Information";

type ValueStateConfig = {
	/** CSS class suffix applied to the form control root */
	className: string;
	/** ARIA attributes for accessibility */
	aria: Record<string, string | undefined>;
	/** Icon name to display in the value state message (SAP Fiori convention) */
	icon: string | undefined;
};

const valueStateMap: Record<ValueState, ValueStateConfig> = {
	None: {
		className: "",
		aria: {},
		icon: undefined,
	},
	Error: {
		className: "error",
		aria: { "aria-invalid": "true" },
		icon: "error",
	},
	Warning: {
		className: "warning",
		aria: {},
		icon: "alert",
	},
	Success: {
		className: "success",
		aria: {},
		icon: "sys-enter-2",
	},
	Information: {
		className: "information",
		aria: {},
		icon: "information",
	},
};

/**
 * Returns the configuration for a given ValueState.
 */
export const getValueStateConfig = (
	valueState: ValueState = "None",
): ValueStateConfig => valueStateMap[valueState];

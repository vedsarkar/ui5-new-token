import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type TextFieldProps = HtmlProps<
	"input",
	{
		/** Controlled input value */
		value?: string;
		/** Change handler — receives event and the new value string */
		onChange?: (
			event: React.ChangeEvent<HTMLInputElement>,
			value: string,
		) => void;
		/** Label text above input */
		label?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Helper text below input */
		helperText?: string;
		/** Error state — red border and helper text */
		error?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Read-only state */
		readOnly?: boolean;
		/** Required indicator (asterisk on label) */
		required?: boolean;
		/** Content before the input (icons, etc.) */
		startContent?: React.ReactNode;
		/** Content after the input (icons, buttons) */
		endContent?: React.ReactNode;
		/** Show clear button when input has a value */
		clearable?: boolean;
	}
>;

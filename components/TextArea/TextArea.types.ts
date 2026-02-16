import type React from "react";

export type TextAreaProps = {
	/**
	 * Floating label text displayed above the textarea
	 */
	label?: string;

	/**
	 * Whether the textarea is in an error state
	 * @default false
	 */
	error?: boolean;

	/**
	 * Helper text displayed below the textarea
	 */
	supportingText?: string;

	/**
	 * Toolbar content rendered below the textarea input
	 */
	toolbar?: React.ReactNode;

	/**
	 * Custom styles including CSS custom properties for theming
	 */
	style?: React.CSSProperties & {
		"--reltio-textarea-font-family": string;
		"--reltio-textarea-font-size": string;
		"--reltio-textarea-line-height": string;
		"--reltio-textarea-color-text": string;
		"--reltio-textarea-color-border": string;
		"--reltio-textarea-color-border-focus": string;
		"--reltio-textarea-color-background": string;
		"--reltio-textarea-color-error": string;
		"--reltio-textarea-color-label": string;
		"--reltio-textarea-color-supporting-text": string;
		"--reltio-textarea-border-radius": string;
		"--reltio-textarea-padding": string;
		"--reltio-textarea-min-height": string;
		"--reltio-textarea-max-height": string;
		"--reltio-textarea-border-width": string;
		"--reltio-textarea-border-width-focus": string;
	};
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "style">;

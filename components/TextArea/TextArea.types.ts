import type React from "react";

export type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
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
};

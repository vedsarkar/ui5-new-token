import type React from "react";

export type TextAreaProps = {
	label?: string;
	error?: boolean;
	supportingText?: string;
	toolbar?: React.ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

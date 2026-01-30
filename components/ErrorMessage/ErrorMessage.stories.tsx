import type React from "react";
import preview from "@/.storybook/preview";
import { ErrorMessage } from "./ErrorMessage";

const meta = preview.meta({
	component: ErrorMessage,
	parameters: {
		layout: "centered",
	},
});

export const DefaultMessage = meta.story({
	args: {},
});

export const CustomMessage = meta.story({
	args: {
		message: "Invalid email address. Please check and try again.",
	},
});

export const WithIcon = meta.story({
	args: {
		message: "Connection failed. Check your network.",
		showIcon: true,
	},
});

export const WithoutIcon = meta.story({
	args: {
		message: "Validation error.",
		showIcon: false,
	},
});

export const LongText = meta.story({
	args: {
		message:
			"An unexpected error occurred while processing your request. This could be due to a temporary server issue, invalid input, or a network problem. Please verify your data and try again. If the problem persists, contact support.",
	},
});

export const EmptyMessage = meta.story({
	args: {
		message: "",
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		message: "Custom styled error.",
		style: {
			"--reltio-error-message-bg": "#fff5f5",
			"--reltio-error-message-text-color": "#c53030",
		} as React.CSSProperties,
	},
});

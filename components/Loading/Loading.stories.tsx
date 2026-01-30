import type React from "react";
import preview from "@/.storybook/preview";
import { Loading } from "./Loading";

const meta = preview.meta({
	component: Loading,
	parameters: {
		layout: "centered",
	},
});

export const Small = meta.story({
	args: {
		size: "small",
	},
});

export const Medium = meta.story({
	args: {
		size: "medium",
	},
});

export const Large = meta.story({
	args: {
		size: "large",
	},
});

export const WithCustomLabel = meta.story({
	args: {
		label: "Fetching data…",
	},
});

export const WithoutLabel = meta.story({
	args: {
		label: undefined,
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		style: {
			"--reltio-loading-size": "64px",
		} as React.CSSProperties,
	},
});

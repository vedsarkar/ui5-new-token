import type React from "react";
import preview from "@/.storybook/preview";
import { Skeleton } from "./Skeleton";

const meta = preview.meta({
	component: Skeleton,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div style={{ width: 400 }}>
				<Story />
			</div>
		),
	],
});

export const OneRow = meta.story({
	args: {
		rows: 1,
	},
});

export const ThreeRows = meta.story({
	args: {
		rows: 3,
	},
});

export const FiveRows = meta.story({
	args: {
		rows: 5,
	},
});

export const CustomRowCount = meta.story({
	args: {
		rows: 4,
	},
});

export const WithCustomLabel = meta.story({
	args: {
		label: "Loading article…",
		rows: 3,
	},
});

export const WithSize = meta.story({
	args: {
		size: 20,
		rows: 3,
	},
});

export const WithCustomCssVariables = meta.story({
	args: {
		rows: 3,
		style: {
			"--reltio-skeleton-row-height": "24px",
			"--reltio-skeleton-row-gap": "16px",
		} as React.CSSProperties,
	},
});

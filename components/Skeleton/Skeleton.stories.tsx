import type React from "react";
import preview from "@/.storybook/preview";
import { Skeleton } from "./Skeleton";

const meta = preview.meta({
	component: Skeleton,
});

export const OneRow = meta.story({
	args: {
		rows: 1,
	},
});

export const CustomRowCount = meta.story({
	args: {
		rows: 10,
	},
});

export const WithCustomStyle = meta.story({
	args: {
		rows: 3,
		style: {
			"--reltio-skeleton-row-height": "40px",
			"--reltio-skeleton-row-gap": "24px",
		} as React.CSSProperties,
	},
});

import preview from "@/.storybook/preview";
import { Skeleton } from "./Skeleton";
import cssClasses from "./Skeleton.module.css";

const meta = preview.meta({
	component: Skeleton,
	parameters: {
		cssClasses,
	},
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

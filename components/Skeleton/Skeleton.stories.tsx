import preview from "@/.storybook/preview";
import { Skeleton } from "./Skeleton";

const meta = preview.meta({
	component: Skeleton,
});

export default meta;

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

export const CustomSize = meta.story({
	args: {
		size: "32px",
	},
});

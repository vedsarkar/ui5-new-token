import type { HtmlProps } from "@/utils/types";

export type IconSize = "small" | "medium" | "large" | "xlarge";

export type IconColor =
	| "inherited"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "error";

export type IconProps = HtmlProps<
	"svg",
	{
		size?: IconSize;
		color?: IconColor;
	}
>;

import type { HtmlProps } from "@/utils/types";

export type IconProps = HtmlProps<
	"svg",
	{
		size?: "small" | "medium" | "large" | "xlarge";
		color?:
			| "inherited"
			| "primary"
			| "secondary"
			| "success"
			| "warning"
			| "error";
	}
>;

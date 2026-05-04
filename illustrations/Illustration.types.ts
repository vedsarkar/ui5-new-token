import type { HtmlProps } from "@/utils/types";

export type IllustrationSize = "spot" | "dialog" | "scene";

export type IllustrationProps = HtmlProps<
	"div",
	{
		size?: IllustrationSize;
		title?: string;
		description?: string;
	}
>;

export type IllustrationCoreProps = IllustrationProps & {
	children?: React.ReactNode;
};

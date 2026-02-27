import type { HtmlProps } from "@/utils/types";

/**
 * Props for the Details component
 */
export type DetailsProps = HtmlProps<
	"details",
	{
		/** @default false */
		open?: boolean;
	}
>;

import type { HtmlProps } from "@/utils/types";

/**
 * Props for the UserMessage component
 */
export type UserMessageProps = HtmlProps<
	"div",
	{
		/** We expect user message source as a string */
		children: string;
	}
>;

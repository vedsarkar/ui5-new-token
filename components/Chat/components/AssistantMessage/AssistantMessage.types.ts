import type React from "react";
import type { HtmlProps } from "@/utils/types";

/**
 * Props for the AssistantMessage component
 */
export type AssistantMessageProps = HtmlProps<
	"div",
	{
		/**
		 * Error content: string is passed to ErrorMessage; custom ReactNode is rendered as is.
		 */
		errorMessage?: React.ReactNode | null;

		/** We expect assistant message source as a string */
		children: string;
	}
>;

import type React from "react";
import type { HtmlProps } from "@/utils/types";

/**
 * Props for the ErrorMessage component
 */
export type ErrorMessageProps = HtmlProps<
	"div",
	{
		/**
		 * Custom error message text. When not provided or empty, a default message is shown.
		 */
		children?: React.ReactNode | null;
	}
>;

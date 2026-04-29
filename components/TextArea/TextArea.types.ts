import type React from "react";
import type { FormControlBase } from "@/utils/formTypes";
import type { HtmlProps } from "@/utils/types";

export type TextAreaProps = HtmlProps<
	"textarea",
	FormControlBase & {
		/**
		 * Floating label text displayed above the textarea
		 */
		label?: string;

		/**
		 * Toolbar content rendered below the textarea input
		 */
		toolbar?: React.ReactNode;
	}
>;

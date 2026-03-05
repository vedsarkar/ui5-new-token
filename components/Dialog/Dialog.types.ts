import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type DialogProps = HtmlProps<
	"dialog",
	{
		/** Controls dialog visibility. When `true`, the dialog opens via `showModal()`. When `false`, it closes via `close()`. */
		open?: boolean;
		/** Called when the dialog is dismissed by any method: Esc key, click outside, or the close button */
		onClose?: () => void;
		/** Content rendered in the header area. When provided, a close button appears in the top-right corner. */
		header?: React.ReactNode;
		/** Content rendered in the footer area, right-aligned by default */
		footer?: React.ReactNode;
	}
>;

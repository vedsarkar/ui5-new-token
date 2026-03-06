import type React from "react";
import type { HtmlProps } from "@/utils/types";

export type PopoverProps = HtmlProps<
	"div",
	{
		/** The element that toggles the popover on click. Clicks on content also bubble to the root and close the popover — use `e.stopPropagation()` to prevent this for interactive content. */
		trigger: React.ReactElement;
		/** CSS `position-area` value controlling placement relative to the trigger.
		 * Common values: `"bottom"`, `"top"`, `"left"`, `"right"`, `"bottom span-right"`, `"top span-left"`.
		 * See https://developer.mozilla.org/en-US/docs/Web/CSS/position-area for more details.
		 * @default "bottom"
		 */
		positionArea?: string;
		/** Called when the popover opens or closes. Forwards the native `toggle` event — check `event.newState` for `"open"` or `"closed"`. */
		onToggle?: (event: React.SyntheticEvent<HTMLDivElement>) => void;
		/** Content rendered in a fixed header area at the top, with a bottom border separator */
		header?: React.ReactNode;
		/** Content rendered in a fixed footer area at the bottom, right-aligned by default, with a top border separator */
		footer?: React.ReactNode;
	}
>;

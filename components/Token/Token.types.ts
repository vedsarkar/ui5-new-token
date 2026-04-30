import type { HtmlProps } from "@/utils/types";

export type TokenProps = HtmlProps<
	"div",
	{
		/** Text content displayed in the token */
		text?: string;

		/** Whether the token is visually selected
		 * @default false
		 */
		selected?: boolean;

		/** Whether the token is read-only (hides close icon, prevents deletion)
		 * @default false
		 */
		readOnly?: boolean;

		/** Whether the token is disabled
		 * @default false
		 */
		disabled?: boolean;

		/** Called when the token is clicked or Space is pressed */
		onSelect?: () => void;

		/** Called when the close icon is clicked or Delete/Backspace is pressed */
		onDelete?: () => void;
	}
>;

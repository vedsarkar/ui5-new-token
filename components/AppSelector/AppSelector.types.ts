import type { HtmlProps } from "@/utils/types";

export type AppEntry = {
	/** Application display name. Apps without a name are ignored. */
	name?: string;
	/** URL opened in a new tab on click. Apps without a URI are ignored. */
	uri?: string;
	/** Absolute URL to the application icon (SVG). Falls back to a generic link icon. */
	icon?: string;
	/** Application category for grouping in navigation.
	 * @default "Applications"
	 */
	category?: string;
};

export type AppSelectorProps = HtmlProps<
	"div",
	{
		/** List of apps to display, grouped by category.
		 * Apps missing `name` or `uri` are silently ignored.
		 * The list of available apps for a given tenant
		 * can be retrieved from Reltio Config Service.
		 */
		apps: AppEntry[];
		/** Environment identifier substituted into URI templates (`${environment}`). */
		env?: string;
		/** Tenant identifier substituted into URI templates (`${tenant}`). */
		tenant?: string;
		/** Text label displayed next to the trigger icon.
		 * When omitted, the trigger renders as an icon-only button.
		 */
		label?: string;
		/** CSS `position-area`-style value controlling popover placement relative to the trigger.
		 * Mapped internally to the underlying UI5 `Popover` placement
		 * (`top` → `Top`, `bottom` → `Bottom`, `left` → `Start`, `right` → `End`).
		 * @default "right span-top"
		 */
		positionArea?: string;
	}
>;

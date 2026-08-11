import type { Popover } from "@ui5/webcomponents-react/Popover";
import type { ComponentPropsWithoutRef } from "react";

type Ui5PopoverProps = ComponentPropsWithoutRef<typeof Popover>;

export type AppEntry = {
	/** Application display name. Apps without a name are ignored. */
	name?: string;
	/** URL opened in a new tab on click. Apps without a URI are ignored.
	 * May contain `${environment}` and `${tenant}` template placeholders
	 * substituted at render time from the popover's `env` / `tenant` props. */
	uri?: string;
	/** Absolute URL to the application icon (SVG). Falls back to the SAP
	 * `internet-browser` icon when omitted so the grid stays uniform. */
	icon?: string;
	/** Application category for grouping in navigation.
	 * @default "Applications"
	 */
	category?: string;
};

export type AppSelectorPopoverProps = Ui5PopoverProps & {
	/** Applications shown in the popover grid, in the order returned by the
	 * Reltio Config Service. Entries missing `name` or `uri` are silently
	 * filtered out; the remaining apps are re-ordered so that entries sharing
	 * a `category` stay adjacent (categories keep first-seen order). */
	apps: AppEntry[];
	/** Environment identifier substituted into each app's `uri` template
	 * (`${environment}` placeholder). When omitted, the placeholder is
	 * replaced with the literal string `"undefined"`. */
	env?: string;
	/** Tenant identifier substituted into each app's `uri` template
	 * (`${tenant}` placeholder). When omitted, the placeholder is replaced
	 * with the literal string `"undefined"`. */
	tenant?: string;
};

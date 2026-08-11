import type { ShellBarItem } from "@ui5/webcomponents-react";
import type { ComponentPropsWithoutRef } from "react";

import type { AppEntry } from "../AppSelectorPopover";

// The `AppEntry` type used to live in this file and was reachable via
// `@reltio/design/components` (top level) and its deep path. It now lives
// alongside `<AppSelectorPopover>` — re-exported here so both paths keep
// resolving for existing consumers.
export type { AppEntry };

type Ui5ShellBarItemProps = ComponentPropsWithoutRef<typeof ShellBarItem>;

export type AppSelectorProps = Omit<
	Ui5ShellBarItemProps,
	"icon" | "text" | "id" | "onClick"
> & {
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
	/** Text used as the trigger's accessible name, its hover tooltip, and its
	 * label inside the ShellBar's "…" overflow menu. It does **not** render as
	 * visible text next to the icon in the main bar — per UI5's `ShellBarItem`
	 * template the item is icon-only in its primary position. Omit to fall
	 * back to `"Applications"`.
	 */
	label?: string;
	/** CSS `position-area`-style value controlling popover placement relative to the trigger.
	 * Mapped internally to the underlying UI5 `Popover` placement
	 * (`top` → `Top`, `bottom` → `Bottom`, `left` → `Start`, `right` → `End`).
	 * @default "right span-top"
	 */
	positionArea?: string;
};

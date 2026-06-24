import type { HtmlProps } from "@/utils/types";

/** A single application as returned by the Reltio Config Service. Only `name`
 * and `url` are consumed by `AppNavigation`; every other field (`icon`,
 * `bannerImage`, `description`, …) is ignored — the icon is resolved internally
 * from the app name. Apps missing `name` or `url` are silently skipped. */
export type AppNavigationApp = {
	/** Application display name. Also the key used to resolve the Reltio icon. */
	name?: string;
	/** URL opened on click. Supports `${environment}` / `${tenant}` placeholders. */
	url?: string;
};

/** A titled category of applications. Mirrors the top-level shape returned by
 * the Reltio Config Service (`{ name, items }`). */
export type AppNavigationGroup = {
	/** Category title rendered as the group heading. */
	name?: string;
	/** Applications belonging to this category. */
	items?: AppNavigationApp[];
};

export type AppNavigationProps = HtmlProps<
	"div",
	{
		/** Application catalog grouped by category, as returned by the Reltio
		 * Config Service. Only `name` and `url` are read from each app; the icon
		 * is resolved internally from the app name. Groups and apps missing
		 * required fields are skipped.
		 */
		apps: AppNavigationGroup[];
		/** URL of the application's home page. When provided, a "Home" entry with
		 * the SAP `home` icon is rendered as the first item, above the app groups.
		 * Supports `${environment}` / `${tenant}` placeholders.
		 */
		homeUrl?: string;
		/** Environment identifier substituted into URL templates (`${environment}`). */
		env?: string;
		/** Tenant identifier substituted into URL templates (`${tenant}`). */
		tenant?: string;
		/** Accessible ARIA name announced for the navigation landmark
		 * (e.g. "Applications"). Forwarded to the underlying `SideNavigation`.
		 * @default "Applications"
		 */
		accessibleName?: string;
		/** Render a collapse / expand toggle pinned at the bottom of the menu,
		 * switching it to an icon-only rail.
		 * @default false
		 */
		collapsable?: boolean;
	}
>;

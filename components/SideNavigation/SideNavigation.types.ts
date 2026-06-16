import type { HtmlProps } from "@/utils/types";

/**
 * Reltio `SideNavigation` — a thin wrapper over
 * `@ui5/webcomponents-react/SideNavigation` that deliberately exposes a
 * minimal surface. Only `children`, `collapsable`, and the standard element
 * attributes (`className`, `style`, `id`, `data-*`, `aria-*`, …) are public;
 * every other UI5 prop and slot (`accessibleName`, `header`, `fixedItems`,
 * `onSelectionChange`, `onItemClick`, …) is intentionally hidden to keep the
 * API simple and consistent across Reltio applications. Dedicated Reltio props
 * will be added on demand as teams need them.
 *
 * Build the menu from the endorsed parts — `SideNavigationGroup`,
 * `SideNavigationItem`, and `SideNavigationSubItem` — passed as `children`.
 */
export type SideNavigationProps = HtmlProps<
	"div",
	{
		/**
		 * Accessible ARIA name announced for the navigation landmark. Set this so
		 * screen readers can tell this menu apart from other navigation regions
		 * on the page (e.g. "Main navigation"). A plain `aria-label` on the host
		 * does not reach the internal landmark inside the component's Shadow DOM,
		 * so this prop is the supported way to name the menu.
		 */
		accessibleName?: string;
		/**
		 * Renders a collapse / expand toggle pinned at the bottom of the menu and
		 * lets the component own its expanded/collapsed state internally. Clicking
		 * the toggle switches the menu to an icon-only rail and back. Provide a
		 * `tooltip` on each item so entries stay discoverable when collapsed.
		 * @default false
		 */
		collapsable?: boolean;
	}
>;

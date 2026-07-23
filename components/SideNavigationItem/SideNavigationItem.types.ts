import type { SideNavigationItem as Ui5SideNavigationItem } from "@ui5/webcomponents-react/SideNavigationItem";
import type { ComponentPropsWithoutRef } from "react";

type Ui5SideNavigationItemProps = ComponentPropsWithoutRef<
	typeof Ui5SideNavigationItem
>;

/**
 * Reltio `SideNavigationItem` — a thin wrapper over
 * `@ui5/webcomponents-react/SideNavigationItem` that exposes a deliberately
 * minimal surface. An item is a top-level navigation entry inside a
 * `SideNavigation` or `SideNavigationGroup`; nest `SideNavigationSubItem`
 * children for a second level.
 *
 * Only the props below are public. Deep-customization UI5 props
 * (`accessibilityAttributes`) are intentionally hidden and will be re-exposed
 * as dedicated Reltio props on demand.
 */
export type SideNavigationItemProps = Pick<
	Ui5SideNavigationItemProps,
	| "text"
	| "icon"
	| "href"
	| "target"
	| "selected"
	| "disabled"
	| "expanded"
	| "design"
	| "unselectable"
	| "tooltip"
	| "children"
	| "className"
	| "style"
	| "onClick"
>;

import type { SideNavigationGroup as Ui5SideNavigationGroup } from "@ui5/webcomponents-react/SideNavigationGroup";
import type { ComponentPropsWithoutRef } from "react";

type Ui5SideNavigationGroupProps = ComponentPropsWithoutRef<
	typeof Ui5SideNavigationGroup
>;

/**
 * Reltio `SideNavigationGroup` — a thin wrapper over
 * `@ui5/webcomponents-react/SideNavigationGroup` that exposes a deliberately
 * minimal surface. A group is a titled, non-nestable section of
 * `SideNavigationItem` children inside a `SideNavigation`.
 *
 * Only the props below are public; deep-customization UI5 props are
 * intentionally hidden and will be re-exposed as dedicated Reltio props on
 * demand.
 */
export type SideNavigationGroupProps = Pick<
	Ui5SideNavigationGroupProps,
	"text" | "expanded" | "children" | "className" | "style"
>;

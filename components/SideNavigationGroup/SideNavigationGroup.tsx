import { SideNavigationGroup as Ui5SideNavigationGroup } from "@ui5/webcomponents-react/SideNavigationGroup";
import type { SideNavigationGroupProps } from "./SideNavigationGroup.types";

/** Titled, non-nestable group of `SideNavigationItem` entries within a `SideNavigation`. */
export const SideNavigationGroup = (props: SideNavigationGroupProps) => {
	return <Ui5SideNavigationGroup {...props} />;
};

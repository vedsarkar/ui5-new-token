import { SideNavigationItem as Ui5SideNavigationItem } from "@ui5/webcomponents-react/SideNavigationItem";
import type { SideNavigationItemProps } from "./SideNavigationItem.types";

/** Top-level navigation entry within a `SideNavigation` or `SideNavigationGroup`; nest `SideNavigationSubItem` children for a second level. */
export const SideNavigationItem = (props: SideNavigationItemProps) => {
	return <Ui5SideNavigationItem {...props} />;
};

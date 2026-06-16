import { SideNavigationSubItem as Ui5SideNavigationSubItem } from "@ui5/webcomponents-react/SideNavigationSubItem";
import type { SideNavigationSubItemProps } from "./SideNavigationSubItem.types";

/** Second-level navigation entry nested inside a `SideNavigationItem`. */
export const SideNavigationSubItem = (props: SideNavigationSubItemProps) => {
	return <Ui5SideNavigationSubItem {...props} />;
};

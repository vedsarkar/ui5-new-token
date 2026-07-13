import { SideNavigation as Ui5SideNavigation } from "@ui5/webcomponents-react/SideNavigation";
import { SideNavigationItem as Ui5SideNavigationItem } from "@ui5/webcomponents-react/SideNavigationItem";
import { useState } from "react";
import navigationLeftArrowIcon from "@/icons/sap/navigation-left-arrow";
import navigationRightArrowIcon from "@/icons/sap/navigation-right-arrow";
import { classNames } from "@/utils/classNames";
import styles from "./SideNavigation.module.css";
import type { SideNavigationProps } from "./SideNavigation.types";

/** Reltio side navigation — a minimal, API-narrowed wrapper over the SAP Fiori `SideNavigation` for consistent application navigation. */
export const SideNavigation = ({
	className,
	collapsable = false,
	children,
	...rest
}: SideNavigationProps) => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Ui5SideNavigation
			className={classNames(styles.root, className)}
			collapsed={collapsable && collapsed}
			fixedItems={
				collapsable ? (
					<Ui5SideNavigationItem
						text={collapsed ? "Expand" : ""}
						tooltip={collapsed ? "Expand" : ""}
						icon={
							collapsed ? navigationRightArrowIcon : navigationLeftArrowIcon
						}
						unselectable
						onClick={(event) => {
							event.preventDefault();
							setCollapsed((prev) => !prev);
						}}
					/>
				) : undefined
			}
			{...rest}
		>
			{children}
		</Ui5SideNavigation>
	);
};

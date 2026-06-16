import { SideNavigation as Ui5SideNavigation } from "@ui5/webcomponents-react/SideNavigation";
import { SideNavigationItem as Ui5SideNavigationItem } from "@ui5/webcomponents-react/SideNavigationItem";
import { useState } from "react";
import { classNames } from "@/utils/classNames";
import styles from "./SideNavigation.module.css";
import type { SideNavigationProps } from "./SideNavigation.types";
import "@ui5/webcomponents-icons/dist/navigation-left-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js";

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
							collapsed ? "navigation-right-arrow" : "navigation-left-arrow"
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

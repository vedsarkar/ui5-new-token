import React from "react";
import { ChevronRight } from "@/icons/ChevronRight";
import { classNames } from "@/utils/classNames";
import styles from "./Breadcrumbs.module.css";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";

export const Breadcrumbs = ({
	children,
	className,
	...rest
}: BreadcrumbsProps) => {
	const items = React.Children.toArray(children);

	return (
		<nav aria-label="Breadcrumb" className={classNames(className)} {...rest}>
			<ol className={classNames(styles.list)}>
				{items.flatMap((child, index) => {
					const key = React.isValidElement(child) ? child.key : String(child);
					const item = <li key={`item-${key}`}>{child}</li>;
					if (index < items.length - 1) {
						return [
							item,
							<li
								key={`sep-${key}`}
								aria-hidden="true"
								className={classNames(styles.separator)}
							>
								<ChevronRight size="small" />
							</li>,
						];
					}
					return [item];
				})}
			</ol>
		</nav>
	);
};

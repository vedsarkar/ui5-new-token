import { Icon } from "@ui5/webcomponents-react/Icon";
import React, { useEffect, useState } from "react";
import { classNames } from "@/utils/classNames";

import styles from "./Details.module.css";

import type { DetailsProps } from "./Details.types";
import "@ui5/webcomponents-icons/dist/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import "@ui5/webcomponents-icons/dist/source-code.js";

/**
 * Enhanced details component for rendering collapsible content blocks
 * with improved visual design, accessibility, and consistent styling
 * aligned with the design system.
 */
export const Details = ({
	open: initialOpen = false,
	children,
	className,
	...rest
}: DetailsProps) => {
	const [isOpen, setIsOpen] = useState(initialOpen);

	useEffect(() => {
		setIsOpen(initialOpen);
	}, [initialOpen]);

	let summary: React.ReactNode = "Details";
	const contentChildren: React.ReactNode[] = [];

	React.Children.forEach(children, (child) => {
		if (
			React.isValidElement(child) &&
			typeof child.type === "string" &&
			child.type === "summary"
		) {
			summary = (child.props as { children?: React.ReactNode }).children;
		} else if (child != null) {
			contentChildren.push(child);
		}
	});

	const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
		const detailsElement = event.currentTarget;
		setIsOpen(detailsElement.open);
	};

	return (
		<details
			className={classNames(styles.root, className)}
			onToggle={handleToggle}
			open={initialOpen}
			{...rest}
		>
			<summary className={classNames(styles.summary)}>
				<span className={classNames(styles.icon)} aria-hidden="true">
					<Icon name="source-code" />
				</span>
				<span className={classNames(styles.summaryText)}>{summary}</span>
				<span
					className={classNames(styles.chevron, isOpen && styles.chevronOpen)}
				>
					{isOpen ? (
						<Icon name="navigation-up-arrow" aria-hidden="true" />
					) : (
						<Icon name="navigation-down-arrow" aria-hidden="true" />
					)}
				</span>
			</summary>
			<div className={classNames(styles.content)}>{contentChildren}</div>
		</details>
	);
};

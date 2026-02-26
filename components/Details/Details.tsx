import React, { useEffect, useState } from "react";

import { CodeBrackets } from "@/icons/CodeBrackets";
import { ExpandLess } from "@/icons/ExpandLess";
import { ExpandMore } from "@/icons/ExpandMore";
import { classNames } from "@/utils/classNames";

import styles from "./Details.module.css";

import type { DetailsProps } from "./Details.types";

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
					<CodeBrackets size="small" />
				</span>
				<span className={classNames(styles.summaryText)}>{summary}</span>
				<span
					className={classNames(styles.chevron, isOpen && styles.chevronOpen)}
				>
					{isOpen ? (
						<ExpandLess size="small" aria-hidden="true" />
					) : (
						<ExpandMore size="small" aria-hidden="true" />
					)}
				</span>
			</summary>
			<div className={classNames(styles.content)}>{contentChildren}</div>
		</details>
	);
};

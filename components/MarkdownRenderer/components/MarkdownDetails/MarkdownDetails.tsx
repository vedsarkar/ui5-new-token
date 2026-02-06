import React, { useEffect, useState } from "react";

import { CodeBrackets } from "@/icons/CodeBrackets";
import { ExpandLess } from "@/icons/ExpandLess";
import { ExpandMore } from "@/icons/ExpandMore";
import { classNames } from "@/utils/classNames";

import styles from "./MarkdownDetails.module.css";

import type { MarkdownDetailsProps } from "./MarkdownDetails.types";

/**
 * MarkdownDetails Component
 *
 * Enhanced details component for rendering GitHub Flavored Markdown (GFM)
 * `<details>` blocks with improved visual design, accessibility, and
 * consistent styling aligned with the design system.
 */
export const MarkdownDetails = ({
	open: initialOpen = false,
	children,
	className,
	style,
	...rest
}: MarkdownDetailsProps) => {
	const [isOpen, setIsOpen] = useState(initialOpen);

	// Update internal state when open prop changes
	useEffect(() => {
		setIsOpen(initialOpen);
	}, [initialOpen]);

	// Extract summary from children
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

	// Handle toggle
	const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
		const detailsElement = event.currentTarget;
		setIsOpen(detailsElement.open);
	};

	// Compose className using classNames utility
	const composedClassName = classNames(styles.root, className);

	return (
		<details
			className={composedClassName}
			style={style}
			onToggle={handleToggle}
			open={initialOpen}
			{...rest}
		>
			<summary className={styles.summary}>
				<span className={styles.icon} aria-hidden="true">
					<CodeBrackets size="small" />
				</span>
				<span className={styles.summaryText}>{summary}</span>
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
			<div className={styles.content}>{contentChildren}</div>
		</details>
	);
};

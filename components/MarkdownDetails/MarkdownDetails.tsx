import React, { useState, useEffect, useMemo } from "react";
import { ExpandLess } from "@/icons/ExpandLess";
import { ExpandMore } from "@/icons/ExpandMore";
import { CodeBrackets } from "@/icons/CodeBrackets";
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

	// Extract summary and content from children
	const { summaryContent, content } = useMemo(() => {
		const childrenArray = React.Children.toArray(children);
		let summary: React.ReactNode = null;
		const nonSummaryChildren: React.ReactNode[] = [];

		// Look for a summary element in children
		React.Children.forEach(childrenArray, (child) => {
			if (
				React.isValidElement(child) &&
				typeof child.type === "string" &&
				child.type === "summary"
			) {
				summary = (child as React.ReactElement<{ children?: React.ReactNode }>)
					.props.children;
			} else {
				nonSummaryChildren.push(child);
			}
		});

		// If no summary found, use default fallback
		if (summary === null) {
			summary = "Details";
		}

		return {
			summaryContent: summary,
			content: nonSummaryChildren,
		};
	}, [children]);

	// Handle toggle
	const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
		const detailsElement = event.currentTarget;
		setIsOpen(detailsElement.open);
	};

	// Compose className using classNames utility
	const composedClassName = classNames(styles.root, className);

	return (
		<details
			open={isOpen}
			className={composedClassName}
			style={style}
			onToggle={handleToggle}
			{...rest}
		>
			<summary className={styles.summary} aria-expanded={isOpen}>
				<span className={styles.summaryLeadingIcon} aria-hidden="true">
					<CodeBrackets size="small" aria-hidden="true" />
				</span>
				<span className={styles.summaryText}>{summaryContent}</span>
				<span className={styles.icon}>
					{isOpen ? (
						<ExpandLess size="small" aria-hidden="true" />
					) : (
						<ExpandMore size="small" aria-hidden="true" />
					)}
				</span>
			</summary>
			<div className={styles.content}>{content}</div>
		</details>
	);
};

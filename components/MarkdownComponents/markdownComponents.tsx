import React from "react";
import type { Components } from "react-markdown";
import { MarkdownDetails } from "@/components/MarkdownRenderer/components/MarkdownDetails";
import type { ReactMarkdownProps } from "@/components/MarkdownRenderer/MarkdownRenderer.types";
import { classNames } from "@/utils/classNames";
import styles from "./markdownComponents.module.css";

export const tagWithClass = <T extends keyof React.JSX.IntrinsicElements>(
	Tag: T,
	baseClassName?: string,
) => {
	return ({ node: _node, className, ...rest }: ReactMarkdownProps<T>) =>
		React.createElement(Tag, {
			...(rest as React.ComponentPropsWithoutRef<T>),
			className: classNames(baseClassName, className),
		});
};
/**
 * react-markdown passes a `node` prop (hast/mdast element) to custom components.
 * We destructure it to avoid spreading it onto the DOM. It is not used for logic.
 */

/**
 * Creates the base component mapping for react-markdown (headings, lists, code,
 * links, tables, details, etc.). Used by MarkdownRenderer and MDXRenderer.
 */
export const createBaseMarkdownComponents = (): Components => {
	return {
		// Headings
		h1: tagWithClass("h1", styles.heading1),
		h2: tagWithClass("h2", styles.heading2),
		h3: tagWithClass("h3", styles.heading3),
		h4: tagWithClass("h4", styles.heading4),
		h5: tagWithClass("h5", styles.heading5),
		h6: tagWithClass("h6", styles.heading6),

		// Paragraphs
		p: tagWithClass("p", styles.paragraph),

		// Lists
		ul: tagWithClass("ul", styles.list),
		ol: tagWithClass("ol", styles.list),
		li: tagWithClass("li", styles.listItem),

		// Code
		code: tagWithClass("code", styles.code),
		pre: tagWithClass("pre", styles.pre),
		// Blockquotes
		blockquote: tagWithClass("blockquote", styles.blockquote),

		// Links
		a: ({
			node,
			href,
			...props
		}: React.ComponentPropsWithoutRef<"a"> & { node?: unknown }) => {
			const isExternal =
				href && (href.startsWith("http") || href.startsWith("//"));
			return (
				<a
					{...props}
					href={href}
					target={isExternal ? "_blank" : undefined}
					rel={isExternal ? "noopener noreferrer" : undefined}
					className={classNames(styles.link, props.className)}
				/>
			);
		},

		// Emphasis
		strong: tagWithClass("strong", styles.strong),
		em: tagWithClass("em", styles.em),

		// GFM Tables
		table: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"table"> & { node?: unknown }) => (
			<div className={styles.tableWrapper}>
				<table
					{...props}
					className={classNames(styles.table, props.className)}
				/>
			</div>
		),
		thead: tagWithClass("thead", styles.header),
		tr: tagWithClass("tr", styles.row),
		th: tagWithClass("th", styles.headerCell),
		td: tagWithClass("td", styles.cell),

		// Raw HTML elements
		hr: tagWithClass("hr", styles.divider),

		// Details/Summary - use MarkdownDetails component
		details: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"details"> & { node?: unknown }) => (
			<MarkdownDetails {...props}>{props.children}</MarkdownDetails>
		),
	};
};

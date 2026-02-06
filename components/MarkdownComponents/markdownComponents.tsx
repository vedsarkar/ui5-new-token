import type { MarkdownToJSX } from "markdown-to-jsx";
import React from "react";
import { MarkdownDetails } from "@/components/MarkdownRenderer/components/MarkdownDetails";
import { classNames } from "@/utils/classNames";
import styles from "./markdownComponents.module.css";

type OverrideProps<T extends keyof React.JSX.IntrinsicElements> =
	React.ComponentPropsWithoutRef<T> & {
		node?: unknown;
	};

export const tagWithClass = <T extends keyof React.JSX.IntrinsicElements>(
	Tag: T,
	baseClassName?: string,
): React.ElementType => {
	return ({ node: _node, className, ...rest }: OverrideProps<T>) =>
		React.createElement(Tag, {
			...(rest as React.ComponentPropsWithoutRef<T>),
			className: classNames(baseClassName, className),
		});
};

/**
 * Creates the base component/override mapping for markdown-to-jsx (headings, lists, code,
 * links, tables, details, etc.). Used by MarkdownRenderer and MDXRenderer.
 * Components accept standard DOM-like props; `node` is optional for MDX compatibility.
 */
export const createBaseMarkdownComponents = (): MarkdownToJSX.Overrides => {
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
		a: ({ node: _node, href, ...props }: OverrideProps<"a">) => {
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
		table: ({ node: _node, ...props }: OverrideProps<"table">) => (
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
		details: ({ node: _node, ...props }: OverrideProps<"details">) => (
			<MarkdownDetails {...props}>{props.children}</MarkdownDetails>
		),
	};
};

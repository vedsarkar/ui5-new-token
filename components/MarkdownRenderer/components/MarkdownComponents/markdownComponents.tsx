import type React from "react";
import type { Components } from "react-markdown";
import { MarkdownDetails } from "@/components/MarkdownRenderer/components/MarkdownDetails";
import { classNames } from "@/utils/classNames";
import styles from "./markdownComponents.module.css";
import type { ComponentWhitelist } from "./markdownComponents.types";
/**
 * react-markdown passes a `node` prop (hast/mdast element) to custom components.
 * We destructure it to avoid spreading it onto the DOM. It is not used for logic.
 */

/**
 * Creates the base component mapping for react-markdown (headings, lists, code,
 * links, tables, details, etc.). Used by MarkdownRenderer.
 */
export const createBaseMarkdownComponents = (): Components => {
	return {
		// Headings
		h1: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h1"> & { node?: unknown }) => (
			<h1 {...props} className={classNames(styles.heading1, props.className)} />
		),
		h2: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h2"> & { node?: unknown }) => (
			<h2 {...props} className={classNames(styles.heading2, props.className)} />
		),
		h3: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h3"> & { node?: unknown }) => (
			<h3 {...props} className={classNames(styles.heading3, props.className)} />
		),
		h4: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h4"> & { node?: unknown }) => (
			<h4 {...props} className={classNames(styles.heading4, props.className)} />
		),
		h5: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h5"> & { node?: unknown }) => (
			<h5 {...props} className={classNames(styles.heading5, props.className)} />
		),
		h6: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"h6"> & { node?: unknown }) => (
			<h6 {...props} className={classNames(styles.heading6, props.className)} />
		),

		// Paragraphs
		p: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"p"> & { node?: unknown }) => (
			<p {...props} className={classNames(styles.paragraph, props.className)} />
		),

		// Lists
		ul: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"ul"> & { node?: unknown }) => (
			<ul {...props} className={classNames(styles.list, props.className)} />
		),
		ol: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"ol"> & { node?: unknown }) => (
			<ol {...props} className={classNames(styles.list, props.className)} />
		),
		li: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"li"> & { node?: unknown }) => (
			<li {...props} className={classNames(styles.listItem, props.className)} />
		),

		// Code
		code: ({
			node,
			className: codeClassName,
			...props
		}: React.ComponentPropsWithoutRef<"code"> & { node?: unknown }) => {
			const isInline = !codeClassName || !codeClassName.includes("language-");
			return (
				<code
					{...props}
					className={classNames(
						isInline ? styles.code : styles.codeBlock,
						codeClassName,
					)}
				/>
			);
		},
		pre: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"pre"> & { node?: unknown }) => (
			<pre {...props} className={classNames(styles.pre, props.className)} />
		),

		// Blockquotes
		blockquote: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"blockquote"> & { node?: unknown }) => (
			<blockquote
				{...props}
				className={classNames(styles.blockquote, props.className)}
			/>
		),

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
		strong: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"strong"> & { node?: unknown }) => (
			<strong
				{...props}
				className={classNames(styles.strong, props.className)}
			/>
		),
		em: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"em"> & { node?: unknown }) => (
			<em {...props} className={classNames(styles.em, props.className)} />
		),

		// GFM Tables
		table: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"table"> & { node?: unknown }) => (
			<div className={styles.root}>
				<table
					{...props}
					className={classNames(styles.table, props.className)}
				/>
			</div>
		),
		thead: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"thead"> & { node?: unknown }) => (
			<thead
				{...props}
				className={classNames(styles.header, props.className)}
			/>
		),
		tbody: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"tbody"> & { node?: unknown }) => (
			<tbody {...props} />
		),
		tr: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"tr"> & { node?: unknown }) => (
			<tr {...props} className={classNames(styles.row, props.className)} />
		),
		th: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"th"> & { node?: unknown }) => (
			<th
				{...props}
				className={classNames(styles.headerCell, props.className)}
			/>
		),
		td: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"td"> & { node?: unknown }) => (
			<td {...props} className={classNames(styles.cell, props.className)} />
		),

		// GFM Strikethrough
		del: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"del"> & { node?: unknown }) => (
			<del {...props} className={classNames(styles.del, props.className)} />
		),

		// GFM Task Lists
		input: ({
			node,
			type,
			...props
		}: React.ComponentPropsWithoutRef<"input"> & { node?: unknown }) => {
			if (type === "checkbox") {
				return (
					<input
						{...props}
						type="checkbox"
						className={classNames(styles.checkbox, props.className)}
						disabled
					/>
				);
			}
			return <input {...props} type={type} />;
		},

		// Raw HTML elements
		br: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"br"> & { node?: unknown }) => (
			<br {...props} className={classNames(styles.br, props.className)} />
		),
		b: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"b"> & { node?: unknown }) => (
			<b {...props} className={classNames(styles.b, props.className)} />
		),
		sup: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"sup"> & { node?: unknown }) => (
			<sup {...props} className={classNames(styles.sup, props.className)} />
		),
		sub: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"sub"> & { node?: unknown }) => (
			<sub {...props} className={classNames(styles.sub, props.className)} />
		),
		i: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"i"> & { node?: unknown }) => (
			<i {...props} className={classNames(styles.i, props.className)} />
		),

		// Details/Summary - use MarkdownDetails component
		details: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"details"> & { node?: unknown }) => (
			<MarkdownDetails {...props}>{props.children}</MarkdownDetails>
		),
		summary: ({
			node,
			...props
		}: React.ComponentPropsWithoutRef<"summary"> & { node?: unknown }) => (
			<summary {...props}>{props.children}</summary>
		),
	};
};

/**
 * Creates the component mapping for react-markdown. When allowedComponents is
 * provided, extends the base mapping with whitelisted React components (for MDX).
 * Otherwise returns the base mapping (for MarkdownRenderer).
 */
export function createMarkdownComponents(
	allowedComponents?: ComponentWhitelist,
): Components {
	const baseComponents = createBaseMarkdownComponents();

	if (!allowedComponents || Object.keys(allowedComponents).length === 0) {
		return baseComponents;
	}

	// Add whitelisted React components for MDX (use loose type to avoid "union too complex")
	const components = { ...baseComponents } as Record<
		string,
		React.ComponentType<Record<string, unknown>>
	>;
	for (const componentName of Object.keys(allowedComponents)) {
		const Component = allowedComponents[componentName];
		const Wrapper: React.ComponentType<Record<string, unknown>> = (props) => {
			const {
				node: _node,
				children,
				...rest
			} = props as Record<string, unknown> & {
				node?: unknown;
				children?: React.ReactNode;
			};
			const finalProps: Record<string, unknown> = {};
			for (const key of Object.keys(rest)) {
				const value = rest[key];
				if (typeof value === "string") {
					if (value === "true") {
						finalProps[key] = true;
					} else if (value === "false") {
						finalProps[key] = false;
					} else if (!Number.isNaN(Number(value)) && value !== "") {
						finalProps[key] = Number(value);
					} else {
						finalProps[key] = value;
					}
				} else {
					finalProps[key] = value;
				}
			}
			return (
				<Component {...(finalProps as React.ComponentProps<typeof Component>)}>
					{children}
				</Component>
			);
		};
		components[componentName] = Wrapper;
	}
	return components as Components;
}

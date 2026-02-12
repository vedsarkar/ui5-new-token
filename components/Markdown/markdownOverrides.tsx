import type { MarkdownToJSX } from "markdown-to-jsx";
import { Children, isValidElement } from "react";
import type React from "react";
import { Button } from "@/components/Button";
import { Details } from "@/components/Details";
import { classNames } from "@/utils/classNames";
import styles from "./Markdown.module.css";

type OverrideProps<T extends keyof React.JSX.IntrinsicElements> =
	React.ComponentPropsWithoutRef<T> & {
		node?: unknown;
	};

/**
 * Markdown tag overrides — only elements that require React component
 * replacement or extra attributes/logic. Standard HTML elements are
 * styled via `.root` descendant selectors in Markdown.module.css.
 */
export const baseOverrides = {
	// Links — external detection, target/rel attributes
	a: ({ node: _node, href, ...props }: OverrideProps<"a">) => {
		const isExternal =
			href && (href.startsWith("http") || href.startsWith("//"));
		return (
			<a
				{...props}
				href={href}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
			/>
		);
	},

	// Tables — wrapped in a div for overflow scrolling
	table: ({ node: _node, ...props }: OverrideProps<"table">) => (
		<div className={classNames(styles.tableWrapper)}>
			<table {...props} />
		</div>
	),

	// Button — replaced with design system Button component
	button: ({ node: _node, ...props }: OverrideProps<"button">) => (
		<Button
			{...(props as React.ComponentProps<typeof Button>)}
			className={classNames(props.className)}
		/>
	),

	// Details/Summary — replaced with Details component
	details: ({ node: _node, ...props }: OverrideProps<"details">) => (
		<Details {...props}>{props.children}</Details>
	),

	// Task list items — wrap checkbox + text in <label> for accessibility
	li: ({ node: _node, children, ...props }: OverrideProps<"li">) => {
		const childArray = Children.toArray(children);
		const firstChild = childArray[0];
		const isTaskItem =
			isValidElement(firstChild) &&
			(firstChild.props as Record<string, unknown>)?.type === "checkbox";

		if (isTaskItem) {
			return (
				<li {...props}>
					{/* biome-ignore lint/a11y/noLabelWithoutControl: implicit label wraps the checkbox input from markdown task list */}
					<label>{children}</label>
				</li>
			);
		}
		return <li {...props}>{children}</li>;
	},
};

export const allowedOverrides: MarkdownToJSX.Overrides = { Button };

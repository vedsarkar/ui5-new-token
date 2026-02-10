import Markdown, { sanitizer } from "markdown-to-jsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import {
	baseMarkdownComponents,
	allowedMarkdownComponents,
} from "@/components/MarkdownComponents/markdownComponents";
import { classNames } from "@/utils/classNames";

import styles from "./MarkdownRenderer.module.css";

import type { MarkdownRendererProps } from "./MarkdownRenderer.types";

/**
 * MarkdownRenderer Component
 *
 * Safely renders Markdown-formatted text content with robust error handling
 * for invalid or malformed Markdown input. Supports GitHub Flavored Markdown
 * (GFM), raw HTML rendering with proper sanitization, and optional
 * tag-to-component overrides via the components prop.
 */

export const MarkdownRenderer = ({
	children,
	className,
	style,
}: React.PropsWithChildren<MarkdownRendererProps>) => {
	if (children === null || children === undefined) {
		return null;
	}
	const composedClassName = classNames(styles.root, className);
	return (
		<div className={composedClassName} style={style}>
			<ErrorBoundary fallback={<pre className={styles.error}>{children}</pre>}>
				<Markdown
					options={{
						overrides: {
							...baseMarkdownComponents,
							...allowedMarkdownComponents,
						},
						tagfilter: true,
						sanitizer,
					}}
				>
					{typeof children === "string" ? children : String(children)}
				</Markdown>
			</ErrorBoundary>
		</div>
	);
};

import Markdown, { sanitizer } from "markdown-to-jsx";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { createBaseMarkdownComponents } from "@/components/MarkdownComponents/markdownComponents";
import { classNames } from "@/utils/classNames";

import styles from "./MarkdownRenderer.module.css";

import type { MarkdownRendererProps } from "./MarkdownRenderer.types";

/**
 * MarkdownRenderer Component
 *
 * Safely renders Markdown-formatted text content with robust error handling
 * for invalid or malformed Markdown input. Supports GitHub Flavored Markdown
 * (GFM) and raw HTML rendering with proper sanitization via markdown-to-jsx.
 */

/** Stable base markdown overrides (created once to avoid new refs every render). */
const baseMarkdownOverrides = createBaseMarkdownComponents();

export const MarkdownRenderer = ({
	content,
	className,
	style,
}: MarkdownRendererProps) => {
	if (content === null || content === undefined) {
		return null;
	}

	const composedClassName = classNames(styles.root, className);
	return (
		<div className={composedClassName} style={style}>
			<ErrorBoundary fallback={<pre className={styles.error}>{content}</pre>}>
				<Markdown
					options={{
						overrides: baseMarkdownOverrides,
						tagfilter: true,
						sanitizer,
					}}
				>
					{content}
				</Markdown>
			</ErrorBoundary>
		</div>
	);
};

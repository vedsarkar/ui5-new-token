import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

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
 * (GFM) and raw HTML rendering with proper sanitization.
 */

/** Stable base markdown components (created once to avoid new refs every render). */
const baseMarkdownComponents = createBaseMarkdownComponents();

export const MarkdownRenderer = ({
	content,
	className,
	style,
}: MarkdownRendererProps) => {
	if (content === null || content === undefined) {
		return null;
	}

	const composedClassName = classNames(styles.root, className);
	// We rely on rehype-sanitize defaultSchema for allowed HTML tags.
	// Raw HTML is supported, but only within the safe default allowlist.
	return (
		<div className={composedClassName} style={style}>
			<ErrorBoundary fallback={<pre className={styles.error}>{content}</pre>}>
				<ReactMarkdown
					remarkPlugins={[remarkGfm]}
					rehypePlugins={
						[
							rehypeRaw,
							rehypeSanitize({
								attributes: {
									a: ["href", "target", "rel"],
									input: ["type", "checked", "disabled"],
								},
							}),
						] as React.ComponentProps<typeof ReactMarkdown>["rehypePlugins"]
					}
					components={baseMarkdownComponents}
				>
					{content}
				</ReactMarkdown>
			</ErrorBoundary>
		</div>
	);
};

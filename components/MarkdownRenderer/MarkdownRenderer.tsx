import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { createBaseMarkdownComponents } from "@/components/MarkdownRenderer/components/MarkdownComponents/markdownComponents";
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
export const MarkdownRenderer = ({
	content,
	className,
	style,
}: MarkdownRendererProps) => {
	// Handle empty/null/undefined content
	if (!content) {
		return null;
	}

	const components = createBaseMarkdownComponents();

	// Compose className using classNames utility
	const composedClassName = classNames(styles.root, className);

	try {
		return (
			<div className={composedClassName} style={style}>
				<ErrorBoundary fallback={<pre className={styles.error}>{content}</pre>}>
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={
							[
								rehypeRaw,
								rehypeSanitize({
									tagNames: [
										"br",
										"b",
										"strong",
										"i",
										"em",
										"sup",
										"sub",
										"p",
										"span",
										"div",
										"details",
										"summary",
									],
									attributes: {
										"*": ["className", "id"],
										a: ["href", "target", "rel"],
										input: ["type", "checked", "disabled"],
									},
								}),
							] as React.ComponentProps<typeof ReactMarkdown>["rehypePlugins"]
						}
						components={components}
					>
						{content}
					</ReactMarkdown>
				</ErrorBoundary>
			</div>
		);
	} catch {
		// Graceful error handling - render content as plain text
		return (
			<div className={composedClassName} style={style}>
				<pre className={styles.error}>{content}</pre>
			</div>
		);
	}
};

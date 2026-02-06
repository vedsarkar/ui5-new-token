import { evaluateSync } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types.js";
import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/Button";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { createBaseMarkdownComponents } from "@/components/MarkdownComponents/markdownComponents";
import type { ComponentWhitelist } from "@/components/MarkdownComponents/markdownComponents.types";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { classNames } from "@/utils/classNames";
import styles from "./MDXRenderer.module.css";
import type { MDXRendererProps } from "./MDXRenderer.types";

/** Default component whitelist: design system components allowed in MDX by default. */
const defaultComponents: ComponentWhitelist = {
	Button,
};

/** Stable base markdown components (created once to avoid new refs every render). */
const baseMarkdownComponents = createBaseMarkdownComponents();
/**
 * MDXRenderer Component
 *
 * Safely renders MDX (Markdown with JSX) content, allowing React components
 * to be embedded within Markdown. Uses a component whitelist for security.
 * Fallback: MDX → Markdown.
 */
export const MDXRenderer = ({
	content,
	components: allowedComponents,
	className,
	style,
}: MDXRendererProps) => {
	// Memoize merged components so MDX compilation and child renders don't see a new object every time.
	const mergedComponents = useMemo(
		() => ({
			...baseMarkdownComponents,
			...defaultComponents,
			...allowedComponents,
		}),
		[allowedComponents],
	);

	// Memoize compilation by content (and mergedComponents used in useMDXComponents) to avoid expensive evaluateSync on every render.
	const compiled = useMemo(() => {
		if (!content) return null;
		try {
			const mod = evaluateSync(content, {
				...runtime,
				baseUrl: import.meta.url,
				useMDXComponents: (): MDXComponents =>
					mergedComponents as MDXComponents,
				remarkPlugins: [remarkGfm],
			});
			return mod.default;
		} catch {
			return null;
		}
	}, [content, mergedComponents]);

	if (!content) {
		return null;
	}

	if (compiled) {
		const MDXContent = compiled;
		const composedClassName = classNames(styles.root, className);

		return (
			<div className={composedClassName} style={style}>
				<ErrorBoundary fallback={<pre className={styles.error}>{content}</pre>}>
					<MDXContent
						components={
							mergedComponents as React.ComponentProps<
								typeof MDXContent
							>["components"]
						}
					/>
				</ErrorBoundary>
			</div>
		);
	}

	return (
		<MarkdownRenderer content={content} className={className} style={style} />
	);
};

import { evaluateSync } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types.js";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";
import { Button } from "@/components/Button";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { createBaseMarkdownComponents } from "@/components/MarkdownRenderer/components/MarkdownComponents/markdownComponents";
import type { ComponentWhitelist } from "@/components/MarkdownRenderer/components/MarkdownComponents/markdownComponents.types";
import { classNames } from "@/utils/classNames";
import styles from "./MDXRenderer.module.css";
import type { MDXRendererProps } from "./MDXRenderer.types";

/** Default component whitelist: design system components allowed in MDX by default. */
const defaultComponents: ComponentWhitelist = {
	Button,
};

/**
 * MDXRenderer Component
 *
 * Safely renders MDX (Markdown with JSX) content, allowing React components
 * to be embedded within Markdown. Uses a component whitelist for security.
 * Fallback: MDX → Markdown → plain text.
 */
export const MDXRenderer = ({
	content,
	components: allowedComponents,
	className,
	style,
}: MDXRendererProps) => {
	if (!content) {
		return null;
	}

	// Base markdown elements (styled) + design system / custom components (passed through).
	// Custom components must be passed directly so MDX resolves <Button> to our Button, not the native tag.
	const mergedComponents = {
		...createBaseMarkdownComponents(),
		...defaultComponents,
		...allowedComponents,
	};

	try {
		// useMDXComponents injects our components into the compiled MDX so <Button> resolves to the design system Button.
		const mod = evaluateSync(content, {
			...runtime,
			baseUrl: import.meta.url,
			useMDXComponents: (): MDXComponents => mergedComponents as MDXComponents,
			remarkPlugins: [remarkGfm] as PluggableList,
		});
		const MDXContent = mod.default;

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
	} catch {
		// Fallback: render as Markdown (no JSX)
		try {
			return (
				<MarkdownRenderer
					content={content}
					className={className}
					style={style}
				/>
			);
		} catch {
			// Fallback: plain text
			const composedClassName = classNames(styles.root, className);
			return (
				<div className={composedClassName} style={style}>
					<pre className={styles.error}>{content}</pre>
				</div>
			);
		}
	}
};

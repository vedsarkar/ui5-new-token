import MarkdownToJsx, { sanitizer } from "markdown-to-jsx";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { classNames } from "@/utils/classNames";

import styles from "./Markdown.module.css";
import type { MarkdownProps } from "./Markdown.types";
import { allowedOverrides, baseOverrides } from "./markdownOverrides";

/**
 * Safely renders Markdown-formatted text content with robust error handling
 * for invalid or malformed Markdown input. Supports GitHub Flavored Markdown
 * (GFM), raw HTML rendering with proper sanitization, and optional
 * tag-to-component overrides via the components prop.
 */

export const Markdown = ({
	children,
	className,
	style,
}: React.PropsWithChildren<MarkdownProps>) => {
	if (children === null || children === undefined) {
		return null;
	}
	const composedClassName = classNames(styles.root, className);
	return (
		<div className={composedClassName} style={style}>
			<ErrorBoundary fallback={<pre className={styles.error}>{children}</pre>}>
				<MarkdownToJsx
					options={{
						overrides: {
							...baseOverrides,
							...allowedOverrides,
						},
						tagfilter: true,
						sanitizer,
					}}
				>
					{typeof children === "string" ? children : String(children)}
				</MarkdownToJsx>
			</ErrorBoundary>
		</div>
	);
};

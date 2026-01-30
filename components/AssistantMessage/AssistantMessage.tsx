import type React from "react";
import { ErrorMessage } from "@/components/ErrorMessage";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { MDXRenderer } from "@/components/MDXRenderer";
import { classNames } from "@/utils/classNames";
import styles from "./AssistantMessage.module.css";
import type { AssistantMessageProps } from "./AssistantMessage.types";
import { getAssistantMessageContentType } from "./getAssistantMessageContentType";

/** Pass assistant message content color into renderers so their text uses it. */
const contentColorStyle = {
	"--reltio-markdown-renderer-color-text":
		"var(--reltio-assistant-message-content-color, #0e0e25)",
	"--reltio-mdx-renderer-color-text":
		"var(--reltio-assistant-message-content-color, #0e0e25)",
} as React.CSSProperties;

/**
 * AssistantMessage Component
 *
 * Displays assistant-authored message content with Markdown and MDX support.
 * Content type is determined by getAssistantMessageContentType; the component uses that result to choose MarkdownRenderer or MDXRenderer.
 * When error is true, shows ErrorMessage and hides content.
 */
export const AssistantMessage = ({
	content,
	error = false,
	errorMessage,
	contentType: contentTypeOverride,
	meta,
	className,
	style,
	...rest
}: AssistantMessageProps) => {
	const hasContent = content != null && String(content).trim() !== "";
	const contentType = getAssistantMessageContentType(
		content,
		contentTypeOverride,
	);

	return (
		<div className={classNames(styles.root, className)} style={style} {...rest}>
			{error && (
				<div className={styles.errorWrapper}>
					<ErrorMessage message={errorMessage ?? undefined} />
				</div>
			)}
			{!error && meta != null && <div className={styles.meta}>{meta}</div>}
			{!error && hasContent && (
				<div className={styles.content}>
					{contentType === "markdown" ? (
						<MarkdownRenderer content={content} style={contentColorStyle} />
					) : (
						<MDXRenderer content={content} style={contentColorStyle} />
					)}
				</div>
			)}
		</div>
	);
};

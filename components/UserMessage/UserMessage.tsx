import type React from "react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { classNames } from "@/utils/classNames";
import styles from "./UserMessage.module.css";
import type { UserMessageProps } from "./UserMessage.types";

/** Pass user message content color into MarkdownRenderer so its text uses it. */
const contentColorStyle = {
	"--reltio-markdown-renderer-color-text":
		"var(--reltio-user-message-content-color, #0e0e25)",
} as React.CSSProperties;

/**
 * UserMessage Component
 *
 * Displays user-authored message content with Markdown support via MarkdownRenderer.
 * Empty or null content renders an empty container; invalid Markdown is handled by MarkdownRenderer.
 */
export const UserMessage = ({
	content,
	meta,
	className,
	style,
	...rest
}: UserMessageProps) => {
	const hasContent = content != null && String(content).trim() !== "";

	return (
		<div className={classNames(styles.root, className)} style={style} {...rest}>
			{meta != null && <div className={styles.meta}>{meta}</div>}
			{hasContent && (
				<div className={styles.content}>
					<MarkdownRenderer content={content} style={contentColorStyle} />
				</div>
			)}
		</div>
	);
};
